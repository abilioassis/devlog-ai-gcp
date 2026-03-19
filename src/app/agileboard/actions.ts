"use server";

import { db } from "@/db";
import { plans, buckets, tasks } from "@/db/schema";
import { eq } from "drizzle-orm";


import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const planIdSchema = z.object({
  planId: z.string().uuid(),
});

const createPlanSchema = z.object({
  name: z.string().min(1, "O nome do plano é obrigatório"),
});

const bucketSchema = z.object({
  name: z.string().min(1, "O nome do bucket é obrigatório"),
  planId: z.string().uuid().optional(),
});

export async function createPlan(formData: FormData) {
  const name = formData.get("name") as string;
  
  const result = createPlanSchema.safeParse({ name });
  
  if (!result.success) {
    return { error: result.error.flatten().fieldErrors.name?.[0] };
  }

  try {
    const [newPlan] = await db.insert(plans).values({
      name: result.data.name,
    }).returning();

    // Criar bucket padrão: "Tarefas Pendentes"
    await db.insert(buckets).values({
      planId: newPlan.id,
      name: "Tarefas Pendentes",
    });

    revalidatePath("/agileboard");
    redirect(`/agileboard/${newPlan.id}`);
  } catch (error) {
    console.error("Erro ao criar plano:", error);
    return { error: "Erro interno ao criar o plano." };
  }
}

const taskSchema = z.object({
  bucketId: z.string().uuid().optional(),
  title: z.string().min(1, "O título da tarefa é obrigatório"),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional().nullable(),
});

export async function createTask(formData: FormData) {
  const bucketId = formData.get("bucketId") as string;
  const title = formData.get("title") as string;
  const priority = formData.get("priority") as string;
  const dueDateStr = formData.get("dueDate") as string;

  const result = taskSchema.safeParse({
    bucketId,
    title,
    priority,
    dueDate: dueDateStr || null,
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    await db.insert(tasks).values({
      bucketId: result.data.bucketId!,
      title: result.data.title,
      priority: result.data.priority as "low" | "medium" | "high",
      dueDate: result.data.dueDate ? new Date(result.data.dueDate) : null,
    });

    const [bucket] = await db
      .select({ planId: buckets.planId })
      .from(buckets)
      .where(eq(buckets.id, result.data.bucketId!));

    if (bucket) {
      revalidatePath(`/agileboard/${bucket.planId}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return { error: "Erro interno ao criar a tarefa." };
  }
}

export async function updateTask(taskId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const priority = formData.get("priority") as string;
  const dueDateStr = formData.get("dueDate") as string;

  const result = taskSchema.safeParse({
    title,
    priority,
    dueDate: dueDateStr || null,
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    const [updatedTask] = await db
      .update(tasks)
      .set({
        title: result.data.title,
        priority: result.data.priority,
        dueDate: result.data.dueDate ? new Date(result.data.dueDate) : null,
      })
      .where(eq(tasks.id, taskId))
      .returning();

    if (updatedTask) {
      const [bucket] = await db
        .select({ planId: buckets.planId })
        .from(buckets)
        .where(eq(buckets.id, updatedTask.bucketId));

      if (bucket) {
        revalidatePath(`/agileboard/${bucket.planId}`);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return { error: "Erro interno ao atualizar a tarefa." };
  }
}

export async function createBucket(formData: FormData) {
  const name = formData.get("name") as string;
  const planId = formData.get("planId") as string;

  const result = bucketSchema.safeParse({ name, planId });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    await db.insert(buckets).values({
      name: result.data.name,
      planId: result.data.planId!,
    });

    revalidatePath(`/agileboard/${result.data.planId}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao criar bucket:", error);
    return { error: "Erro interno ao criar o bucket." };
  }
}

export async function updateBucket(bucketId: string, formData: FormData) {
  const name = formData.get("name") as string;

  const result = bucketSchema.safeParse({ name });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  try {
    const [updatedBucket] = await db
      .update(buckets)
      .set({ name: result.data.name })
      .where(eq(buckets.id, bucketId))
      .returning();

    if (updatedBucket) {
      revalidatePath(`/agileboard/${updatedBucket.planId}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar bucket:", error);
    return { error: "Erro interno ao atualizar o bucket." };
  }
}

export async function moveTask(taskId: string, targetBucketId: string) {
  try {
    // Buscar a tarefa e o plano atual
    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, taskId),
      with: {
        bucket: true,
      },
    });

    if (!task) {
      return { error: "Tarefa não encontrada." };
    }

    // Buscar o bucket de destino
    const targetBucket = await db.query.buckets.findFirst({
      where: eq(buckets.id, targetBucketId),
    });

    if (!targetBucket) {
      return { error: "Bucket de destino não encontrado." };
    }

    // Validar se o bucket de destino pertence ao mesmo plano
    if (task.bucket.planId !== targetBucket.planId) {
      return { error: "O bucket de destino deve pertencer ao mesmo plano." };
    }

    await db
      .update(tasks)
      .set({ bucketId: targetBucketId })
      .where(eq(tasks.id, taskId));

    revalidatePath(`/agileboard/${task.bucket.planId}`);
    return { success: true };
  } catch (error) {
    console.error("Erro ao mover tarefa:", error);
    return { error: "Erro interno ao mover a tarefa." };
  }
}


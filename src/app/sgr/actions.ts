'use server'

import { db } from '@/db';
import { requests } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { createRequestSchema, CreateRequestInput } from './schema';
import { eq } from 'drizzle-orm';
import { auth } from '@/auth';

async function checkAdminPermissions() {
  const session = await auth();
  const userEmail = session?.user?.email;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  
  if (!userEmail || !adminEmails.includes(userEmail)) {
    throw new Error('Unauthorized');
  }
}

export async function createRequest(data: CreateRequestInput) {
  const result = createRequestSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    await db.insert(requests).values({
      title: result.data.title,
      description: result.data.description,
    });
    
    revalidatePath('/sgr');
    return { success: true };
  } catch (error) {
    console.error('Failed to create request:', error);
    return { success: false, error: 'Ocorreu um erro ao criar a requisição.' };
  }
}

export async function approveRequest(id: string) {
  try {
    await checkAdminPermissions();
    await db.update(requests).set({ status: 'approved' }).where(eq(requests.id, id));
    revalidatePath('/sgr');
    return { success: true };
  } catch (error: any) {
    if (error.message === 'Unauthorized') return { success: false, error: 'Acesso negado: apenas administradores podem aprovar solicitações.' };
    console.error('Failed to approve request:', error);
    return { success: false, error: 'Ocorreu um erro ao aprovar a requisição.' };
  }
}

export async function rejectRequest(id: string) {
  try {
    await checkAdminPermissions();
    await db.update(requests).set({ status: 'rejected' }).where(eq(requests.id, id));
    revalidatePath('/sgr');
    return { success: true };
  } catch (error: any) {
    if (error.message === 'Unauthorized') return { success: false, error: 'Acesso negado: apenas administradores podem reprovar solicitações.' };
    console.error('Failed to reject request:', error);
    return { success: false, error: 'Ocorreu um erro ao reprovar a requisição.' };
  }
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createRequest } from '@/app/sgr/actions';
import { createRequestSchema, CreateRequestInput } from '@/app/sgr/schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RequestForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<CreateRequestInput>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  async function onSubmit(data: CreateRequestInput) {
    setIsPending(true);
    try {
      const result = await createRequest(data);
      if (result?.success) {
        router.push('/sgr');
      } else {
        console.error(result?.errors);
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título da requisição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva detalhadamente sua requisição" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Salvando...' : 'Criar Requisição'}
        </Button>
      </form>
    </Form>
  );
}

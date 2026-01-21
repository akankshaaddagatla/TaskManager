'use server';

import { supabase } from '@/lib/supabase/client';

export async function createTask(formData) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({ 
      ...formData, 
      user_id: session.user.id 
    })
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function updateTask(id, updates) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .eq('user_id', session.user.id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function deleteTask(id) {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    return { success: false, error: 'Not authenticated' };
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', session.user.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function getTasks() {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.user?.id) {
    return [];
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tasks:', error.message);
    return [];
  }

  return data || [];
}
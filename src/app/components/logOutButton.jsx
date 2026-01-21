'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="m-4 bg-neutral-700 px-4 py-2 rounded hover:bg-neutral-600"
    >
      Log Out
    </button>
  );
}
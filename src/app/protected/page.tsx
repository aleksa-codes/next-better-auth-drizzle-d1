import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Shield, XOctagon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ProtectedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <Card className='w-full max-w-2xl border-red-200 shadow-md'>
        <CardHeader className='text-center text-red-500'>
          <XOctagon className='mx-auto mb-2 h-12 w-12' />
          <CardTitle className='text-2xl'>Access Denied</CardTitle>
          <CardDescription className='text-base'>You are not authorized to view this page</CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center pb-6'>
          <p className='text-muted-foreground text-center text-lg'>Please sign in to access this page</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='w-full max-w-2xl border-green-200 shadow-md'>
      <CardHeader className='text-center text-green-600'>
        <Shield className='mx-auto mb-2 h-12 w-12' />
        <CardTitle className='text-2xl'>Protected Content</CardTitle>
        <CardDescription className='text-base'>You have successfully accessed the protected area</CardDescription>
      </CardHeader>
      <CardContent className='pb-6'>
        <p className='text-muted-foreground text-center text-lg'>Welcome {session.user?.name || 'User'}!</p>
      </CardContent>
    </Card>
  );
}

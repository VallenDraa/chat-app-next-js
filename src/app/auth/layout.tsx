import Image from 'next/image';

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen w-full lg:grid lg:grid-cols-2'>
      <div className='flex items-center justify-center py-12'>
        {props.children}
      </div>

      <div className='hidden bg-muted lg:block'>
        <Image
          src='https://picsum.photos/1280/720'
          alt='Image'
          width='1280'
          height='720'
          className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
    </div>
  );
}

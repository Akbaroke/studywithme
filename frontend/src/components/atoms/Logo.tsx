import cn from '@/helpers/cn';
import Link from 'next/link';
import React from 'react';

type Props = {
  className?: string;
};

function Logo({ className }: Props) {
  return (
    <Link href="/" className={cn('font-bold w-max text-xl', className)}>
      studywithme_
    </Link>
  );
}

export default Logo;

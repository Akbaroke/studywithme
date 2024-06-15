import Link from 'next/link';
import React from 'react';

type Props = {
  text: string;
  href: string;
};

export default function TextLink({ text, href }: Props) {
  return (
    <Link
      href={href}
      className="text-xs underline text-mantineBlue font-semibold">
      {text}
    </Link>
  );
}

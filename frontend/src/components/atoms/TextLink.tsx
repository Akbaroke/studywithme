import Link from 'next/link';
import React from 'react';

type Props = {
  text: string;
  href: string;
  target?: React.HTMLAttributeAnchorTarget;
};

export default function TextLink({ text, href, target }: Props) {
  return (
    <Link
      href={href}
      target={target}
      className="text-xs underline text-mantineBlue font-semibold">
      {text}
    </Link>
  );
}

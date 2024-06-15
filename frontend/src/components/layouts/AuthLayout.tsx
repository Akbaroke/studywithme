import React from 'react';
import Logo from '../atoms/Logo';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="max-w-screen-xl m-auto min-h-screen grid place-items-center">
      <div className="max-w-[500px] w-full m-3 relative">
        <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute top-5 -left-5 -z-10"></div>
        <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute -top-10 left-56 -z-10"></div>
        <div className="text-center mb-5">
          <Logo />
        </div>
        {children}
      </div>
    </div>
  );
}

'use client';
import { useMotionValue } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useMotionTemplate, motion } from 'framer-motion';
import cn from '@/helpers/cn';
import Image from 'next/image';
import { ActionIcon, Tooltip } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
} from '@tabler/icons-react';

const EvervaultCard = ({
  image,
  className,
}: {
  image: string;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState('');

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);

    const str = generateRandomString(1500);
    setRandomString(str);
  }

  return (
    <div
      className={cn(
        'p-0.5  bg-transparent aspect-square  flex items-center justify-center w-full h-full relative',
        className
      )}>
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full">
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 flex items-center justify-center">
          <div className="relative h-36 w-36  rounded-full flex items-center justify-center text-white font-bold text-4xl">
            <Image
              alt="foto"
              src={image}
              className="rounded-full w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl  [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-black to-blue-300 opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay  group-hover/card:opacity-100"
        style={style}>
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const generateRandomString = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

export default function CardTeam({ data }: { data: any }) {
  return (
    <div className="border border-black/[0.2] flex flex-col items-start max-w-xs mx-auto p-4 relative h-[25rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-black" />

      <EvervaultCard image={data.image} />

      <h2 className="text-black mt-4 text-lg font-semibold">{data.name}</h2>
      <h3 className="text-black text-sm font-light">{data.role}</h3>

      <Sosmed
        githubLink={data.githubLink}
        linkedinLink={data.linkedinLink}
        instagramLink={data.instagramLink}
      />
    </div>
  );
}

function Sosmed({ githubLink, instagramLink, linkedinLink }: any) {
  return (
    <div className="flex gap-2 mt-4">
      <Tooltip
        label="Github"
        withArrow
        openDelay={300}
        transitionProps={{ transition: 'pop', duration: 300 }}>
        <ActionIcon
          variant="default"
          radius="md"
          size={30}
          onClick={() => window.open(githubLink)}>
          <IconBrandGithub
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label="Linkedin"
        withArrow
        openDelay={300}
        transitionProps={{ transition: 'pop', duration: 300 }}>
        <ActionIcon
          variant="default"
          radius="md"
          size={30}
          onClick={() => window.open(linkedinLink)}>
          <IconBrandLinkedin
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        label="Instagram"
        withArrow
        openDelay={300}
        transitionProps={{ transition: 'pop', duration: 300 }}>
        <ActionIcon
          variant="default"
          radius="md"
          size={30}
          onClick={() => window.open(instagramLink)}>
          <IconBrandInstagram
            style={{ width: '70%', height: '70%' }}
            stroke={1.5}
          />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

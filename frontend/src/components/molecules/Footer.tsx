import { images } from '@/assets';
import Image from 'next/image';
import React from 'react';
import Logo from '../atoms/Logo';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
} from '@tabler/icons-react';
import { ActionIcon, Divider, Tooltip } from '@mantine/core';
import TextLink from '../atoms/TextLink';
import Link from 'next/link';

const socialMediaLinks = [
  {
    name: 'Github',
    link: 'https://github.com/akbaroke',
    icon: <IconBrandGithub size={15} />,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/akbaroke/',
    icon: <IconBrandLinkedin size={15} />,
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/akbar.833/',
    icon: <IconBrandInstagram size={15} />,
  },
  {
    name: 'Whatsapp',
    link: 'https://wa.me/6281310725348',
    icon: <IconBrandWhatsapp size={15} />,
  },
];

const SocialMediaIcons = () => (
  <div className="flex items-center gap-2">
    {socialMediaLinks.map(({ icon, link, name }, index) => (
      <Link href={link} key={index} target="_blank">
        <Tooltip
          label={name}
          withArrow
          openDelay={300}
          transitionProps={{ transition: 'pop', duration: 300 }}>
          <ActionIcon variant="default" radius="md">
            {icon}
          </ActionIcon>
        </Tooltip>
      </Link>
    ))}
  </div>
);

const FooterContent = ({ isMobile }: { isMobile: boolean }) => (
  <div
    className={`flex px-5 ${
      isMobile ? 'flex-col items-center gap-5' : 'items-center justify-between'
    }`}>
    <div
      className={`flex ${
        isMobile ? 'flex-col items-center' : 'items-center'
      } gap-2`}>
      <Image src={images.STUDYWITHME} width={30} alt="studywithme" />
      <div
        className={`flex ${
          isMobile ? 'flex-col items-center' : 'items-center'
        } gap-2`}>
        <Logo className="text-md" />
        <p className="text-xs text-gray-500">© 2024. All rights reserved.</p>
      </div>
    </div>
    <TextLink
      href="mailto:studywithme@gmail.com"
      text="studywithme@gmail.com"
    />
    <SocialMediaIcons />
  </div>
);

const Footer = () => (
  <>
    <div className="hidden md:block">
      <Divider mb="md" />
      <FooterContent isMobile={false} />
      <Divider mt="md" />
    </div>
    <div className="md:hidden">
      <Divider mb="md" />
      <FooterContent isMobile={true} />
      <Divider mt="md" />
    </div>
  </>
);

export default Footer;

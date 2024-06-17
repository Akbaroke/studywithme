import { images } from '@/assets';
import Image from 'next/image';
import React from 'react';
import Logo from '../atoms/Logo';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from '@tabler/icons-react';
import { ActionIcon, Divider } from '@mantine/core';
import TextLink from '../atoms/TextLink';

const socialMediaLinks = [
  {
    name: 'Facebook',
    link: 'https://facebook.com',
    icon: <IconBrandFacebook size={15} />,
  },
  {
    name: 'LinkedIn',
    link: 'https://linkedin.com',
    icon: <IconBrandLinkedin size={15} />,
  },
  {
    name: 'Instagram',
    link: 'https://instagram.com',
    icon: <IconBrandInstagram size={15} />,
  },
  {
    name: 'Whatsapp',
    link: 'https://whatsapp.com',
    icon: <IconBrandWhatsapp size={15} />,
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com',
    icon: <IconBrandX size={15} />,
  },
];

const SocialMediaIcons = () => (
  <div className="flex items-center gap-2">
    {socialMediaLinks.map(({ icon }, index) => (
      <ActionIcon key={index} variant="default" radius="md">
        {icon}
      </ActionIcon>
    ))}
  </div>
);

const FooterContent = ({ isMobile }: { isMobile: boolean }) => (
  <div
    className={`flex ${
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
      <Divider my="md" />
      <FooterContent isMobile={false} />
      <Divider my="md" />
    </div>
    <div className="md:hidden">
      <Divider my="md" />
      <FooterContent isMobile={true} />
      <Divider my="md" />
    </div>
  </>
);

export default Footer;

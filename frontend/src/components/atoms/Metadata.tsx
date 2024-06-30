import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MetadataModel } from '@/models/metadataModel';

const Metadata: React.FC<MetadataModel> = ({ title, ogImageUrl }) => {
  const router = useRouter();
  const { pathname } = router || { pathname: '' };

  const dinamicOgImageUrl = title
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${title}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/og`;

  const defaultTitle = 'studywithme.';
  const pageUrl = new URL(
    pathname,
    process.env.NEXT_PUBLIC_BASE_URL
  ).toString();
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;

  return (
    <Head>
      <title>{pageTitle}</title>

      {/* Metadata */}
      <meta name="title" content={pageTitle} />
      <meta
        name="description"
        content="Website pembelajaran untuk para calon programmer."
        key="desc"
      />
      <meta
        name="keywords"
        content="Alquran, Al-Quran, Alquran Indonesia, Indonesia Quran, Alquran dan Terjemahan, Hadits Bahasa Indonesia, Doa Doa Harian, Website Alquran, Alquran Online"
      />
      <meta name="author" content="Muhammad Akbar - Akbaroke" />

      <meta
        name="og:image"
        itemProp="image"
        content={ogImageUrl ?? dinamicOgImageUrl}
      />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta
        property="og:description"
        content="Website pembelajaran untuk para calon programmer."
      />
      <meta
        property="og:image"
        itemProp="image"
        content={ogImageUrl ?? dinamicOgImageUrl}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:image" content={ogImageUrl ?? dinamicOgImageUrl} />
      <meta
        property="twitter:description"
        content="Website pembelajaran untuk para calon programmer."
      />
    </Head>
  );
};

export default Metadata;

import * as React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ExtendedRecordMap } from 'notion-types';
import { getPageTitle } from 'notion-utils';
import { NotionRenderer } from 'react-notion-x';
import TweetEmbed from 'react-tweet-embed';

import { Loading } from './Loading';

// ...

const Tweet = ({ id }: { id: string }) => {
  return <TweetEmbed tweetId={id} />;
};

const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
);

const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);

const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  {
    ssr: false
  }
);

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  {
    ssr: false
  }
);

export const NotionPage = ({
  recordMap: notionRecordMap,
  previewImagesEnabled,
  rootPageId,
  rootDomain
}: {
  recordMap: ExtendedRecordMap;
  previewImagesEnabled?: boolean;
  rootPageId?: string;
  rootDomain?: string;
}) => {
  const router = useRouter();

  const isFallback = router.isFallback;

  if (isFallback) {
    return <Loading />;
  }

  if (!notionRecordMap) {
    return null;
  }

  const pageTitle = getPageTitle(notionRecordMap);
  console.log(pageTitle, notionRecordMap);

  // ...

  const socialDescription = 'React Notion X Demo';
  const socialImage =
    'https://react-notion-x-demo.transitivebullsh.it/social.jpg';

  return (
    <>
      <Head>
        {socialDescription && (
          <>
            <meta name='description' content={socialDescription} />
            <meta property='og:description' content={socialDescription} />
            <meta name='twitter:description' content={socialDescription} />
          </>
        )}

        {socialImage ? (
          <>
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:image' content={socialImage} />
            <meta property='og:image' content={socialImage} />
          </>
        ) : (
          <meta name='twitter:card' content='summary' />
        )}

        <title>{pageTitle}</title>
        <meta property='og:title' content={pageTitle} />
        <meta name='twitter:title' content={pageTitle} />
        <meta name='twitter:creator' content='@transitive_bs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NotionRenderer
        recordMap={notionRecordMap}
        fullPage={true}
        darkMode={false}
        rootDomain={rootDomain}
        rootPageId={rootPageId}
        previewImages={previewImagesEnabled}
        components={{
          nextImage: Image,
          nextLink: Link,
          Code,
          Collection,
          Equation,
          Pdf,
          Modal,
          Tweet
        }}
      />
    </>
  );
};

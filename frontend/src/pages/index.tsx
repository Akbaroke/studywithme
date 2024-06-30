import Banner from '@/components/atoms/Banner';
import Metadata from '@/components/atoms/Metadata';
import SectionListContent from '@/components/molecules/SectionListContent';
import {
  getAllContent,
  // getFreeContent,
  getMostClickedContent,
} from '@/services/contentService';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function Home() {
  const contents = useQuery({
    queryKey: ['contents'],
    queryFn: getAllContent,
  });
  // const contentsFree = useQuery({
  //   queryKey: ['contents/free'],
  //   queryFn: getFreeContent,
  // });
  const contentsMostClicked = useQuery({
    queryKey: ['contents/most-click'],
    queryFn: getMostClickedContent,
  });

  return (
    <div className="flex flex-col gap-10">
      <Metadata />
      <Banner />
      <SectionListContent
        title="Paling Populer"
        data={contentsMostClicked.data}
        loading={contentsMostClicked.isLoading}
      />
      {/* <SectionListContent
        title="Pembelajaran Gratis"
        data={contentsFree.data}
      /> */}
      <SectionListContent
        title="Terbaru"
        data={contents.data}
        loading={contentsMostClicked.isLoading}
      />
    </div>
  );
}

export default Home;

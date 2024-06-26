import Banner from '@/components/atoms/Banner';
import SectionListContent from '@/components/molecules/SectionListContent';
import {
  getAllContent,
  getFreeContent,
  getMostClickedContent,
} from '@/services/contentService';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

function Home() {
  const contents = useQuery({
    queryKey: ['contents'],
    queryFn: getAllContent,
  });
  const contentsFree = useQuery({
    queryKey: ['contents/free'],
    queryFn: getFreeContent,
  });
  const contentsMostClicked = useQuery({
    queryKey: ['contents/most-click'],
    queryFn: getMostClickedContent,
  });

  return (
    <div className="flex flex-col gap-10">
      <Banner />
      <SectionListContent
        title="Paling Banyak Dilihat"
        data={contentsMostClicked.data}
      />
      <SectionListContent
        title="Pembelajaran Gratis"
        data={contentsFree.data}
      />
      <SectionListContent title="Pembelajaran Terbaru" data={contents.data} />
    </div>
  );
}

export default Home;

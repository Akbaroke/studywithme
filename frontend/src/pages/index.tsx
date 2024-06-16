import Banner from '@/components/atoms/Banner';
import SectionListContent from '@/components/molecules/SectionListContent';
import {
  freeLearningContents,
  latestLearningContents,
  mostViewedContents,
} from '@/data/fakeDataContent';
import React from 'react';

function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Banner />
      <SectionListContent
        title="Paling Banyak Dilihat"
        data={mostViewedContents}
      />
      <SectionListContent
        title="Pembelajaran Gratis"
        data={freeLearningContents}
      />
      <SectionListContent
        title="Pembelajaran Terbaru"
        data={latestLearningContents}
      />
    </div>
  );
}

export default Home;

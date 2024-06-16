import Banner from '@/components/atoms/Banner';
import SectionListContent from '@/components/molecules/SectionListContent';
import React from 'react';

function Home() {
  return (
    <div>
      <Banner />
      <SectionListContent title="Paling Banyak Dilihat" data={[]} />
      <SectionListContent title="Pembelajaran Gratis" data={[]} />
      <SectionListContent title="Pembelajaran Terbaru" data={[]} />
    </div>
  );
}

export default Home;

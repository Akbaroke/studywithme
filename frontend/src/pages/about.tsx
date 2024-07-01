import { images } from '@/assets';
import Metadata from '@/components/atoms/Metadata';
import Image from 'next/image';
import React from 'react';

export default function About() {
  return (
    <div>
      <Metadata title="Tentang Kami" />
      <div className="flex flex-col gap-32 py-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Tentang Kami</h1>
          <div className="px-5 flex flex-col gap-5">
            <p className="text-md font-medium text-gray-500 text-justify indent-10 leading-8">
              <b>studywithme</b> adalah platform edukasi inovatif yang
              menyediakan berbagai layanan tontonan pembelajaran seputar
              pemrograman dan teknologi informasi (IT). Kami menawarkan beragam
              video berkualitas tinggi yang mencakup berbagai topik, mulai dari
              dasar-dasar pemrograman hingga teknik lanjutan dalam pengembangan
              perangkat lunak, jaringan komputer, keamanan siber, dan banyak
              lagi. Setiap kategori pembelajaran kami dirancang secara
              sistematis untuk membantu Anda memahami konsep-konsep kunci dan
              keterampilan yang diperlukan di dunia teknologi yang terus
              berkembang.
            </p>
            <p className="text-md font-medium text-gray-500 text-justify indent-10 leading-8">
              Selain video pembelajaran, setiap materi kami di{' '}
              <b>studywithme</b> dilengkapi dengan soal latihan yang interaktif
              untuk memastikan Anda dapat mengaplikasikan pengetahuan yang telah
              dipelajari. Soal-soal ini dirancang untuk menguji pemahaman Anda
              dan memberikan umpan balik yang konstruktif. Dengan pendekatan
              ini, kami berkomitmen untuk tidak hanya menyampaikan pengetahuan,
              tetapi juga membantu Anda mengembangkan kemampuan praktis yang
              diperlukan untuk sukses dalam karir di bidang teknologi informasi.
              Gabunglah dengan kami di <b>studywithme</b> dan mulailah
              perjalanan belajar Anda dengan dukungan dari para ahli dan
              komunitas pembelajar yang berdedikasi.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1 justify-center items-center max-w-md text-center m-auto">
            <h1 className="text-2xl font-bold">Tim Kami</h1>
            <p className="text-sm font-medium text-gray-500">
              Tentunya, kami tidak bisa berjalan sendiri. Kami terbentuk dari
              berbagai latar belakang yang berbeda.
            </p>
          </div>
          <div className="flex justify-center items-center gap-5 flex-wrap max-w-2xl mx-auto">
            {teamDatas.map((data, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 justify-center items-center max-w-md text-center w-[200px]">
                <Image
                  src={data.image}
                  alt={data.name}
                  width={100}
                  height={100}
                />
                <h1 className="text-lg font-bold">{data.name}</h1>
                <p className="text-sm font-medium text-gray-500">{data.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const teamDatas = [
  {
    name: 'Muhammad Akbar',
    role: 'Founder, Fullstack Developer',
    image: images.MAN_1,
  },
  {
    name: 'Muhamad Aldiarsyah Arifin',
    role: 'Mobile Developer',
    image: images.MAN_2,
  },
  {
    name: 'Gufranaka Samudra',
    role: 'Machine Learning Engineer',
    image: images.MAN_3,
  },
  {
    name: 'Muhammad Arya Dipanegara',
    role: 'Frontend Developer',
    image: images.MAN_4,
  },
  {
    name: 'Windu Ardan',
    role: 'Network Engineer',
    image: images.MAN_5,
  },
];

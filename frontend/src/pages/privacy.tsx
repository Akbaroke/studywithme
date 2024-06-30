import { images } from '@/assets';
import Metadata from '@/components/atoms/Metadata';
import Image from 'next/image';
import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-screen-sm m-auto flex flex-col gap-3 my-20 realative">
      <Metadata title="Privacy Policy" />
      <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute -top-10 left-56 -z-10"></div>
      <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute right-0 top-1/2 -z-10"></div>
      <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute -right-10 top-1/4 -z-10"></div>
      <Image
        src={images.STUDYWITHME}
        alt="studywithme_"
        title="studywithme_"
        width={70}
        className="mb-3"
      />
      <h1 className="text-2xl font-bold">{dataPrivacy.title}</h1>
      <div className="flex flex-col gap-3">
        {dataPrivacy.description.map((desc, index) => (
          <p className="text-sm" key={index}>
            {desc}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {dataPrivacy.privacy.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <ul className="flex flex-col gap-2 text">
              {item.description.map((desc, line) => (
                <li key={line} className="text-sm">
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

interface DataPrivacyModel {
  title: string;
  description: string[];
  privacy: {
    title: string;
    description: string[];
  }[];
}

const dataPrivacy: DataPrivacyModel = {
  title: 'Privacy Policy',
  description: [
    'Kebijakan privasi ini mengungkapkan praktik privasi untuk studywithme.my.id. Kebijakan privasi ini hanya berlaku untuk informasi yang dikumpulkan oleh situs web ini. Anda akan mengetahuinya setelah anda membaca semua list berikut:',
    'Informasi pengenal pribadi apa yang dikumpulkan dari Anda melalui situs web, bagaimana ia digunakan dan dengan siapa informasi itu dapat dibagikan. Pilihan apa yang tersedia untuk Anda sehubungan dengan penggunaan data Anda. Prosedur keamanan di tempat untuk melindungi penyalahgunaan informasi Anda. Bagaimana Anda dapat memperbaiki ketidak akuratan dalam informasi. Pengumpulan, Penggunaan, dan Berbagi Informasi',
    'Kami adalah pemilik tunggal dari informasi yang dikumpulkan di situs ini. Kami hanya memiliki akses ke / mengumpulkan informasi yang Anda berikan secara sukarela kepada kami melalui email atau kontak langsung lainnya dari Anda. Kami tidak akan menjual atau menyewakan informasi ini kepada siapa pun. Kami tidak akan membagikan informasi Anda dengan pihak ketiga mana pun di luar organisasi kami.',
  ],
  privacy: [
    {
      title: 'Keamanan',
      description: [
        'Kami mengambil tindakan pencegahan untuk melindungi informasi Anda. Ketika Anda mengirimkan informasi sensitif melalui situs web, informasi Anda dilindungi baik online maupun offline.',
        'Meskipun kami menggunakan enkripsi untuk melindungi informasi sensitif yang dikirimkan secara online, kami juga melindungi informasi Anda secara offline. Hanya karyawan yang membutuhkan informasi untuk melakukan pekerjaan tertentu (misalnya, penagihan atau layanan pelanggan) diberikan akses ke informasi identitas pribadi. Komputer / server tempat kami menyimpan informasi identitas pribadi disimpan dalam lingkungan yang aman.',
        'Untuk menggunakan situs web ini, pengguna harus terlebih dahulu melengkapi formulir pendaftaran. Selama pendaftaran, pengguna diharuskan memberikan informasi tertentu (seperti nama dan alamat email). Informasi ini digunakan untuk menghubungi Anda tentang produk / layanan di situs kami di mana Anda telah menyatakan minat. Sesuai pilihan Anda, Anda juga dapat memberikan informasi demografis tentang diri Anda, tetapi itu tidak diwajibkan.',
      ],
    },
    {
      title: 'Link',
      description: [
        'Situs web ini berisi tautan ke situs lain. Harap perhatikan bahwa kami tidak bertanggung jawab atas konten atau praktik privasi dari situs lain tersebut. Kami mendorong pengguna kami untuk berhati-hati ketika mereka meninggalkan situs kami dan membaca pernyataan privasi dari situs lain yang mengumpulkan informasi identitas pribadi.',
      ],
    },
    {
      title: 'Perbaruan',
      description: [
        'Kebijakan Privasi kami dapat berubah dari waktu ke waktu dan semua pembaruan akan diposting di halaman ini. Jika Anda merasa bahwa kami tidak mematuhi kebijakan privasi ini, Anda harus menghubungi kami segera melalui email di akbarmuhammad833@gmail.com',
      ],
    },
  ],
};

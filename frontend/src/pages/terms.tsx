import { STUDYWITHME } from '@/assets';
import Image from 'next/image';
import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-screen-sm m-auto flex flex-col gap-3 my-20 realative">
      <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute -top-10 left-56 -z-10"></div>
      <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute right-0 top-1/2 -z-10"></div>
      <div className="w-[100px] h-[50px] bg-mantineBlue rounded-full blur-[80px] absolute -right-10 top-1/4 -z-10"></div>
      <Image
        src={STUDYWITHME}
        alt="studywithme_"
        title="studywithme_"
        width={70}
        className="mb-3"
      />
      <h1 className="text-2xl font-bold">{dataTerms.title}</h1>
      <p className="text-sm">{dataTerms.description}</p>
      <div className="flex flex-col gap-3">
        {dataTerms.terms.map((item, index) => (
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

interface DataTerms {
  title: string;
  description: string;
  terms: {
    title: string;
    description: string[];
  }[];
}

const dataTerms: DataTerms = {
  title: 'Syarat dan Ketentuan',
  description:
    'Dengan mengakses situs web ini, Anda setuju untuk terikat dengan Syarat dan Ketentuan Penggunaan situs web ini, semua hukum dan peraturan yang berlaku, dan setuju bahwa Anda bertanggung jawab untuk mematuhi hukum setempat yang berlaku. Jika Anda tidak setuju dengan persyaratan ini, Anda dilarang menggunakan atau mengakses situs ini.',
  terms: [
    {
      title: 'Gunakan Lisensi',
      description: [
        'Izin diberikan untuk mengunduh sementara satu salinan materi (informasi atau perangkat lunak) di situs web Studywithme hanya untuk dilihat secara pribadi. Ini adalah pemberian lisensi, bukan transfer judul, dan di bawah lisensi ini Anda tidak boleh: Daftar sebagai member baik premium maupun yang biasa Ketika Anda memang ingin menonton seri video tutorial di studywithme, maka anda harus terlebih dahulu mendaftar menjadi member di studywithme termasuk verifikasi email, jadi jika email Anda tidak valid, maka tidak akan bisa mendaftar di studywithme.',
        'Memodifikasi atau menyalin materi Menggunakan bahan untuk tujuan komersial, atau untuk tampilan publik (komersial atau non-komersial) Mencoba mendekompilasi atau merekayasa balik perangkat lunak apa pun yang terdapat di situs web Studywithme Menghapus semua hak cipta atau nota kepemilikan lainnya dari materi atau transfer materi ke orang lain atau menciplak materi pada server lain.',
      ],
    },
    {
      title: 'Penolakan',
      description: [
        'Bahan-bahan di situs web Studywithme disediakan sebagaimana adanya. Studywithme tidak membuat jaminan, tersurat maupun tersirat, dan dengan ini menolak dan meniadakan semua jaminan lainnya, termasuk tanpa batasan, jaminan tersirat atau kondisi yang dapat diperjualbelikan, kesesuaian untuk tujuan tertentu, atau non-pelanggaran hak kekayaan intelektual atau pelanggaran hak lainnya.',
        'Lebih lanjut, Studywithme tidak menjamin atau membuat pernyataan apa pun mengenai keakuratan, kemungkinan hasil, atau keandalan penggunaan materi di situs webnya atau yang terkait dengan materi tersebut atau pada situs apa pun yang terkait dengan situs ini.',
      ],
    },
    {
      title: 'Keterbatasan',
      description: [
        'Dalam keadaan apa pun Studywithme atau pemasoknya tidak akan bertanggung jawab atas kerusakan apa pun (termasuk, tanpa batasan, kerusakan karena hilangnya data atau laba, atau karena gangguan bisnis,) yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan materi di situs web Studywithme, bahkan jika perwakilan resmi Studywithme atau Studywithme telah diberitahu secara lisan atau tertulis tentang kemungkinan kerusakan tersebut.',
        'Karena beberapa yurisdiksi tidak mengizinkan pembatasan pada jaminan tersirat, atau batasan tanggung jawab untuk kerusakan konsekuensial atau insidental, batasan ini mungkin tidak berlaku untuk Anda.',
      ],
    },
    {
      title: 'Revisi dan Errata',
      description: [
        'Materi yang muncul di situs web Studywithme dapat mencakup kesalahan teknis, tipografi, atau fotografi. Studywithme tidak menjamin bahwa semua materi di situs webnya akurat, lengkap, atau terkini. Studywithme dapat membuat perubahan pada materi yang terdapat di situs webnya kapan saja tanpa pemberitahuan.',
        'Studywithme tidak membuat komitmen untuk memperbarui materi. Situs Ketentuan Penggunaan Modifikasi Studywithme dapat merevisi ketentuan penggunaan ini untuk situs webnya kapan saja tanpa pemberitahuan. Dengan menggunakan situs web ini Anda setuju untuk terikat dengan versi Persyaratan dan Ketentuan Penggunaan yang berlaku saat ini.',
      ],
    },
  ],
};

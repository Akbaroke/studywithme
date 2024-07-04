import { images } from '@/assets';
import Metadata from '@/components/atoms/Metadata';
import { AnimatePresence, motion } from 'framer-motion';
import CardTeam from '@/components/atoms/CardTeam';

export default function About() {
  return (
    <AnimatePresence>
      <Metadata title="Tentang Kami" />
      <div className="flex flex-col gap-32 sm:py-10 py-5">
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
          <div className="flex justify-center items-center gap-5 flex-wrap mx-auto">
            {/* {teamDatas.map((data, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col gap-3 justify-center items-center max-w-md text-center w-[200px]"
                variants={itemVariants}>
                <Image
                  src={data.image}
                  alt={data.name}
                  width={100}
                  height={100}
                />
                <h1 className="text-lg font-bold">{data.name}</h1>
                <p className="text-sm font-medium text-gray-500">{data.role}</p>
              </motion.div>
            ))} */}
            {teamDatas.map((data, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={itemVariants}>
                <CardTeam data={data} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

const teamDatas = [
  {
    name: 'Muhammad Akbar',
    role: 'Founder, Fullstack Developer',
    image: images.FOTO_AKBAR,
    githubLink: 'https://github.com/akbaroke',
    linkedinLink: 'https://www.linkedin.com/in/akbaroke',
    instagramLink: 'https://www.instagram.com/akbar.833',
  },
  {
    name: 'Muhamad Aldiarsyah Arifin',
    role: 'Mobile Developer',
    image: images.FOTO_ALDI,
    githubLink: 'https://github.com/aldiarsyah81',
    linkedinLink:
      'https://www.linkedin.com/in/muhamad-aldiarsyah-arifin-43244414a',
    instagramLink: 'https://www.instagram.com/aldiarsyah02',
  },
  {
    name: 'Gufranaka Samudra',
    role: 'Machine Learning Engineer',
    image: images.FOTO_AGUF,
    githubLink: 'https://github.com/AgufSamudra',
    linkedinLink: 'https://www.linkedin.com/in/gufranaka-samudra',
    instagramLink: 'https://www.instagram.com/agufsamudra',
  },
  {
    name: 'Muhammad Arya Dipanegara',
    role: 'Frontend Developer',
    image: images.FOTO_ARGUN,
    githubLink: 'https://github.com/AryaGunawann',
    linkedinLink: 'https://www.linkedin.com/in/aryagunawan',
    instagramLink: 'https://www.instagram.com/arya_gunawannnn',
  },
  {
    name: 'Windu Ardan',
    role: 'Network Engineer',
    image: images.FOTO_WINDU,
    githubLink: 'https://github.com',
    linkedinLink: 'https://www.linkedin.com/in',
    instagramLink: 'https://www.instagram.com',
  },
];

const itemVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
    },
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
      duration: 0.5,
    },
  }),
  exit: (index: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
    },
  }),
};


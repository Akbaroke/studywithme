import { ContentModel } from '@/models/contentModel';

// Data Paling Banyak Dilihat
export const mostViewedContents: ContentModel[] = [
  {
    id: '1',
    title: 'Belajar JavaScript Dasar',
    description: 'Panduan lengkap untuk mempelajari dasar-dasar JavaScript.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 180,
    categories: ['Pemrograman', 'JavaScript'],
    total_kliks: 15000,
    updated_at: '2024-06-10T10:00:00Z',
    created_at: '2023-01-01T10:00:00Z',
    contents: [
      {
        id: '1-1',
        title: 'Pengenalan JavaScript',
        description: 'Memahami apa itu JavaScript dan bagaimana cara kerjanya.',
        isPremium: false,
        duration: 30,
        video_url: 'https://example.com/videos/intro-js.mp4',
        updated_at: '2024-06-10T10:00:00Z',
        created_at: '2023-01-01T10:00:00Z',
        discussion: [
          {
            id: 'd1',
            title: 'Bagaimana cara menggunakan JavaScript di browser?',
            like: {
              count: 120,
              is_liked: true,
            },
            created_at: '2024-05-01T10:00:00Z',
            updated_at: '2024-05-01T12:00:00Z',
            user: {
              id: 'u1',
              name: 'John Doe',
              avatar: 'https://example.com/avatars/john.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Belajar Python untuk Pemula',
    description: 'Menguasai dasar-dasar pemrograman dengan Python.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 210,
    categories: ['Pemrograman', 'Python'],
    total_kliks: 13000,
    updated_at: '2024-06-10T10:00:00Z',
    created_at: '2023-02-15T10:00:00Z',
    contents: [
      {
        id: '2-1',
        title: 'Pengenalan Python',
        description: 'Memahami apa itu Python dan bagaimana cara kerjanya.',
        isPremium: false,
        duration: 40,
        video_url: 'https://example.com/videos/intro-python.mp4',
        updated_at: '2024-06-10T10:00:00Z',
        created_at: '2023-02-15T10:00:00Z',
        discussion: [
          {
            id: 'd2',
            title: 'Apa keunggulan Python dibanding bahasa lain?',
            like: {
              count: 100,
              is_liked: true,
            },
            created_at: '2024-05-10T10:00:00Z',
            updated_at: '2024-05-10T12:00:00Z',
            user: {
              id: 'u2',
              name: 'Jane Smith',
              avatar: 'https://example.com/avatars/jane.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '3',
    title: 'Belajar HTML & CSS',
    description: 'Panduan dasar untuk mempelajari HTML dan CSS.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 120,
    categories: ['Pemrograman', 'Web Development'],
    total_kliks: 12000,
    updated_at: '2024-06-10T10:00:00Z',
    created_at: '2023-03-20T10:00:00Z',
    contents: [
      {
        id: '3-1',
        title: 'Pengenalan HTML',
        description: 'Dasar-dasar HTML dan struktur dokumen.',
        isPremium: false,
        duration: 20,
        video_url: 'https://example.com/videos/intro-html.mp4',
        updated_at: '2024-06-10T10:00:00Z',
        created_at: '2023-03-20T10:00:00Z',
        discussion: [
          {
            id: 'd3',
            title: 'Apa perbedaan HTML dan HTML5?',
            like: {
              count: 75,
              is_liked: false,
            },
            created_at: '2024-05-20T10:00:00Z',
            updated_at: '2024-05-20T12:00:00Z',
            user: {
              id: 'u3',
              name: 'Alice Johnson',
              avatar: 'https://example.com/avatars/alice.jpg',
              isVerified: false,
            },
          },
        ],
      },
    ],
  },
  {
    id: '4',
    title: 'Belajar React',
    description:
      'Panduan lengkap untuk mempelajari React dari dasar hingga mahir.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: true,
    total_duration: 300,
    categories: ['Pemrograman', 'JavaScript', 'React'],
    total_kliks: 11000,
    updated_at: '2024-06-10T10:00:00Z',
    created_at: '2023-04-25T10:00:00Z',
    contents: [
      {
        id: '4-1',
        title: 'Pengenalan React',
        description:
          'Apa itu React dan bagaimana penggunaannya dalam pengembangan web.',
        isPremium: true,
        duration: 45,
        video_url: 'https://example.com/videos/intro-react.mp4',
        updated_at: '2024-06-10T10:00:00Z',
        created_at: '2023-04-25T10:00:00Z',
        discussion: [
          {
            id: 'd4',
            title: 'Mengapa memilih React dibandingkan framework lain?',
            like: {
              count: 200,
              is_liked: true,
            },
            created_at: '2024-06-10T10:00:00Z',
            updated_at: '2024-06-10T12:00:00Z',
            user: {
              id: 'u4',
              name: 'Bob Brown',
              avatar: 'https://example.com/avatars/bob.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '5',
    title: 'Belajar Vue.js',
    description: 'Panduan untuk mempelajari framework Vue.js dari dasar.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: true,
    total_duration: 240,
    categories: ['Pemrograman', 'JavaScript', 'Vue.js'],
    total_kliks: 10000,
    updated_at: '2024-06-10T10:00:00Z',
    created_at: '2023-05-30T10:00:00Z',
    contents: [
      {
        id: '5-1',
        title: 'Pengenalan Vue.js',
        description:
          'Apa itu Vue.js dan bagaimana penggunaannya dalam pengembangan web.',
        isPremium: true,
        duration: 40,
        video_url: 'https://example.com/videos/intro-vue.mp4',
        updated_at: '2024-06-10T10:00:00Z',
        created_at: '2023-05-30T10:00:00Z',
        discussion: [
          {
            id: 'd5',
            title: 'Keunggulan Vue.js dibandingkan React dan Angular?',
            like: {
              count: 150,
              is_liked: true,
            },
            created_at: '2024-06-05T10:00:00Z',
            updated_at: '2024-06-05T12:00:00Z',
            user: {
              id: 'u5',
              name: 'Charlie Davis',
              avatar: 'https://example.com/avatars/charlie.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
];

// Data Pembelajaran Gratis
export const freeLearningContents: ContentModel[] = [
  {
    id: '6',
    title: 'Belajar Git dan GitHub',
    description: 'Memahami dasar-dasar version control dengan Git dan GitHub.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 150,
    categories: ['Pemrograman', 'Version Control'],
    total_kliks: 9000,
    updated_at: '2024-06-15T10:00:00Z',
    created_at: '2023-06-01T10:00:00Z',
    contents: [
      {
        id: '6-1',
        title: 'Pengenalan Git',
        description: 'Dasar-dasar penggunaan Git untuk version control.',
        isPremium: false,

        duration: 25,
        video_url: 'https://example.com/videos/intro-git.mp4',
        updated_at: '2024-06-15T10:00:00Z',
        created_at: '2023-06-01T10:00:00Z',
        discussion: [
          {
            id: 'd6',
            title: 'Bagaimana cara menginisiasi repository Git?',
            like: {
              count: 50,
              is_liked: true,
            },
            created_at: '2024-06-05T10:00:00Z',
            updated_at: '2024-06-05T12:00:00Z',
            user: {
              id: 'u6',
              name: 'Emily Evans',
              avatar: 'https://example.com/avatars/emily.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '7',
    title: 'Belajar Bootstrap',
    description:
      'Memahami dasar-dasar penggunaan Bootstrap untuk desain responsif.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 100,
    categories: ['Pemrograman', 'Web Design'],
    total_kliks: 7000,
    updated_at: '2024-06-15T10:00:00Z',
    created_at: '2023-07-10T10:00:00Z',
    contents: [
      {
        id: '7-1',
        title: 'Pengenalan Bootstrap',
        description:
          'Memahami struktur dasar dan penggunaan komponen Bootstrap.',
        isPremium: false,
        duration: 30,
        video_url: 'https://example.com/videos/intro-bootstrap.mp4',
        updated_at: '2024-06-15T10:00:00Z',
        created_at: '2023-07-10T10:00:00Z',
        discussion: [
          {
            id: 'd7',
            title: 'Bagaimana cara menggunakan grid system di Bootstrap?',
            like: {
              count: 60,
              is_liked: true,
            },
            created_at: '2024-06-10T10:00:00Z',
            updated_at: '2024-06-10T12:00:00Z',
            user: {
              id: 'u7',
              name: 'Frank White',
              avatar: 'https://example.com/avatars/frank.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '8',
    title: 'Belajar Command Line',
    description: 'Memahami dasar-dasar penggunaan command line di berbagai OS.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 90,
    categories: ['Pemrograman', 'Operating Systems'],
    total_kliks: 6000,
    updated_at: '2024-06-15T10:00:00Z',
    created_at: '2023-08-20T10:00:00Z',
    contents: [
      {
        id: '8-1',
        title: 'Pengenalan Command Line',
        description:
          'Dasar-dasar penggunaan command line di Windows dan Linux.',
        isPremium: false,
        duration: 30,
        video_url: 'https://example.com/videos/intro-command-line.mp4',
        updated_at: '2024-06-15T10:00:00Z',
        created_at: '2023-08-20T10:00:00Z',
        discussion: [
          {
            id: 'd8',
            title: 'Perintah dasar apa saja yang harus dikuasai?',
            like: {
              count: 40,
              is_liked: false,
            },
            created_at: '2024-06-15T10:00:00Z',
            updated_at: '2024-06-15T12:00:00Z',
            user: {
              id: 'u8',
              name: 'Grace Green',
              avatar: 'https://example.com/avatars/grace.jpg',
              isVerified: false,
            },
          },
        ],
      },
    ],
  },
  {
    id: '9',
    title: 'Belajar SQL',
    description: 'Panduan dasar untuk mempelajari bahasa SQL dan basis data.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 110,
    categories: ['Pemrograman', 'Databases'],
    total_kliks: 8500,
    updated_at: '2024-06-15T10:00:00Z',
    created_at: '2023-09-30T10:00:00Z',
    contents: [
      {
        id: '9-1',
        title: 'Pengenalan SQL',
        description:
          'Dasar-dasar SQL dan bagaimana menggunakannya untuk mengelola basis data.',
        isPremium: false,
        duration: 25,
        video_url: 'https://example.com/videos/intro-sql.mp4',
        updated_at: '2024-06-15T10:00:00Z',
        created_at: '2023-09-30T10:00:00Z',
        discussion: [
          {
            id: 'd9',
            title: 'Apa perbedaan antara SQL dan NoSQL?',
            like: {
              count: 80,
              is_liked: true,
            },
            created_at: '2024-06-01T10:00:00Z',
            updated_at: '2024-06-01T12:00:00Z',
            user: {
              id: 'u9',
              name: 'Hank Harris',
              avatar: 'https://example.com/avatars/hank.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '10',
    title: 'Belajar Docker',
    description:
      'Panduan dasar untuk mempelajari containerization dengan Docker.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: false,
    total_duration: 140,
    categories: ['Pemrograman', 'DevOps'],
    total_kliks: 9500,
    updated_at: '2024-06-15T10:00:00Z',
    created_at: '2023-10-15T10:00:00Z',
    contents: [
      {
        id: '10-1',
        title: 'Pengenalan Docker',
        description: 'Memahami konsep container dan penggunaan Docker.',
        isPremium: false,
        duration: 35,
        video_url: 'https://example.com/videos/intro-docker.mp4',
        updated_at: '2024-06-15T10:00:00Z',
        created_at: '2023-10-15T10:00:00Z',
        discussion: [
          {
            id: 'd10',
            title: 'Apa keuntungan menggunakan Docker?',
            like: {
              count: 90,
              is_liked: true,
            },
            created_at: '2024-06-10T10:00:00Z',
            updated_at: '2024-06-10T12:00:00Z',
            user: {
              id: 'u10',
              name: 'Ivy Iverson',
              avatar: 'https://example.com/avatars/ivy.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
];

// Data Pembelajaran Terbaru
export const latestLearningContents: ContentModel[] = [
  {
    id: '11',
    title: 'Belajar TypeScript',
    description: 'Panduan lengkap untuk mempelajari TypeScript dari dasar.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: true,
    total_duration: 200,
    categories: ['Pemrograman', 'JavaScript', 'TypeScript'],
    total_kliks: 5000,
    updated_at: '2024-06-16T10:00:00Z',
    created_at: '2024-06-01T10:00:00Z',
    contents: [
      {
        id: '11-1',
        title: 'Pengenalan TypeScript',
        description:
          'Apa itu TypeScript dan bagaimana penggunaannya dalam pengembangan web.',
        isPremium: true,
        duration: 45,
        video_url: 'https://example.com/videos/intro-typescript.mp4',
        updated_at: '2024-06-16T10:00:00Z',
        created_at: '2024-06-01T10:00:00Z',
        discussion: [
          {
            id: 'd11',
            title: 'Mengapa memilih TypeScript dibandingkan JavaScript?',
            like: {
              count: 120,
              is_liked: true,
            },
            created_at: '2024-06-10T10:00:00Z',
            updated_at: '2024-06-10T12:00:00Z',
            user: {
              id: 'u11',
              name: 'Jack Johnson',
              avatar: 'https://example.com/avatars/jack.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '12',
    title: 'Belajar Node.js',
    description:
      'Panduan lengkap untuk mempelajari Node.js dari dasar hingga mahir.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: true,
    total_duration: 240,
    categories: ['Pemrograman', 'JavaScript', 'Node.js'],
    total_kliks: 4000,
    updated_at: '2024-06-16T10:00:00Z',
    created_at: '2024-06-02T10:00:00Z',
    contents: [
      {
        id: '12-1',
        title: 'Pengenalan Node.js',
        description:
          'Apa itu Node.js dan bagaimana penggunaannya dalam pengembangan back-end.',
        isPremium: true,
        duration: 50,
        video_url: 'https://example.com/videos/intro-nodejs.mp4',
        updated_at: '2024-06-16T10:00:00Z',
        created_at: '2024-06-02T10:00:00Z',
        discussion: [
          {
            id: 'd12',
            title: 'Mengapa memilih Node.js untuk pengembangan server-side?',
            like: {
              count: 110,
              is_liked: true,
            },
            created_at: '2024-06-12T10:00:00Z',
            updated_at: '2024-06-12T12:00:00Z',
            user: {
              id: 'u12',
              name: 'Liam Lewis',
              avatar: 'https://example.com/avatars/liam.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '13',
    title: 'Belajar Angular',
    description:
      'Panduan lengkap untuk mempelajari Angular dari dasar hingga mahir.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: true,
    total_duration: 220,
    categories: ['Pemrograman', 'JavaScript', 'Angular'],
    total_kliks: 3500,
    updated_at: '2024-06-16T10:00:00Z',
    created_at: '2024-06-03T10:00:00Z',
    contents: [
      {
        id: '13-1',
        title: 'Pengenalan Angular',
        description:
          'Apa itu Angular dan bagaimana penggunaannya dalam pengembangan front-end.',
        isPremium: true,
        duration: 55,
        video_url: 'https://example.com/videos/intro-angular.mp4',
        updated_at: '2024-06-16T10:00:00Z',
        created_at: '2024-06-03T10:00:00Z',
        discussion: [
          {
            id: 'd13',
            title: 'Mengapa memilih Angular untuk pengembangan aplikasi web?',
            like: {
              count: 105,
              is_liked: true,
            },
            created_at: '2024-06-11T10:00:00Z',
            updated_at: '2024-06-11T12:00:00Z',
            user: {
              id: 'u13',
              name: 'Mia Mitchell',
              avatar: 'https://example.com/avatars/mia.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '14',
    title: 'Belajar Kubernetes',
    description:
      'Panduan lengkap untuk mempelajari orkestrasi container dengan Kubernetes.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: true,
    total_duration: 180,
    categories: ['Pemrograman', 'DevOps', 'Kubernetes'],
    total_kliks: 3200,
    updated_at: '2024-06-16T10:00:00Z',
    created_at: '2024-06-04T10:00:00Z',
    contents: [
      {
        id: '14-1',
        title: 'Pengenalan Kubernetes',
        description:
          'Apa itu Kubernetes dan bagaimana penggunaannya dalam orkestrasi container.',
        isPremium: true,
        duration: 50,
        video_url: 'https://example.com/videos/intro-kubernetes.mp4',
        updated_at: '2024-06-16T10:00:00Z',
        created_at: '2024-06-04T10:00:00Z',
        discussion: [
          {
            id: 'd14',
            title: 'Apa keunggulan Kubernetes dibandingkan Docker Swarm?',
            like: {
              count: 130,
              is_liked: true,
            },
            created_at: '2024-06-09T10:00:00Z',
            updated_at: '2024-06-09T12:00:00Z',
            user: {
              id: 'u14',
              name: 'Nathan Nelson',
              avatar: 'https://example.com/avatars/nathan.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
  {
    id: '15',
    title: 'Belajar GraphQL',
    description:
      'Panduan lengkap untuk mempelajari GraphQL dari dasar hingga mahir.',
    thumbnail:
      'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/coding-design-template-7fdcbfed1fb311be96a282920fba8515_screen.jpg?ts=1599184512',
    isPremium: true,
    total_duration: 210,
    categories: ['Pemrograman', 'Web Development', 'GraphQL'],
    total_kliks: 3000,
    updated_at: '2024-06-16T10:00:00Z',
    created_at: '2024-06-05T10:00:00Z',
    contents: [
      {
        id: '15-1',
        title: 'Pengenalan GraphQL',
        description:
          'Apa itu GraphQL dan bagaimana penggunaannya dalam pengembangan API.',
        isPremium: true,
        duration: 60,
        video_url: 'https://example.com/videos/intro-graphql.mp4',
        updated_at: '2024-06-16T10:00:00Z',
        created_at: '2024-06-05T10:00:00Z',
        discussion: [
          {
            id: 'd15',
            title: 'Mengapa memilih GraphQL dibandingkan REST?',
            like: {
              count: 140,
              is_liked: true,
            },
            created_at: '2024-06-08T10:00:00Z',
            updated_at: '2024-06-08T12:00:00Z',
            user: {
              id: 'u15',
              name: 'Olivia Olson',
              avatar: 'https://example.com/avatars/olivia.jpg',
              isVerified: true,
            },
          },
        ],
      },
    ],
  },
];

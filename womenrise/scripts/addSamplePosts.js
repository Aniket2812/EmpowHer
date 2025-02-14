const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC_N5DAC1SRA8Uil_CXyjRxFBsPHviJs0",
  authDomain: "empowher-d7d92.firebaseapp.com",
  projectId: "empowher-d7d92",
  storageBucket: "empowher-d7d92.firebasestorage.app",
  messagingSenderId: "523744888649",
  appId: "1:523744888649:web:9a8ea83901ee0dea54fc98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const samplePosts = [
  {
    authorId: 'WmmwQSKSuBU2twhPGt9bVPCbbli1',
    authorName: 'Priya Sharma',
    authorAvatar: 'https://picsum.photos/200/200',
    content: 'Excited to announce that my handcrafted jewelry business has reached customers in 5 states! Thank you EmpowHer community for all the support and guidance. 🎉',
    image: 'https://picsum.photos/800/400',
    likes: [],
    comments: [
      {
        userId: 'user2',
        userName: 'Meera Patel',
        content: 'Congratulations! Your jewelry designs are amazing! 💫',
        createdAt: new Date().toISOString(),
      }
    ],
    type: 'business',
    tags: ['Success Stories', 'Business Tips'],
    createdAt: Timestamp.fromDate(new Date(2025, 1, 12, 15, 30)),
  },
  {
    authorId: 'user2',
    authorName: 'Meera Patel',
    authorAvatar: 'https://picsum.photos/200/201',
    content: 'Looking for advice on scaling my organic skincare business. Any tips on managing inventory and supply chain? Currently producing 100 units per month but getting more orders.',
    likes: [],
    comments: [],
    type: 'discussion',
    tags: ['Questions', 'Business Tips'],
    createdAt: Timestamp.fromDate(new Date(2025, 1, 12, 14, 45)),
  },
  {
    authorId: 'user3',
    authorName: 'Ritu Verma',
    authorAvatar: 'https://picsum.photos/200/202',
    content: '🎯 Hosting a workshop on "Legal Compliance for Small Businesses" next week. Topics include GST registration, trademark filing, and business structure. Limited seats available!',
    likes: [],
    comments: [],
    type: 'event',
    tags: ['Events', 'Resources'],
    createdAt: Timestamp.fromDate(new Date(2025, 1, 12, 13, 15)),
  },
  {
    authorId: 'user4',
    authorName: 'Anjali Singh',
    authorAvatar: 'https://picsum.photos/200/203',
    content: 'Just launched my first crowdfunding campaign for my eco-friendly fashion brand! Check it out and help spread the word. Together we can make sustainable fashion accessible to everyone. 🌿',
    image: 'https://picsum.photos/800/401',
    likes: [],
    comments: [],
    type: 'business',
    tags: ['Funding', 'Success Stories'],
    createdAt: Timestamp.fromDate(new Date(2025, 1, 12, 12, 0)),
  },
  {
    authorId: 'user5',
    authorName: 'Deepika Kumar',
    authorAvatar: 'https://picsum.photos/200/204',
    content: 'Poll: What\'s the biggest challenge you face in your business?\n\n1. Marketing and customer acquisition\n2. Financial management\n3. Time management\n4. Product development',
    likes: [],
    comments: [],
    type: 'poll',
    tags: ['Questions', 'Business Tips'],
    createdAt: Timestamp.fromDate(new Date(2025, 1, 12, 11, 30)),
  },
];

async function addSamplePosts() {
  try {
    console.log('Adding sample posts...');
    for (const post of samplePosts) {
      await addDoc(collection(db, 'posts'), post);
    }
    console.log('Sample posts added successfully!');
  } catch (error) {
    console.error('Error adding sample posts:', error);
  }
}

addSamplePosts();

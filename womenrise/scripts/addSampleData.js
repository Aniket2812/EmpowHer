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

// User ID from your account
const userId = 'WmmwQSKSuBU2twhPGt9bVPCbbli1';

async function addSampleData() {
  try {
    // Add sample products
    const products = [
      {
        name: 'Handmade Jewelry Set',
        description: 'Beautiful handcrafted jewelry set with earrings and necklace',
        price: 1500,
        stock: 10,
        totalSales: 15000,
        status: 'active',
        sellerId: userId,
        category: 'Jewelry',
        createdAt: Timestamp.now()
      },
      {
        name: 'Embroidered Scarf',
        description: 'Hand-embroidered silk scarf with traditional designs',
        price: 800,
        stock: 15,
        totalSales: 12000,
        status: 'active',
        sellerId: userId,
        category: 'Accessories',
        createdAt: Timestamp.now()
      },
      {
        name: 'Handwoven Basket',
        description: 'Eco-friendly handwoven storage basket',
        price: 600,
        stock: 20,
        totalSales: 9000,
        status: 'active',
        sellerId: userId,
        category: 'Home Decor',
        createdAt: Timestamp.now()
      },
      {
        name: 'Organic Soap Set',
        description: 'Natural handmade soap set with essential oils',
        price: 400,
        stock: 25,
        totalSales: 6000,
        status: 'active',
        sellerId: userId,
        category: 'Beauty',
        createdAt: Timestamp.now()
      }
    ];

    console.log('Adding products...');
    for (const product of products) {
      await addDoc(collection(db, 'products'), product);
    }

    // Add sample sales data for each month
    const sales = [];
    const months = 12;
    const year = 2025;
    
    // Generate sales data for each month
    for (let month = 0; month < months; month++) {
      // Add 3-5 sales per month
      const salesPerMonth = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < salesPerMonth; i++) {
        // Random day of the month
        const day = Math.floor(Math.random() * 28) + 1;
        // Random product selection
        const product = products[Math.floor(Math.random() * products.length)];
        // Random quantity between 1 and 3
        const quantity = Math.floor(Math.random() * 3) + 1;
        const amount = product.price * quantity;
        // Profit is 40% of the amount
        const profit = Math.floor(amount * 0.4);
        
        sales.push({
          sellerId: userId,
          productId: product.name, // Using name as ID for sample data
          productName: product.name,
          amount: amount,
          profit: profit,
          quantity: quantity,
          year: year,
          timestamp: Timestamp.fromDate(new Date(year, month, day))
        });
      }
    }

    console.log('Adding sales data...');
    for (const sale of sales) {
      await addDoc(collection(db, 'sales'), sale);
    }

    console.log('Sample data added successfully!');
    console.log(`Added ${products.length} products and ${sales.length} sales records.`);
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

addSampleData();

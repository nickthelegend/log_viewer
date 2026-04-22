const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://niveshgajengi_db_user:a0wMPnlFS1SIrAX9@cluster0.1fpmtpe.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to server...');
    const db = client.db();
    
    const collections = ['call_logs', 'contacts', 'sms'];
    
    for (const collName of collections) {
      const coll = db.collection(collName);
      const count = await coll.countDocuments();
      if (count > 0) {
        await coll.drop();
        console.log(`Dropped collection: ${collName} (${count} documents removed)`);
      } else {
        console.log(`Collection ${collName} is already empty.`);
      }
    }
    
    console.log('Database cleanup complete.');
  } catch (err) {
    console.error('Error clearing database:', err);
  } finally {
    await client.close();
  }
}

main();

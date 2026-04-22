const { MongoClient } = require('mongodb');

async function main() {
  const uri = "mongodb+srv://niveshgajengi_db_user:a0wMPnlFS1SIrAX9@cluster0.1fpmtpe.mongodb.net/?appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected successfully to server');
    
    const admin = client.db().admin();
    const dbs = await admin.listDatabases();
    console.log('Databases:', dbs.databases.map(db => db.name));

    const db = client.db();
    console.log('Current DB:', db.databaseName);
    const collections = await db.listCollections().toArray();
    console.log('Collections in current DB:', collections.map(c => c.name));

    for (const collName of collections.map(c => c.name)) {
        const count = await db.collection(collName).countDocuments();
        console.log(`- ${collName}: ${count} docs`);
    }

  } finally {
    await client.close();
  }
}

main().catch(console.error);

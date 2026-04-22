import clientPromise from './lib/mongodb';
import DashboardClient from './components/DashboardClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const client = await clientPromise;
  const db = client.db();

  const callLogs = await db.collection('call_logs').find({}).sort({ timestamp: -1 }).toArray();
  const contacts = await db.collection('contacts').find({}).toArray();
  const sms = await db.collection('sms').find({}).sort({ date: -1 }).toArray();

  // Serialize MongoDB objects for Client Component
  const serializedCallLogs = callLogs.map(log => ({
    ...log,
    _id: log._id.toString(),
    timestamp: log.timestamp instanceof Date ? log.timestamp.toISOString() : log.timestamp
  }));

  const serializedContacts = contacts.map(contact => ({
    ...contact,
    _id: contact._id.toString(),
  }));

  const serializedSms = sms.map(msg => ({
    ...msg,
    _id: msg._id.toString(),
    date: msg.date instanceof Date ? msg.date.toISOString() : msg.date
  }));

  return (
    <main className="main-container">
      <div className="header">
        <h1>Cloud Data Hub</h1>
        <p>Real-time synchronization from mobile backup</p>
      </div>
      
      <DashboardClient 
        callLogs={serializedCallLogs}
        contacts={serializedContacts}
        sms={serializedSms}
      />
    </main>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Cloud Backup Hub",
  description: "Our commitment to protecting your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="main-container">
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
        <h1 style={{ marginBottom: '2rem', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Privacy Policy
        </h1>
        
        <div style={{ color: 'var(--secondary)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At Cloud Backup Hub, your privacy is our top priority. This application is designed to help you back up your personal communication data to your private MongoDB instance.
          </p>

          <h2 style={{ color: 'white', margin: '1.5rem 0 1rem' }}>1. Data Collection</h2>
          <p>
            The mobile application collects Call Logs, Contacts, and SMS messages ONLY when you explicitly tap the "Sync All to Cloud" button.
          </p>

          <h2 style={{ color: 'white', margin: '1.5rem 0 1rem' }}>2. Data Storage</h2>
          <p>
            All data is transmitted directly from your device to your private MongoDB database. We do not host or store your data on any intermediate servers.
          </p>

          <h2 style={{ color: 'white', margin: '1.5rem 0 1rem' }}>3. Permissions</h2>
          <p>
            The app requires READ_CALL_LOG, READ_CONTACTS, and READ_SMS permissions purely for the purpose of backup. These permissions are not used for any other background activity or monitoring.
          </p>

          <h2 style={{ color: 'white', margin: '1.5rem 0 1rem' }}>4. Your Control</h2>
          <p>
            You have full control over your data. You can clear the database at any time using the administrative tools provided.
          </p>
        </div>
      </div>
    </main>
  );
}

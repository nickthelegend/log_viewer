'use client';

import { useState, useMemo } from 'react';
import { 
  Phone, Users, MessageSquare, Clock, PhoneIncoming, 
  PhoneOutgoing, PhoneMissed, Search, ArrowUpDown, 
  ArrowUp, ArrowDown 
} from 'lucide-react';

interface Props {
  callLogs: any[];
  contacts: any[];
  sms: any[];
}

type SortOrder = 'asc' | 'desc';

export default function DashboardClient({ callLogs, contacts, sms }: Props) {
  const [activeTab, setActiveTab] = useState<'calls' | 'contacts' | 'sms'>('calls');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const toggleSort = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

  const filteredData = useMemo(() => {
    let currentData = activeTab === 'calls' ? callLogs : activeTab === 'contacts' ? contacts : sms;
    
    // Filter
    let filtered = currentData.filter(item => {
      const searchLower = search.toLowerCase();
      if (activeTab === 'calls') {
        return (item.name?.toLowerCase().includes(searchLower) || item.number?.toLowerCase().includes(searchLower));
      } else if (activeTab === 'contacts') {
        return (item.displayName?.toLowerCase().includes(searchLower) || item.phones?.some((p: string) => p.includes(searchLower)));
      } else {
        return (item.address?.toLowerCase().includes(searchLower) || item.body?.toLowerCase().includes(searchLower));
      }
    });

    // Sort
    filtered.sort((a, b) => {
      let valA, valB;
      if (activeTab === 'calls') {
        valA = a.timestamp; valB = b.timestamp;
      } else if (activeTab === 'contacts') {
        valA = a.displayName; valB = b.displayName;
      } else {
        valA = a.date; valB = b.date;
      }
      
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [activeTab, search, sortOrder, callLogs, contacts, sms]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString();
  };

  const getCallIcon = (type: string) => {
    if (type.includes('incoming')) return <PhoneIncoming size={22} color="#22c55e" />;
    if (type.includes('outgoing')) return <PhoneOutgoing size={22} color="#3b82f6" />;
    if (type.includes('missed')) return <PhoneMissed size={22} color="#ef4444" />;
    return <Phone size={22} color="#6366f1" />;
  };

  return (
    <>
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'calls' ? 'active' : ''}`} onClick={() => {setActiveTab('calls'); setSearch('');}}>
          <Phone size={18} /> Calls ({callLogs.length})
        </button>
        <button className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`} onClick={() => {setActiveTab('contacts'); setSearch('');}}>
          <Users size={18} /> Contacts ({contacts.length})
        </button>
        <button className={`tab-btn ${activeTab === 'sms' ? 'active' : ''}`} onClick={() => {setActiveTab('sms'); setSearch('');}}>
          <MessageSquare size={18} /> SMS ({sms.length})
        </button>
      </div>

      <div className="controls-bar">
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder={`Search ${activeTab}...`} 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="sort-btn" onClick={toggleSort}>
          <ArrowUpDown size={16} />
          Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          {sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        </button>
      </div>

      <div className="grid">
        {filteredData.map((item) => (
          <div key={item._id} className="list-item">
            <div className="list-item-icon">
              {activeTab === 'calls' ? getCallIcon(item.type) : 
               activeTab === 'contacts' ? <Users size={22} color="#f59e0b" /> : 
               <MessageSquare size={22} color="#10b981" />}
            </div>
            
            <div className="list-item-content">
              <div className="list-item-title">
                {activeTab === 'calls' ? (item.name || item.number) : 
                 activeTab === 'contacts' ? item.displayName : 
                 item.address}
              </div>
              <div className="list-item-sub">
                {activeTab === 'calls' && (
                  <>
                    <span>{item.number}</span>
                    <span>•</span>
                    <span style={{textTransform: 'capitalize'}}>{item.type.split('.').pop()}</span>
                  </>
                )}
                {activeTab === 'contacts' && (
                  <span>{item.phones?.[0] || 'No number'}</span>
                )}
                {activeTab === 'sms' && (
                  <span style={{color: 'white', fontStyle: 'italic'}}>"{item.body}"</span>
                )}
              </div>
            </div>

            <div className="list-item-end">
              {activeTab === 'calls' && (
                <>
                  <div style={{fontWeight: 'bold'}}>{item.duration}s</div>
                  <div style={{fontSize: '0.75rem', color: '#64748b'}}>{formatDate(item.timestamp)}</div>
                </>
              )}
              {activeTab === 'contacts' && (
                <div style={{fontSize: '0.75rem', color: '#64748b'}}>{item.emails?.[0]}</div>
              )}
              {activeTab === 'sms' && (
                <div style={{fontSize: '0.75rem', color: '#64748b'}}>{formatDate(item.date)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--secondary)' }}>
          <p>No results found for "{search}".</p>
        </div>
      )}
    </>
  );
}

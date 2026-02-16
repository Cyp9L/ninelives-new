'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.honeypot) return;

    setStatus('sending');
    
    // Placeholder - will add API route later
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Nous contacter</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="website"
          value={formData.honeypot}
          onChange={(e) => setFormData({...formData, honeypot: e.target.value})}
          className="hidden"
          tabIndex={-1}
        />

        <div>
          <label className="block font-bold mb-2">Nom *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Téléphone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Message *</label>
          <textarea
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {status === 'sending' ? 'Envoi...' : 'Envoyer'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 font-bold">Message envoyé !</p>
        )}
      </form>
    </div>
  );
}
import { useState } from 'react';
import { supabase } from '../supabase';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const { error } = await supabase
      .from('messages')
      .insert([formData]);

    if (error) {
      console.error(error);
      setStatus('Failed to send message. Please try again.');
    } else {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Name</label>
          <input 
            type="text" required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Email</label>
          <input 
            type="email" required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Message</label>
          <textarea 
            required rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full border rounded-lg p-3 focus:outline-blue-500"
          ></textarea>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700">
          Send Message
        </button>
        {status && <p className="mt-4 text-center font-medium text-green-600">{status}</p>}
      </form>
    </div>
  );
}

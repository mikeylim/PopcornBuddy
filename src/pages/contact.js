// pages/contact.js
import { useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react'; // This line is optional and used only if you have some NextAuth integration

const Contact = ({ userSession }) => {
  const [formData, setFormData] = useState({
    name: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // If the user is not authenticated, show a message
  if (!userSession) {
    return <p>You need to be logged in to contact us.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', {
        ...formData,
        email: userSession.email // Include user email from the session
      });
      setStatus('Message sent successfully!');
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg bg-white shadow-md text-purple-700">
      <h1 className="text-2xl font-bold text-center mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send
        </button>
      </form>
      {status && <p className="mt-4 text-center text-sm">{status}</p>}
    </div>
  );
};

// Fetch session data on the server side
export async function getServerSideProps(context) {
  const session = context.req.session; // Access session data directly from the request object

  return {
    props: {
      userSession: session?.user || null // Pass user session data to the page component
    }
  };
}

export default Contact;

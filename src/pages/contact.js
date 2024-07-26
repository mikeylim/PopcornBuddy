// pages/contact.js
import Navbar from '../components/Navbar';
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      setStatus('Message sent successfully!');
    } catch (error) {
      setStatus('Error sending message.');
    }
  };

  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Send</button>
        </form>
        {status && <p>{status}</p>}
      </main>
    </div>
  );
};

export default Contact;

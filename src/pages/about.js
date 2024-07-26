// pages/about.js
import Navbar from '../components/Navbar';
import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>
        <h1>About Us</h1>
      </main>
    </div>
  );
};

export default About;

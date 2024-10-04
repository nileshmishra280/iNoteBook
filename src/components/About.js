import React from 'react';
import './About.css';
import { Code, Lightbulb, Users, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="about-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      <h1 className="about-title">Welcome to iNotebook</h1>
      <p className="about-description">
        Revolutionizing the way you capture, organize, and bring your ideas to life.
        More than just a note-taking app - it's your digital sanctuary for creativity.
      </p>
      
      <div className="about-cards-container">
        <div className="about-card">
          <div className="icon-wrapper">
            <Shield className="card-icon" />
          </div>
          <h2>Secure by Design</h2>
          <p>
            Your thoughts are precious. That's why we've implemented end-to-end encryption, 
            ensuring your notes remain private and secure. With iNotebook, your ideas are 
            protected by industry-leading security protocols.
          </p>
        </div>

        <div className="about-card">
          <div className="icon-wrapper">
            <Code className="card-icon" />
          </div>
          <h2>Smart Features</h2>
          <p>
            Experience the power of intelligent note-taking. Our app features:
          </p>
          <ul className="feature-list">
            <li>Real-time synchronization</li>
            <li>Smart categorization</li>
            <li>Customizable tags</li>
            <li>Rich text formatting</li>
          </ul>
        </div>

        <div className="about-card">
          <div className="icon-wrapper">
            <Users className="card-icon" />
          </div>
          <h2>Our Community</h2>
          <p>
            Join millions of users who trust iNotebook for their daily note-taking needs. 
            From students to professionals, our diverse community drives us to constantly 
            innovate and improve.
          </p>
        </div>

        <div className="about-card">
          <div className="icon-wrapper">
            <Lightbulb className="card-icon" />
          </div>
          <h2>Future Vision</h2>
          <p>
            We're not just building a note-taking app; we're crafting the future of 
            digital productivity. Our roadmap includes AI-powered insights, seamless 
            integrations, and revolutionary collaboration tools.
          </p>
        </div>
      </div>

      <div className="testimonial-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-container">
          <div className="testimonial">
            <p>"iNotebook has transformed how I organize my thoughts. It's intuitive, powerful, and simply brilliant!"</p>
            <span className="testimonial-author">- Sarah Johnson, Designer</span>
          </div>
          <div className="testimonial">
            <p>"The best note-taking app I've ever used. The security features give me peace of mind."</p>
            <span className="testimonial-author">- Michael Chen, Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
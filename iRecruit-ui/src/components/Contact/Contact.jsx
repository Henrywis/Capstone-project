import React from 'react';
import './Contact.css';
import { BsFacebook, BsTwitter, BsLinkedin, BsEnvelope } from 'react-icons/bs';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" placeholder="johndoe@example.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="4" placeholder="Write your message here..." required />
        </div>
        <div className="social-media-icons">
          <a href="https://www.alpha.facebook.com/alumona.henry.9" target="_blank" rel="noopener noreferrer">
            <BsFacebook className="social-icon" />
          </a>
          <a href="https://www.twitter.com/henrywis_" target="_blank" rel="noopener noreferrer">
            <BsTwitter className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/henry-alumona" target="_blank" rel="noopener noreferrer">
            <BsLinkedin className="social-icon" />
          </a>
          <a href="mailto:alumonahenry7@gmail.com" target="_blank" rel="noopener noreferrer">
            <BsEnvelope className="social-icon" />
          </a>
        </div>
        {/* "noopener noreferrer" ensures the links to external websites open in new */} 
        {/* tabs or windows with  enhanced security and without revealing the referrer information. */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;


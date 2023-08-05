import React, { useState, useEffect } from 'react';
import './About.css';

const SEVEN_SECONDS = 7 * 1000;
//7 seconds in milliseconds
const About = () => {
  const paragraphs = [
    `Welcome to our recruiting website! We are dedicated to connecting students who fulfill diversity requirements with the latest internship opportunities in various fields. Our platform aims to foster diversity and inclusion in the professional world by providing a tailored approach to matching students with their categories of interest.`,
    `Our team believes that diversity is a strength and that every individual brings unique perspectives and experiences to the table. Through our platform, we strive to bridge the gap between talented students and forward-thinking recruiters, fostering an environment where everyone can thrive and succeed.`,
    `Whether you are a student looking for exciting internship opportunities or a recruiter seeking diverse talent, we've got you covered! Join us today and be part of a vibrant community that celebrates diversity and empowers students to unlock their full potential.`,
  ];

  const [currentParagraph, setCurrentParagraph] = useState(0);

  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCurrentParagraph((prevParagraph) =>
        (prevParagraph + 1) % paragraphs.length
      );
    }, SEVEN_SECONDS);

    return () => clearInterval(carouselInterval);
  }, [paragraphs.length]);

  return (
    <div className="about-container">
      <h1>About Our Platform</h1>
      <div className="carousel">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className={index === currentParagraph ? 'active' : ''}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;

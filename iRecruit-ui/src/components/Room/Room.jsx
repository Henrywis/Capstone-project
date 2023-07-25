import React, { useState } from "react";
import './Room.css';

export default function Room({ jobId, title, joburl, onApplicationSubmit }) {
  const [githubLink, setGithubLink] = useState("");
  const [resume, setResume] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleGithubLinkChange = (event) => {
    setGithubLink(event.target.value);
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setResume(file);
  };

  const handleJobSubmit = (event) => {
    event.preventDefault();

    // Perform additional validation here if needed
    const linkRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]*$/;
    if (!linkRegex.test(githubLink)) {
      console.log("Invalid GitHub link");
      return;
    }

    // Create FormData object to send the form data including the resume file
    const formData = new FormData();
    formData.append("githubLink", githubLink);
    formData.append("resume", resume);

    // Make an API call to update the room with the form data
    // ...

    // Clear the form fields
    setGithubLink("");
    setResume(null);

    // Invoke the onApplicationSubmit callback with the submitted application data
    onApplicationSubmit({
      id: jobId,
      title: title,
      link: joburl
    });

    // Show the confirmation message and hide it after 4 seconds
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 4000);
  };


  return (
    <div className="room">
      <h4 className="room-heading">Include supporting information for your recruiter here:</h4>
      <form onSubmit={handleJobSubmit} className="room-form">
        <div>
          <label htmlFor="githubLink">GitHub Link:</label>
          <input
            type="text"
            id="githubLink"
            value={githubLink}
            onChange={handleGithubLinkChange}
            placeholder="https://www.github.com/username"
            required
          />
        </div>
        <div>
          <label htmlFor="resume">Resume (PDF):</label>
          <input
            type="file"
            id="resume"
            accept=".pdf"
            onChange={handleResumeChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Application</button>
      </form>
      <div className={`confirmation ${showConfirmation ? 'show' : ''}`}>
        <p>Info submitted to recruiter!</p>
        <p>Continue application below.</p>
      </div>
      <div className="line" />
      <p className="application-link">Visit the general application site here: <a href={joburl}>{joburl}</a></p>
    </div>
  );
}

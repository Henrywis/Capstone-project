import React, { useState, useEffect } from "react";
import './Profile.css';

function Profile() {
  const [photo, setPhoto] = useState(null);
  const [bio, setBio] = useState("");
  const [education, setEducation] = useState("");
  const [currentInstitution, setCurrentInstitution] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [profileUpdated, setProfileUpdated] = useState(false);
  //all of these can be updated, hence the need for state hooks

  useEffect(() => {
    // Retrieve the profile information from localStorage when the component mounts
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      const { photo, bio, education, currentInstitution, skills, experience, linkedinUrl } = JSON.parse(storedProfile);
      setPhoto(photo);
      setBio(bio);
      setEducation(education);
      setCurrentInstitution(currentInstitution);
      setSkills(skills);
      setExperience(experience);
      setLinkedinUrl(linkedinUrl);
    }
  }, []);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto({
          file,
          dataURL: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
    }
  };

  //note: will have to reduce code redundancy here.
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleEducationChange = (event) => {
    setEducation(event.target.value);
  };

  const handleCurrentInstitutionChange = (event) => {
    setCurrentInstitution(event.target.value);
  };

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleExperienceChange = (event) => {
    setExperience(event.target.value);
  };

  const handleLinkedinUrlChange = (event) => {
    setLinkedinUrl(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    // save user profile: use localStorage or a state management library like Redux (Lee's suggestion)

    // Create an object to store the profile information
    const profileData = {
      photo,
      bio,
      education, currentInstitution,
      skills,
      experience,
      linkedinUrl
    };

    // Save the profile information to localStorage
    localStorage.setItem("profile", JSON.stringify(profileData));

    setProfileUpdated(true);

    setTimeout(() => {
      setProfileUpdated(false);
    }, 3500);
    console.info("Profile information saved successfully!");
    // confirmation log msg for information: indicating successful save in this case
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="photo-container">
          <div className="profile-photo-container">
            {photo ? (
              <img className="profile-photo" src={photo.dataURL} alt="Profile" />
            ) : (
              <div className="empty-photo">Empty</div>
            )}
          </div>
          <label htmlFor="photo" className="photo-upload-label">
            Upload Photo
            <input
              type="file"
              id="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea id="bio" value={bio} onChange={handleBioChange}></textarea>
        </div>
        <div>
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            value={education}
            onChange={handleEducationChange}
          />
        </div>
        <div>
          <label htmlFor="currentInstitution">Current Institution:</label>
          <input
            type="text"
            id="currentInstitution"
            value={currentInstitution}
            onChange={handleCurrentInstitutionChange}
          />
        </div>
        <div>
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={handleSkillsChange}
          />
        </div>
        <div>
          <label htmlFor="experience">Experience:</label>
          <textarea
            id="experience"
            value={experience}
            onChange={handleExperienceChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="linkedinUrl">LinkedIn URL:</label>
          <input
            type="text"
            id="linkedinUrl"
            value={linkedinUrl}
            onChange={handleLinkedinUrlChange}
          />
        </div>
        <div className="save-profile">
          <button type="submit">Save Profile</button>
          {profileUpdated && <div className="profile-updated">Profile updated!</div> }
        </div>
      </form>
    </div>
  );
}

export default Profile;

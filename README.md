# Capstone-project

TAILORED EMPLOYMENT:

PROJECT TITLE: iRecruit

DESCRIPTION:



Meta University Eng Project Plan Template     

[iRECRUIT]
Intern: [Henry Alumona]
Intern Manager: [Lee Fu]
Intern Director: [Gaby Nahum]
Peer(s): [Ruy Gonzalez Hermosillo]
GitHub Repository Link: [https://github.com/Henrywis/Capstone-project]
Overview
Category: [Recruiting]

Story: 
[A recruiting website, where users and recruiters have profiles, and candidates (users) get connected to the latest internship opportunities, based on their categories of interest. Every candidate application is done in one Application room and candidates can get more listings based on the most clicked category. Candidates may be able to track the progress of each application to see which is Accepted, Rejected or Pending.]
Market: [ college students]
Habit: [Internship Recruiting Seasons]
Scope: [Internship listings]

PRODUCT SPEC
User Stories

Required:
- User can login
- User can create a Profile
- User can search for job/internship opportunities
- User can filter opportunities based on categories
- User can apply for jobs directly through the platform
- User can see more information about the job by hovering over the title (OR any other complex User Experience)
- User can see potential applicants checking out the same job opening
- User can see their profile

Optional:
- User can track progress of application, including seeing if application was Shortlisted, Pending or Rejected.
- User can get notifications on listings or recruiter interest
- User can edit their profile information
- User can see another candidate’s profile
- User can provide feedback on their account

Screen Archetypes:
- ome/Dashboard Screen: Feed Screen
- Applications list/Rooms Screen
- Current Application Screen
- Notifications Screen
- Profile Screen

√
Navigation:

- Login/Registration Screen: Allows users to log in or register for  a new account.
- Home/Dashboard Screen/Feed Screen: Displays  a feed of internship/job opportunities based on the user’s categories of interest.
- Applications List/Rooms Screen: Shows a list of all the applications the user has submitted.
- Current Application Screen: Provides information about a specific application (including its status - Shortlisted, Rejected, Pending)
- Notifications Screen: Notifies the user about new internship listings or recruiter interest
- Profile Screen: Displays the user’s profile information (and allows them to edit it)

DATA MODEL
USER:
• id
• username
• password
• email
• name
• bio
• preference (Categories)
• skills
• education
• experience

APPLICATION:
• id
• userId (foreign key)
• jobId (foreign key)
• status (Shortlisted, Rejected, Pending)

JOB/INTERNSHIP:
• id
• title
• description
• categories
• recruiters (optional)
• applicants (optional)



API Routes:

- POST /api/login
Logs in user with credentials
- POST /api/register
Registers a new user with credentials
- GET /api/opportunities
Retrieves a list of internship/job opportunities based on user’s interest
- GET /api/applications
Retrieves a list of user’s submitted applications
- GET /api/applications{id}
Retrieves detailed information about a specific application (application page particular to one job/internship)
- POST /api/application
Submits a new application for a job/internship
- PUT /api/profile
Updates the user’s profile information
- GET/api/profile{id}
Retrieves the profile information of self/another candidate
- GET /api/notifications
Retrieves the user’s notifications


Technical Challenges
//For your project, you should demonstrate that you can apply what you’ve learned so far and expand on that knowledge to write code and implement features that go beyond the scope of the projects you worked on during CodePath.

//Based on the general idea and direction of your project requirements, your intern manager will create at least two (2) Technical Challenges for you. This section is all about explaining what they are and how you’re planning to tackle them - you’ll work together with your manager to fill it out. 

Technical Challenge #1 
RECOMMENDATION ENGINE
For this project, I will be developing a recommendation engine that suggests internship/job opportunities based on the user's previous interactions, using weighting factors like category clicks, time spent and what user searches in the following order:
1. DATA GATHERING/COLLECTION:-  I will track the user interactions (category clicks, time spent on each listing and search queries by the user)
- I will store this interaction data and the user profiles, jobs/internships in my postgreSQL database


2. DATA PROCESSING:- I will convert the data (categorical data such as category clicks) into numerical data to be stored in my database, suitable for analysis.

3. DEFINE SIMILARITY MATRIX
I will be using the Cosine Similarity metric to measure the similarity between a user and the job/internship listing 
For this, I will be having a user-item matrix to have vector representations of listing against user and the attributes of each user-listing matrix are number of interactions.

4. RECOMMENDATION GENERATION
Recommend listings with the higher similarity with the user’s interactions based on the calculated similarity scores.

5. PERSONALIZATION AND EFFICIENCY:I could incorporate additional weighting factors such as time spent on each listing, or by recent interactions to better refine the recommendation. Experimenting with different weight constants for each factor (time, recency, queries, category clicks) to optimize and personalize recommendations by filtering out irrelevant listings.You can incorporate additional factors such as the time spent on each listing or the recency of interactions to further refine the recommendation process.

Technical Challenge #2

SCALABILITY : 
 Ensuring the system can handle a growing number of users, applications and listings without performance degradation through CACHING
Caching involves storing frequently accessed data in a cache, which is a fast-access, temporary storage system 

HOW?
1. I will Identify Frequently Accessed Data
2. Choose a Caching solution
3. Determine cache expiration strategy
4. Implement caching mechanism
5. Update Cache
6. Monitor and Optimize cache performance


Timeline
Project execution will start in Week 4 of MU. Based on the previously defined requirements, user stories and technical challenges, use the following table to scope out and plan a timeline for deliverables over Week 4 - 9. You can be as detailed as you need, ranging from simply mentioning the user stories, or dividing them into sub-tasks.

You are free to modify the table, add / remove rows or columns, whatever fits your style! The important thing here is that you focus and prioritize certain aspects of your project so you don’t get behind and are ready to deliver the MVP - remember your required features should be code complete before the end of Week 8, including both technical challenges!

We also encourage you to leverage project tracking tools such as GitHub Issues or Meta’s internal Tasks / GSD tooling to keep manage individual units of work.

MU Week

Project Week 1
[x] Database with object models created 
[x] User can see listings on landing page
[x] User can log in/sign up
[x] Page updates on login depending on user
 
Project Week 2
[x] User can filter opportunities based on categories
[x] User can search for job/internship opportunities
[x] User can apply for jobs directly through the platform

Project 3
[] User can get job ranking and suggestion based on category clicks
[x] dropdown for categories (consider icons too)
[x] UI for either dropdown/categories/recommendation/profile - Implemented Carousel & animation for Application page
[x] User can see & edit their profile

Project Week 4
[x] User can see & edit their profile (cont.)
[] User can get job ranking and suggestion based on category clicks

Project Week 5
[x] User can hover over a listing to see more information
[] Loading State
[] Implement caching

Project Week 6
[] Implement caching
[] User can track progress of application, including seeing if application was Shortlisted, Pending or Rejected. (Optional)
[] Start fixing bugs

Project Week 7
[] If needed, keep fixing bugs

# PAGES

- Home
- Chats page display
- Profile page
- Notifications page
- Feedback form page
- Suggested Listings: leads to chat page

## Categories

- Technology page: Example - Meta
- Finance page: Example - Goldman Sachs
- Energy page: Example - Bloom energy
- Educatech page: Example - CodePath

*Note:* Each example loads on the Chats page.

# Fixed Display

- Track Applications/Candidates bar

# ENDPOINTS

- User Registration and Authentication
- Candidate endpoint
- Recruiter/Employer Endpoint


# CURRENT MODIFICATIONS
- Applications + Status bar
<img width="1723" alt="image" src="https://github.com/Henrywis/Capstone-project/assets/105118133/0e991fef-9feb-4ee1-af91-39107b980b27">

- Profile page
<img width="1723" alt="image" src="https://github.com/Henrywis/Capstone-project/assets/105118133/8901cb9e-26a0-4307-a6f8-025af067e3cf">

### WIREFRAME
![Capstone_Initial_layout-1](https://github.com/Henrywis/Capstone-project/assets/105118133/e870c07c-9e59-4fae-a601-1737f9eb6d65)
![Capstone_Initial_layout-2](https://github.com/Henrywis/Capstone-project/assets/105118133/4a0ea00c-f48c-4c94-b35b-f7014d5cbd53)
![Capstone_Initial_layout-3](https://github.com/Henrywis/Capstone-project/assets/105118133/0f071f84-70ac-4164-b61b-4771f0a8d0bc)
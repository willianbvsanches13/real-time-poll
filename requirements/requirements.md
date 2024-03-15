# Test Description
## Enhanced Real-Time Polling App

Develop a sophisticated Real-Time Polling Application that allows users to create polls, vote, and see the results update live. The application should demonstrate advanced front-end and back-end capabilities, attention to architecture, scalability, security, and performance.

## Front-end:
 - Develop the user interface with React and TypeScript, ensuring it is intuitive and user-friendly.
 - Employ advanced state management techniques using Redux or the Context API with hooks to handle application state efficiently, especially in the context of real-time updates.
 - Implement dynamic and responsive chart components for live result updates, considering performance optimizations like memoization or lazy loading.
 - Ensure the application is responsive and accessible, following best practices for web development.

## Back-end:
 - Build a RESTful API and real-time services using Node.js, Express, and TypeScript, focusing on clean, maintainable code.
 - Incorporate WebSocket or a similar technology (e.g., Socket.IO) for real-time communication and ensure it's scalable and reliable.
 - Optimize performance through efficient database design, queries, and caching strategies. Discuss the choice of database and justify its suitability for the application.

## Bonus (not needed):
 - Write comprehensive unit tests for back-end components, demonstrating familiarity with testing frameworks like Jest for React and Mocha or Jest for Node.js.
 - Describe a CI/CD pipeline that could automate testing and deployment processes, discussing tools like Jenkins, CircleCI, or GitHub Actions.

# Mapped Requirements
### Create polls

- [ ] User can add a title and multiple options to the poll.
- [ ] User can choose to allow multiple votes or only one vote per user.
- [ ] User can see a live preview of the poll as they create it.
- [ ] User can submit the poll to make it live.
- [ ] User can make changes the poll just before it's live.
- [ ] User can make a protection for only show the results after X votes.

### Vote
    
- [ ] User can change their vote.
- [ ] User can see the results update in real-time.
- [ ] User can see the total number of votes and the percentage of votes for each option in a dynamic and responsive chart.

### Real-time updates

- [ ] Incorporate WebSocket for real-time communication.
- [ ] Ensure the real-time services are scalable and reliable.
- [ ] The back-end is optimized for performance through efficient database design, queries, and caching strategies.

### Application behavior
- [ ] The back-end provides a RESTful API for the front-end to consume.
- [ ] The application is responsive and works on all devices.
- [ ] The application has comprehensive and acceptable coverage unit tests
- [ ] The application has a CI/CD pipeline that automates testing and deployment processes.

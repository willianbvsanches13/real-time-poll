# Analize

## Front-end:

#### Create polls screen

- The homescreen only must to have a form to create a new poll and an input and button to (can use that input with button in the right side) find a poll by its hash code
- The form to create a new poll must to have a title input, a question input, a list of options inputs, a checkbox to allow multiple votes or only one vote per user, a input to make a protection for only show the results after X votes, the data to start and finish the poll and a submit button.
- The form to create a new poll must to have a live preview of the poll as the user create it
- The form to create a new poll must to have a button to submit the poll to make it live (remember that the user can make changes the poll just before it's live)

#### Vote screen

- The vote screen must to have a list of options to vote and a button to submit the vote.
- If the user can change their vote, the vote screen must to have a button to change the vote.
- If poll just support one vote per user, show button to result screen and button to change their vote.

#### Results screen

- The results screen must to have the total number of votes and the percentage of votes for each option in a dynamic and responsive chart.
- The results screen must to have a button to go back to the vote screen.

#### Front-end behavior

- **Restful API (Express)**: The front-end must to consume a RESTful API provided by the back-end.
- **Socket.IO**: The front-end must to use Socket.IO to receive real-time updates on **Vote** and **Result** screens.


## Back-end:

#### RESTFUL API

- Use Node.js, Express, and TypeScript to build the RESTful API
- Generete hash code to each poll
- The back-end must to have an API endpoints from poll:
    - Create a new poll
    - Vote
    - Show the results of a poll.
- The back-end must to have a protection for only show the results after X votes.
- Backend can use Prisma ORM to connect with the database (PostgreSQL on AmazonRDS ???).
- Redis to cache the results of a poll.

#### Real-time services

- Create Socket.IO server to send real-time updates to the front-end
- Create "room" for each poll to send real-time updates to the front-end
- Have an Event to return the results of a poll to the front-end
- Room Events:
    - Vote ->
    - Results <->


# LMS-YA-1-BE

Group 1

This is a Learning System management Node JS API, which allow users (strictly Admins) to upload course videos, and gives the students and also admins the opportunity to watch the uploaded videos. It also have other functionalities like comments on the videos, it gives the admins the ability to track student progess.

## Features

- Users (students) can signup and login to their accounts
- Random avatar is assigned to each new user created as well.
- Admins delete their students accounts
- Admins can upload videos, and assign task per video per learning path (which can be frontend, backend, web3, product design) as they choose.
- The students can then submit the response to this task.
- This submission can be in form of a link which is then marked and the scores are uploaded by the admins
- Admins can track students progress based on their score aggeregation.
- Students and admins can also comment on a course. They can also modify and delete their comments.

## API Live Link

Here is the render [API Live Link](https://lms-zwhm.onrender.com)

## Documentation

Use the
[Postman
Documentation](https://documenter.getpostman.com/view/22093717/2s93m1ZjBC) to get a better idea on how to use the API

Database documentation can be found [here](https://dbdesigner.page.link/oh17cszePYQRxkJeA)

## Installation

To Install the PostIt app:

- Clone this repository [here](https://github.com/OlisaPaul/PostItApp.git).
- The main branch is the most stable branch at any given time, ensure you're working from it.
- Run npm install to install all dependencies
- You can either work with the default mLab database or use your locally installed MongoDB. Do configure to your choice in the application entry file.
- Create an .env file in your project root folder and add your variables. See .env.sample for assistance.
- Then you can test the functionality using postman.

## Usage

- Run npm start to start the application.
- Connect to the API using Postman.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`dbUri`

This dbUri is the mongodb connection string

## Deployment

To deploy this project run

```bash
  npm i
```

```bash
  node index.js
```

## API Reference

| HTTP   | Endpoints                                               | Action                                                 |
| ------ | ------------------------------------------------------- | ------------------------------------------------------ |
| POST   | /api/v1/users                                           | To sign up a new user account                          |
| POST   | /api/v1/auth                                            | To login an existing user account                      |
| PUT    | /api/v1/users                                           | To modify an existing user account                     |
| GET    | /api/v1/users                                           | To retrieve all users on the platform                  |
| GET    | /api/v1/users/:id                                       | To retrieve a particular user on the platform          |
| GET    | /api/v1/users/scores                                    | To retrieve the total score and grade per student      |
| GET    | /api/v1/users/learningTrack/:learningtrack              | To retrieve all users per learning Track               |
| POST   | /api/v1/courses                                         | To create a new course                                 |
| GET    | /api/v1/courses                                         | To retrieve all courses on the platform                |
| GET    | /api/v1/courses/:courseId                               | To retrieve details of a single course                 |
| GET    | /api/v1/courses/learningTrack/:learningtrack            | To retrieve all courses per learning Track             |
| GET    | /api/v1/courses/learningTrack/:learningTrack/week/:week | To retrieve all courses per learning track per week    |
| PUT    | /api/v1/courses/:courseId                               | To edit the details of a single course                 |
| DELETE | /api/v1/courses/:courseId                               | To delete a single course                              |
| POST   | /api/v1/comments                                        | To create a new comment                                |
| GET    | /api/v1/comments                                        | To retrieve all comments on the platform               |
| GET    | /api/v1/comments/:commentId                             | To retrieve details of a single comment                |
| GET    | /api/v1/comments/post/:postId                           | To retrieve replies made on a post                     |
| GET    | /api/v1/comments/post/:postId/user/:userId              | To retrieve replies made by a user on a post           |
| GET    | /api/v1/comments/post/:post/user/:userId/:commentId     | To retrieve details of a single comment made by a user |
| PUT    | /api/v1/comments/:commentId                             | To edit the details of a single comment                |
| DELETE | /api/v1/comments/:commentId                             | To delete a single comment                             |
| GET    | /api/v1/scores                                          | To retrieve all scores on the platform                 |
| GET    | /api/v1/scores/:scoreId                                 | To retrieve details of a single score                  |
| GET    | /api/v1/scores/userId/:id                               | To retrieve all scores per student                     |
| PUT    | /api/v1/scores/:scoreId                                 | To edit the details of a single score                  |
| POST   | /api/v1/scores/                                         | To add a single score                                  |
| DELETE | /api/v1/scores/:scoreId                                 | To delete a single score                               |
| GET    | /api/v1/submissions                                     | To retrieve all submissions on the platform            |
| GET    | /api/v1/submissions/:submissionId                       | To retrieve details of a single submission             |
| GET    | /api/v1/submissions/userId/:id                          | To retrieve all submissions per student                |
| POST   | /api/v1/submissions/                                    | To add a single submission                             |
| PUT    | /api/v1/submissions/:submissionId                       | To edit the details of a single submission             |
| DELETE | /api/v1/submissions/:submissionId                       | To delete a single submission                          |
| GET    | /api/v1/tasks                                           | To retrieve all tasks on the platform                  |
| GET    | /api/v1/tasks/:taskId                                   | To retrieve details of a single task                   |
| POST   | /api/v1/tasks/                                          | To add a single task                                   |
| PUT    | /api/v1/tasks/:taskId                                   | To edit the details of a single task                   |
| DELETE | /api/v1/tasks/:taskId                                   | To delete a single task                                |
| GET    | /api/v1/thumbnails                                      | To retrieve all thumbnails on the platform             |
| GET    | /api/v1/thumbnails/:thumbnailId                         | To retrieve details of a single thumbnail              |
| GET    | /api/v1/thumnails/learningTrack/:learningtrack          | To retrieve all thumnails per learning Track           |
| POST   | /api/v1/thumbnails/                                     | To add a single thumbnail                              |
| PUT    | /api/v1/thumbnails/:thumbnailId                         | To edit the details of a single thumbnail              |
| DELETE | /api/v1/thumbnails/:thumbnailId                         | To delete a single task                                |

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:**

- [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
- [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
- [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
- [Mongoose ODM](https://mongoosejs.com/) This makes it easy to write MongoDB validation by providing a straight-forward, schema-based solution to model to application data.

## Authors

- [@OlisaPaul](https://www.github.com/OlisaPaul)

import React from "react";

const BlogArray = [
  {
    postNum: 7,
    title: "Post #6 Life... Finds a Way (to get in the way)",
    date: "July 10, 2024",
    postType: "Personal",
    textBody:
      "Oh my goodness... the past few weeks have been absolutely insane. Shortly after my last post we began a huge software and hardware upgrade of one of my control systems. While that was an amazing opportunity and I learned a lot, it absolutely ate up all of my time and energy. There were a lot of long stressful days, but it is done now and my area is in a much more stable place. After all my hard work I was rewarded with being sick for over a week. The intense tonsillitis, aches, and exhaustion really ended this whole chapter wonderfully... Now its game time yet again. I just fixed my date formatting and can render posts in reverse chronological order which is another great step. I'm ready to get back to work.",
  },
  {
    postNum: 6,
    title: "Aggregation Pipelines & Rendering Relevant Data",
    date: "June 18, 2024",
    postType: "Project Documenting",
    textBody:
      "I am so excited to move on to the next part of the project. I was able to upload UIDs and post content to MongoDB and render that to the page. Now I am able to lookup data from both collections and push it to my client side in a nice object I can easily render on the DOM to show a typical data like the username, post content, and date posted. My next step will be to build a project page to edit user information, and determine how I want to render data like a traditional timeline does in small batches.",
  },
  {
    postNum: 5,
    title: "Post #5 Moving passed Signup and Login Pages",
    date: "June 15, 2024",
    postType: "Project Documenting",
    textBody:
      "I wanted to make sure the login and signup pages were better than my last project. This meant displaying relevant errors to the user, and storing user info in a document database with MonogDB. I will definitely be doing some refactoring. But overall I am happy with where it is at. I've got a great refresher and better understanding with error handling, importing and working with component libraries, and state handling and asynchronous behavior. My next big task will be talking between the two databases I have for user info and post content and planning on how to set these, and other future documents up. I will use the UIDs in Firebase as keys between the databases. This has been a lot of fun and I'm really excited to make more progress. If you're reading this, thanks :)",
  },
  {
    postNum: 4,
    title: "Post #4 Leveling Up Signup",
    date: "June 9, 2024",
    postType: "Personal & Project Documenting",
    textBody:
      "A lot has happened since  the last post, CRUD is done, I worked 12-14 hour days at work for 2.5 weeks straight, and I moved my fiance from NYC back to Alabama in a suburban. I made some great progress over the week. I am able to work with MUI components which look so sleek and really take popups to the next level. I was able to make a new collection to store signup information for users. I also am using it to identify any already existing users on signup. I am able to generate different error codes for signup errors like invalid email addresses, passwords matching or meeting complexity requirements I set. My next step would be to render specific password complexity errors to the user, i.e. missing one uppercase letter or something like that. This project has been a great teacher and I can feel the code I am writing is more streamlined and refactored than I used to write. I can feel myself improving and it is a good feeling. Now that life is finally calming down I am ready to jump back in and tackle this project.",
  },
  {
    postNum: 3,
    title: "Post #3 Getting Comfy with Mongo",
    date: "April 2, 2024",
    postType: "Project Documenting",
    textBody:
      "I have 3 working functions with MongDB and the CRU in my CRUD on the horizon! MongoDB is an amazing tool and if you're reading this, love to code, and don't know how to use it, GO LEARN IT! I am excited for the first revision of this application to be complete. That will incompass allowing users to log in and write gratitudes for the day, they can see old gratitudes, update old ones, or delete them if they feel inclined. I have learned so much and I am still in phase one. I am very excited to continue working on this project. PS - yes the pages are UGLY but styling will be coming soon!",
  },
  {
    postNum: 2,
    title: "Post #2 First Feature",
    date: "March 24, 2024",
    postType: "Project Documenting",
    textBody:
      "The first feature I will develop is to allow users to track and store daily gratitudes. I want to have their gratitudes saved in MongoDB and have them access their history. After that, I will develop users to friend each other and see each other's gratitudes.",
  },
  {
    postNum: 1,
    title: "Post #1 Introductions",
    date: "March 23, 2024",
    postType: "Project Documenting",
    textBody:
      "Hello, this is the first blog post for this app. I am seeking to build an app that can genuinely connect people without destroying their focus, lives, and mental health. If you are seeing this, this is the first day code was put into this site, it is very new and raw. Also, how did you find this? It is not publicized anywhere. That is kind of weird of you. Thank you for visiting",
  },
];

export default BlogArray;

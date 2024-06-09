import React from "react";

const BlogArray = [
  {
    postNum: 4,
    title: "Post #4 Leveling Up Signup",
    date: "June 9, 2024",
    postType: "Personal & Project Documenting",
    textBody:
      "A lot has happened since  the last post, CRUD is done, I worked an annual shut down at work for 2.5 weeks straight, and I moved my fiance from NYC back to Alabama. I made some great progress over the week. I am able to work with MUI components which look so sleek and really take popups to the next level. I was able to make a new collection to store signup information for users. I also am using it to identify any already existing users on signup. I am able to generate different error codes for signup errors like invalid email addresses, passwords matching or meeting complexity requirements I set. My next step would be to render specific password complexity errors to the user, i.e. missing one uppercase letter or something like that. This project has been a great teacher and I can feel the code I am writing is more streamlined and refactored than I used to write. I can feel myself improving and it is a good feeling. Now that life is finally calming down I am ready to jump back in and tackle this project.",
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

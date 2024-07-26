# Bridge

[Bridge the gap with Bridge the app](https://bridgetheapp.us/login)

Currently under construction - More details coming soon

This project is my next step in my learning development. Please read below on the functionality and features. My new favorite thing is MongoDB and it has been a blast learning this technology!

### MongoDB 🍃 | Firebase 🔥 | MUI Component Library  
Written with React

### MongoDB Flow
Signup
- When user signs up, their Firebase UID is stored with their email and preferred name in a user collection  
Post
- After a user has signed up, they have the ability to post
- A post is stored in a separate post collection
-   this contains the post content, Firebase UID, and date posted  
Rendering Posts
- An aggregation pipeline is used to search, combine, and sort the data by using the Firebase UID in both collections
- This returns an object containing the preferred name (from the user collection), post content, and date posted (from the post collection)

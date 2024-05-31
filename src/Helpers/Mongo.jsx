import * as Realm from "realm-web";

// MongoDB Setup
// https://docs.mongodb.com/guides/realm/react-web-quickstart/
// https://docs.mongodb.com/realm/sdk/node/examples/authenticate-users/#anonymous-user
const REALM_APP_ID = "application-0-kwbhv"; // e.g. myrealm-abcde
const realm = new Realm.App({ id: REALM_APP_ID });

async function doLoginRealm() {
  // https://www.mongodb.com/docs/realm/sdk/node/examples/authenticate-users/#custom-function-user
  let creds = Realm.Credentials.anonymous();

  return await realm.logIn(creds);
}

async function doStoreUserProfileData(userWhoSignedUpData, emailData) {
  return await realm.currentUser.functions.storeUserProfileData(
    userWhoSignedUpData,
    emailData
  );
}

async function doGetData() {
  // TODO: define a function in realm called getData
  return await realm.currentUser.functions.getAllPostsTest();
}

async function doGetYourPostsOnly(userId) {
  return await realm.currentUser.functions.getYourPostsOnly(userId);
}

async function doUploadPost(postData, userWhoPostedData) {
  return await realm.currentUser.functions.uploadPost(
    postData,
    userWhoPostedData
  );
}

async function doUserEditsPost(postIdData, EditedPostContentData) {
  return await realm.currentUser.functions.userEditsPost(
    postIdData,
    EditedPostContentData
  );
}

async function doUserDeletesPost(postIdData) {
  return await realm.currentUser.functions.userDeletesPost(postIdData);
}

export {
  realm,
  doLoginRealm,
  doStoreUserProfileData,
  doGetData,
  doUploadPost,
  doGetYourPostsOnly,
  doUserEditsPost,
  doUserDeletesPost,
};

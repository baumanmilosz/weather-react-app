import {db} from "../index";

const WEATHER_APP_USER_ID = "WEATHER_APP_USER_ID";
const USERS_COLLECTION = "users";

export const getFavoriteForecastsList = (userId) => {
  const docRef = db.collection(USERS_COLLECTION).doc(userId || window.localStorage.getItem(WEATHER_APP_USER_ID));

  return docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        return doc.data().favorites
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

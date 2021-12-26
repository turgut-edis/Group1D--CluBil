import check from "./Manager";
import { studentConverter, clubConverter, eventConverter } from "../helpers/Converters";
import { doc, getDoc, arrayUnion, updateDoc, arrayRemove, setDoc } from "firebase/firestore/lite";
import { db, auth } from "../firebase";

class StudentsManager {
  constructor() {
    if (!StudentsManager._studentM) {
      StudentsManager._studentM = this;
    }
    return StudentsManager._studentM;
  }

  getInstance() {
    return StudentsManager._studentM;
  }

  async editProfile(name, biography) {
      const user = auth.currentUser.email;
      const userRef = doc(db, 'users', user).withConverter(studentConverter);
      await getDoc(userRef).then((userDoc) => {
        const userData = userDoc.data();
        userData.setBio(biography);
        userData.setName(name);
        setDoc(userRef, userData);
      }).catch((error) => {console.log(error)});
  }

  async addJoinedClub(studentMail, clubMail) {
      const studentRef = doc(db, 'users', studentMail).withConverter(studentConverter);
      const clubRef = doc(db, 'users', clubMail).withConverter(clubConverter);
      await updateDoc(clubRef, { members: arrayUnion(studentMail) }).then(() => {
          updateDoc(studentRef, { joinedClubs: arrayUnion(clubMail) })
      }).catch((error) => {console.log(error)});
  };

  async addJoinedEvent(studentMail, eventId) {
      const studentRef = doc(db, 'users', studentMail).withConverter(studentConverter);
      const eventRef = doc(db, 'events', eventId).withConverter(eventConverter);
      await getDoc(eventRef).then((docSnap) => {
          const eventQuota = docSnap.data().getQuota() - 1;
          const participants = docSnap.data().getParticipants();
          participants.push(studentMail);
          updateDoc(eventRef, {participants: participants}).then(() => {
              updateDoc(eventRef, { quota: eventQuota }).then(() => {
                updateDoc(studentRef, { registeredEvents: arrayUnion(eventId) })
              }).catch((error) => {console.log(error)});
          }).catch((error) => {console.log(error)});
      }).catch((error) => {console.log(error)});  
  };

  async removeJoinedClub(studentMail, clubMail) {
      const studentRef = doc(db, 'users', studentMail).withConverter(studentConverter);
      const clubRef = doc(db, 'users', clubMail).withConverter(clubConverter);
      await updateDoc(clubRef, { members: arrayRemove(studentMail) }).then(() => {
          updateDoc(studentRef, { joinedClubs: arrayRemove(clubMail) });
      }).catch((error) => {console.log(error)});
  }

  async removeJoinedEvent(studentMail, eventId) {
      const studentRef = doc(db, 'users', studentMail);
      const eventRef = doc(db, 'events', eventId);
      await getDoc(eventRef).then((e)=> {
          const eventQuota = e.data().quota + 1;
              updateDoc(eventRef, { quota: eventQuota }).then(() => {
                  updateDoc(eventRef, { participants: arrayRemove(studentMail) }).then(() => {
                      updateDoc(studentRef, { registeredEvents: arrayRemove(eventId)})
                  }).catch((error) => {console.log(error)}); 
              }).catch((error) => {console.log(error)});
      }).catch((error) => {console.log(error)});
  }

}

const student_instance = new StudentsManager();
if (check(student_instance)) {
  Object.freeze(student_instance);
}
export default student_instance;
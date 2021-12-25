import check from "./Manager";
import { studentConverter, clubConverter, eventConverter } from "../helpers/Converters";
import { doc, getDoc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore/lite";
import { db, auth } from "../firebase";
import { updatePassword } from "firebase/auth";



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

  editProfile(password) {
    updatePassword(auth.currentUser, password).then(() => {
      console.log(password);
    }).catch((error) => {
      console.log(error);
    })
  }

  async addJoinedClub(studentMail, clubMail) {
    const sfDocRef = doc(db, 'users', studentMail).withConverter(studentConverter);
    const sfDocRef1 = doc(db, 'users', clubMail).withConverter(clubConverter);
    try {
      await updateDoc(sfDocRef1, { members: arrayUnion(studentMail) })
      await updateDoc(sfDocRef, { joinedClubs: arrayUnion(clubMail) })
    } catch (e) {
      console.log("Failed " + e);
    }
  };

  async addJoinedEvent(studentMail, eventId) {
    const sfDocRef = doc(db, 'users', studentMail).withConverter(studentConverter);
    const sfDocRef1 = doc(db, 'events', eventId).withConverter(eventConverter);
    try {
      const docSnap = await getDoc(sfDocRef1);
      if (docSnap.exists()) {
        const eventQuota = docSnap.data().getQuota() - 1;
        const participants = docSnap.data().getParticipants();
        participants.push(studentMail);
        await updateDoc(sfDocRef1, {participants: participants});
        await updateDoc(sfDocRef1, { quota: eventQuota });
        await updateDoc(sfDocRef, { registeredEvents: arrayUnion(eventId) })
      }
    } catch (e) {
      console.log("Failed " + e);
    }
  };


  async removeJoinedClub(studentMail, clubMail) {
    const sfDocRef = doc(db, 'users', studentMail).withConverter(studentConverter);
    const sfDocRef1 = doc(db, 'users', clubMail).withConverter(clubConverter);
    try {
      await updateDoc(sfDocRef1, { members: arrayRemove(studentMail) })
      await updateDoc(sfDocRef, { joinedClubs: arrayRemove(clubMail) })
    } catch (e) {
      console.log("Failed " + e);
    }
  }

  async removeJoinedEvent(studentMail, eventId) {
    const sfDocRef = doc(db, 'users', studentMail).withConverter(studentConverter);
    const sfDocRef1 = doc(db, 'events', eventId);
    try {
      const docSnap = await getDoc(sfDocRef1);
      if (docSnap.exists()) {
        const eventQuota = docSnap.data().quota + 1;
        await updateDoc(sfDocRef1, { quota: eventQuota })
        await updateDoc(sfDocRef, { registeredEvents: arrayRemove(eventId) })
      }
    } catch (e) {
      console.log("Failed " + e);
    }
  }

}

const student_instance = new StudentsManager();
if (check(student_instance)) {
  Object.freeze(student_instance);
}
export default student_instance;
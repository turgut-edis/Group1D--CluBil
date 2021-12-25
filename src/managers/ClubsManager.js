import Club from "../objects/Club";
import check from "./Manager";
import { db } from "../firebase";
import { collection, deleteDoc, doc, setDoc, addDoc, getDoc, updateDoc } from "firebase/firestore/lite";
import { clubConverter, eventRequestConverter } from "../helpers/Converters";
import EventRequest from "../objects/EventRequest";

class ClubsManager {
    constructor (){
     if(! ClubsManager._clubM){
       ClubsManager._clubM = this;
     }
  
     return ClubsManager._clubM;
    }

    getInstance (){
        return ClubsManager._clubM;
    }
    
    async addClub (email, clubName, description, clubAdvisor, budget){
        const club = new Club(email, clubName, description, clubAdvisor, budget);
        try {
          const clubRef = doc(db, 'users', email).withConverter(clubConverter);
          await setDoc(clubRef, club);
          return true;
        } catch (error) {
          console.log(error);
          alert(error);
          return false;
        }
    }

    async deleteClub (clubEmail) {
      try {
        await deleteDoc(db, 'users', clubEmail);
      } catch(err) {
        console.log(err);
        alert(err);
      }
    }

    async editClubBudget (clubEmail, newBudget){
      const clubRef = doc(db, 'users', clubEmail).withConverter(clubConverter);
      const docClub = await getDoc(clubRef);
      if(docClub.exists()){
        await updateDoc(clubRef, {budget: newBudget});
      }
    }

    async approveClubBudgetRequest (requestId){
      try{
        const budgetReq = doc(db, 'budgetRequests', requestId);
        await updateDoc(budgetReq, {
          confirmed: true,
        })
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }

    async createClubBudgetRequest (clubEmail, request, reason){
      const budgetReq = await addDoc(collection(db, 'budgetRequests'), {
        club: clubEmail,
        requestAmount: request,
        reason: reason
      });
      const reqRef = doc(db, 'budgetRequests', budgetReq.id);
      await updateDoc(reqRef, {
        id: budgetReq.id
      })
    }

    async declineClubBudgetRequest (requestId){
      try{
        const budgetReq = doc(db, 'budgetRequests', requestId);
        await updateDoc(budgetReq, {
          confirmed: false,
        })
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }

    changeClubInformation (){}
    
    async addEventRequest (dateRequested, timeRequested, location, nname, club, quota, clubAdvisor, description, duration, advisorReview, confirmed, isOpen){
      const eventRequest = new EventRequest(0, dateRequested, timeRequested, location, nname, club, quota, clubAdvisor, description, duration, advisorReview, confirmed, isOpen);
      try {
        const req_ref = doc(collection(db, 'eventRequests')).withConverter(eventRequestConverter);
        eventRequest.setId(req_ref.id);
        await setDoc(req_ref, eventRequest);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  }
  
const clubs_instance = new ClubsManager();
if (check(clubs_instance)){
  Object.freeze(clubs_instance);  
    
}
export default clubs_instance;
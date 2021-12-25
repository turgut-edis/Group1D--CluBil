import Event from "../objects/Event";
import check from "./Manager";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { eventConverter } from "../helpers/Converters";


class EventsManager {
    constructor(){
     if(! EventsManager._eventM){
       EventsManager._eventM = this;
     }
  
     return EventsManager._eventM;
    }

    getInstance(){
        return EventsManager._eventM;
    }
    
    async addEvent(id, eventName, eventDate, eventTime, eventDuration, eventDescription, eventQuota, eventLocation, eventClub, eventAdvisor, advisorReview, isOpen){
        const event = new Event(id, eventDate,eventTime, eventLocation, eventName, eventClub, eventQuota, eventAdvisor, eventDescription, eventDuration, advisorReview, isOpen);
        try{
            const str_id = id.toString()
        const ref = doc(db,'events', str_id).withConverter(eventConverter);
        await setDoc(ref, event);
        return true;
        } catch (err) {
            console.error(err);
            alert(err.message);
            return false;
        }

    }

    async getEvent(eventId){
        const ref = doc(db, 'events', eventId).withConverter(eventConverter);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()){
            const event = docSnap.data();
            console.log(event);
        } else {
            console.log("No document");
        }
    }

    deleteEvent(eventId){

    }

    addStudentToEvent(eventId, studentId){}

    approveEventRequest(eventId){

    }

    declineEventRequest(eventId){}
    
  }
  
const eventManager_instance = new EventsManager();
if (check(eventManager_instance)){
  Object.freeze(eventManager_instance);  
    
}
export default eventManager_instance;
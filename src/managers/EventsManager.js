import Event from "../objects/Event";
import check from "./Manager";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayRemove, deleteDoc, arrayUnion, getDocs, collection } from "firebase/firestore/lite";
import { eventConverter, eventRequestConverter } from "../helpers/Converters";


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

    /* async getEvent(eventId){
        const ref = doc(db, 'events', eventId).withConverter(eventConverter);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()){
            const event = docSnap.data();
            console.log(event);
        } else {
            console.log("No document");
        }
    } */

    async deleteEvent(eventId){
        try {
            await deleteDoc(doc(db, 'events', eventId));
        }
        catch (e) {
            console.log("Failed " + e);
        }
    }

    async addStudentToEvent(eventId, studentMail){
        const eventRef = doc(db, 'events', eventId).withConverter(eventConverter);
        const docEvent = await getDoc(eventRef);
        if (docEvent.exists()){
            const event = docEvent.data();
            const eventQuota = event.getQuota() - 1;
            const participants = event.getParticipants();
            participants.push(studentMail);
            await updateDoc(eventRef, { participants: participants });
            await updateDoc(eventRef, { quota: eventQuota});
        } else {
            console.log("No document");
        }
    }

    async approveEventRequest(eventId){
        const eventReqRef = doc(db, 'eventRequests', eventId).withConverter(eventRequestConverter);
        const docEvent = await getDoc(eventReqRef);
        if (docEvent.exists()){
            const eventRequest = docEvent.data();
            const id = eventRequest.getId();
            const approve = eventRequest.setConfirmed(true);
            const eventRef = doc(db, 'events', id).withConverter(eventConverter);
            const newEvent = new Event(eventRequest.getId(), eventRequest.getDateRequested(),eventRequest.getTimeRequested(), 
                                        eventRequest.getLocation(), 
                                        eventRequest.getName(), 
                                        eventRequest.getClub(), 
                                        eventRequest.getQuota(), 
                                        eventRequest.getClubAdvisor(), 
                                        eventRequest.getDescription(), 
                                        eventRequest.getDuration(), 
                                        eventRequest.getAdvisorReview(),
                                        eventRequest.getIsOpen());
            await updateDoc(eventReqRef, { confirmed: approve });
            await setDoc(eventRef, newEvent);
        } else {
            console.log("No document");
        }
    } 

    declineEventRequest(eventId){}
    async getAllEvents(){
        var events = []
        const eventRef = await getDocs(collection(db, 'events').withConverter(eventConverter));
        eventRef.forEach((doc) => {
            events.push(doc.data());
        });
        return events;
    }
  }
  
  
const eventManager_instance = new EventsManager();
if (check(eventManager_instance)){
  Object.freeze(eventManager_instance);  
    
}


export default eventManager_instance;
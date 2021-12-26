import Event from "../objects/Event";
import check from "./Manager";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayRemove, deleteDoc, getDocs,addDoc, collection } from "firebase/firestore/lite";
import { clubConverter, eventConverter, eventRequestConverter } from "../helpers/Converters";

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
    
    async addEvent(eventName, eventDate, eventTime, eventDuration, eventDescription, eventQuota, eventLocation, eventClub, eventAdvisor, advisorReview, isOpen){
        const event = new Event(0, eventDate,eventTime, eventLocation, eventName, eventClub, eventQuota, eventAdvisor, eventDescription, eventDuration, advisorReview, isOpen);
        try{
            const eventRef = doc(collection(db,'events')).withConverter(eventConverter);
            event.setId(eventRef.id);
            await setDoc(eventRef, event);
            return true;
        } catch (err) {
            console.error(err);
            alert(err.message);
            return false;
        }
    }
    
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
        await getDoc(eventRef).then((docEvent) => {
            const event = docEvent.data();
            const eventQuota = event.getQuota() - 1;
            const participants = event.getParticipants();
            participants.push(studentMail);
            updateDoc(eventRef, { participants: participants }).then(() => {
                updateDoc(eventRef, { quota: eventQuota});
            });
        }).catch((error) => {console.log(error)});
    }

    async removeStudentFromEvent(eventId, studentMail){
        const eventRef = doc(db, 'events', eventId).withConverter(eventConverter);
        await getDoc(eventRef).then((docEvent) => {
            const event = docEvent.data();
            const eventQuota = event.getQuota() + 1;
            updateDoc(eventRef, { participants: arrayRemove(studentMail) }).then(() => {
                updateDoc(eventRef, { quota: eventQuota});
            });
        }).catch((error) => {console.log(error)});
    }

    async approveEventRequest(eventId){
        const eventReqRef = doc(db, 'eventRequests', eventId).withConverter(eventRequestConverter);
        await getDoc(eventReqRef).then((docEvent) => {
                const eventRequest = docEvent.data();
                console.log(eventRequest);
                this.addEvent(eventRequest.getName(), eventRequest.getDateRequested(),eventRequest.getTimeRequested(), eventRequest.getDuration(), eventRequest.getDescription()
                                            ,eventRequest.getQuota(),eventRequest.getLocation(), 
                                            eventRequest.getClub(), eventRequest.getClubAdvisor(),   
                                            eventRequest.getAdvisorReview(), eventRequest.getIsOpen());
                updateDoc(eventReqRef, { confirmed: true })
        }).catch((error) => {console.log(error)});
        
    } 

    async declineEventRequest(eventId){
        const eventReqRef = doc(db, 'eventRequests', eventId).withConverter(eventRequestConverter);
        await getDoc(eventReqRef).then((docEvent) => {
            deleteDoc(eventReqRef);
        }).catch((error) => {console.log(error)});
    }
    async getAllEvents(){
        var events = []
        await getDocs(collection(db, 'events').withConverter(eventConverter)).then((eventRef) => {
            eventRef.forEach((doc) => {
                events.push(doc.data());
            });
        }).catch((error) => {console.log(error)});
        return events;
    }

    async getAllUsers(){
        var events = []
        await getDocs(collection(db, 'users').withConverter(clubConverter)).then((eventRef) => {
            eventRef.forEach((doc) => {
                events.push(doc.data());
            });
        }).catch((error) => {console.log(error)});
        return events;
    }

    async getAllEventRequests() {
        var eventReqs = []
        await getDocs(collection(db, 'eventRequests').withConverter(eventRequestConverter)).then((eventRef) => {
            eventRef.forEach((doc) => {
                if( !doc.data().getConfirmed())
                    eventReqs.push(doc.data());
            });
        }).catch((error) => {console.log(error)});
        return eventReqs;
    }
  }
  
const eventManager_instance = new EventsManager();
if (check(eventManager_instance)){
  Object.freeze(eventManager_instance);  
    
}

export default eventManager_instance;
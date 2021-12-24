import check from "./Manager";

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
    
    addEvent(eventName, eventDate, eventTime, eventDescription, eventQuota){

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
const manager = require("./Manager");

class EventsManager {
    constructor(){
     if(! EventsManager.instance){
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
  
const instance = new EventsManager();
if (manager.check(instance)){
  Object.freeze(instance);  
    module.exports={instance}
}
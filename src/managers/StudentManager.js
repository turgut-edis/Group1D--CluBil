const manager = require("./Manager");

class StudentsManager {
    constructor(){
     if(! StudentsManager.instance){
       StudentsManager._studentM = this;
     }
  
     return StudentsManager._studentM;
    }

    getInstance(){
        return StudentsManager._studentM;
    }
    
    editProfile() {

    }

    addJoinedClub (studentId, clubId){
        return studentId;              
    };

    addJoinedEvent (studentId, eventId){

    }

    removeJoinedClub (clubId){

    }

    removeJoinedEvent (eventId){

    }
    
  }
  
const instance = new StudentsManager();
if (manager.check(instance)){
  Object.freeze(instance);  
    module.exports={instance}
}
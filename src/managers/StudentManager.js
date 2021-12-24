import check from "./Manager";

class StudentsManager {
    constructor(){
     if(! StudentsManager._studentM){
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
  
const student_instance = new StudentsManager();
if (check(student_instance)){
    Object.freeze(student_instance);  
}
export default student_instance;
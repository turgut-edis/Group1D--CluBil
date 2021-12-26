import studentManager_instance from "./StudentManager";
import  publicEvent_instance from "./PublicEventManager";
import  clubManager_instance from "./ClubsManager";
import eventManager_instance from "./EventsManager";
import loginManager_instance from "./LoginManager";

function Manage(managerType){
    if (managerType === "login"){
        return loginManager_instance.getInstance();
    } else if (managerType === "student"){
        return studentManager_instance.getInstance();
    } else if (managerType === "club"){
        return clubManager_instance.getInstance();
    } else if (managerType === "event"){
        return eventManager_instance.getInstance();
    } else if (managerType === "publicevent"){
        return publicEvent_instance.getInstance();
    } else {
        return null;
    } 
}

export default Manage;
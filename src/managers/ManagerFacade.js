const smanager = require("./StudentManager");
const pemanager = require("./PublicEventManager");
const cmanager = require("./ClubsManager");
const emanager = require("./EventsManager");
const lmanager = require("./LoginManager");

function manage(managerType){
    if (managerType === "login"){
        return lmanager;
    } else if (managerType === "student"){
        return smanager;
    } else if (managerType === "club"){
        return cmanager;
    } else if (managerType === "event"){
        return emanager;
    } else if (managerType === "publicevent"){
        return pemanager;
    } else {
        return null;
    } 
}

module.exports={manage}
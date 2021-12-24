const manager = require("./Manager");

class ClubsManager {
    constructor (){
     if(! ClubsManager.instance){
       ClubsManager._clubM = this;
     }
  
     return ClubsManager._clubM;
    }

    getInstance (){
        return ClubsManager._clubM;
    }
    
    addClub (clubName){

    }

    deleteClub (clubId) {

    }

    editClubBudget (clubId, newBudget){}

    approveClubBudgetRequest (requestId){

    }

    createClubBudgetRequest (){

    }

    declineClubBudgetRequest (){

    }

    changeClubInformation (){}
    
    addEventRequest (){}
  }
  
const instance = new ClubsManager();
if (manager.check(instance)){
  Object.freeze(instance);  
    module.exports={instance}
}
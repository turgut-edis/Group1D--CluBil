import check from "./Manager";

class ClubsManager {
    constructor (){
     if(! ClubsManager._clubM){
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
  
const clubs_instance = new ClubsManager();
if (check(clubs_instance)){
  Object.freeze(clubs_instance);  
    
}
export default clubs_instance;
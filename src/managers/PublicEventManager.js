import check from "./Manager";

class PublicEventManager {
    constructor(){
     if(! PublicEventManager._pem){
       PublicEventManager._pem = this;
     }
  
     return PublicEventManager._pem;
    }

    getInstance(){
        return PublicEventManager._pem;
    }
    
    getAllPublicEvents (){}
    
  }
  
const publicEvent_instance = new PublicEventManager();
if (check(publicEvent_instance)){
  Object.freeze(publicEvent_instance);  
    
}
export default publicEvent_instance;
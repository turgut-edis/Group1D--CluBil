const manager = require("./Manager");

class PublicEventManager {
    constructor(){
     if(! PublicEventManager.instance){
       PublicEventManager._pem = this;
     }
  
     return PublicEventManager._pem;
    }

    getInstance(){
        return PublicEventManager._pem;
    }
    
    getAllPublicEvents (){}
    
  }
  
const instance = new PublicEventManager();
if (manager.check(instance)){
  Object.freeze(instance);  
    module.exports={instance}
}
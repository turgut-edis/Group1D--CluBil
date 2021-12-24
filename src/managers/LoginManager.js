const manager = require("./Manager");

class LoginManager {
    constructor (){
     if(! LoginManager.instance){
       LoginManager._logM = this;
     }
  
     return LoginManager._logM;
    }

    getInstance (){
        return LoginManager._logM;
    }
    
    login (credential, passwordEntered){}
    
  }
  
const instance = new LoginManager();
if (manager.check(instance)){
  Object.freeze(instance);  
    module.exports={instance}
}
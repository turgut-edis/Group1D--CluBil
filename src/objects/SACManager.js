import { User } from "./User";

class SACManager extends User{
    constructor(id, password, currentManagerName, adminPrivelegeAccess = true){
        super(id, password, adminPrivelegeAccess);
        this._adminPrivelegeAccess = adminPrivelegeAccess;
        this._currentManagerName = currentManagerName;
    }
}

module.exports = {SACManager}
import { User } from "./User";

class SACManager extends User {
    constructor(id, password, currentManagerName, adminPrivelegeAccess = true){
        super(id, password, adminPrivelegeAccess);
        this._adminPrivelegeAccess = adminPrivelegeAccess;
        this._currentManagerName = currentManagerName;
    }

    getCurrentManager() {
        return this._currentManagerName;
    }

    setCurrentManager(manager) {
        this._currentManagerName = manager;
    }
}

module.exports = {SACManager}
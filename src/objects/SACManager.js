import User from "./User";

class SACManager extends User {
    constructor(id, currentManagerName, adminPrivilegeAccess = true){
        super(id, adminPrivilegeAccess);
        this._adminPrivilegeAccess = adminPrivilegeAccess;
        this._currentManagerName = currentManagerName;
    }

    getCurrentManager() {
        return this._currentManagerName;
    }

    setCurrentManager(manager) {
        this._currentManagerName = manager;
    }
}

export default SACManager;
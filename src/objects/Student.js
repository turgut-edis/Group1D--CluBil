import { User } from "./User";

class Student extends User{
    constructor(id, password, nname, biography){
        super(id, password, false);
        this._name = nname;
        this._biography = biography; 
        this._registeredEvents = []
        this._joinedClubs = []; 
        this._tags = [];
    }
}

module.exports = {Student}
import { User } from "./User";

class Student extends User {
    constructor(id, password, nname, biography){
        super(id, password, false);
        this._name = nname;
        this._biography = biography; 
        this._registeredEvents = []
        this._joinedClubs = []; 
        this._tags = [];
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getBio() {
        return this._biography;
    }

    setBio(bio) {
        this._biography = bio;
    }

    getRegisteredEvents() {
        return this._registeredEvents;
    }

    addRegisteredEvent(event) {
        this._registeredEvents.push(event);
    }

    getJoinedClubs() {
        return this._joinedClubs;
    }

    addJoinedClub(club) {
        this._joinedClubs.push(club);
    }

    getTags() {
        return this._tags;
    }

    addTag(tag) {
        this._tags.push(tag);
    }
}

module.exports = {Student}
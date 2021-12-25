import User from "./User";

class Club extends User{
    constructor(id, cname, description, clubAdvisor){
        super(id, false);
        this._members = [];
        this._events = [];
        this._eventRequests = [];
        this._name = cname;
        this._description = description;
        this._clubTags = [];
        this._clubAdvisor = clubAdvisor;
    }

    getDescription() {
        return this._description;
    }

    setDescription(description) {
        this._description = description;
    }

    getMembers() {
        return this._members;
    }

    addMember(member) {
        this._members.push(member);
    }

    getEvents() {
        return this._events;
    }

    addEvent(event) {
        this._events.push(event);
    }

    setEvents(events) {
        this._events = events;
    }

    getEventRequests() {
        return this._eventRequests;
    }

    addEventRequest(request) {
        this._eventRequests.push(request);
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._cname = name;
    }

    getTags() {
        return this._clubTags;
    }

    addTag(tag) {
        this._clubTags.push(tag);
    }

    setTags(tags) {
        this._clubTags = tags;
    }

    setMembers(members) {
        this._members = members;
    }

    setEventRequests(requests) {
        this._eventRequests = requests;
    }

    

    getClubAdvisor() {
        return this._clubAdvisor;
    }

    setClubAdvisor(advisor) {
        this._clubAdvisor = advisor;
    }
}

export default Club;
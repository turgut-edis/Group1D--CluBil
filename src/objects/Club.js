class Club {
    constructor(cname, description, clubAdvisor){
        this._members = [];
        this._events = [];
        this._eventRequests = [];
        this._name = cname;
        this._description = description;
        this._clubTags = [];
        this._clubAdvisor = clubAdvisor;
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

    getClubAdvisor() {
        return this._clubAdvisor;
    }

    setClubAdvisor(advisor) {
        this._clubAdvisor = advisor;
    }
}

module.exports={Club}
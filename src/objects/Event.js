import EventRequest from './EventRequest';

class Event extends EventRequest {
    constructor(id, date, time, location, name, club, quota, clubAdvisor, description, duration, advisorReview, isOpen){
        super(id, date, time, location, name, club, quota, clubAdvisor, description, duration, advisorReview, true, isOpen);
        this._participants = []
    }

    getParticipants() {
        return this._participants;
    }

    setParticipants(participants) {
        this._participants = participants;
    }
    
    addParticipant(participant) {
        this._participants.push(participant);
    }
}

export default Event;
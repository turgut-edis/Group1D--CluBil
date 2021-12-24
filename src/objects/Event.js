const { EventRequest } = require("./EventRequest");

class Event extends EventRequest{
    constructor(date, time, location, name, club, clubAdvisor, description, duration, advisorReview){
        super(date, time, location, name, club, clubAdvisor, description, duration, advisorReview, true);
        this._participants = []
    }

    
}

module.exports = {Event}
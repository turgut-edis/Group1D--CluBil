
class EventRequest {
    constructor(dateRequested, timeRequested, location, name, club, clubAdvisor, description, duration, advisorReview, confirmed){
        this._dateRequested = new Date(dateRequested+" "+timeRequested+":00");
        this._timeRequested = this.getDateRequested().getHours();
        this._location = location;
        this._club = club;
        this._name = name;
        this._description = description;
        this._duration = duration;
        this._advisorReview = advisorReview;
        this._clubAdvisor = clubAdvisor;
        this._confirmed = confirmed;
    }

    getDateRequested() {
        return this._dateRequested;
    }

    getTimeRequested() {
        return this._timeRequested;
    }

    getLocation() {
        return this._location;
    }

    getClub() {
        return this._club;
    }

    getName() {
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    getDuration() {
        return this._duration;
    }

    getAdvisorReview() {
        return this._advisorReview;
    }

    getClubAdvisor() {
        return this._clubAdvisor;
    }

    getConfirmed() {
        return this._confirmed;
    }

    setDateRequested(dateRequested) {
        this._dateRequested = dateRequested;
    }

    setTimeRequested(timeRequested) {
        this._timeRequested = timeRequested;
    }

    setLocation(location) {
        this._location = location;
    }

    setClub(club) {
        this._club = club;
    }

    setName(name) {
        this._name = name;
    }

    setDescription(description) {
        this._description = description;
    }
    
    setDuration(duration) {
        this._duration = duration;
    }

    setAdvisorReview(advisorReview) {
        this._advisorReview = advisorReview;
    }

    setClubAdvisor(clubAdvisor) {
        this._clubAdvisor = clubAdvisor;
    }

    setConfirmed(confirmed) {
        this._confirmed = confirmed;
    }

}

module.exports= { EventRequest};
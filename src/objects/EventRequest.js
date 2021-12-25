import { Timestamp } from "firebase/firestore/lite";

class EventRequest {
    constructor(id, dateRequested, timeRequested, location, name, club, quota, clubAdvisor, description, duration, advisorReview, confirmed, isOpen){
        this._id = id;
        this._dateRequested = dateRequested
        this._timeRequested = timeRequested
        this._location = location;
        this._club = club;
        this._quota = quota;
        this._name = name;
        this._description = description;
        this._duration = duration;
        this._advisorReview = advisorReview;
        this._clubAdvisor = clubAdvisor;
        this._confirmed = confirmed;
        this._isOpen = isOpen;
        
    }

    getId() {
        return this._id;
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

    getQuota(){
        return this._quota;
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

    getIsOpen() {
        return this._isOpen;
    }

    setId(id) {
        this._id = id;
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

    setQuota(quota) {
        this._quota = quota;
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

    setIsOpen(isOpen) {
        this._isOpen = isOpen;
    }

}

export default EventRequest;
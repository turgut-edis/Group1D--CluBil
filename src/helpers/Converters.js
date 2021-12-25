import Student from "../objects/Student";
import Event from "../objects/Event";
import Club from "../objects/Club";
import EventRequest from "../objects/EventRequest";

const eventConverter = {
    toFirestore: (event) => {
        return {
            id: event.getId(),
            date: event.getDateRequested(), 
            time: event.getTimeRequested(), 
            location: event.getLocation(), 
            nname: event.getName(), 
            participants: event.getParticipants(),
            club: event.getClub(), 
            quota: event.getQuota(), 
            clubAdvisor: event.getClubAdvisor(), 
            description: event.getDescription(), 
            duration: event.getDuration(), 
            advisorReview: event.getAdvisorReview(),
            isOpen: event.getIsOpen() 
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        var event =  new Event(data.id, data.date, data.time, data.location, data.nname, data.club, data.quota, data.advisor, data.description, data.duration, data.advisorReview, data.isOpen);
        event.setParticipants(data.participants);
        return event;
    }
};

const studentConverter = {
    toFirestore: (student) => {
        return {
            name: student.getName(),
            biography: student.getBio(),
            registeredEvents: student.getRegisteredEvents(),
            tags: student.getTags(),
            type: "student",
            joinedClubs: student.getJoinedClubs()
        };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      var student = new Student(options, data.name, data.biography);
      student.setRegisteredEvents(data.registeredEvents);
      student.setJoinedClubs(data.joinedClubs);
      student.setTags(data.tags);
      return student;
    }
};

const clubConverter = {
    toFirestore: (club) => {
        return {
            name: club.getName(),
            description: club.getDescription(),
            clubAdvisor: club.getClubAdvisor(),
            type: "club",
            members: club.getMembers(),
            joinedClubs: club.getName(),
            events: club.getEvents(),
            eventRequest: club.getEventRequests()
        };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      var club = new Club(options, data.name, data.description, data.clubAdvisor);
      club.setEvents(data.events);
      club.setEventRequests(data.eventRequest);
      club.setMembers(data.members);

      return club;
    }
};

const eventRequestConverter = {
    toFirestore: (event) => {
        return {
            id: event.getId(),
            dateRequested: event.getDateRequested(), 
            timeRequested: event.getTimeRequested(), 
            location: event.getLocation(), 
            nname: event.getName(), 
            club: event.getClub(), 
            quota: event.getQuota(), 
            clubAdvisor: event.getClubAdvisor(), 
            description: event.getDescription(), 
            duration: event.getDuration(), 
            advisorReview: event.getAdvisorReview(),
            confirmed: event.getConfirmed(),
            isOpen: event.getIsOpen() 
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new EventRequest(data.id, data.dateRequested, data.timeRequested, data.location, data.nname, data.club, data.quota, data.advisor, data.description, data.duration, data.advisorReview, data.confirmed, data.isOpen);
    }
};

export {
    eventConverter,
    studentConverter,
    clubConverter,
    eventRequestConverter
}
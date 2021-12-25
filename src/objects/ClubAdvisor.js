const { User } = require("./User");

class ClubAdvisor extends User {
    constructor(id, nname, advisingClub){
        super(id, false);
        this._name = nname;
        this._advisingClub = advisingClub;
    }

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;
    }

    getAdvisingClub() {
        return this._advisingClub;
    }

    setAdvisingClub(club) {
        this._advisingClub = club
    }
}

export default ClubAdvisor;
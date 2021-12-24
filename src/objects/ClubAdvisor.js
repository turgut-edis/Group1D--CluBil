const { User } = require("./User");

class ClubAdvisor extends User {
    constructor(id, password, nname, advisingClub){
        super(id, password, false);
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

module.exports={ClubAdvisor}
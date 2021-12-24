const { User } = require("./User");

class ClubAdvisor extends User{
    constructor(id, password, nname, advisingClub){
        super(id, password, false);
        this._name = nname;
        this._advisingClub = advisingClub;
    }


}

module.exports={ClubAdvisor}
class User {
    constructor(id, password, adminPrivelegeAccess){
        this._id = id;
        this._adminPrivelegeAccess = adminPrivelegeAccess;
    }

    getId () {
        return this._id;
    }

    setId(id) {
        this._id = id;
    }

    getAccess() {
        return this._adminPrivelegeAccess;
    }

    setAccess(access) {
        this._adminPrivelegeAccess = access;
    }
}
module.exports = {User}
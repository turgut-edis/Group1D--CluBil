class User {
    constructor(email, adminPrivilegeAccess){
        this._email = email;
        this._adminPrivilegeAccess = adminPrivilegeAccess;
    }

    getEmail () {
        return this._email;
    }

    setEmail(email) {
        this._email = email;
    }

    getAccess() {
        return this._adminPrivilegeAccess;
    }

    setAccess(access) {
        this._adminPrivilegeAccess = access;
    }
}

export default User;
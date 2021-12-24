class User{
    constructor(id, password, adminPrivelegeAccess){
        this._id = id;
        this._password = password;
        this._adminPrivelegeAccess = adminPrivelegeAccess;
    }
}
module.exports = {User}
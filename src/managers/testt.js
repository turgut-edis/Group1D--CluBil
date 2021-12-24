const { check } = require("./Manager");

function StudentManager() {
	// the cached instance
	var studentM;
    var initialized = false;
if (initialized){
	// rewrite the constructor
	StudentManager = function() {
        if(!initialized){
            throw new Error("The constructor is private")
        }
		return studentM;
	};

	// carry over the prototype
	StudentManager.prototype = this;

    

	// the instance
	studentM = StudentManager.getInstance;

	// reset the constructor pointer
	studentM.constructor = StudentManager;

	// all the functionality
	studentM.editProfile = function(){

    };
	studentM.addJoinedClub = function(studentId, clubId){
        return studentId;              
    };
    return studentM;
} else {

    StudentManager.getInstance = function(){
        if(!studentM){
            initialized = true;
            studentM = new StudentManager();
            return studentM;
        }
        else
            return studentM;
    }

    return new Error("The constructor is private");
}
}

a = StudentManager();
b = a.addJoinedClub(12,13);
console.log(b);
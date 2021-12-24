const Manager = {
    getInstance: function getInstance(Manager) {
        return Manager;
    }
};

const StudentManager = {
    getInstance: function getInstance(StudentManager) {
        return StudentManager;
    }
}

var duck = {  
    appearance: "feathers",  
    quack: function duck_quack(what) {  
        return (what + " quack-quack!");  
    },  
    color: "black"  
};

var someAnimal = {  
    appearance: "feathers",  
    quack: function animal_quack(what) {  
        return (what + " whoof-whoof!");  
    },  
    eyes: "yellow"  
};



function check(who) {  
    if ((typeof who.getInstance == "function")) {  
        who.getInstance(who);  
        return true;  
    }  
    return false;  
}

module.exports = {
    Manager,
    check
};

console.log(check(Manager));  // true
check(StudentManager);  // true

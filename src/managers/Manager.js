const Manager = {
    getInstance: function getInstance(Manager) {
        return Manager;
    }
};

function check(who) {  
    if ((typeof who.getInstance == "function")) {  
        who.getInstance(who);  
        return true;  
    }  
    return false;  
}

module.exports = {
    check
};
const Manager = {
    getInstance: function getInstance() {
        return Manager;
    }
};

export default function check(who) {  
    if ((typeof who.getInstance == "function")) {  
        who.getInstance(who);  
        return true;  
    }  
    return false;  
}
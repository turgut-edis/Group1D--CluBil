import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import check from "./Manager";

class LoginManager {
    constructor() {
        if (!LoginManager._logM) {
            LoginManager._logM = this;
        }
        return LoginManager._logM;
    }

    getInstance() {
        return LoginManager._logM;
    }

    async login(credential, passwordEntered) {
        try {
            await signInWithEmailAndPassword(auth, credential, passwordEntered);
            return true;
        } catch (err) {
            console.error(err);
            alert(err.message);
            return false;
        }
    }
}

const login_instance = new LoginManager();
if (check(login_instance)) {
    Object.freeze(login_instance);
}
export default login_instance;

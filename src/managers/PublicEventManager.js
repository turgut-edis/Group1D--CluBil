import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";
import { eventConverter } from "../helpers/Converters";
import check from "./Manager";

class PublicEventManager {
  constructor() {
    if (!PublicEventManager._pem) {
      PublicEventManager._pem = this;
    }

    return PublicEventManager._pem;
  }

  getInstance() {
    return PublicEventManager._pem;
  }

  async getAllPublicEvents() {
    var public_events = [];
    const publicEvents = await getDocs(
      collection(db, "events").withConverter(eventConverter)
    );

    publicEvents.forEach((doc) => {
      if (doc.data().getIsOpen() === 1) {
        public_events.push(doc.data());
      }
    });
    return public_events;
  }
}
  
const publicEvent_instance = new PublicEventManager();
if (check(publicEvent_instance)){
  Object.freeze(publicEvent_instance);  
    
}
export default publicEvent_instance;
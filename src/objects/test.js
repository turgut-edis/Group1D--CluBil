const EventRequest = require("./EventRequest").default;

const date = 'December 21, 2021';
const time = '19:00';
const nname= "Pizza Party";
const location = "B Building";
const club = "ACM";
const description = "dfkfkgbkflgşl";
const advisorReview = "Nice";
const duration = "90";

const a = new EventRequest.EventRequest(date, time, location, nname, club, description, duration, advisorReview);
console.log(new Date('December 21, 2021 09:00:00').getUTCHours());
console.log(a.getDateRequested());
console.log(a.getTimeRequested());
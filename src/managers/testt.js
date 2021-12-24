const a = require("./ManagerFacade").default;

const ab = a.manage("login").getInstance().login("admin@admin.com", "123456");

console.log(ab)
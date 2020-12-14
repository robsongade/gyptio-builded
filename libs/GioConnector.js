"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../entity/User");
global._permissions = {
    check: function (module, type_permission) {
        if (global._permissions[module] && global._permissions[module][type_permission]) {
            return true;
        }
    },
    clear: function () {
        for (var x in global._permissions) {
            var value = global._permissions[x];
            if (typeof value == "object") {
                delete global._permissions[x];
            }
        }
    }
};
exports.GioConnector = {
    User: {
        Entity: User_1.User,
        Enum: {
            UserRoles: User_1.UserRoles
        }
    }
};
//# sourceMappingURL=GioConnector.js.map
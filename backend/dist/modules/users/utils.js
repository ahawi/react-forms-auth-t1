"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = void 0;
const findUserByEmail = (db, email) => {
    return Object.values(db).find(({ email: existingEmail }) => existingEmail === email);
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=utils.js.map
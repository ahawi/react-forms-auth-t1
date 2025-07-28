"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const utils_1 = require("./utils");
class UsersService {
    usersDB = {
        '1': {
            name: 'Admin',
            id: '1',
            surName: 'Admin',
            fullName: 'Admin Admin',
            password: 'admin',
            email: 'admin@inno.tech',
        },
    };
    getAll() {
        return Object.values(this.usersDB).map(({ password, ...rest }) => ({ ...rest }));
    }
    createUser({ email, name, surName, ...rest }) {
        const id = (0, uuid_1.v4)();
        const checkIsEmailUnique = (0, utils_1.findUserByEmail)(this.usersDB, email);
        if (checkIsEmailUnique)
            throw new common_1.HttpException('Already exist', common_1.HttpStatus.CONFLICT);
        const fullName = `${name || ''} ${surName || ''}`.trim();
        this.usersDB[id] = { ...rest, email, name, surName, fullName, id };
        return { name, id };
    }
    findById(id) {
        const user = this.usersDB[id];
        if (!user)
            throw new common_1.NotFoundException();
        const { password, ...response } = user;
        return response;
    }
    updateUser(id, data) {
        const user = this.usersDB[id];
        if (!user) {
            throw new common_1.NotFoundException();
        }
        const updatedUser = { ...user };
        if (data.name !== undefined) {
            updatedUser.name = data.name;
        }
        if (data.surName !== undefined) {
            updatedUser.surName = data.surName;
        }
        if (data.birthDate !== undefined) {
            updatedUser.birthDate = data.birthDate;
        }
        if (data.telephone !== undefined) {
            updatedUser.telephone = data.telephone;
        }
        if (data.employment !== undefined) {
            updatedUser.employment = data.employment;
        }
        if (data.userAgreement !== undefined) {
            updatedUser.userAgreement = data.userAgreement;
        }
        if (data.password !== undefined && data.password !== '') {
            updatedUser.password = data.password;
        }
        updatedUser.fullName = [updatedUser.name, updatedUser.surName]
            .filter(Boolean)
            .join(' ')
            .trim();
        this.usersDB[id] = updatedUser;
        return 'ok';
    }
    findOneByEmail(email) {
        const user = (0, utils_1.findUserByEmail)(this.usersDB, email);
        return user || null;
    }
    deleteUser(id) {
        delete this.usersDB[id];
    }
}
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
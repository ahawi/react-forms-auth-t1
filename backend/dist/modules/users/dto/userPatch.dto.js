"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPatchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UserPatchDto {
    name;
    surName;
    birthDate;
    telephone;
    employment;
    userAgreement;
    password;
}
exports.UserPatchDto = UserPatchDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    (0, swagger_1.ApiProperty)({ description: 'User name', nullable: false }),
    __metadata("design:type", String)
], UserPatchDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(64),
    (0, swagger_1.ApiProperty)({ description: 'User surname', nullable: false }),
    __metadata("design:type", String)
], UserPatchDto.prototype, "surName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({ description: 'User birthday', nullable: true }),
    __metadata("design:type", Date)
], UserPatchDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('RU'),
    (0, swagger_1.ApiProperty)({ description: 'User phone', nullable: true }),
    __metadata("design:type", String)
], UserPatchDto.prototype, "telephone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'User employment', nullable: true }),
    __metadata("design:type", String)
], UserPatchDto.prototype, "employment", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({ description: 'User agreement', nullable: true }),
    __metadata("design:type", Boolean)
], UserPatchDto.prototype, "userAgreement", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: 'The password must be at least 4 characters long' }),
    (0, swagger_1.ApiProperty)({
        description: 'User password (optional, for update)',
        nullable: true,
    }),
    __metadata("design:type", String)
], UserPatchDto.prototype, "password", void 0);
//# sourceMappingURL=userPatch.dto.js.map
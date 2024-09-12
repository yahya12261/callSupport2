"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArabicGender = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (exports.Gender = Gender = {}));
const getArabicGender = (gender) => {
    switch (gender) {
        case 'male':
            return "ذكر";
        case 'female':
            return "انثى";
        default:
            return "غير معرف";
    }
};
exports.getArabicGender = getArabicGender;
//# sourceMappingURL=Gender.js.map
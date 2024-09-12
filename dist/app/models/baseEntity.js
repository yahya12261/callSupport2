"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNameFromPriority = exports.createKeys = void 0;
const createKeys = () => {
    return Object.keys({}).reduce((acc, key) => {
        acc[key] = key;
        return acc;
    }, {});
};
exports.createKeys = createKeys;
const getNameFromPriority = (priority) => {
    return priority.toString();
};
exports.getNameFromPriority = getNameFromPriority;
//# sourceMappingURL=baseEntity.js.map
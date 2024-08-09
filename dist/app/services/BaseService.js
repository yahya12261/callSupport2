"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const apierror_1 = __importDefault(require("../global/response/apierror"));
const errorcode_1 = __importDefault(require("../global/response/errorcode"));
const WhereOperations_1 = require("../enum/WhereOperations");
class BaseService {
    getById(id) {
        throw new Error("Method not implemented.");
    }
    getRepository() {
        return (0, typeorm_1.getRepository)(this.getEntityClass());
    }
    constructor(entityConstructor) {
        this.entityConstructor = entityConstructor;
    }
    getAll(requestElement) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = this.getRepository();
                requestElement.page = requestElement.page ? requestElement.page : 1;
                requestElement.pageSize = requestElement.pageSize
                    ? requestElement.pageSize
                    : 20;
                const order = this.buildOrder(requestElement);
                var whereConditions = Object.assign({}, this.buildWhereConditions(requestElement));
                if ((yield this.getDynamicData(requestElement)).length > 0) {
                    console.log(yield this.getDynamicData(requestElement));
                    whereConditions = Object.assign(Object.assign({}, whereConditions), { id: (0, typeorm_1.In)(yield this.getDynamicData(requestElement)) });
                }
                const findOptions = {
                    skip: Math.abs((requestElement.page - 1) * requestElement.pageSize),
                    take: requestElement.pageSize,
                    order,
                    where: whereConditions,
                };
                if (requestElement.relations) {
                    findOptions.relations = Object.keys(requestElement.relations);
                }
                if (requestElement.join) {
                    findOptions.join = requestElement.join;
                }
                const [data, total] = yield repository.findAndCount(findOptions);
                const result = {
                    data: data,
                    currentPage: requestElement.page,
                    total: total,
                    pageSize: requestElement.pageSize,
                };
                return {
                    result,
                };
            }
            catch (e) {
                console.error("Error fetching entities:", e);
                const result = {
                    data: [],
                    currentPage: 0,
                    total: 0,
                    pageSize: requestElement.pageSize,
                };
                return {
                    result,
                };
            }
        });
    }
    getSelectOption() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = this.getRepository();
                const data = yield repository.find({
                    where: { isActive: true },
                    select: ["id", "arabicLabel"],
                });
                return data;
            }
            catch (e) {
                console.error("Error fetching entities:", e);
                return Promise.reject(new apierror_1.default("cann't fetch data" + e, errorcode_1.default.UndefinedCode));
            }
        });
    }
    buildWhereConditions(requestElement) {
        const whereConditions = {};
        if (requestElement.search) {
            requestElement.search.forEach((searchField) => {
                if (!searchField.queryConfig) {
                    const { name, type, operation, value } = searchField;
                    if (value) {
                        const fieldNames = name.split(".");
                        let currentConditions = whereConditions;
                        for (let i = 0; i < fieldNames.length; i++) {
                            const fieldName = fieldNames[i];
                            if (i === fieldNames.length - 1) {
                                // Last field name, apply the condition
                                switch (operation) {
                                    case WhereOperations_1.QueryOperator.EQUAL:
                                        currentConditions[fieldName] = value;
                                        break;
                                    case WhereOperations_1.QueryOperator.NOT_EQUAL:
                                        currentConditions[fieldName] = (0, typeorm_1.Not)(value);
                                        break;
                                    case WhereOperations_1.QueryOperator.GREATER_THAN:
                                        currentConditions[fieldName] = (0, typeorm_1.MoreThan)(value);
                                        break;
                                    case WhereOperations_1.QueryOperator.GREATER_THAN_OR_EQUAL:
                                        currentConditions[fieldName] = (0, typeorm_1.MoreThanOrEqual)(value);
                                        break;
                                    case WhereOperations_1.QueryOperator.LESS_THAN:
                                        currentConditions[fieldName] = (0, typeorm_1.LessThan)(value);
                                        break;
                                    case WhereOperations_1.QueryOperator.LESS_THAN_OR_EQUAL:
                                        currentConditions[fieldName] = (0, typeorm_1.LessThanOrEqual)(value);
                                        break;
                                    case WhereOperations_1.QueryOperator.LIKE:
                                        currentConditions[fieldName] = (0, typeorm_1.Like)(`%${value}%`);
                                        break;
                                    case WhereOperations_1.QueryOperator.ILIKE:
                                        currentConditions[fieldName] = (0, typeorm_1.Like)(`%${value}%`);
                                        break;
                                    case WhereOperations_1.QueryOperator.NOT_LIKE:
                                        currentConditions[fieldName] = (0, typeorm_1.Not)((0, typeorm_1.Like)(`%${value}%`));
                                        break;
                                    case WhereOperations_1.QueryOperator.NOT_ILIKE:
                                        currentConditions[fieldName] = (0, typeorm_1.Not)((0, typeorm_1.Like)(`%${value}%`));
                                        break;
                                    case WhereOperations_1.QueryOperator.BEGINS_WITH:
                                        currentConditions[fieldName] = (0, typeorm_1.Like)(`${value}%`);
                                        break;
                                    case WhereOperations_1.QueryOperator.ENDS_WITH:
                                        currentConditions[fieldName] = (0, typeorm_1.Like)(`%${value}`);
                                        break;
                                    case WhereOperations_1.QueryOperator.IN:
                                        currentConditions[fieldName] = (0, typeorm_1.In)(value + "".split(",").map((v) => v.trim()));
                                        break;
                                    case WhereOperations_1.QueryOperator.NOT_IN:
                                        currentConditions[fieldName] = (0, typeorm_1.Not)((0, typeorm_1.In)(value + "".split(",").map((v) => v.trim())));
                                        break;
                                    case WhereOperations_1.QueryOperator.BETWEEN:
                                        const [start, end] = value.split(',').map((v) => v.trim());
                                        currentConditions[fieldName] = (0, typeorm_1.Between)(start, end);
                                        break;
                                    case WhereOperations_1.QueryOperator.NOT_BETWEEN:
                                        const [notStart, notEnd] = value + "".split(",").map((v) => v.trim());
                                        currentConditions[fieldName] = (0, typeorm_1.Not)((0, typeorm_1.Between)(notStart, notEnd));
                                        break;
                                    case WhereOperations_1.QueryOperator.IS:
                                        currentConditions[fieldName] = (0, typeorm_1.IsNull)();
                                        break;
                                    case WhereOperations_1.QueryOperator.IS_NOT:
                                        currentConditions[fieldName] = (0, typeorm_1.Not)((0, typeorm_1.IsNull)());
                                        break;
                                    default:
                                        break;
                                }
                            }
                            else {
                                // Nested field, create a new object to hold the condition
                                if (!currentConditions[fieldName]) {
                                    currentConditions[fieldName] = {};
                                }
                                currentConditions = currentConditions[fieldName];
                            }
                        }
                    }
                }
            });
        }
        console.log(whereConditions);
        return whereConditions;
    }
    buildOrder(requestElement) {
        var _a, _b;
        const order = {};
        const orderBy = (_b = (_a = requestElement.orderBy) === null || _a === void 0 ? void 0 : _a.split(",").map((field) => field.trim())) !== null && _b !== void 0 ? _b : ["createdAt"];
        orderBy.forEach((field) => {
            order[field] = requestElement.order;
        });
        return order;
    }
    add(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            try {
                const entity = new this.entityConstructor();
                // Create an instance of the entity
                entity.fillFromModel(model);
                console.log(model);
                const saveEntity = yield repository.save(entity);
                return saveEntity;
            }
            catch (e) {
                console.error("Error adding entity:", e);
                return Promise.reject(new apierror_1.default("Already exists", errorcode_1.default.DuplicateRequest));
            }
        });
    }
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            try {
                if (model.id) {
                    const existingEntity = yield repository.findOne({ id: model.id });
                    if (!existingEntity) {
                        return Promise.reject(new apierror_1.default("غير موجود", errorcode_1.default.UndefinedCode));
                    }
                    Object.keys(model).forEach((key) => {
                        var _a;
                        existingEntity[key] =
                            (_a = model[key]) !== null && _a !== void 0 ? _a : existingEntity[key];
                    });
                    const updatedEntity = yield repository.save(existingEntity);
                    return updatedEntity;
                }
                else if (model.uuid) {
                    const existingEntity = yield repository.findOne({ uuid: model.uuid });
                    if (!existingEntity) {
                        return Promise.reject(new apierror_1.default("غير موجود", errorcode_1.default.UndefinedCode));
                    }
                    Object.keys(model).forEach((key) => {
                        var _a;
                        existingEntity[key] =
                            (_a = model[key]) !== null && _a !== void 0 ? _a : existingEntity[key];
                    });
                    const updatedEntity = yield repository.save(existingEntity);
                    return updatedEntity;
                }
                else {
                    return Promise.reject(new apierror_1.default("primary Key not exist", errorcode_1.default.UndefinedCode));
                }
            }
            catch (e) {
                console.error("Error updating entity:", e);
                return Promise.reject(new apierror_1.default("Failed to update entity " + e, errorcode_1.default.UndefinedCode));
            }
        });
    }
    getDynamicData(requestElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.getRepository();
            const results = [];
            if (requestElement.search) {
                for (const searchField of requestElement.search) {
                    if (searchField.queryConfig) {
                        let queryBuilder = repository.createQueryBuilder(searchField.queryConfig.alias);
                        for (const relation of searchField.queryConfig.relations) {
                            queryBuilder = queryBuilder.innerJoin(`${searchField.queryConfig.alias}.${relation}`, relation);
                        }
                        const whereParams = {};
                        searchField.queryConfig.whereValues.forEach((value, index) => {
                            whereParams[`whereValue${index}`] = value;
                        });
                        queryBuilder = queryBuilder
                            .where(searchField.queryConfig.whereClause, whereParams)
                            .select(searchField.queryConfig.selectColumns);
                        const result = yield queryBuilder.getRawMany();
                        result.forEach(row => {
                            const rowData = {};
                            if (searchField.queryConfig)
                                for (const column of searchField.queryConfig.selectColumns) {
                                    const parts = column.split('.');
                                    let value = row;
                                    for (const part of parts) {
                                        value = value[part];
                                    }
                                    rowData[column.replace('.', '_')] = value;
                                }
                            results.push(rowData);
                        });
                    }
                }
            }
            return results;
        });
    }
}
exports.default = BaseService;
//# sourceMappingURL=BaseService.js.map
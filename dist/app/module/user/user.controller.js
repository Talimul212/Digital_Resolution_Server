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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
exports.UserController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.createUser(req.body);
            res.status(201).json(user);
        });
    },
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.getUserById(req.params.id);
            if (!user)
                return res.status(404).json({ message: 'User not found' });
            res.json(user);
        });
    },
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_service_1.UserService.getAllUsers(req.query);
            res.json(users);
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield user_service_1.UserService.updateUser(req.params.id, req.body);
            res.json(updated);
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_service_1.UserService.deleteUser(req.params.id);
            res.status(204).send();
        });
    },
};

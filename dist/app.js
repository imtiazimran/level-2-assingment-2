"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_Router_1 = require("./module/users/user.Router");
const app = (0, express_1.default)();
// body perser middlewere
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api/users", user_Router_1.UserRouter);
app.get("/", (req, res) => {
    res.send("welcome to level 2 assingment 2");
});
exports.default = app;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const nameSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String
});
const addressShema = new mongoose_1.Schema({
    street: String,
    city: String,
    country: String
});
const orderSchema = new mongoose_1.Schema({
    productName: String,
    price: Number,
    quantity: Number
});
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: nameSchema,
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hobbies: [String],
    address: addressShema,
    orders: [orderSchema],
    isDeleted: { type: Boolean, default: false }
});
// for new document posting
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = this;
        currentUser.password = yield bcrypt_1.default.hash(currentUser.password, Number(config_1.default.brypt_salt_round));
        next();
    });
});
// for updating data
userSchema.pre("findOneAndUpdate", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentUser = this.getUpdate();
        if (currentUser.password) {
            currentUser.password = yield bcrypt_1.default.hash(currentUser.password, Number(config_1.default.brypt_salt_round));
        }
        next();
    });
});
// don't show the deleted data 
userSchema.pre(/^find/, function (next) {
    const currentDocumet = this;
    currentDocumet.find({ isDeleted: { $ne: true } });
    next();
});
// don't send password field on the response
userSchema.methods.toJSON = function () {
    const currentUser = this.toObject();
    delete currentUser.password;
    return currentUser;
};
userSchema.statics.isUserExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.UserModel.findOne({ userId: id });
    return user;
});
exports.UserModel = mongoose_1.default.model("user", userSchema);

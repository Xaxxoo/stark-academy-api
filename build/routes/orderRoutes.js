"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderControllers_1 = require("../controllers/OrderControllers");
const auth_1 = require("../middleware/auth");
const orderRouter = express_1.default.Router();
orderRouter.post("/create-order", auth_1.isAutheticated, OrderControllers_1.createOrder);
exports.default = orderRouter;

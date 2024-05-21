"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsControllers_1 = require("../controllers/analyticsControllers");
const auth_1 = require("../middleware/auth");
const analyticsRouter = express_1.default.Router();
analyticsRouter.get("/get-users-analytics", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analyticsControllers_1.getUserAnalytics);
analyticsRouter.get("/get-courses-analytics", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analyticsControllers_1.getCourseAnalytics);
analyticsRouter.get("/get-orders-analytics", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), analyticsControllers_1.getOrderAnalytics);
exports.default = analyticsRouter;

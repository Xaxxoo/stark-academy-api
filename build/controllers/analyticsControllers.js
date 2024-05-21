"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderAnalytics = exports.getCourseAnalytics = exports.getUserAnalytics = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const analyticsGenerator_1 = require("../utils/analyticsGenerator");
const order_model_1 = __importDefault(require("../models/order.model"));
//User analytics -- admmin only
exports.getUserAnalytics = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const users = await (0, analyticsGenerator_1.generateLast12MonthsData)(user_model_1.default);
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
//Couses analytics -- admmin only
exports.getCourseAnalytics = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const courses = await (0, analyticsGenerator_1.generateLast12MonthsData)(course_model_1.default);
        res.status(200).json({
            success: true,
            courses,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
//Order analytics -- admmin only
exports.getOrderAnalytics = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const orders = await (0, analyticsGenerator_1.generateLast12MonthsData)(order_model_1.default);
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});

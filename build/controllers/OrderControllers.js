"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendStripePublishableKey = exports.getAllOrders = exports.createOrder = void 0;
require("dotenv").config();
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const orderServices_1 = require("../services/orderServices");
const notification_model_1 = __importDefault(require("../models/notification.model"));
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//Create Order
exports.createOrder = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { courseId, payment_info } = req.body;
        const user = await user_model_1.default.findById(req.user?._id);
        const courseExistInUser = user?.courses.some((course) => course._id.toString() === courseId);
        if (courseExistInUser) {
            return next(new ErrorHandler_1.default("You have already purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        if (!course) {
            new ErrorHandler_1.default("Course Not Found", 400);
        }
        const data = {
            courseId: course?._id,
            userId: user?._id,
            payment_info,
        };
        const mailData = {
            _id: courseId.toString().slice(0, 6),
            name: course?.name,
            price: course?.price,
            date: new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        };
        const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData });
        try {
            if (user) {
                await (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Order confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                });
            }
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
        user?.courses.push(course?._id);
        await user?.save();
        await notification_model_1.default.create({
            user: user?._id,
            title: "New Order",
            message: `You have a new order from ${course?.name}`,
        });
        course?.purchased ? (course.purchased += 1) : course?.purchased;
        await course?.save();
        (0, orderServices_1.newOrder)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
//get all Order -- AdminOnly
exports.getAllOrders = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, orderServices_1.getAllOrdersService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
//  send stripe publishble key
exports.sendStripePublishableKey = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res) => {
    res.status(200).json({
        publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});
// new payment
// export const newPayment = catchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const myPayment = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: "USD",
//         metadata: {
//           company: "E-Learning",
//         },
//         automatic_payment_methods: {
//           enabled: true,
//         },
//       });
//       res.status(201).json({
//         success: true,
//         client_secret: myPayment.client_secret,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   }
// );

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseControllers_1 = require("../controllers/courseControllers");
const auth_1 = require("../middleware/auth");
const courseRouter = express_1.default.Router();
courseRouter.post("/create-course", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), courseControllers_1.uploadCourse);
courseRouter.put("/edit-course/:id", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), courseControllers_1.editCourse);
courseRouter.get("/get-course/:id", courseControllers_1.getSingleCourse);
courseRouter.get("/get-courses", courseControllers_1.getAllCourses);
courseRouter.get("/get-admin-courses", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), courseControllers_1.getAdminAllCourses);
courseRouter.get("/get-course-content/:id", auth_1.isAutheticated, courseControllers_1.getCourseByUser);
courseRouter.put("/add-question", auth_1.isAutheticated, courseControllers_1.addQuestion);
courseRouter.put("/add-answer", auth_1.isAutheticated, courseControllers_1.addAnswer);
courseRouter.put("/add-review/:id", auth_1.isAutheticated, courseControllers_1.addReview);
courseRouter.put("/add-reply", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), courseControllers_1.addReplyToReview);
courseRouter.post("/getVdoCipherOTP", courseControllers_1.generateVideoUrl);
courseRouter.delete("/delete-course/:id", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), courseControllers_1.deleteCourse);
exports.default = courseRouter;
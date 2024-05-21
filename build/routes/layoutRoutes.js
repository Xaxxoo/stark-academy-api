"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const layoutControllers_1 = require("../controllers/layoutControllers");
const layoutRouter = express_1.default.Router();
layoutRouter.post("/create-layout", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), layoutControllers_1.createLayout);
layoutRouter.put("/edit-layout", auth_1.isAutheticated, (0, auth_1.authorizeRoles)("admin"), layoutControllers_1.editLayout);
layoutRouter.get("/get-layout/:type", layoutControllers_1.getLayoutByType);
exports.default = layoutRouter;

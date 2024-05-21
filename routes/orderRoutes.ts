import express from "express";
import { createOrder } from "../controllers/OrderControllers";
import { isAutheticated } from "../middleware/auth";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

export default orderRouter;

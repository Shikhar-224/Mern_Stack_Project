const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
const { userById } = require("../controller/user");
const { create, listOrders, getStatusValue, updateOrderStatus, orderById } = require("../controller/order");
const { decreaseQuantity } = require("../controller/product");

router.post("/order/create/:userId", requireSignin, isAuth, decreaseQuantity, create);

router.get("/order/list/:userId", requireSignin, isAuth, isAdmin, listOrders);
router.get("/order/status-values/:userId", requireSignin, isAuth, isAdmin, getStatusValue);

router.put("/order/:orderId/status/:userId", requireSignin, isAuth, isAdmin, updateOrderStatus);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
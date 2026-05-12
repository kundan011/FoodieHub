const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

// GET ALL ORDERS
router.get("/all/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      userEmail: req.params.email,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE ORDER
router.post("/create", async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    await newOrder.save();

    res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

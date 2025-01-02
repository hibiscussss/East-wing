import User from '../../models/user';
import Order from '../../models/order';
import Boom from 'boom';
import OrderSchema from './validations';

const Create = async (req, res, next) => {
  const input = req.body;
  // Handle items parsing safely
  input.items = Array.isArray(input.items) ? input.items : (input.items ? JSON.parse(input.items) : []);

  const { error } = OrderSchema.validate(input);

  if (error) {
    return next(Boom.badRequest(error.details[0].message));
  }

  const { user_id } = req.payload;

  try {
    const order = new Order({
      user: user_id,
      address: input.address,  // Ensure the field matches your schema
      items: input.items,
    });

    const savedData = await order.save();

    res.json(savedData);
  } catch (e) {
    next(e);
  }
};

const List = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('user', '-password -__v')
      .populate('items');  // Ensure this refers to products in your schema

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const GetMyOrders = async (req, res, next) => {
  const { user_id } = req.payload;

  try {
    // Query orders based on user_id, and ensure 'items' are populated
    const orders = await Order.find({ user: user_id }).populate('items');

    if (!orders) {
      return next(Boom.notFound('No orders found for this user.'));
    }

    res.json(orders);
  } catch (e) {
    next(e);
  }
};

const Delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return next(Boom.notFound("Order not found"));
    }

    res.json({
      message: "Order deleted successfully",
      deletedOrder,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  Create,
  List,
  GetMyOrders,
  Delete,
};

import express from "express";
import { pay } from "../../utils/checkout.js";

const server = express.Router();

server.post("/", async (req, res, next) => {
  try {
    // Get the order_cart, billing_data, amount_cents from the request body
req.body["amount_cents"]=370000
req.body["billin_data"]={
  firstName: 'Ali',
  lastName: 'Saad',
  email: 'ali@gmail.com',
  phoneNumber: '01088888888',
  street: 'Hhhhhh',
  apartment: 'Jjjjjjjjj',
  building: '5',
  floor: '2',
  city: 'Dam',
  state: 'Egy',
  postalCode: '76282',
  country: 'Egypt'
}

    const { order_cart, billing_data, amount_cents } = req.body;
console.log(req.body)

    // get the payment token for this order
    const token = await pay(order_cart, billing_data, amount_cents);

    // create the payment link
    const link = `https://accept.paymob.com/api/acceptance/iframes/874327?payment_token=${token}`;


    // respond with the payment link
    return res.status(200).json(link);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default server;

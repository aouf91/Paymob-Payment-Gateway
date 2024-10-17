import express from "express";
import { pay } from "../../utils/checkout.js";

const server = express.Router();

server.post("/", async (req, res, next) => {
  try {
    // Get the order_cart, billing_data, amount_cents from the request body
req.body= {
  "order_cart": [
    {
      "name": "iphone x",
      "amount_cents": "2400000",
      "description": "iphone x 64GB",
      "quantity": "1"
    }
  ],
  "billing_data": {
    "apartment": "803",
    "email": "claudette09@exa.com",
    "floor": "42",
    "first_name": "Clifford",
    "street": "Ethan Land",
    "building": "8028",
    "phone_number": "+86(8)9135210487",
    "shipping_method": "PKG",
    "postal_code": "01898",
    "city": "Jaskolskiburgh",
    "country": "CR",
    "last_name": "Nicolas",
    "state": "Utah"
  },
  "amount_cents": "2400000"
}

    const { order_cart, billing_data, amount_cents } = req.body;


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

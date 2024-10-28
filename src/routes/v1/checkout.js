import express from "express";
import { pay } from "../../utils/checkout.js";

const server = express.Router();

server.post("/", async (req, res, next) => {
var myHeaders = new Headers();
myHeaders.append(
  "Authorization",process.env.SECRET_KEY
);
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  amount: 24000,
  currency: "EGP",
  payment_methods: [4853344,4853272],
  items: [
        {
      "name": "iphone x",
      "amount": "24000",
      "description": "iphone x 64GB",
      "quantity": "1"
    },
  ],
  billing_data: req.body,
  customer: {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    extras: {
      re: "22",
    },
  },
  extras: {
    ee: 22,
  },
});

var requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

fetch("https://accept.paymob.com/v1/intention/", requestOptions)
  .then((response) => response.text())
  .then((result) =>{ console.log(result.client_secret)

res.send(JSON.parse(result))

})


  .catch((error) => console.log("error", error));

   
});

export default server;

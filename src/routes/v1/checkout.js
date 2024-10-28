import express from "express";
import { pay } from "../../utils/checkout.js";

const server = express.Router();

server.post("/", async (req, res, next) => {
  console.log(req.body)
    
var myHeaders = new Headers();


myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  amount: 2400000,
  currency: "EGP",
  payment_methods: [4853344,4853272],
  items: [
        {
      "name": "iphone x",
      "amount": "2400000",
      "description": "iphone x 64GB",
      "quantity": "1"
    },
  ],
  billing_data: {
    apartment: "6",
    first_name: "Ammar",
    last_name: "Sadek",
    street: "938, Al-Jadeed Bldg",
    building: "939",
    phone_number: "+96824480228",
    country: "OMN",
    email: "AmmarSadek@gmail.com",
    floor: "1",
    state: "Alkhuwair",
  },
  customer: {
    first_name: "Ammar",
    last_name: "Sadek",
    email: "AmmarSadek@gmail.com",
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
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

   
});

export default server;

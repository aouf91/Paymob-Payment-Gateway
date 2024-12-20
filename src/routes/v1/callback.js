import express from "express";
import { createHmac } from "crypto";
import Store from "../../models/payment.js";

const server = express.Router();

server.post("/", async (req, res, next) => {
  // Get the transaction details from the request body
  const {
    amount_cents,
    created_at,
    currency,
    error_occured,
    has_parent_transaction,
    id,
    integration_id,
    is_3d_secure,
    is_auth,
    is_capture,
    is_refunded,
    is_standalone_payment,
    is_voided,
    order: { id: order_id },
    owner,
    pending,
    source_data: {
      pan: source_data_pan,
      sub_type: source_data_sub_type,
      type: source_data_type,
    },
    success,
  } = req.body.obj;
console.log(req.body.obj)

  // Create a lexogragical string with the order specified by Paymob @ https://docs.paymob.com/docs/hmac-calculation
  let lexogragical =
    amount_cents +
    created_at +
    currency +
    error_occured +
    has_parent_transaction +
    id +
    integration_id +
    is_3d_secure +
    is_auth +
    is_capture +
    is_refunded +
    is_standalone_payment +
    is_voided +
    order_id +
    owner +
    pending +
    source_data_pan +
    source_data_sub_type +
    source_data_type +
    success;

  // Create a hash using the lexogragical string and the HMAC key
  let hash = createHmac("sha512", process.env.HMAC_KEY)
    .update(lexogragical)
    .digest("hex");
console.log(hash)
console.log(req.query.hmac)
  // Compare the hash with the hmac sent by Paymob to verify the request is authentic
  if (hash) {
    // the request is authentic and you can store in the db whtever you want
    const payment = new Store({
      amount_cents,
      created_at,
      currency,
      error_occured,
      has_parent_transaction,
      id,
      integration_id,
      is_3d_secure,
      is_auth,
      is_capture,
      is_refunded,
      is_standalone_payment,
      is_voided,
      order_id,
      owner,
      pending,
      source_data_pan,
      source_data_sub_type,
      source_data_type,
      success,
    });
    await payment.save();
    return;
  }
});

export default server;

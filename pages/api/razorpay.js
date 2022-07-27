const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_SECRET_KEY,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { totalPrice } = JSON.parse(req.body);

      const amount = totalPrice;
      const currency = "INR";
      const options = {
        amount: (amount * 100).toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture: 1,
      };
      const response = await razorpay.orders.create(options);
      console.log('response : ', response);
      res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        receipt : response.receipt
      });
    } catch (err) {
        console.log('err : ', err);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

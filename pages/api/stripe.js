import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {

      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ['card', 'ideal', 'sofort', 'sepa_debit', 'p24', 'giropay', 'eps', 'alipay', 'grabpay', 'afterpay_clearpay', 'apple_pay', 'google_pay', 'microsoft_pay', 'wechat_pay', 'au_becs_debit', 'bacs_debit', 'fpx', 'oxxo', 'multibanco', 'boleto', 'klarna'],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1LPmQZSG7KneWlvmL92ILvl4" }],
        line_items: req.body[0].map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/bicjhp1q/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount:  req.body[1] ? (item.price/2) * 100 : item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

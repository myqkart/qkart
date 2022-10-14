import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_live_51LPjRBSG7KneWlvmQu97wQ6apoU3uSYewb7kiiv1uJCMNjGVAHm6xGiZfgAOPuDwg38ewfBv7mdZldFQXjdoFXEM006qRzcALT");
  }

  return stripePromise;
};

export default getStripe;

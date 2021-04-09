import { Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import SimpleCardForm from "./SimpleCardForm";
import SplitCardForm from "./SplitCardForm";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IeF5OGwE8k6pSiWd8nPukcLgXOBimHff1Ef6FE12TO39NkUoZPnOHqkAW0WA7xoV4FBnmlG00cKvgc8sX1SSNCH00uxYHv3ua"
);

const ProcessPayment = ({handlePayment}) => {
  return (
    <Elements stripe={stripePromise}>
      <SimpleCardForm handlePayment={handlePayment}/>
       {/* <SplitCardForm/> */}
    </Elements>
  );
};
export default ProcessPayment;

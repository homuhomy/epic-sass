import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { SITE_URL } from "src/core/utils";

export default function Plans({ plans }) {
  const [selected, setSelected] = useState("month");
  const [isRedirecting, setRedirecting] = useState(false)
  const plan = plans.find((plan) => plan.interval === selected);

  function togglePlan() {
    const interval = selected === "month" ? "year" : "month";
    setSelected(interval);
  }

  async function onCheckOut() {
    //make network request to the backend
    const response = await fetch(`${SITE_URL}/api/checkout/${plan.id}`);
    const data = await response.json();
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    )
    await stripe.redirectToCheckout({sessionId: data.id})
  }

  return (
    <div className="bg-salmon border-right">
      <div className="column-padding centered">
        <div className="callout-wrap">
          <div className="plan">
            <div className="plan-wrap">
              <div className="plan-content">
                <div className="plan-switch">
                  Monthly
                  <label>
                    <input
                      onChange={togglePlan}
                      type="checkbox"
                      className="toggle toggle-info"
                    />
                  </label>
                  {/* <label className="switch">
                  <input type="checkbox" />
                  <span className="slider" />
                </label> */}
                  Yearly
                </div>

                <h2 className="plan-name">{plan.name}</h2>
                <div>
                  Just RM{plan.price} / {plan.interval}
                </div>
                <div>
                  <button disabled={isRedirecting} onClick={onCheckOut} className="large-button">
                    <div className="large-button-text">{isRedirecting ? "Loading.." : "Buy Now"}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

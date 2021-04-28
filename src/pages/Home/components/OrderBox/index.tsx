import { useState } from "react";
import OrderModal from "./OrderModal";

/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */

const OrderBox = () => {
  const [showingModal, setShowingModal] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <div className="offerText">
        میتونین کتاب یادگیری اصولی جاواسکریپت رو از اینجا سفارش بدین تا دو تا
        استیکر خوشگل 😍 با المان‌های بازی سوپر ماریو به همراه کتاب 📖 امضای شده
        توسط نویسنده دریافت کنید، یا کتاب ری‌اکت رو{" "}
        <a
          style={{ color: "#93e43a" }}
          href="https://zarinp.al/370791"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          پیش خرید
        </a>{" "}
        کنید ‌:)
        <div
          role="button"
          onClick={() => setShowingModal(true)}
          className={"doPaymentBtn ripple"}
        >
          <i className={"fa fa-shopping-basket"} /> ثبت سفارش
        </div>
      </div>

      <OrderModal
        showing={showingModal}
        closeCallback={() => setShowingModal(false)}
      />
    </>
  );
};

export default OrderBox;

import React, { useState } from 'react';
import OrderModal from './OrderModal';

const OrderBox = () => {
    const [showingModal, setShowingModal] = useState(false);

    return (
        <React.Fragment>
            <div className={'offerText'}>
                میتونین کتاب ها رو از طریق سایت سفارش بدین تا دو تا استیکر خوشگل 😍 با
                المان‌های بازی سوپر ماریو به همراه کتاب 📖 امضای شده توسط نویسنده دریافت کنید.

                <div onClick={() => setShowingModal(true)} className={'doPaymentBtn ripple'}>
                    <i className={'fa fa-shopping-basket'}/> ثبت سفارش
                </div>
            </div>

            <OrderModal showing={showingModal} closeCallback={() => setShowingModal(false)} />
        </React.Fragment>
    );
};

export default OrderBox;

import React from 'react';
// import zarrinPal from './../../pay/zarinpal';

const OrderModal = props => (
    <div className={`modal ${props.showing ? 'active' : ''}`}>
        <div className={'topPart'}>
            <div className='bookName'>
                کتاب آموزش اصولی جاوا اسکریپت (پایه)
            </div>
            <span className={'pageNumbers'}>250 صفحه</span>
            <i onClick={ props.closeCallback || (() => {}) } className={'fa fa-times closeModal'}/>
        </div>

        <div className={'bookSlogan'}>
            <div className={'content'}>
                هربرنامه ای که امکان نوشته شدن با زبان جاوا اسکریپت داشته
            باشد ، در نهایت با جاوا اسکریپت نوشته می‌شود.
                <span className={'quoteBy'}> جف آتوود</span>
            </div>
        </div>
        <div className={'modalBody'}>
            هدف از تالیف این کتاب، ایجاد مسیری اصولی و هموار برای یادگیری زبان جاواسکریپت بوده تا بتواند قدمی در تولید منابع فارسی برای یادگیری مطالب برداشته باشد.
            در این کتاب مطالب از مفاهیم پایه و اولیه شروع شده و تا سطح متوسط و کمی به بالا پیش می‌رود.
            توجه کنید که شما در این کتاب با زبان جاواسکریپت آشنا می‌شوید و نه صرفا با نحوه استفاده از آن برای توسعه صفحات وب.
            کتاب به صورت رایگان و به شکل‌های مختلف در لینک گیت‌هاب ما موجود است و اگر با مطالعه کتاب‌های الکترونیکی مشکلی ندارید پس احتمالا نیازی به خرید آن ندارید.
            اما اگر قصد خرید دارید از طریق دکمه پرداخت وارد لینک پرداخت آنلاین شوید.
        </div>
        <a href={'https://zarinp.al/345449'} className={'doBuy ripple'}>
            <div className={'ripple'}>
                <i className='fa fa-shopping-basket' />
                <div className={'payText'}>پرداخت</div>
            </div>
        </a>
        <div className={'buyPrice'}>
            38,000
            <span className={'toman'} >تومان</span>
        </div>
    </div>
);

export default OrderModal;

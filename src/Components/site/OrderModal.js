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
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
        </div>
        <a href={'https://zarinp.al/242088'} className={'doBuy ripple'}>
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

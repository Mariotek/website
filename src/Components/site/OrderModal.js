import React from 'react';
import zarrinPal from './../../pay/zarinpal';

const OrderModal = props => (
    <div className={`modal ${props.showing ? 'active' : ''}`}>
        <div className={'topPart'}>
            <div className='bookName'>
                کتاب آموزش اصولی جاوا اسکریپت (پایه)
            </div>
            <span className={'pageNumbers'}>267 صفحه</span>
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
        <div className={'doBuy ripple'}>
            <div className={'ripple'}>
                <i className='fa fa-shopping-basket' />
                <div onClick={() => zarrinPal.request(
                    5000,
                    'bomber.man87@yahoo.com',
                    '09147426907',
                    '',
                    12,
                    res => {
                        if (res.status){
                            window.url = res.url;
                        } else {
                            alert(res.code);
                        }
                    }
                )} className={'payText'}>پرداخت</div>
            </div>
        </div>
        <div className={'buyPrice'}>
            54,300
            <span className={'toman'} >تومان</span>
        </div>
    </div>
);

export default OrderModal;

import React, { useState } from 'react';


const OurTeam = () => {
    const [member, SetMember] = useState('jafar');
    return (
        <div className={'ourTeam'}>
            <div className='text'>ما کی هستیم؟</div>
            <div className={'showListOfMembers'}>
                <div className={`member code ${member === 'jafar' ? 'active':''}`} onClick={() => SetMember('jafar')}>
                    <h3>جعفررضایی</h3>
                    <div className={'memberInfo'}>خودم ! یه آدم ، که عاشق کدنویسی و خلاقیت تو هر زمینه ایه و از زیبایی ها لذت می‌بره</div>
                    <div className={'socialNetwork'}>
                        <a target={'_blank'} href='https://github.com/jafar-rezaei'><i className={'fa fa-github'} /></a>
                        <a target={'_blank'} href='http://instagram.com/j.rezaei73'><i className={'fa fa-instagram'} /></a>
                        <a target={'_blank'} href='http://jrjs.ir'><i className={'fa fa-globe'} /></a>
                    </div>
                </div>
                <div className={`member graphic ${member === 'masud' ? 'active':''}`} onClick={() => SetMember('masud')}>
                    <h3>مسعود ساجدی</h3>
                    <div className={'memberInfo'}>یه دوچوخه سوار ، طراح حرفه ای در مورد گرافیک و امور طراحی کتاب و خلاقیت های تبلیغاتی</div>
                    <div className={'socialNetwork'}>
                        <a target={'_blank'} href={'http://instagram.com/masoudsajedi'}><i className={'fa fa-instagram'} /></a>
                        <a target={'_blank'} href={'http://masoudsajedi.ir'}><i className={'fa fa-globe'} /></a>
                    </div>
                </div>
                <div className={`member edit ${member === 'mehdi' ? 'active':''}`} onClick={() => SetMember('mehdi')}>
                    <h3> مهدی رحیمی</h3>
                    <div className={'memberInfo'}>دوست خوش حوصله و خندان ما که در امر نگارش و ویراستاری کتاب ها همواره پشت ما هستن</div>
                    <div className={'socialNetwork'}>
                        <a href={'javascript:;'}><i className={'fa fa-twitter'} /></a>
                    </div>
                </div>
                <div className={`member help ${member === 'hadi' ? 'active':''}`} onClick={() => SetMember('hadi')}>
                    <h3>هادی تبادلی</h3>
                    <div className={'memberInfo'}> هادی ، یک شخص سوم که مطالب محتوای آموزشی رو میخونه و نظرسازنده میده :)</div>
                    <div className={'socialNetwork'}>
                        <a href={'javascript:;'}><i className={'fa fa-instagram'} /></a>
                    </div>
                </div>
                <div className={`member help ${member === 'you1' ? 'active':''}`} onClick={() => SetMember('you1')}>
                    <h3>آرش میلانی</h3>
                    <div className={'memberInfo'}> آرش میلانی، هـکر و نینجای خوشحال‌سازی و عاشق کوه ، بهمون توی طراحی ، نوشتن و پیشبرد اهدافمون کمک میکنه</div>
                    <div className={'socialNetwork'} />
                </div>
                <div className={`member help ${member === 'you2' ? 'active':''}`} onClick={() => SetMember('you2')}>
                    <h3>جای شما</h3>
                    <div className={'memberInfo'}>با ماریوتک تجربه همکاری با یک تیم متفاوت رو خواهید داشت</div>
                    <div className={'socialNetwork'} />
                </div>
            </div>
            <section id='cubeContainer'>
                <div id='cube' className={`show-${member}`}>
                    <figure className='front'><img src={'/static/images/jafarrezaei.jpg'} /></figure>
                    <figure className='back'><img src={'/static/images/masudSajedi.jpeg'} /></figure>
                    <figure className='right'><img src={'/static/images/mehdiRahimi.jpeg'} /></figure>
                    <figure className='left'><img src={'/static/images/hadiTabadoli.jpeg'} /></figure>
                    <figure className='top'><img src={'/static/images/ArshMilani.jpeg'} /></figure>
                    <figure className='bottom'>شما</figure>
                </div>
            </section>
        </div>
    );
};

export default OurTeam;

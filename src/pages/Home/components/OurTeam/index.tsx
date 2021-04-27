import { useState } from "react";

/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */

const OurTeam = () => {
  const [member, SetMember] = useState("sayjeyhi");
  return (
    <div className="ourTeam">
      <div className="text">ما کی هستیم؟</div>
      <div className="showListOfMembers">
        <div
          role="button"
          className={`member code ${member === "sayjeyhi" ? "active" : ""}`}
          onClick={() => SetMember("sayjeyhi")}
        >
          <h3>جعفررضایی</h3>
          <div className="memberInfo">
            خودم ! یه آدم، که یه کم عجیب‌تر فکر می‌کنه :)) احتمالا خلاقه، شاده و
            از زیبایی‌ها لذت می‌بره
          </div>
          <div className="socialNetwork">
            <a
              target="_blank"
              href="https://github.com/sayjeyhi-rezaei"
              rel="noreferrer"
            >
              <i className="fa fa-github" />
            </a>
            <a
              target="_blank"
              href="http://instagram.com/sayjeyhi"
              rel="noreferrer"
            >
              <i className="fa fa-instagram" />
            </a>
            <a target="_blank" href="http://sayjeyhi.com" rel="noreferrer">
              <i className="fa fa-globe" />
            </a>
          </div>
        </div>
        <div
          role="button"
          className={`member graphic ${member === "masud" ? "active" : ""}`}
          onClick={() => SetMember("masud")}
        >
          <h3>مسعود ساجدی</h3>
          <div className="memberInfo">
            یه دوچرخه سوار، طراح حرفه ای در مورد گرافیک و امور طراحی کتاب و
            خلاقیت های تبلیغاتی
          </div>
          <div className="socialNetwork">
            <a
              target="_blank"
              href="http://instagram.com/masoudsajedi"
              rel="noreferrer"
            >
              <i className="fa fa-instagram" />
            </a>
            <a target="_blank" href="http://masoudsajedi.ir" rel="noreferrer">
              <i className="fa fa-globe" />
            </a>
          </div>
        </div>
        <div
          role="button"
          className={`member edit ${member === "mehdi" ? "active" : ""}`}
          onClick={() => SetMember("mehdi")}
        >
          <h3> مهدی رحیمی</h3>
          <div className="memberInfo">
            دوست خوش حوصله و خندان ما که در امر نگارش و ویراستاری کتاب ها همواره
            پشت ما هستن
          </div>
          <div className="socialNetwork">
            <a href="http://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa fa-twitter" />
            </a>
          </div>
        </div>
        <div
          role="button"
          className={`member help ${member === "hadi" ? "active" : ""}`}
          onClick={() => SetMember("hadi")}
        >
          <h3>هادی تبادلی</h3>
          <div className="memberInfo">
            {" "}
            هادی ، یک شخص سوم که مطالب محتوای آموزشی رو میخونه و نظرسازنده میده
            :)
          </div>
          <div className="socialNetwork">
            <a href="https:instagram.com" target="_blank" rel="noreferrer">
              <i className="fa fa-instagram" />
            </a>
          </div>
        </div>
        <div
          role="button"
          className={`member help ${member === "you1" ? "active" : ""}`}
          onClick={() => SetMember("you1")}
        >
          <h3>آرش میلانی</h3>
          <div className="memberInfo">
            {" "}
            آرش میلانی، هـکر و نینجای خوشحال‌سازیه ، بعضا مزاحمش میشیمو با
            راهنمایی‌هاش بهمون کمک میکنه
          </div>
          <div className="socialNetwork" />
        </div>
        <div
          role="button"
          className={`member help ${member === "you2" ? "active" : ""}`}
          onClick={() => SetMember("you2")}
        >
          <h3>جای شما</h3>
          <div className="memberInfo">
            با ماریوتک تجربه همکاری با یک تیم متفاوت رو خواهید داشت
          </div>
          <div className="socialNetwork" />
        </div>
      </div>
      <section id="cubeContainer">
        <div id="cube" className={`show-${member}`}>
          <figure className="front">
            <img src="/static/images/sayjeyhi.jpg" alt="JafarRezaei" />
          </figure>
          <figure className="back">
            <img src="/static/images/masudSajedi.jpeg" alt="MasudSajedi" />
          </figure>
          <figure className="right">
            <img src="/static/images/mehdiRahimi.jpeg" alt="MehdiRahimi" />
          </figure>
          <figure className="left">
            <img src="/static/images/hadiTabadoli.jpeg" alt="HadiTabadoli" />
          </figure>
          <figure className="top">
            <img src="/static/images/ArshMilani.jpeg" alt="ArshMilani" />
          </figure>
          <figure className="bottom">شما</figure>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;

import { useState } from "react";
import { StyledGithubLink } from "../../styles";

/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus */

const OurTeam = () => {
  const [member, setMember] = useState("sayjeyhi");

  return (
    <div className="ourTeam">
      <div className="text">ما کی هستیم؟</div>
      <div className="showListOfMembers">
        <div
          role="button"
          className={`member code ${member === "sayjeyhi" ? "active" : ""}`}
          onClick={() => setMember("sayjeyhi")}
        >
          <h3>جعفررضایی</h3>
          <div className="memberInfo">
            خودم! یه آدم، که یه کم متفاوت‌ فکر می‌کنه، عجوله، میگن خلاقه، شاده و
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
          onClick={() => setMember("masud")}
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
          onClick={() => setMember("mehdi")}
        >
          <h3> مهدی رحیمی</h3>
          <div className="memberInfo">
            دوست خوش حوصله و خندان ما که در موقع نگارش و ویراستاری کتاب ها
            تقریبا همیشه پشت مون هست ;)
          </div>
          <div className="socialNetwork">
            <a href="http://twitter.com" target="_blank" rel="noreferrer">
              <i className="fa fa-twitter" />
            </a>
          </div>
        </div>
        <div
          role="button"
          className={`member help ${member === "mahsa" ? "active" : ""}`}
          onClick={() => setMember("mahsa")}
        >
          <h3>مهسا مصباح</h3>
          <div className="memberInfo">
            {" "}
            مهسا یه فرانت‌اند کار حرفه‌ایه که الان توی دیجی‌کالا کار می‌کنه و
            توی ترجمه کتاب‌ها کمک خیییلی زیادی کرده
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
          onClick={() => setMember("you1")}
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
          onClick={() => setMember("you2")}
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
            <img src="/static/images/mahsa.jpeg" alt="MahsaMesbah" />
          </figure>
          <figure className="top">
            <img src="/static/images/ArshMilani.jpeg" alt="ArshMilani" />
          </figure>
          <figure className="bottom">شما</figure>
        </div>
      </section>

      <StyledGithubLink>
        <a href="https://github.com/mariotek" target="_blank" rel="noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 1A10.89 10.89 0 001 11.77 10.79 10.79 0 008.52 22c.55.1.75-.23.75-.52v-1.83c-3.06.65-3.71-1.44-3.71-1.44a2.86 2.86 0 00-1.22-1.58c-1-.66.08-.65.08-.65a2.31 2.31 0 011.68 1.11 2.37 2.37 0 003.2.89 2.33 2.33 0 01.7-1.44c-2.44-.27-5-1.19-5-5.32a4.15 4.15 0 011.11-2.91 3.78 3.78 0 01.11-2.84s.93-.29 3 1.1a10.68 10.68 0 015.5 0c2.1-1.39 3-1.1 3-1.1a3.78 3.78 0 01.11 2.84A4.15 4.15 0 0119 11.2c0 4.14-2.58 5.05-5 5.32a2.5 2.5 0 01.75 2v2.95c0 .35.2.63.75.52A10.8 10.8 0 0023 11.77 10.89 10.89 0 0012 1" />
          </svg>
        </a>
      </StyledGithubLink>
    </div>
  );
};

export default OurTeam;

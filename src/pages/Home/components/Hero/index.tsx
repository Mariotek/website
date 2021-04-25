import MariotekLogo from "../Icons/MariotekLogo";
import FreeShapes from "./FreeShapes";
import { StyledHeroWrapper, StyledConnector } from "./styles";

const Hero = () => (
  <StyledHeroWrapper>
    <div className="topLogo">
      <MariotekLogo />
    </div>
    <FreeShapes />
    <h1>پلتفرم آموزشی ماریوتک</h1>
    <div className="whoAreYou">
      {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
      <p>
        ماریوتک سعی می‌کنه یه پلتفرم متفاوتی باشه برای آموزش‌های صحیح، ترجیحا
        رایگان و اصولی توی زمینه‌های مختلف(فعلا فقط برنامه‌نویسی). اینجا ما سعی
        می‌کنیم که مطالب به شکل اصولی و ساده آموزش داده بشن، می‌تونین از این
        سایت کتاب‌ها و آموزش‌های ما رو با قیمت پایین بخرین، حتی توی این بازی
        پایین هم یه
        <span style={{ color: "rgb(255,0,0)", fontSize: 18, fontWeight: 900 }}>
          {" "}
          کد تخفیف ۱۰۰درصد
        </span>{" "}
        گذاشتیم 😁
      </p>
    </div>

    <StyledConnector />
  </StyledHeroWrapper>
);

export default Hero;

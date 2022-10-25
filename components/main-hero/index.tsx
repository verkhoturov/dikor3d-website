import { Hero } from "../common";
import heroImg from "./img/main-hero.png";

export const MainHero = () => {
  return (
    <>
      <Hero
        title={
          <>
            СТИЛЬНЫЕ 3D МОДЕЛИ <br /> ДЛЯ ИНТЕРЬЕРОВ И ФАСАДОВ
          </>
        }
        subtitle={
          <>
            бесплатный выезд замерщика <br /> с образцами по Молдове
          </>
        }
        bgImg={heroImg.src}
        isWhiteText
      />
    </>
  );
};

import React from "react";
import { Hero } from "../common";
import { FeedbackModal } from "../feedback";
import heroImg from "./img/main-hero.png";

export const MainHero = () => {
  const [showModal, setShowModal] = React.useState(false);

  const onClick = () => {
    setShowModal(true);
  };

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
        button={{ text: "Связаться с менеджером", onClick }}
        isWhiteText
      />

      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </>
  );
};

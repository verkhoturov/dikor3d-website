import React from "react";
import { Hero } from "../common";
import styles from "./index.module.css";
import { FeedbackModal } from "../feedback";
import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

const getContentByLang = (
  locale: string,
  content: {
    ru: string;
    en: string;
    rom: string;
  }
) => {
  if (locale === "en") return content.en;
  if (locale === "ru") return content.ru;
  if (locale === "ro") return content.rom;
};

interface HeaderSliderProps {
  slides: {
    title: {
      ru: string;
      en: string;
      rom: string;
    };
    subtitle: {
      ru: string;
      en: string;
      rom: string;
    };
    imgUrl: string;
  }[];
}

export const HeaderSlider = ({ slides }: HeaderSliderProps) => {
  const router = useRouter();
  const locale = router.locale;
  const t = useLang(locale);

  const [showModal, setShowModal] = React.useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  if (!slides?.length) return null;

  return (
    <div className={styles.wrapper}>
      <Swiper
        className={styles.mySwiper}
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={styles.slideInner}>
              <Hero
                title={getContentByLang(locale, slide.title)}
                subtitle={getContentByLang(locale, slide.subtitle)}
                bgImg={slide.imgUrl}
                tag="div"
                button={{ text: t.mainHero.button, onClick }}
                isWhiteText
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

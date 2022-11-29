import React from "react";
import { Hero } from "../common";
import styles from "./index.module.css";
import { FeedbackModal } from "../feedback";
import { useRouter } from "next/router";
import { useLang } from "../../utils/useLang";
import { MultiLanguageContent } from "../../lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

interface HeaderSliderProps {
  slides: {
    title: MultiLanguageContent;
    subtitle: MultiLanguageContent;
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
                title={slide.title[locale]}
                subtitle={slide.subtitle[locale]}
                bgImg={slide.imgUrl}
                height={890}
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

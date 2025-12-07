import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Keyboard, Pagination } from 'swiper/modules';
import Record from './Record';

import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-coverflow';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';

const Slider = ({ records, isLoading }) => {
    return (
        <Swiper
            modules={[A11y, EffectCoverflow, Keyboard, Pagination]}
            effect={'coverflow'}
            slidesPerView={'auto'}
            grabCursor={true}
            centeredSlides={true}
            keyboard={true}
            coverflowEffect={{
                rotate: 25,
                stretch: 25,
                depth: 25,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={{
                type: 'fraction',
            }}
        >
            {records?.map((record) => (
                <SwiperSlide>
                    {!isLoading && (
                        <Record
                            key={record.id}
                            record={record}
                            isLoading={isLoading}
                        />
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;

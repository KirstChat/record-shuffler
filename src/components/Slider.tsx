import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Keyboard, Pagination } from 'swiper/modules';
import Record from './Record';

interface SliderProps {
    /** The array contain records data */
    records: [
        {
            id: number;
            basic_information: {
                artists: [{ name: string }];
                cover_image: string;
                title: string;
            };
        }
    ];
    /** Whether or not the content is loading */
    isLoading: boolean;
}

const Slider = ({ records, isLoading }: SliderProps) => {
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

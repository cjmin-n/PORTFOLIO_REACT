import { useEffect, useState } from "react";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { observeFadeIn } from "../../utils/fadeInOnScroll";

const Experience = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        observeFadeIn();
    }, []);

    return(
        <section className="section section-experience" id="experience">
            <div className="inner">
                <h4 className="en sub-tit fade-in">Where I've Worked</h4>
                <div className="flex flex-row-reverse justify-between fade-in">    
                    <div className="content-wrap">
                        <Swiper
                            spaceBetween={10}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Thumbs]}
                            effect="fade"
                        >
                            <SwiperSlide>
                                <p>웹퍼블리셔 <span>개발팀 대리</span><span>|</span>  <span>PM</span></p>
                                <p className="en">Oct 2021 - May 2024</p>
                                <ul>
                                    <li><span>▹ </span> 다양한 산업군의 웹사이트 퍼블리싱 및 유지보수</li>
                                    <li><span>▹ </span> 웹어워드코리아 3관왕 프로젝트 참여 (광고/문화/첨단산업 분야)</li>
                                    <li><span>▹ </span> PM으로 프로젝트 관리 및 고객 대응</li>
                                </ul>
                            </SwiperSlide>
                            
                            <SwiperSlide>
                                <p>웹디자이너 <span>기획팀 주임</span></p>
                                <p className="en">Jan 2019 - May 2021</p>
                                <ul>
                                    <li><span>▹ </span> 지그재그 앱 내 여성 쇼핑몰 1위 달성에 기여</li>
                                    <li><span>▹ </span> 상품 상세페이지 및 기획전 페이지 디자인</li>
                                    <li><span>▹ </span> 앱 푸시용 프로모션 배너 및 이벤트 이미지 제작</li>
                                </ul>
                            </SwiperSlide>
                            <SwiperSlide>
                                <p>웹디자이너 <span>온라인사업부 사원</span></p>
                                <p className="en">Jul 2018 - Dec 2018</p>
                                <ul>
                                    <li><span>▹ </span> 이커머스 플랫폼(스토어팜, 쿠팡, 11번가 등) 상품 등록</li>
                                    <li><span>▹ </span> 상세페이지 디자인 및 콘텐츠 작업</li>
                                </ul>
                            </SwiperSlide>
                            <SwiperSlide>
                                <p>쇼핑몰관리<span className="ml-0">기획팀 사원</span></p>
                                <p className="en">Jan 2017 - Oct 2017</p>
                                <ul>
                                    <li><span>▹ </span> 일동제약 온라인 쇼핑몰 운영 전반 담당 (CS, 판매 정산, 유지보수)</li>
                                    <li><span>▹ </span> 서울시 사회적경제우수기업 (주)아이베 SNS, 블로그 바이럴 마케팅</li>
                                </ul>
                            </SwiperSlide>
                        </Swiper>
                        
                    </div>
                    <div className="company-wrap">
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Thumbs]}
                            direction="vertical"
                            breakpoints={{
                                0: {
                                  direction: 'horizontal', // 0px 이상에서는 horizontal
                                  slidesPerView: 3, // 필요 시 수정
                                },
                                768: {
                                  direction: 'vertical', // 768px 이상부터 vertical
                                  slidesPerView: 4,
                                }
                              }}
                        >
                            <SwiperSlide>원스인터랙티브</SwiperSlide>
                            <SwiperSlide>앤드모어</SwiperSlide>
                            <SwiperSlide>오에스티어패럴</SwiperSlide>
                            <SwiperSlide>모든커뮤니케이션</SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
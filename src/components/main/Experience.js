import { useState } from "react";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Experience = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return(
        <section className="section section-experience" id="experience">
            <div className="inner">
                <h4 className="en sub-tit">Where I've Worked</h4>
                <div className="flex flex-row-reverse justify-between">    
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
                                    <li><span>▹ </span> 회사, 병원, 학교, 쇼핑몰 등 다양한 종류 홈페이지 퍼블리싱</li>
                                    <li><span>▹ </span> 카페24 쇼핑몰, 카페24 빌더호스팅 퍼블리싱</li>
                                    <li><span>▹ </span> 기획, 일정 관리, 팀 조율 및 의사결정</li>
                                </ul>
                            </SwiperSlide>
                            
                            <SwiperSlide>
                                <p>웹디자이너 <span>기획팀 주임</span></p>
                                <p className="en">Jan 2019 - May 2021</p>
                                <ul>
                                    <li><span>▹ </span> 상세페이지 작업(상시 업데이트, 온라인 플리마켓 등 페이지 작업)</li>
                                    <li><span>▹ </span> 어플리케이션 푸시배너 작업</li>
                                    <li><span>▹ </span> 인물 / 의류 사진 보정 작업</li>
                                    <li><span>▹ </span> 사원증,명함 작업</li>
                                </ul>
                            </SwiperSlide>
                            <SwiperSlide>
                                <p>웹디자이너 <span>온라인사업부 사원</span></p>
                                <p className="en">Jul 2018 - Dec 2018</p>
                                <ul>
                                    <li><span>▹ </span> 상세페이지 작업(인물 보정 및 상세문구 작업)</li>
                                    <li><span>▹ </span> 스토어팜, 네이버 광고 배너 작업</li>
                                    <li><span>▹ </span> 사방넷 상품 등록(11번가, 쿠팡, 위메프, GSshop, 하프클럽, 홈앤쇼핑, 스토어팜 상품등록 및 전시)</li>
                                    <li><span>▹ </span> 위메프, 티몬 딜 작업 (이미지 제작)</li>
                                    <li><span>▹ </span> 제품 상세컷 촬영 / 자사몰 기획</li>
                                </ul>
                            </SwiperSlide>
                            <SwiperSlide>
                                <p>쇼핑몰관리<span className="ml-0">기획팀 사원</span></p>
                                <p className="en">Jan 2017 - Oct 2017</p>
                                <ul>
                                    <li><span>▹ </span> 일동제약 온라인쇼핑몰 관리 업무(cs,판매정산,쇼핑몰유지보수)</li>
                                    <li><span>▹ </span> 서울시 사회적경제우수기업, (주)아이베 (SNS, 블로그 바이럴 마케팅)</li>
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
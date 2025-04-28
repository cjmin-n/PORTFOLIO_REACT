import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import Error from "./pages/Error";
import Archive from "./pages/Archive";
import { useEffect, useState } from "react";
import './index.css';
import './Style.css';

// gsap
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TextPlugin } from "gsap/TextPlugin";

// Swiper
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


gsap.registerPlugin(useGSAP,TextPlugin);

function App() {
    const [isdark, setIsdark] = useState(
        JSON.parse(localStorage.getItem('isdark')) ?? false
    );
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem('isdark')) ?? false
    );



    // 다크모드
    useEffect(() => {
        localStorage.setItem('isdark', JSON.stringify(isdark));
    }, [isdark]);
    
    // 다크모드 테마 적용
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    }, [darkMode]);
    

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout isdark={isdark} setIsdark={setIsdark} darkMode={darkMode} setDarkMode={setDarkMode}/>}>
                        <Route index element={<Main/>} />
                        <Route path="archive" element={<Archive/>} />
                    </Route>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;

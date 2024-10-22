import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Main from "./pages/Main";
import Error from "./pages/Error";
import './Style.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={<Main/>} />
                        {/* 나머지 페이지는 작업 후 추가여부 결정 */}
                    </Route>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>

    );
}

export default App;

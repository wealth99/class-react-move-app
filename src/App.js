import { Outlet, Routes, Route } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import DetailPage from "./pages/DetailPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/searchPage";

const Layout = () => {
    return (
        <div>
            <Nav />

            <Outlet />

            <Footer />
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<MainPage />} ></Route>
                    <Route path=":movieId" element={<DetailPage />} ></Route>
                    <Route path="search" element={<SearchPage />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;

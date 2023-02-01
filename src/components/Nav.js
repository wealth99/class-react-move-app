import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
    
    const [show, setShow] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setSearchValue(e.target.value);
        navigate(`/search?q=${e.target.value}`);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => window.removeEventListener("scroll", () => {});
    }, []);

    return (
        <nav className={`nav ${show && "nav__black"}`}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
                className="nav__logo"
                onClick={() => window.location.reload()}
            />

            <input value={searchValue} onChange={handleChange} className="nav__input" type="text" placeholder="영화를 검색해주세요." />
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
                alt="User logged"
                className="nav__avater"
            />
        </nav>
    )
}

export default Nav;

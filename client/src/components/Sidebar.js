import React, { useState } from "react"
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { IconContext } from "react-icons/lib"
import {
    FaThLarge,
    FaPlane,
    FaHotel,
    FaHome,
    FaUtensils,
    FaMapMarkedAlt,
    FaMoneyBill,
    FaCar
  } from "react-icons/fa";

const Nav = styled.div`
    background: #6e7178;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const ToggleButton = styled.div`
    position: fixed;
    top: 20px;
    left: 20px;
    font-size: 2rem;
    cursor: pointer;
    z-index: 100;
    color: #fff;
    background-color: #6e7178;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    transition: opacity 0.3s ease;
    opacity: ${({ visible }) => (visible ? 1 : 0)};
    pointer-events: ${({ visible }) => (visible ? "auto" : "none")};
`;

const NavIcon = styled(Link)`
    color: #f5f5f5;
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #6e7178;
    width: 250px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const SidebarLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 10px;
    height: 60px;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    text-decoration: none;
    color: black;
    font-size: 18px;
    background: ${({ $active }) => ($active ? "#84888c" : "transparent")};

    &:hover {
        background: #84888c;
        color: white;
        cursor: pointer;
    }
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => setSidebar(!sidebar)
    const location = useLocation();

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <ToggleButton onClick={showSidebar} visible={!sidebar}>
                    <FaIcons.FaBars />
                </ToggleButton>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <SidebarLink to="#" onClick={showSidebar}>
                            <AiIcons.AiOutlineClose />
                        </SidebarLink>

                        <SidebarLink to="/dashboard" onClick={showSidebar} $active={location.pathname === "/dashboard"}>
                            <FaThLarge color="black" style={{ marginRight: "10px" }} />
                            Dashboard</SidebarLink>
                        <SidebarLink to="/dashboard/flights" onClick={showSidebar} $active={location.pathname === "/dashboard/flights"}>
                            <FaPlane color="black" style={{ marginRight: "10px" }} />
                            Flights</SidebarLink>
                        <SidebarLink to="/dashboard/hotels" onClick={showSidebar} $active={location.pathname === "/dashboard/hotels"}>
                            <FaHotel color="black" style={{ marginRight: "10px" }} />
                            Hotels</SidebarLink>
                        <SidebarLink to="/dashboard/airbnbs" onClick={showSidebar} $active={location.pathname === "/dashboard/airbnbs"}>
                            <FaHome color="black" style={{ marginRight: "10px" }} />
                            Airbnbs</SidebarLink>
                        <SidebarLink to="/dashboard/restaurants" onClick={showSidebar} $active={location.pathname === "/dashboard/restaurants"}>
                            <FaUtensils color="black" style={{ marginRight: "10px" }} />
                            Restaurants</SidebarLink>
                        <SidebarLink to="/dashboard/attractions" onClick={showSidebar} $active={location.pathname === "/dashboard/attractions"}>
                            <FaMapMarkedAlt color="black" style={{ marginRight: "10px" }} />
                            Attractions</SidebarLink>
                        <SidebarLink to="/dashboard/budget" onClick={showSidebar} $active={location.pathname === "/dashboard/budget"}>
                            <FaMoneyBill color="black" style={{ marginRight: "10px" }} />
                            Budget</SidebarLink>
                        <SidebarLink to="/dashboard/cars" onClick={showSidebar} $active={location.pathname === "/dashboard/cars"}>
                            <FaCar color="black" style={{ marginRight: "10px" }} />
                            Cars</SidebarLink>
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;
import styled from "styled-components"
import axios from "axios"
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import React from "react"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'M813n9erPvENXeuGPzKDL1Iu';

    const [tickets, setTickets] = useState( {} );
    
    return (
        <>
            <BrowserRouter>
                <Link to="/">
                    <NavContainer>CINEFLEX</NavContainer>
                </Link>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sessoes/:id" element={<SessionsPage />} />
                    <Route path="/assentos/:id" element={<SeatsPage tickets={tickets} setTickets={setTickets}/>} />
                    <Route path="/sucesso/" element={<SuccessPage tickets={tickets} setTickets={setTickets}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
export default function index() {
    return (
        <>
            <Header />
            <main>

            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                {/* <Route path='contact' element={<Contact />} /> */}
                <Route path='*' element={<h1>404</h1>} />
            </Routes>
            </main>
            <Footer />
        </>
    )
}

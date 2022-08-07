import React from "react";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Layout from "./common/Layout";

import Home from "./home/Home";
import About from "./about/About";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;

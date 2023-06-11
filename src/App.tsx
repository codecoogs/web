import React from "react";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Layout from "./common/Layout";

import Home from "./home/Home";
import About from "./about/About";
import Events from "./events/Events";
import Teams from "./teams/Teams";
import Projects from "./projects/Projects";
import Members from "./members/Members";
import PastOfficers from "./pastofficers/pastofficers";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/past-officers" element={<PastOfficers />} />
                    <Route path="/members" element={<Members />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;

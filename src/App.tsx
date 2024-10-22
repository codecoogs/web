import React from "react";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Layout from "./common/Layout";

import Home from "./home/Home";
import Events from "./events/Events";
import Members from "./members/Members";
import Sponsors from "./sponsors/Sponsors";
import Success from "./payments/Success";
import Opportunities from "./opportunities/Opportunities";
import Teams from "./teams/Teams";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/join" element={<Members />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/opportunities" element={<Opportunities />} />
                    <Route path="/teams" element={<Teams />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;

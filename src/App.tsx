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

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/join" element={<Members />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;

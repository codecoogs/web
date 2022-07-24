import React from "react";
import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";

import Layout from "./common/Layout";

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path="/" element={<p>Hello World</p>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default App;

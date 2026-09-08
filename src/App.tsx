import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./common/Layout";

import Events from "./events/Events";
import Home from "./home/Home";
import Legal from "./legal/Legal";
import LegalDocument from "./legal/LegalDocument";
import Members from "./members/Members";
import Officers from "./officers/Officers";
import Opportunities from "./opportunities/Opportunities";
import Success from "./payments/Success";
import Resources from "./resources/Resources";
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
					<Route path="/success" element={<Success />} />
					<Route path="/opportunities" element={<Opportunities />} />
					<Route path="/resources" element={<Resources />} />
					<Route path="/officers" element={<Officers />} />
					<Route path="/legal" element={<Legal />} />
					<Route path="/legal/:slug" element={<LegalDocument />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;

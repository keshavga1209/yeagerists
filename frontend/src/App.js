import "./App.css";
import Instructions from "./Components/Instructions";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import WasteDetail from "./Components/WasteDetail";
import WasteQuote from "./Components/WasteQuote";

function App() {
	return (
		<div>
			<Navbar />
			<Instructions />
			<Header />
			<WasteDetail />
			<WasteQuote />
		</div>
	);
}

export default App;

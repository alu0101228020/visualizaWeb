import './App.css';
import Poblaciones from './components/Poblaciones';
import Ganancias from './components/Ganancias';
import BajasLaborales from './components/BajasLaborales';
import Tasas from './components/Tasas';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route path="/poblaciones" element={<Poblaciones />}></Route>
        <Route path="/tasas" element={<Tasas />}></Route>
        <Route path="/ganancias" element={<Ganancias />}></Route>
        <Route path="/bajasLaborales" element={<BajasLaborales />}></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;

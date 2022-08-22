import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { NotFound } from './pages/NotFound/NotFound';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ProductInner } from './pages/ProductInner/ProductInner';
import { ContextProvider } from './Context/Context';

function App() {
	return (
		<>
			<ContextProvider>
				<Routes>
					<Route path="/" element={<Header />}>
						<Route index element={<Home />} />
						<Route path='about' element={<About />} />
						<Route path="/products/:id" element={<ProductInner />} />
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
				<Footer />
			</ContextProvider>
		</>
	);
}

export default App;

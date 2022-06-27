import Home from './Components/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Prodect from './Components/Prodect/Prodect';
import Container from 'react-bootstrap/esm/Container';
import NavBar from './Components/Nav/Nav';
import Cart from './Components/Cart/Cart';
import Signin from './Components/Signin/Signin';

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/prodect/:slug" element={<Prodect />} />
          </Routes>
        </Container>
      </main>
      <footer className="position-fixed bottom-0 end-50">
        <div className="text-center ">All rigths reserved</div>
      </footer>
    </>
  );
}

export default App;

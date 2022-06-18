import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Prodect from './Components/Prodect/Prodect';
import Container from 'react-bootstrap/esm/Container';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
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

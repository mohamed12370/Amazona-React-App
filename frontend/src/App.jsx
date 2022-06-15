import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';
import { Routes, Route } from 'react-router-dom';
import Prodect from './Components/Prodect/Prodect';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prodect/:slug" element={<Prodect />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

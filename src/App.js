import './App.css';
import './components/Translator.scss'
import Header from './components/Header'
import Translator from './components/Translator'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Translator />
      <Footer />
    </div>
  );
}

export default App;

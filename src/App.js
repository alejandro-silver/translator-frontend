import Header from './components/Header'
import Translator from './components/Translator'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/Translator.scss'

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

import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './components/Cards/Cards';
import RandomCharacterCard from './components/RandomCharacterCard/RandomCharacterCard';
import Header from './components/Header/Header';
import Info from './components/Info/Info';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';


const App = () => {
  const [selectedChar, setSelectedChar] = useState(null)
  const recieveCharId = (id) => {
    setSelectedChar(id)
  }
  return (
    <div className="App">
      <Header/>
      <ErrorBoundary>
        <RandomCharacterCard/>
      </ErrorBoundary>
      <div className='cards-info'>
        <ErrorBoundary>
          <Cards recieveCharId={recieveCharId}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Info charId={selectedChar}/>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;

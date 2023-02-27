import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './components/Cards/Cards';
import RandomCharacterCard from './components/RandomCharacterCard/RandomCharacterCard';
import Header from './components/Header/Header';
import Info from './components/Info/Info';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Comics from './components/Comics/Comics';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PageNotFound from './components/Pages/404 Page/404';


const App = () => {
  const [selectedChar, setSelectedChar] = useState(null)
  const recieveCharId = (id) => {
    setSelectedChar(id)
  }
  return (
    <Router>
      <div className="App">
      <Header/>
      <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/' element={<CharSection 
        recieveCharId={recieveCharId}
        charId={selectedChar}/>}/>
        <Route path='/comics' element={<Comics/>}/>
      </Routes>
      {/* <Comics/> */}
      {/* <ErrorBoundary>
        <RandomCharacterCard/>
      </ErrorBoundary>
      <div className='cards-info'>
        <ErrorBoundary>
          <Cards recieveCharId={recieveCharId}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Info charId={selectedChar}/>
        </ErrorBoundary>
      </div> */}
    </div>
    </Router>
  );
}

const CharSection = (props) => {
  return(
    <>
    <ErrorBoundary>
        <RandomCharacterCard/>
      </ErrorBoundary>
      <div className='cards-info'>
        <ErrorBoundary>
          <Cards recieveCharId={props.recieveCharId}/>
        </ErrorBoundary>
        <ErrorBoundary>
          <Info charId={props.selectedChar}/>
        </ErrorBoundary>
      </div> 
    </>
  )
}

export default App;

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PageNotFound from './components/Pages/404 Page/404';
import ComicPage from './components/Pages/ComicPage/ComicPage';
import ComicsPage from './components/Pages/ComicsPage';
import CharPage from './components/Pages/CharPage';

//динамические импорты

const App = () => {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/' element={<CharPage/>}/>
        <Route path='/comics' element={<ComicsPage/>}/>
        <Route path='/comics/:comicId' element={<ComicPage/>}/>
      </Routes>
    </div>
    </Router>
  );
}


export default App;

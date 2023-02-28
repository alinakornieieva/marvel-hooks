import { lazy, Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Preloader from './components/Preloader/Preloader';

//динамические импорты
const PageNotFound = lazy(() => import('./components/Pages/404 Page/404'))
const CharPage = lazy(() => import('./components/Pages/CharPage'))
const ComicPage = lazy(() => import('./components/Pages/ComicPage/ComicPage'))
const ComicsPage = lazy(() => import('./components/Pages/ComicsPage'))



const App = () => {
  return (
    <Router>
      <div className="App">
      <Header/>
      <Suspense fallback={<Preloader/>}>
      <Routes>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/' element={<CharPage/>}/>
        <Route path='/comics' element={<ComicsPage/>}/>
        <Route path='/comics/:comicId' element={<ComicPage/>}/>
      </Routes>
      </Suspense>
    </div>
    </Router>
  );
}


export default App;

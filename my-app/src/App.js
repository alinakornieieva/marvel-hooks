import { lazy, Suspense, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Preloader from './components/Preloader/Preloader';
import SinglePage from './components/Pages/SinglePage';
import ComicPage from './components/Pages/SingleComicPage/ComicPage';
import SingleFindChar from './components/Pages/SingleCharPage/SingleFindChar';


//динамические импорты
const PageNotFound = lazy(() => import('./components/Pages/404 Page/404'))
// const SinglePage = lazy(() => ('./components/Pages/SinglePage'))
const CharPage = lazy(() => import('./components/Pages/CharPage'))
// const ComicPage = lazy(() => import('./components/Pages/SingleComicPage/ComicPage'))
const ComicsPage = lazy(() => import('./components/Pages/ComicsPage'))
// const SingleFindChar = lazy(() => import('./components/Pages/SingleCharPage/SingleFindChar'))

//

const App = () => {
  return (
    <Router>
      <div className="App">
      <Header/>
        <Suspense fallback={<Preloader/>}>
            <Routes>
              <Route path='*' element={<PageNotFound/>}/>
              <Route path='/' element={<CharPage/>}/>
              <Route path='/characters/:id' element={<SinglePage Component={SingleFindChar} dataType='char'/>}/>
              <Route path='/comics' element={<ComicsPage/>}/>
              <Route path='/comics/:id' element={<SinglePage Component={ComicPage} dataType='comic'/>} />
            </Routes>
        </Suspense>
    </div>
    </Router>
  );
}


export default App;

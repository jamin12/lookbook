import Tag from './page/components/Tag';
import Result from './page/components/Result'
import Home from './page/components/Home';
import Test from './page/components/Test';
// import Router from './page/util/Router'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" exact={true} element={ <Home/> }/> ;
                <Route path="/tag" element={ <Tag/> }/> ;
                <Route path="/result" element={ <Result/> }/>;
                <Route path="/t" element={ <Test/> }/>;
            </Routes>
        </BrowserRouter>


      {/* <Router /> */}
      {/* <Result /> */}
      {/* <Hello /> */}
      {/* 1234 */}
    </div>
  );
}

export default App;

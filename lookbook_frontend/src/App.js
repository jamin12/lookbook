import Tag from './page/components/Tag';
import Result from './page/components/Result'
import Home from './page/components/Home';
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

import Tag from './page/components/Tag';
import Result from './page/components/Result'
import Home from './page/components/Home';
import Webcam from './page/components/WebCapture';
import Camera from './page/components/Camera';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" exact={true} element={ <Home/> }/> ;
                <Route path="/webcam" element={ <Webcam/> }/> ;
                <Route path="/tag" element={ <Tag/> } name="age"/> ;
                <Route path="/result" element={ <Result/> }/>;
                <Route path="/camera" element={ <Camera/> }/>;
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

import React from "react";
import { useLocation } from 'react-router'
import { Button } from "react-bootstrap";

const Result = (  ) => {
    
    //처음 화면으로 이동
    const clickBackPage = () =>{
        document.location.href = '/'
    }

    const { state } = useLocation();

    console.log(state.age);
    return (
        <div className="App">
            <h1>추천 결과 보기</h1>
            <p>The recommendation will be based on KNN (still stable) 
                that has been previously classified using the classification model.</p>

            <h4># { state.age }</h4>
            <h4># { state.gender }</h4>
            {/* <h4># { this.location.gender }</h4> */}

            <Button variant="primary" onClick={ clickBackPage }>처음 화면으로</Button>
        </div>
    );
}
export default Result;
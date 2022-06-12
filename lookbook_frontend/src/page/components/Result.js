import React, { useState } from "react";
import { useLocation } from 'react-router'
import { Button } from "react-bootstrap";
import styles from '../style/Result.module.css';



const Result = (  ) => {
    
    const [ascii, setAscii] = useState([]);
    const [base64, setBase64] = useState([]);
    const [byte, setByte] = useState([]);
    const [img, setImg] = useState([]);

    //처음 화면으로 이동
    const clickBackPage = () =>{
        document.location.href = '/'
    }

    const { state } = useLocation();

    const axios = require('axios');
    
    function decode(str) {
        for(var i in base64) {
            var decodedStr = atob(str[i]);
            setByte(decodedStr);
        }
    }

    const getImg = async() => {
        const response = await axios.get('http://localhost:8080/results')
            .then(response => {
                setAscii(response.data)
                console.log(ascii)
            })
        
        //base64로 인코딩
        const asciiToBase = ascii.map(ascii => { 
            JSON.stringify(window.btoa(ascii))
            // console.log(test)
        })
        setBase64(asciiToBase);
        console.log(JSON.stringify(base64))

        const baseToBytes = base64.map(base64 => {
            var test = window.atob(base64)
        })
        setByte(baseToBytes);
        console.log(JSON.stringify(byte))



    }
    


    return (
        <div className={styles.main}>
            
            <body className={styles.main_body}>
                <h1>#추천 결과 보기</h1>
                <p>The recommendation will be based on KNN (still stable) 
                    that has been previously classified using the classification model.The recommendation will be based on KNN still stable 
                    that has been previously classified using the classification model.</p>

                <contents>
                    <div className={styles.contents_prev}>
                        <h4># { state.age }세</h4>
                        <h4># { state.gender }</h4>
                        <h4># { state.title }_패션</h4>
                    </div>
                    
                    <div className={styles.contents_tag}>
                        
                        <ul>{state.tags.map((tags, index) => 
                            <li key={index}> # {tags} </li>)}
                        </ul>
                    </div>

                </contents>
                <Button className={styles.btn} variant="danger" onClick={ clickBackPage } size="lg">
                    처음 화면으로
                </Button>
                <Button onClick={getImg}>TEST</Button>
            </body>
            
            <header className={styles.main_header}>
                {/* <img src="data:image/<이미지확장자>;base64,<data코드>" /> */}
                {/* 여기 사이트 참고 -> https://im-designloper.tistory.com/57 */}

                <img className={styles.main_img} alt="기본이미지" src={img[0]}/>
            </header>
        
        </div>
    );
}
export default Result;
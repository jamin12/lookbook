import React, { useState } from "react";
import { useLocation } from 'react-router'
import { Button } from "react-bootstrap";
import styles from '../style/Result.module.css';
import base64 from 'base-64'



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
        const response = await axios.post('http://localhost:8080/results',{
            "age": 0,
            "tag_title": "string",
            "tag_subtitle": "string"
        })
            .then(response => {
                setAscii(response.data.imgs)
                console.log(ascii)

                var asciiToBase = []
                asciiToBase.push(window.btoa(ascii[0]))
                asciiToBase.push(window.btoa(ascii[1]))
                setBase64(asciiToBase)
                console.log(base64)

                var baseToBytes = []
                baseToBytes.push(window.btoa(base64[0]))
                baseToBytes.push(window.btoa(base64[1]))
                setByte(baseToBytes)
                console.log(byte)
                var data = byte[0]

                var imgSrc =  "data:image/jpg;base64," + data;
                setImg(imgSrc)
                console.log(img)
            })
        
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

                <img className={styles.main_img} alt="기본이미지" src={img}/>
            </header>
        
        </div>
    );
}
export default Result;
import React, { useState } from "react";
import { useLocation } from 'react-router'
import { Button } from "react-bootstrap";
import styles from '../style/Result.module.css';
import base64 from 'base-64'



const Result = ( props ) => {
    // props
    const [img, setImg] = useState([]);
    const { state } = useLocation();
    const [url, setUrl] = useState(null);

    const title_ = state.title;
    const subTitle_ = state.subTitle;

    //처음 화면으로 이동
    const clickBackPage = () =>{
        document.location.href = '/'
    }


    const axios = require('axios');
    
    const getImg = async() => {
        const response = axios.post('http://192.168.20.82:8080/result',{
            "tag_title": title_,
            "tag_subtitle": subTitle_
        },{
            responseType: 'blob',
        })
            .then(response => {
                setImg(window.URL.createObjectURL(response.data));
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
                        <h4># { state.subTitle }룩</h4>
                    </div>
                    
                    <div className={styles.contents_tag}>
                        {/* <ul>{state.tags.map((tags, index) => 
                            <li key={index}> # {tags} </li>)}
                        </ul> */}
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
                
                {/* <img className={styles.main_img} alt="기본이미지" src={img}/> */}
                {/* <img src="blob:http://192.168.20.82:8080/be8b3852-f105-4a44-951e-6530e206b388" id="image" className={styles.main_img}></img> */}
                <img src={img} id="image" className={styles.main_img}></img>
            </header>
        </div>
    );
}
export default Result;
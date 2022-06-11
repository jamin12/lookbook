import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from './TagModal';
// import Modal from '../components/ModalTag'

export default function Tag(props){
    
    var gender = "여자";
    var age = 22;

    const navigate = useNavigate();
    // 이전 페이지로 이동
    const clickPrevPage = () => {
        document.location.href = '/'
    }


    return(
        <>
            <header>
                <h1>태그 입력 화면</h1>
                <p>The predicted age and gender are output based on the model in which the input user face image is learned. The lookbook is recommended based on the predicted age, gender, tag entered by the user, and current weather. The recommendation will be based on KNN (still stable) that has been previously classified using the classification model.</p>
            </header>
            <contents>
                <h4>예측 나이: {age}</h4>
                <h4>예측 성별: {gender}</h4>

                <p>원하는 스타일 또는 룩을 입력해주세요.</p>
                <p>EX) #데이트룩, #하객룩</p> 
                
                {/* 모달창 */}
                <Modal/>
                
                <br/>
                <br/>
                <br/>



                <Button variant="outline-primary" onClick={ clickPrevPage }>뒤로가기</Button>{' '}
                
                <Button variant="primary" onClick={() => 
                    navigate(
                        "/result",
                        {state: { age: age, gender: gender}}
                    )  
                }>학습 시작하기
                </Button>
            </contents>

        </>
    )
}
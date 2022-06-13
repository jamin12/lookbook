import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from './Tags/TagModal';
import styles from '../style/Tag.module.css';
import axios from 'axios';
// import Modal from '../components/ModalTag'

export default function Tag(props){

    const [gender, setGender] = useState('여자');
    const [age, setAge] = useState(null);

    const [title, setTitle] = useState();
    const [subTitle, setSubTitle] = useState();

    // 이미지
    const [img, setImg] = useState();
    const [imgHeader, setImgHeader] = useState();

    const navigate = useNavigate();
    // 이전 페이지로 이동
    const clickPrevPage = () => {
        document.location.href = '/'
    }

    // setAge(props.age)

    
    const onStudy = async() => {
        axios.post('http://192.168.20.82:8080/result',{
            "tag_title": title,
            "tag_subtitle": subTitle
        })
            .then(response => {
                alert("학습이 시작되었습니다.")
                setImg(response.body)
                console.log(response.headers)
            })
        navigate(
            "/result",
            {state: { age: age, gender: gender, title: title, subTitle: subTitle, img: img}}
        )
    }


    return(
        <div className={styles.main}>
            <header className={styles.main_header}>
                <img className={styles.main_img} alt="기본이미지" src="img/img1.png"/>
            </header>
            <body className={styles.main_body}>
                <h1># 태그 입력하기</h1>
                <p>The predicted age and gender are output based on the model in which the input user face image is learned. The lookbook is recommended based on the predicted age, gender, tag entered by the user, and current weather. The recommendation will be based on KNN (still stable) that has been previously classified using the classification model.
                    The predicted age and gender are output based on the model in which the input user face image is learned. The lookbook is recommended based on the predicted age, gender, tag entered by the user, and current weather. The recommendation will be based on KNN still stable.
                </p>
                <contents>
                    <div className={styles.contents_prev}>

                        <h4>예측 나이: {props.age}</h4>
                        <h4>예측 성별: {gender}</h4>
                    </div>
                    <div className={styles.contents_info_msg}>
                        <p>원하는 스타일 또는 룩을 입력해주세요.</p>
                        <p>EX) #데이트룩, #하객룩</p> 
                    </div>


                    {/* 모달창 */}
                    <Modal setTitle={setTitle} setSubTitle={setSubTitle} />

                    {/* 태그 결과 */}
                    <div className={styles.result}>
                        <h4>{title} 패션</h4>
                        <h4># {subTitle} </h4>
                    </div>
                    <br/>
                    <br/>
                    <br/>

                    <div className={styles.btn_group}>
                        <Button variant="outline-primary" onClick={ clickPrevPage }>뒤로가기</Button>{' '}
                        <Button variant="primary" onClick={onStudy}>
                            학습 시작하기
                        </Button>
                    </div>


                </contents>
            </body>


        </div>
    )
}
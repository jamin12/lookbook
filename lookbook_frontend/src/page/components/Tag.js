import React, { useState } from 'react';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Modal from './Tags/TagModal';
import styles from '../style/Tag.module.css';
// import Modal from '../components/ModalTag'

export default function Tag(props){

    const [gender, setGender] = useState('여자');
    const [age, setAge] = useState(22);

    const initialTags = [];
    const [tags, setTags] = useState(initialTags);
    const [title, setTitle] = useState('');


    const navigate = useNavigate();
    // 이전 페이지로 이동
    const clickPrevPage = () => {
        document.location.href = '/'
    }

    const tagList = tags.map((tags, index) => {
            <li key={index}>{tags}</li>
    })


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

                        {/* 나이 받아와야함 */}
{/* ================================================================== */}

                        <h4>예측 나이: {age}</h4>
                        <h4>예측 성별: {gender}</h4>
                    </div>
                    <div className={styles.contents_info_msg}>
                        <p>원하는 스타일 또는 룩을 입력해주세요.</p>
                        <p>EX) #데이트룩, #하객룩</p> 
                    </div>

                    {/* 모달창 */}
                    <Modal setTitle={setTitle} setTags={setTags} />

                    {/* 태그 결과 */}
                    <div className={styles.result}>
                        <h4>{title} 패션</h4>
                        <ul>{tags.map((tags, index) => 
                            <li key={index}> # {tags} </li>)}
                        </ul>
                    </div>
                    <br/>
                    <br/>
                    <br/>

                    <div className={styles.btn_group}>
                        <Button variant="outline-primary" onClick={ clickPrevPage }>뒤로가기</Button>{' '}
                        <Button variant="primary" onClick={() => 
                            navigate(
                                "/result",
                                {state: { age: age, gender: gender, title: title, tags: tags,}}
                            )}>
                            학습 시작하기
                        </Button>
                    </div>


                </contents>
            </body>


        </div>
    )
}
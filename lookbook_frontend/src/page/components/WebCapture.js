import React, { Component, useState } from 'react';
import Webcam from "react-webcam";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import styles from '../style/Camera.module.css';


class WebcamCapture extends Component{

  state = {
    imageSrc: null,
    age : 22
  };

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    const [imageUrl, setImageUrl] = this.setState({ imageSrc });
    const [age, setAge] = this.setState({ age });
    const img = new FormData();
    img.append("file",imageSrc);
    axios
      .post("http://localhost:8080/uploadimg", {'imgs':img})
      .then((res) => {
        setImageUrl(res.data);
        setAge(res.data.predict_img)
        console.log(res.data.predict_img)
      })
      .catch((err) => {
        console.error(err);
      })
  };


  

  render () {
    const { imageSrc } = this.state;
    const videoConstraints = {
      width: 600,
      height:400,
      facingMode: "user"
    };


    return (
      <div className={styles.main}>
        <header className={styles.main_header}>
          <h1>LOOKBOOK
            <br/>RECOMMENDATION</h1>
          <p>I will predict age and gender based on the picture. Please allow access.<br/>
              접근 권한을 허용해주세요 웹캠을 통해서 안면 이미지를 불러옵니다.<br/>
              다시 사진을 찍고싶다면 "Capture Photo" 버튼을 누르거나 새로고침 해주세요.</p>
        </header>

        <body className={styles.main_body}>
            <Webcam className={styles.webcam}
                audio={false}
                height={500}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={700}
                videoConstraints={videoConstraints}
            />
            <h3>사진찍기</h3>
            <Button onClick={this.capture} variant='info' size='lg'>Capture photo</Button>
            <img src={imageSrc} className={styles.image}/>
            {/* {imageSrc && <img src={imageSrc} />} */}
        </body>


        <Link to='/tag'><Button className={styles.nextBtn} size='lg'>다음 페이지로</Button></Link>

      </div>
    );
  }
}

  export default WebcamCapture;



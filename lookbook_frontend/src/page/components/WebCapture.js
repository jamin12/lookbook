import React, { Component, useState } from 'react';
import Webcam from "react-webcam";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


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
        console.log(res.data.predict_img);
      })
      .catch((err) => {
        console.error(err);
      })
  };


  

  render () {
    const { imageSrc } = this.state;
    const videoConstraints = {
      width: 720,
      height: 720,
      facingMode: "user"
    };


    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
        {imageSrc && <img src={imageSrc} />}

        <Link to='/tag'><button>다음 페이지로</button></Link>

      </div>
    );
  }
}

  export default WebcamCapture;



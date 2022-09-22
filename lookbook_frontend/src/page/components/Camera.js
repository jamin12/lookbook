import { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';


function Camera(){
    const [imgSrc, setImgSrc] = useState(null)
    const [age, SetAge] = useState(22);

    const setRef = webcam => {
        this.webcam = webcam;
    }

    const capture = () => {
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

    const { imageSrc } = this.state;
    const videoConstraints = {
      width: 1000,
      height:1000,
      facingMode: "user"
    };

    return (
        <>
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

            <Link to='/tag'><Button>다음 페이지로</Button></Link>
        </>
    )
}

export default Camera;
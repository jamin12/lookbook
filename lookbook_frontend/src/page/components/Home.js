import React from 'react';
import { Button } from 'react-bootstrap';
import styles from '../style/Home.module.css'

function Home() {

    const clickTag = () => {
        document.location.href = '/webcam';
    }

    return(
        <>
            
            <Button className={styles.btn} variant="outline-primary" onClick={ clickTag }>
                <h1>LOOKBOOK RECOMMENDATION</h1>
                <h2>룩북 추천 시스템</h2>
                <h4>추천을 시작하려면 아무곳이나 눌러주세요.</h4>
            </Button>
        </>
    )
}
export default Home;
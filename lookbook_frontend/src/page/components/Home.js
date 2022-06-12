import React from 'react';
import { Button } from 'react-bootstrap';

function Home() {

    const clickTag = () => {
        document.location.href = '/tag';
    }

    return(
        <>
            <h1>홈화면</h1>
            <Button variant="outline-primary" onClick={ clickTag }>태그 입력하러가기</Button>{' '}
        </>
    )
}
export default Home;
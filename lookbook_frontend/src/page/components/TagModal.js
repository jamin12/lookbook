import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TagInput from './TagSearch'

export default function TagModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSave = () => {
        setShow(false)
        // 입력한 태그를 태그 입력 화면으로 넘기는 코드 추가해야함
    }


  
  
  return (
    <>
        <Button variant="primary" onClick={handleShow} >
            태그 설정하기
        </Button>

        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">태그 설정하기</Modal.Title>
            </Modal.Header>
        
            <Modal.Body>
                <TagInput/>
                <p>123w4</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    등록하기
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

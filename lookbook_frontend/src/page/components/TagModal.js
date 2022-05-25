import React from 'react';
import { Modal, Button, } from 'react-bootstrap';
import styles from '../style/Modal.module.css';

function MydModalWithGrid(props) {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
                <label className='control-label input-radio'>아래에서 원하는 종류를 선택해주세요</label>
                <input placeholder="이곳에 검색할 태그를 입력해주세요!" type="text" data-select-visible="true"
                    className="form-control ui-autocomplete-input" autocomplete="off"></input>
            </div>
            <div className='tag-group'>
                <button className="tag-item">
                    <span className="tag-item-name">1234</span>
                    <ion-icon name="add-outline"></ion-icon>
                </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
    

export default MydModalWithGrid;
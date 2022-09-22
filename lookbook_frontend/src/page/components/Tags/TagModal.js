import React, { useEffect, useState } from 'react';
import {Button , ButtonGroup} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import TagTitleRadioBtn from '../Tags/TagTitleRadio'
import styled from 'styled-components';
import styles from '../../style/Tag.module.css';
import axios from 'axios';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';


export default function TagModal(props) {
    const [show, setShow] = useState(false);

    // props
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    // 내가 임시로 저장해놓는 곳
    const [subTag, setSubTag] = useState('');

    // 토글버튼
    const [checked, setChecked] = useState(false);
    const [btnValue, setBtnValue] = useState(null);
    



    const handleClose = () => setShow(false);
    
    const handleShow = () => {
      setShow(true);
      setSubTitle(null);
    }
    
    const handleSave = () => {
        setShow(false)
        props.setTitle(title)
    }



  
    // 태그 삭제기능
    const removeTags = (indexToRemove) => { 
    //여기서도 map함수의 index를 전달받아 클릭된 인덱스 정보를 활용해서 삭제를 시킬 수 있다.
      setTags(tags.filter((tag) =>{
        return tag !== tags[indexToRemove]
      }));
    };
    
    // 태그 추가 기능 
    const addTags = (e) => { 
      props.setSubTitle(e.target.id)
      setBtnValue(e.currentTarget.tag)
    }


  return (
    <>
        <Button variant="outline-primary" onClick={handleShow}
        className={styles.btn_modal}>
            # 태그
        </Button>

        <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">태그 설정하기</Modal.Title>
            </Modal.Header>
        
            <Modal.Body>
                {/* 태그 타이틀 설정 */}
                <TagTitleRadioBtn setTitle={setTitle} setTags={setTags}/>

                  <p>카테고리 설정</p>

                  <ButtonGroup className="mb-2">
                      {tags.map((tag, idx) => (
                          <ToggleButton
                              key={idx}
                              id={`${tag}`}
                              type="radio"
                              variant="outline-danger"
                              name="radio"
                              value={tag}
                              checked={btnValue === tag}
                              onChange={addTags}
                          >
                          {tag}
                        </ToggleButton>
                      ))}
                  </ButtonGroup>

                  {/* // {tags.map((tags, index) => 
                  //     <li key={index} className={styles.subTitleTag}>
                  //       <ToggleButton onClick={addTags} id={tags} variant="outline-danger"> #{tags} </ToggleButton>  
                  //     </li>
                  // )} */}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose} className={styles.modal_save_btn}>
                    닫기
                </Button>
                <Button variant="danger" onClick={handleSave} className={styles.modal_save_btn}>
                    등록하기
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}







export const TagsInput = styled.div`
    margin: 10px 8px;
    display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 48px;
  padding: 0px 10px;

  // 색상 - 태두리
  border: 2px solid #c74630;
  border-radius: 6px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 10px 0 0 0;

    > .tag {
      width: auto;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 0 10px;
      font-size: 20px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: #cf4d36;
        
      > .tag-close-icon {
        display: block;
        width: 20px;
        height: 20px;
        line-height: 18px;
        text-align: center;
        font-size: 20px;
        margin-left: 10px;
        color: #cf4d36;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
    }
  }

  > input {    
    flex: 1;
    border: none;
    height: 60px;
    font-size: 20px;
    padding: 6px 0 0 0;
    :focus {
    outline: transparent;
  }
  }

  &:focus-within {
    border: 1px solid #c74630;
  }

`;
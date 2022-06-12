import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TagTitleRadioBtn from '../Tags/TagTitleRadio'
import styled from 'styled-components';
import styles from '../../style/Tag.module.css';
import axios from 'axios';


export default function TagModal(props) {
    const [show, setShow] = useState(false);
    const initialTags = [];
    const [tags, setTags] = useState(initialTags);
    const [title, setTitle] = useState('');
    const [subTag, setSubTag] = useState([]);



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const handleSave = () => {
        setShow(false)
        props.setTags(tags)
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
    const addTags = (event) => { 
      let value = event.target.value.trim();
      // 이미 입력되어 있는 태그인지 검사하여 이미 있는 태그라면 추가하지 말기
      // 아무것도 입력하지 않은 채 Enter 키 입력시 메소드 실행하지 말기
      if(event.key === 'Enter' && !tags.includes(value) && value){
        setTags([...tags, value]);
        // 태그가 추가되면 input 창 비우기
        event.target.value ="";
      }
      else if(event.key === 'Enter' && !value){
        event.target.value ="";
      }
    }


    const getSubTag = () => {
        setSubTag([]);
        const response = axios.get('http://localhost:8080/tags')
          .then(response => {
              setSubTag(response.data.tag_name);
          })
          .catch(err => {
            console.log(err)
          })
    }

    useEffect(() => {
      getSubTag();
    }, [])


  
  
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

                <TagTitleRadioBtn setTitle={setTitle}/>

                <TagsInput>
                    <ul id='tags'>
                      {tags.map((tag, index) => (
                        <li key={index} className='tag'>
                          <span className='tag-title'>{tag}</span>
                          <span className='tag-close-icon' 
                                onClick={() => removeTags(index)}>&times;
                          </span>
                        </li>
                      ))}
                    </ul>
                    <input
                      className='tag-input'
                      type='text'
                      onKeyUp={(event) => {addTags(event)}}
                      placeholder='Press enter to add tags'
                    />
                </TagsInput>

                <h4></h4>
                <ul>{subTag.map((tags, index) => 
                            <li key={index}> # {tags} </li>)}
                        </ul>
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
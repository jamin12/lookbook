import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components';


const REQUEST_URL = "http://192.168.20.82:8080/tags/"


function TagTitleRadio(props){
    const [check, setCheck] = useState([])

    const changeRadio = e => {
        if(e.target.checked){
            setCheck(e.target.id)
            props.setTitle(e.target.id)
            axios.get(REQUEST_URL + e.target.id)
            .then(response => {
                // console.log(response.data.tag_name)
                props.setTags(response.data.tag_name)
            })
        }
    }


    return (
        <>
            <div>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='캐주얼'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>캐주얼</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='트레디셔널'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>트레디셔널</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='섹시로맨틱'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>섹시/로맨틱</FormCheckText>
                </label>
                
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='레트로키치'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>레트로/키치</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='내츄럴'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>내츄럴</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='매니시모던'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>매니시/모던</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='힙'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>힙</FormCheckText>
                </label>
            </div>
        </>
    )
}
export default TagTitleRadio;

const FormCheckText = styled.span`
  font-size: 18px;
  margin: 0px 5px 10px 10px;
  width: 110px;
  height: 35px;
  background: #e6e6e6;
  border-radius: 50px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #777;
`;

const FormCheckLeft = styled.input.attrs({ type: 'radio' })`
  &:checked {
    display: inline-block;
    background: none;
    padding: 0px 10px;
    text-align: center;
    height: 35px;
    line-height: 33px;
    font-weight: 500;
    display: none;
  }
  &:checked + ${FormCheckText} {
    background: #e4794d;
    color: #fff;
  }
  display: none;
`;
import React, { useState } from 'react'
import styled from 'styled-components';


function TagTitleRadio(){
    const [check, setCheck] = useState([])

    const changeRadio = e => {
        if(e.target.checked){
            setCheck(e.target.id)
            console.log(e.target.id)
        }
    }

    return (
        <>
            <div>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='1'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>트레디셔널</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='2'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>네추럴</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='3'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>모던</FormCheckText>
                </label>
                <br/>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='4'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>로멘틱/섹시</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='5'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>케주얼</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='6'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>레트로/키치</FormCheckText>
                </label>
                <label>
                    <FormCheckLeft
                        type="radio"
                        id='7'
                        name="radioButton"
                        onChange={changeRadio}
                        value={check}
                    />
                    <FormCheckText>힙합/펑크</FormCheckText>
                </label>
            </div>
        </>
    )
}
export default TagTitleRadio;

const FormCheckText = styled.span`
  font-size: 18px;
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
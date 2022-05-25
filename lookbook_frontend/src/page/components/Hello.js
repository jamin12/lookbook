import React, { useState } from 'react';

export default function Hello(props) {

    const [text, setText] = useState('');

    const setTag = (e) => {
        setText(e.target.value);
    }
    const saveText = () => {
        setText('');
    }
    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
            console.log('oikok')
            gogo();
        }
    }
    const gogo = () => {
        
    }

    return (
        <>
            <h1>1234</h1>
            <input type='text' id='tag' name='tag' onChange={setTag} value={text} />
            <button type='submit' onClick={ onCheckEnter }>GOGO</button>
            <div>
                <p>값: {text}</p>
                {/* <p>{saveTag}</p> */}
            </div>
        </>
       
    );
}
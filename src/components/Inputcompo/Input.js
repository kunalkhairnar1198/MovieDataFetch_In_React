import React, { useRef } from 'react'
import classes from '../Inputcompo/Input.module.css'

const Input = (props) => {

    const titleRef = useRef('')
    const textRef = useRef('')
    const dateRef = useRef('')

    const updateData =(e)=>{
        e.preventDefault()

        const enterObj ={
            // id : Math.random().toString(),
            title : titleRef.current.value,
            openingText : textRef.current.value,
            releaseDate : dateRef.current.value,
        }
        props.onEnteredDataReceive(enterObj)
        // console.log(enterObj)

        titleRef.current.value = ''
        textRef.current.value =''
        dateRef.current.value=''
    }

  return (
    <section>
        <form className={classes.form} onSubmit={updateData}>
        <label>Title</label>
        <input type='text' ref={titleRef}/>
        <label>Opening Text</label>
        <textarea type='textarea' ref={textRef}/>
        <label>Release Date</label>
        <input type='date' ref={dateRef}/>
        <button style={{display:'flex', alignItems:'center'}}>Add Movie</button>
        </form>
    </section>
  )
}

export default Input

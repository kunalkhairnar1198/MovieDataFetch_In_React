import React, { useRef } from 'react'
import classes from '../Inputcompo/Input.module.css'

const Input = (props) => {

    const titleRef = useRef('')
    const textRef = useRef('')
    const dateRef = useRef('')

    const updateData =(e)=>{
        e.preventDefault()

        const enterObj ={
            title : titleRef.current.value,
            text : textRef.current.value,
            date : dateRef.current.value,
        }
        props.onEnteredDataReceive(enterObj)
        // console.log(enterObj)
    }

  return (
    <section>
        <form className={classes.form} onSubmit={updateData}>
        <label>Title</label>
        <input type='text' ref={titleRef}/>
        <label>Opening Text</label>
        <input type='textarea' ref={textRef}/>
        <label>Release Date</label>
        <input type='date' ref={dateRef}/>
        <button style={{display:'flex', alignItems:'center'}}>Add Movie</button>
        </form>
    </section>
  )
}

export default Input

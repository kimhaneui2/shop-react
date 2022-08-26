import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import addItem from '../store'

let yellowBtn = styled.button`
    backgroud: ${props=>props.bg};
    color: black
`
let Box = styled.div`
  padding : 20px;
  color : grey
`;

function Detail(props){
    let a = useSelector((state)=>{return state})
    let dispatch = useDispatch()
    let [alert, setAlert] = useState(true)
    let [num, setNum] = useState('')
    let [count, setCount] = useState(0)
    let [fade, setFade] = useState('')
    let {id} = useParams()
    let shoes = props.shoes.find((x)=>x.id = id)

    useEffect(()=>{
        let list = localStorage.getItem('data');
        list = JSON.parse(list) || []
        list.push(shoes.title);
        list = [...new Set(list)]
        localStorage.setItem('data', JSON.stringify(list))
    },[])
    useEffect(()=>{
        if(isNaN(num) == true){
            alert('그러지마세요')
        }
        setTimeout(()=>{ setAlert(false); setFade('start') }, 2000)
        return()=>{
        setFade('') //clean up function
        }
    },[num])
    
    return(
        <div className="container">
        {
            alert == true
            ? <div className={"alert alert-warning end" + fade}>
                2초이내 구매시 할인
            </div>
            : null
        }
        {count}
        <button onClick={()=>{setCount(count + 1)}}>button</button>
        {/* <yellowBtn bg="blue">btn</yellowBtn> */}
        <input type="text" onChange={(e)=>{
            if(isNaN(e.target.value) == true){
                alert('그러지마세요')
            }
            // setNum(e.target.value)
        }}/>
        <div className="row">
            <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{shoes.title}</h4>
            <p>{shoes.content}</p>
            <p>{shoes.price}</p>
            <button className="btn btn-danger" onClick={()=>{
                dispatch(addItem(shoes))
            }}>주문하기</button> 
            </div>
        </div>
        </div> 
    )
}

export default Detail
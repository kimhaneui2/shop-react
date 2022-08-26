import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {countIncrease, increase} from './../store'
import {useMemo, memo } from 'react'
let Child = memo(function(){
  return <div>child</div>
})
function 함수(){
  return <div>반복문10억번돌린결과</div>
}

function Cart(){
    let result = useMemo(()=>{ return 함수() }, [])
    let a = useSelector((state)=>{return state})
    let dispatch = useDispatch()
    return (
        <div>
          <Child/>
            <h6>{a.user.name} {a.user.age}의 장바구니</h6>
            <button onClick={()=>{dispatch(increase())}}>button</button>
            <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>     
                </tr>
            </thead>
            {
            a.cart.map(function(item, i){
              return(
                <tbody>
                <tr>
                <td>{i}</td>
                <td>{item.name}</td>
                <td>{item.count}</td>
                <td>
                    <button onClick={()=>{
                        dispatch(countIncrease(i))
                    }}> + </button>
                </td>
                </tr>
                </tbody>
              )
            })
          }
            </Table> 
        </div>
    )
}
export default Cart
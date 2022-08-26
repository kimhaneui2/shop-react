import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav} from 'react-bootstrap'
import { Routes, Route, useNavigate, Link, Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query' 
import bg from './img/bg.png'
import { createContext, useEffect, useState, lazy, Suspense, useTransition} from 'react';
import data from './data.js';
import axios from 'axios';

// import Detail from './routes/Detail'
// import Cart from './routes/Cart'

const Detail = lazy( () => import('./routes/Detail.js') )
const Cart = lazy( () => import('./routes/Cart.js') )

let Context = createContext() //보관함
let b = new Array(100).fill(0)

function App() {
  let [name, setName] = useState('')
  let [isPending, startTransition] = useTransition();
  
  let a = localStorage.getItem('data');
  let recentList = JSON.parse(a) || []
  let name2 = '';
  let [shoes, shoesSet] = useState(data);
  let [재고] = useState([10,11,12])
  let [alertFlag, setAlert] = useState(false)
  let [count, setCount] = useState(0);
  let [tap, setTap] = useState(0);
  let navigate = useNavigate();
  let result = useQuery('작명', ()=>
  axios.get('https://codingapple1.github.io/userdata.json')
  .then((a)=>{ return a.data }),
  {staleTime : 1000}
  )
  return (
    <div className="App">
      {
        isPending ? '로딩중':
        b.map(()=>{
          return <div>{name}</div>
        })
      }
      <div>
        <h4>최근검색</h4>
        <ul>
          {
           recentList.map(function(recent){
            return(
              <li>{recent}</li>
            )
          })
          }
          
          </ul>
      </div>
       <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">ShoesShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link onClick={()=>navigate('/cart')}>Cart</Nav.Link>
        </Nav>
        <Nav className='ms-auto'>
          {result.isloading ? '로딩중': result.data}
        </Nav>
        </Container>
      </Navbar>

      <Link to="/">home</Link>
      <br/>
      <Link to="/detail">detail</Link>
      <Suspense fallback={ <div>로딩중임</div> }>
        <Routes>
          <Route path='/' element={ 
          <>
          <div className="main-bg" style={{backgroundImage: 'url(' + bg + ')'}}></div>
          <div className="container">
          {
              alertFlag == true
              ? <div className="alert alert-warning">
                  loading....
              </div>
              : null
          }
          <div className="row">
          {
              shoes.map(function(item, i){
                return(
                  <Card item={item} i={i+1}></Card>
                )
              })
            }
          </div>
          <button onClick={()=>{
            setAlert(true)
            count = count + 1;
            setCount(count);
            if(count === 2){
              alert('no')
            }
            axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
              console.log(결과.data)
              setAlert(false)
              let copy = [...shoes, ...결과.data]
              shoesSet(copy);
            })
            Promise.all([axios.get('/url1'),axios.get('/url2')]) //여러개 날릴때
            fetch('URL').then(결과 => 결과.json()).then((결과) => { console.log(결과) } )
            .catch(()=>{
              console.log('실패함')
            })
          }}>button</button>
          <Nav variant="tabs"  defaultActiveKey="link0">
      <Nav.Item>
        <Nav.Link eventKey="link0" onClick={()=>setTap(0)}>버튼0</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link1"onClick={()=>setTap(1)}>버튼1</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link2"onClick={()=>setTap(2)}>버튼2</Nav.Link>
      </Nav.Item>
      </Nav>
      <TabContent tap={tap} shoes={shoes}/>
          </div>  
          </>} />
          <Route path='/detail/:id' element={ 
              <Detail shoes={shoes}/> 
          } />
          <Route path='/cart' element={<Cart/>}/>
          
          <Route path='/about' element={ <About/> }>
            <Route path='member' element={<div>멤버임</div>} />
          </Route>
          <Route path='/event' element={ <Event/> }>
            <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}></Route>
            <Route path="two" element={<p>생일기념 쿠폰받기</p>}></Route>
          </Route>
          <Route path='*' element={ <div>(404) 없는 페이지 입니다</div> } />
        </Routes>
      </Suspense>
      
    </div>
  );
}

function TabContent({tap,shoes}){
  let [fade, setFade] = useState('');
  useEffect(()=>{
    setTimeout(()=>{setFade('end')},200)
    return()=>{
      setFade('') //clean up function
    }
  },[tap])
  return <div className={'start' + fade}>{shoes[tap].title}</div>
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}
function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}
function Card(props){ //대분자로 만드삼
  return(
      <div className="col-md-4">
        <a href={"detail/" + props.i}>
        <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
        <h4>{props.item.title}</h4>
        <p>{props.item.content}</p>
        <p>{props.item.price}</p>
        </a>
      </div>
  )
}

export default App;
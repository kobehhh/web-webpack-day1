import img from './imgs/img.jpg';
import './index.css';
import axios from 'axios';

axios.get('/api/info').then(res=>{
 console.log(res)
})

// const a = new Image();
// a.src = img;
// const node = document.querySelector("#root");
// node.append(a)

// function say() {
//     consol.log('webpack');
// }
// say();

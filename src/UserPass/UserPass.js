import React, { useEffect } from 'react';
import './UserPass.css';
import cog from './cog.png'; 
import {useNavigate, useLocation} from 'react-router-dom';


const UserPass = (props)=>{
    const [state, setState] = React.useState({email: '', password: ''});
    const navigate = useNavigate(); 
    const emailEl = React.useRef(null); 
    const passEl = React.useRef(null);
    const location = useLocation().pathname; 
    useEffect(()=>{
        emailEl.current = document.querySelector('input[name="email"]'); 
        passEl.current = document.querySelector('input[name="password"]'); 
    }, []); 

    function onChange({target}){
        setState(x=> ({...x, [target.getAttribute('name')]: target.value})); 
    }


    async function onClick(){
        const email = emailEl.current.value; 
        const password = passEl.current.value; 
        const url = location === '/new-account' ?  'http://127.0.0.1:5000/authenticate/create-user' : 'http://127.0.0.1:5000/authenticate/login';
        const result = await fetch(url, {method: 'post', body: JSON.stringify({email, password}), headers:{'Content-Type': 'application/json'}})
            .then(resp => {
                if(!resp.ok){
                    throw new Error("Error: " + resp.status);
                }
                return resp.json();

            })
            .then(data => {
                return data; 
            })
            .catch(console.log); 
        if(result.success){
            if(location === '/login'){
                localStorage.setItem('token',result.token);
                localStorage.setItem('id', result.id);

            }
            navigate('/');
        }
    }

    return (<div className="userpass">
                <div className='userpass-container'>
                    <img src={cog} className='userpass-img' />
                    <div className="userpass-fields-container" >
                        <input type='field' onChange={onChange} value={state.email} name='email' placeholder='Email'/>
                        <input type='password' onChange={onChange} value={state.password} name='password' placeholder='Password'/>
                        <button onClick={onClick}>{location === '/new-account' ? 'Register' : 'Login'}</button>
                    </div>
                </div>

                
    </div>);
}


export default UserPass; 
export {UserPass};
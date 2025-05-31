import React, { useEffect } from 'react';
import './UserPass.css';
import cog from './cog.png'; 
import {useNavigate, useLocation} from 'react-router-dom';


const UserPass = (props)=>{
    const [state, setState] = React.useState({email: '', password: ''});
    const navigate = useNavigate(); 
    const [errors, setErrors] = React.useState('');
    const emailEl = React.useRef(null); 
    const passEl = React.useRef(null);
    const location = useLocation().pathname; 
    const isVerificationCode = location === '/verification' ? true : false; 
    useEffect(()=>{
        emailEl.current = document.querySelector('input[name="email"]'); 
        passEl.current = document.querySelector(`input[name="password"]`); 
        if(state.email || state.password) setState({email: '', password: ''});
    }, [location]); 

    function onChange({target}){
        setState(x=> ({...x, [target.getAttribute('name')]: target.value})); 
    }



    function isValidPassword(password){
        let abcs = 'abcdefghitjklmnopqrstuvwxyz';
        let ABCS = abcs.toUpperCase();
        abcs = abcs.split(''); 
        ABCS = ABCS.split('');
        const digits = ['1','2','3','4','5','6','7','8','9'];
        const specials = '!@#$%^&*()_+-=`~[]{}|<>?/:;'.split('');
        if(password.length < 8) return false;
        password = new Array(...password);
        if(password.findIndex(char => abcs.includes(char)) < 0) return false; 
        if(password.findIndex(char => ABCS.includes(char)) < 0) return false;
        if(password.findIndex(char => digits.includes(char)) < 0) return false;
        if(password.findIndex(char => specials.includes(char)) < 0) return false;

        return true;
    }



    const emailReg = new RegExp('.*@.*');
    function inputValidation(email, password){
        let error = "";
        if(!email){
            error = "Email Required";
        }
        else if(!password){
            error = "Password Required";
        }
        else if(!isValidPassword(password)){
            error = "Password must be at least 8 characters long. Have at least a single lower and upercase letter, as well as a digit and a special charater";
        }
        else if(!emailReg.test(email)){
            error = "Must be a valid email";
        }

        if(error) setErrors(error);
        return error; 

    }

    async function onClick(){
        const email = emailEl.current.value; 
        const password = passEl.current.value; 
        const errorMsg = inputValidation(email,password);
        if(errorMsg){
            return;
        }
        const url = location === '/new-account' || location === '/verification' ?  'https://sudoku-api-nine.vercel.app/verification' : 'https://sudoku-api-nine.vercel.app/authenticate/login';
        const body = isVerificationCode ? JSON.stringify({email, verification: password}) : JSON.stringify({email, password});
        const result = await fetch(url, {method: isVerificationCode ? 'put' : 'post', body, headers:{'Content-Type': 'application/json'}})
            .then(resp => {
                return resp.json();

            })
            .then(data => {
                return data; 
            });

        if(result?.success){
            if(location === '/login'){
                localStorage.setItem('token',result.token);
                localStorage.setItem('id', result.id);

            }
            if(location === '/new-account'){
                navigate("/verification");
            }
            else if(location === '/verification'){
                navigate("/login");
            }
            else{
                navigate('/');
            }
        }
        else if(result?.error){
            let error = result.error;
            if(error.status >= 400 < error.status < 500){
                // can possibly create unique error codes in the future
                if(error.message.toLowerCase().indexOf('user already exists')){
                    setErrors("Email already associated with an account")
                }
                else{
                    setErrors("Invalid Username Or Password");
                }
            }
            else if(error.status >= 500){
                setErrors("Server side error. Please try again later.");
            }
        }
    }

    function onEnter({key}){
        if(key === 'Enter'){
            onClick(); 
        }
    }

    

    return (<div className="userpass">
                <div className="userpass-errors">{errors}</div>
                <div className='userpass-container'>
                    <img src={cog} className='userpass-img' />
                    <div className="userpass-fields-container" >
                        <input onKeyUp={onEnter} type='field' onChange={onChange} value={state.email} name='email' placeholder='Email'/>
                        <input onKeyUp={onEnter} type={isVerificationCode ? 'text' : 'password'} onChange={onChange} value={state.password} name='password' placeholder={isVerificationCode ? 'Verification Code' : 'password'}/>
                        <button onClick={onClick}>{location === '/new-account' ? 'Register' : 'Login'}</button>
                    </div>
                </div>

        </div>);
}


export default UserPass; 
export {UserPass};
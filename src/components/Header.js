import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import useOnlineStatus from "./../utils/useOnlineStatus"

export const Header = (props) => {
    const [loginBtn,setLoginBtn] = useState('Login');
    const onlineStatus = useOnlineStatus();
    return (
        <div className='flex justify-between bg-amber-100'>
            <div className='logo'>
                <div  >
                <img src={props.logo} className='w-20 shadow' />
                    <span className="caption w-70"><i>Order-Eat-Repeat</i></span>
                </div>
            </div>
            <div className=''>
                <ul className='flex p-2'>
                    <li className='p-2'>Online Status: {onlineStatus ? "🍏"  : "⬛" }</li>
                    <li className='p-2'><Link to="/">Home</Link></li>
                    <li className='p-2'><Link to="/about">About Us</Link></li>
                    <li className='p-2'><Link to="/contact-us">Contact Us</Link></li>
                    <li className='p-2'><Link to="/my-cart">My Cart</Link></li>
                    <button onClick={
                        loginBtn=='Login' ? () => setLoginBtn("Logout") : () => setLoginBtn("Login")
                    }>{loginBtn}</button>
                </ul>
            </div>
        </div>
    )
};

export default Header;
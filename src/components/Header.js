import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import useOnlineStatus from "./../utils/useOnlineStatus"

export const Header = (props) => {
    const [loginBtn,setLoginBtn] = useState('Login');
    const onlineStatus = useOnlineStatus();
    return (
        <div className='header'>
            <div className='logo'>
                <div className="logoitem">
                <img src={props.logo} height="100" />
                    <span className="caption"><i>Order-Eat-Repeat</i></span>
                </div>
            </div>
            <div className='nav-items'>
                <ul>
                    <li>Online Status: {onlineStatus ? "🍏"  : "⬛" }</li>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/my-cart">My Cart</Link></li>
                    <button onClick={
                        loginBtn=='Login' ? () => setLoginBtn("Logout") : () => setLoginBtn("Login")
                    }>{loginBtn}</button>
                </ul>
            </div>
        </div>
    )
};

export default Header;
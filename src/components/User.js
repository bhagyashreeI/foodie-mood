import React from 'react'
import userdummy from './../images/userdummy.png'

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:{
                name:'Dummy',
                location:'Dummy',
                bio:'Hi..',
                avatar_url: userdummy
            }
        }
    }
    async componentDidMount(){
        const data = await fetch('https://api.github.com/users/bhagyashreeI');
        const json = await data.json();
        this.setState({
            user: json
        })
    }

    componentDidUpdate(){
        
    }
    render(){
        const { avatar_url, name, location, bio } = this.state.user;
        return(
            <div className='user-card'>
                <div><img src={avatar_url} height='200' width='200' /></div>
                <div>Name: {name}</div>
                <div>Location: {location}</div>
                <p>{bio}</p>
            </div>
        )
    }
}

export default User;
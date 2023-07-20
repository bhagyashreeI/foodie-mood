import React from 'react'
import User from './User'

class About extends React.Component{

  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    return(
      <>
        <h1>About Us</h1>
        <div className='user-list'>
          <User name={"Shree"} location={"Nagpur"} />
        </div>
      </>
      
    );
  }
}

export default About
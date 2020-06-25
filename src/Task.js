import React, { Component } from 'react'
import {Button,InputGroup,FormControl} from 'react-bootstrap';
export class Task extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             check:true,
             country:''
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault()
       this.props.history.push('/dashboard2',this.state.country)
    }
    
    render() {
        const {check,country} =this.state
        return (
            <div ><br/>
               <form >
                   <InputGroup size="sm" style={{width:"200px"}}>
                   <FormControl  type="text" placeholder="country name" value={country} onChange={(e)=>this.setState({country:e.target.value,
                check:false})}/>
                   </InputGroup> <br/>
                   <button style={{backgroundColor:"white",borderColor:"black"}}  onClick={this.handleSubmit} disabled={check}>Submit</button>
                   </form>
            </div>
        )
    }
}

export default Task

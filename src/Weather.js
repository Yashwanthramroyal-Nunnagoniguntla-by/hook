import React, { Component } from 'react'
import {Card} from 'react-bootstrap'

export class Weather extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:JSON.parse(props.location.state),
             data2:[]
        }
        console.log(props,"pross");
    }
    componentDidMount(){
        this.setState({
            data2:this.state.data.current
        })
        console.log(this.state.data,"pppp");
    }
    
    render() {
        return (
            <div>
                <Card style={{padding:"10px"}}>
                    
              <Card.Title><h1>  country : {this.state.data.location.country} </h1></Card.Title>
              <Card.Body> <Card.Text>
              <span>  name :<h3>{this.state.data.location.name}</h3></span> 
              <span>  cloudcover : <h3>{this.state.data.current.cloudcover}</h3></span> 
              </Card.Text>  
              </Card.Body>
       </Card>
            </div>
        )
    }
}

export default Weather

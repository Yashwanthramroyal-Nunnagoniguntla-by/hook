import React, { Component } from 'react'
const Records = []
export class dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            countryData: []
        }
        console.log(props, "props");
     //   this.callme = this.callme.bind(this)
    }
   
    async componentDidMount() {
        let s = await this.callme();
        //console.log(Records,"ssss",s);

        this.setState({
            countryData: JSON.parse(s)
        })
        console.log(this.state.countryData,"countryData");
        
    }
    async callme() {
        let s;
        await fetch(`https://restcountries.eu/rest/v2/name/${this.props.location.state}`).then( async res => {
            // console.log(res.body,"res");
            var datas = res.body.getReader()

             s=await this.readStream(datas);
             console.log(s,"Sssssssssss");
             
        }).then(suc => {
            console.log(suc, "succc");

        })
            .catch(err => console.error(err));
        return s;
    }

    handleSubmit = (e, capital) => {
        e.preventDefault()
        console.log(capital, "cappss");
        fetch(`http://api.weatherstack.com/current?access_key=f6afe31660d5a5dc8d4072aae832a6d4&query=${capital}`).then(async res => {
            console.log(res, "ff");
            var datas = res.body.getReader()
          let s;
            s=await this.readStream(datas);
           console.log(s,"ss");
           this.props.history.push('/weather',s)
   
        }).catch(err => {
            console.log(err, "err");
        })
    }
    
    readStream(dataPassed) {
        console.log(dataPassed,"Ddddddddddd");
        
        let data;
        new ReadableStream({
            start(controller) {
                data = pump()
                function pump() {
                    return dataPassed.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                       if(done){
                           controller.close();
                           return;
                       }
                        controller.enqueue(value);
                         
                        const Records = new TextDecoder("utf-8").decode(value)

                        //  console.log(Records,"ASdas");
                        return Records;
                    });
                }
            }
        })
        return data
    }


    render() {
        return (
            <div>
                dashboard {this.state.countryData.length > 0 ?
                    this.state.countryData.map(x => {
                        return <div><button onClick={(e) => this.handleSubmit(e, x.capital)}>{x.capital}</button>
                        </div>
                    }) : <></>
                }
                {this.state.countryData.length==undefined?<h1>Data {this.state.countryData.message} Enter valid Country</h1>:<></>}
            </div>
        )
    }
}

export default dashboard


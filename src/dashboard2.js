import React, { useState,useEffect } from 'react';

function Dashboard2(props) {
  console.log(props,"prossss");
  const [country, setCountry] = useState([])
  useEffect( () => {
     fetchData(); 
    async function fetchData(){
        let s=await callme()
        setCountry(s)
       console.log(s,"getReader");
    }
  },[])
  
 async function callme(){
        let s;
        let h;
       await fetch(`https://restcountries.eu/rest/v2/name/${props.location.state}`)
        .then(async res=>{
            let d=res.body.getReader()
            console.log(res,"Sss",d);
            s=await readStream(d)
             h=JSON.parse(s)
             console.log(h,"sssssssss");
        })
        return h
  }
    function readStreams(data){
        let s;
        new ReadableStream({
               start(controller){
                   s=pump()
                   function pump(){
                    return data.read().then(({done,value})=>{
                             if(done){
                                 controller.close()
                                 return
                             }
                             controller.enqueue()
                             
                             const records=new TextDecoder('utf-8').decode(value)
                             //console.log(records,"values");

                             return records
                    })
                   }
               }       
        })
        return s
    }
    function readStream(sat){
        let s
       
           new ReadableStream({
               start(controller){
                   s=pump()
                   function pump(){
                          return sat.read().then(({done,value})=>{
                      if(done){
                       controller.close()
                      }
                      const r= new TextDecoder('utf-8').decode(value)
                      
                      return r
                          }) 
                   }
               }
           })
           return s
       }
   function handleSubmit  (e, capital) {
        e.preventDefault()
        console.log(capital, "cappss");
        fetch(`http://api.weatherstack.com/current?access_key=f6afe31660d5a5dc8d4072aae832a6d4&query=${capital}`).then(async res => {
            console.log(res, "ff");
            var datas = res.body.getReader()
          let s;
            s=await readStream(datas);
           console.log(s,"ss");
           props.history.push('/weather',s)
        }).catch(err => {
            console.log(err, "err");
        })
    }
    return (
        <div>
            {country.length>0?
                country.map(x=>{
                return  <div>{x.capital.length>0?<button onClick={(e) => handleSubmit(e, x.capital)}>{x.capital}</button>:<></>}<br/><br/>
                        </div>
                }):<></>
            }
                {country.length==undefined?<h1>Data {country.message} Enter valid Country</h1>:<></>}
        </div>
    )
}

export default Dashboard2




import React, { Fragment, useEffect, useState } from "react";
import { IForm } from "./models/IForm";
import { formAxios } from "./Services";
import './form.css';

function App() {


  //const [form, setForm] = useState<IForm>()
  const [formVeri, setFormVeri] = useState<any[]>([])
  const [fHtml, setFHtml] = useState<[]>([])
  const [degerler, setDegerler] = useState<{}>({})

  useEffect(() => {
   
   formAxios().then(res => {
     const fData:IForm = res.data

     setFormVeri(fData.forms[0].bilgiler.formjson.children[0].children[0].children[0].children)
    })

    const arr:any = []

    formVeri.map((item:any,index:any) => {
      arr.push(item)
      if(item.tag!=='legend'){
        item.children.map((item:any,index:any)=>{
          arr.push(item)
          if(item.tag==='div'){
            item.children.map((item:any,index:any)=> {
              arr.push(item)
              
              if(item.tag==='label' || item.tag==='select'){
                item.children.map((item:any,index:any)=>{
                  arr.push(item)
                })
              }
              setFHtml(arr) 
            })
          }
        })
      }
    })
  }, [formVeri])

  

  function fncSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log('degerler :>> ', degerler);
  }

  function fncChn(e:any){
   //... ile get ile degerleri alıp bu degerlerin uzerine alınan value degerlerini ekler
    setDegerler({
          ...degerler,
          [e.target.name]:e.target.value //ilki degisken ikincisi degeri
    })
    console.log('degerler :>> ', degerler);
    
  }
  return (
    <>
    <form onSubmit={ (e) => fncSubmit(e) }>
    { fHtml &&
     fHtml.map((item:any,index:any) => {
      if(item.tag==='select'){
        return (
          <Fragment key={index}>
          {React.createElement(
            item.tag,
            {
              className: item.class,
              placeholder: item.placeholder,
              name: item.name,
              htmlFor: item.for,
              key:'s' + index,
              onChange: fncChn
              
            },
            item.children.map((item:any,index:any) =>{
              return React.createElement(item.tag,
                {name: item.name,
                 html: item.html,
                 key: 's' + index,
                 onChange: fncChn 
                },
                 item.html
                 )
            })
          )}
          </Fragment>
        )
      }else{
        if(item.tag!=='option' && item.tag !== 'select'){ // label,buton ve input için 
          return React.createElement(item.tag,
            {
              className: item.class,
              placeholder: item.placeholder,
              name: item.name,
              htmlFor: item.for,
              value: item.value,
              type: item.type,
              key: 'i' + index,
              onChange: fncChn
              
            },
            item.html

             )
        }
        
      }
    })}
    </form>
    </>
    );
}

export default App;

// const {response} = require('express');

function doSignup(){
    let formData ={}
    formData.name=document.getElementById('name').value;
    formData.email=document.getElementById('email').value;
    formData.password=document.getElementById('password').value;
   
    console.log(formData);
    fetch('/register',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    }).then((response) => response.json())
    .then((data)=>{
       if (data.signup){
        window.location.href='/'
        console.log(data)
       }
       else{
        alert("Email already exists")
       }
    })
}
function doLogin(){
    let loginData = {}
    loginData.email = document.getElementById('email').value
    loginData.password = document.getElementById('password').value
    fetch('/login',{
        method:'post',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(loginData)
    }).then((response) => response.json())
    .then((data)=>{
        if(data.login){
            window.location.href='/home'
        }
        else{
            document.getElementById('warning').innerHTML="Invalid Credentials";
            setTimeout(() => {
                document.getElementById('warning').innerHTML="";
            }, 3000);
        }
    })
}
function logout(){
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')
}




//  

function showImages(){
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    document.getElementById('imagePreview').innerHTML = null;
    const selectedImage =imageInput.files
    for (let i=0;i<selectedImage.length; i++){
        const image = document.createElement('img')
        image.src= URL.createObjectURL(selectedImage[i])
        image.style.width ="150px"
        image.style.margin="3px"
        imagePreview.appendChild(image)
     }
}

function deletePost(postId){
    console.log(postId);
    fetch('admin/deletePost',{
        method:'delete',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({postId: postId})
 }).then((res)=>res.json())
    .then((resp)=>{
        if (resp.delete){
            location.reload()
        }
        else{alert("Something went wrong")}
    })
}

function adLogin(){
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
            window.location.href='/admin/home'
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

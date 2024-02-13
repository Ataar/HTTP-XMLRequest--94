let userForm = document.getElementById('userForm')
let postContainer = document.getElementById('postContainer')
postContainer.className = ('d-flex flex-column-reverse')
let title = document.getElementById('title')
let body = document.getElementById('body')
let userId = document.getElementById('userId')
let sBtn = document.getElementById('sBtn')
let baseUrl =`https://jsonplaceholder.typicode.com`;

let postUrl = `${baseUrl}/posts`;
postArray = [];
const getPosts = ()=>{
    let xhr = new XMLHttpRequest();

xhr.open('GET',postUrl,true)

xhr.send()

xhr.onload = function(){
    if(xhr.status===200)
    {
    
        // console.log(xhr.response);
      postArray = JSON.parse(xhr.response)
        // console.log(data);
        Swal.fire({
            icon:'success',
            text:'HTTP-XMLRequest is Accepted',
            title:'HI, WELCOME',
            timer:2000
        })

        templating(postArray) 
        
    }
    else
    {
        Swal.fire({
            icon:'error',
            text:'HTTPS-Request is Rejected',
            title:'Try After Sometime',
            timer:2000
        })
    }
}
}
getPosts();






const templating = (arr)=>{
    let result = '';
  arr.forEach(post => {
    result+= `
    <div class="card card01 bg-dark text-white">
    <div class="card-header">
        <h2 class="text-center">${post.title}</h2>
    </div>
    <div class="card-body">
        <p>${post.body}</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
        <button class="btn btn-primary">
            Edit
        </button>
        <button class="btn btn-danger">Delete</button>
    </div>
</div>
    
    
    `

  });
     postContainer.innerHTML = result;

}

const onSubmit = (eve)=>{
    eve.preventDefault()
    let newPost = 
    {
        title:title.value,
        body:body.value,
        userId:userId.value

    }
    console.log(newPost);
    let xhr = new XMLHttpRequest();
    xhr.open('POST',postUrl,true)
    xhr.send(JSON.stringify(newPost))
    xhr.onload = function(){
        if(xhr.status ===200||xhr.status===201)
        {
            newPost.id =JSON.parse(xhr.response).id
            postArray.push(newPost)
            templating(postArray)
        }
    }
}
userForm.addEventListener('submit',onSubmit)

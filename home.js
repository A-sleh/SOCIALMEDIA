

//* import All posts 
let postContainer = document.getElementById('posts') ;
let createPostBTN = document.getElementsByClassName('create-post')[0]
const baseURL = 'https://tarmeezacademy.com/api/v1'

// * setup user interface when open page
setupUI()

//* this funtion to create post 

function createpost( post , author ) {
    // set the title of post 
    let title = " ";
    if( post.title != null ) title = post.title ;
    // create the post with API
    const tagsContainer = createTags(post)
    
    let pos = `
    <div class="post">
        <div class="head-post">
            <img src="${author.profile_image}" alt="" class="prof-img-sm">
            <b class="ml-[6px]">${author.username}</b>
        </div>
        <div class="post-info">
            <img src="${post.image}" alt="" class="rounded-t-md w-[100%] ">
            <h6 class="text-gray-500 mt-[5px]">${post.created_at}</h6>
            <h5 class="my-[10px] font-semibold">   
                ${title}
            </h5>
            <p class = "text-sm md:text-xl">
                ${post.body}
            </p>
            <div class="line"></div>
            <div class="flex items-center w-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                </svg>
                <span class="ml-[10px]">
                    (${post.comments_count}) comments
                </span>
                ${tagsContainer}
            </div>
        </div>
    </div>
    `
    postContainer.innerHTML += pos
}

//*  this funtion to create tags section 
function createTags(post) {
    let div = document.createElement('div') ;
    div.classList.add("tags") ;
    div.classList.add("flex") ;
    const tags = post.tags ;

    for( tag of tags ) {
        let subTag = `
            <div class="tag">${tag}</div>
        `
        div.innerHTML += subTag
    }
    let tempDiv = document.createElement('div') ;
    tempDiv.appendChild(div) ;
    return tempDiv.innerHTML 
}

//*  execute the posts From API requerst
async function executeAllPosts() {
    let response = await fetch(`${baseURL}/posts`)
    let json = await response.json()
    let posts = json.data
    postContainer.innerHTML = ""
    for( post of posts ) {
        let author = post.author ;
        createpost(post,author)
    }
}
//*  generate all posts
executeAllPosts()

//*  login model
let loginMolde = document.getElementsByClassName('login-modle')[0] ;
let layout = document.getElementsByClassName('layout')[0] ;
let loginBtn = document.getElementById('login') ;
//! set login modle 
loginBtn.onclick =() => {
    showAndHiddenLoginModle()
}

//*  show and hidden popup login modle 
function showAndHiddenLoginModle() {
    layout.classList.toggle('hidden')        
    loginMolde.classList.toggle('close-modle')
    clearInputFiled('username','password')
}

//*  Register model
let registerBtn = document.getElementById('register') ;
let registerMolde = document.getElementsByClassName('register-modle')[0] ;

//! set register modle 
registerBtn.onclick = () => {
    //!
    showAndHiddenRegisterModle()
}

//*  show and hidden popup register modle 

function showAndHiddenRegisterModle() {
    layout.classList.toggle('hidden')        
    registerMolde.classList.toggle('close-modle')
    clearInputFiled('register-username','register-password','name')
}

//*  Create Post model

let createPostModle = document.getElementsByClassName('create-post-modle')[0] ;
let createPostBtn = document.getElementsByClassName('create-post')[0] ;
let createPostBTnClicked = document.getElementById('create-post-btn') ;

//! set create post molde 
createPostBtn.onclick = () => {
    showAndHiddenCreatePostModle()
}

//*  show and hidden popup create new post  modle 

function showAndHiddenCreatePostModle() {
    layout.classList.toggle('hidden')        
    createPostModle.classList.toggle('close-modle')
    clearInputFiled('title','description')
}

createPostBTnClicked.onclick = () => {
    let postTitle = " " ;
    const token = localStorage.getItem('token') ;
    // get input value
    const title = document.getElementById('title').value ;
    const description = document.getElementById('description').value 
    const image = document.getElementById('image-post').files[0] 
    
    if( title != null ) {
        postTitle = title ;
    }

    let formData = new FormData() ;
    
    formData.append("body",description)
    formData.append("title",postTitle)
    formData.append("image",image)
    const config = {
        "headers" : {
            "authorization" : `Bearer ${token}` ,
            "Content-Type" : "multipart/form-data"
        } 
    }
    axios.post(`${baseURL}/posts`, formData ,config )
    .then( (response) => {
        // hide the create post modle
        showAndHiddenCreatePostModle()
        // refresh the page to updata all posts
        window.location.reload()
    }).catch( error => {        
        const errorType =  error.response.data.message
        showAlert("danger-alert","error-catch",errorType)
    })
}

// list of all AddeventLisner
addEventListener( 'click' , function(btn) {

    //*  close longin modle
    if(btn.target.classList.contains('cls')) {
        showAndHiddenLoginModle()
    }
    
    //*  clear input filed in login modle
    if(btn.target.classList.contains('clear')) {
        clearInputFiled('username','password')
    }
    
    //*  close longin modle
    if(btn.target.classList.contains('cls-register')) {
        showAndHiddenRegisterModle()
    }
    //* clear input filed in register modle
    if(btn.target.classList.contains('clear-register')) {
        clearInputFiled('register-username','register-password','name')
    }
    //*  close longin modle
    if(btn.target.classList.contains('cls-create-post')) {
        showAndHiddenCreatePostModle()
    }
    //* clear input filed in register modle
    if(btn.target.classList.contains('clear-create-post')) {
        clearInputFiled('title','description')
    }
})

//*  global clear input form 
function clearInputFiled(...inputs) {
    
    for(let i = 0 ; i < inputs.length ; ++ i ) {
        document.getElementById(inputs[i]).value = ''
    }
}

//*  login user

let loginBtnClick = document.getElementById('login-btn-click') ;

loginBtnClick.onclick = function() {
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    const params = {
        "username" : username ,
        "password" : password 
    }
    axios.post(`${baseURL}/login`, params )
    .then( (response) => {

        //*  show success alert to user
        showAlert('success-alert','login')

        //*  store user intformation in localStorage 

        let token = response.data.token ;
        localStorage.setItem('token' , token )  ;
        localStorage.setItem('user',JSON.stringify(response.data.user)) ;

        //*  hidden the popup modle 

        showAndHiddenLoginModle() ;

        //*  setup user interface 

        setupUI() ;

    }).catch( error => {
        console.log(error.response )
        const errorType =  error.response.data.message
        showAlert("danger-alert","error-catch",errorType)
    })
}

//* Register user 

let registerBtnClicked = document.getElementById('register-btn-click')

registerBtnClicked.onclick = function() {
    const name = document.getElementById('name').value
    const username = document.getElementById('register-username').value
    const password = document.getElementById('register-password').value
    const imgaeProfile = document.getElementById('image-profile').files[0] 

    let formData = new FormData() ;

    formData.append('name',name)
    formData.append('username', username )
    formData.append('password', password )
    formData.append('image', imgaeProfile )

    axios.post(`${baseURL}/register`, formData )
    .then( (response) => {

        //*  show success alert to user
        showAlert('success-alert','register')

        //*  store user intformation in localStorage 

        let token = response.data.token ;
        localStorage.setItem('token' , token )  ;
        localStorage.setItem('user',JSON.stringify(response.data.user)) ;

        //*  hidden the popup modle 

        showAndHiddenRegisterModle() ;

        //*  setup user interface 

        setupUI() ;

    }).catch( error => {
        const errorType =  error.response.data.message
        showAlert("danger-alert","error-catch",errorType)
    })
}

//* global popup to show Alert 

function showAlert(alert,type,error) {
    let Alert = document.getElementById(alert) ; 
    if(type == 'login') {
        Alert.innerHTML = "logged in successfully"
    }else if( type == 'register') {
        Alert.innerHTML = "New User Registred successfully"
    }else if(type == 'error-catch') {
        Alert.innerHTML = error
    }else {
        Alert.innerHTML = "logged out successfully" ;
    }
    Alert.classList.remove('scale-y-0')
    Alert.classList.add('scale-y-1')

    setTimeout( () => {
        Alert.classList.add('scale-y-0')
    } , 2000)
}

//* setup user interface

function setupUI() {
    const token = localStorage.getItem('token') ;
    let logoutBtn = document.getElementById('logout') ;
    let navUserInfo = document.getElementById('user-info') ;

    if( token == null && !logoutBtn.classList.contains('hidden') ) { // the user is guest (no logged)
        showAndHiddenBtn()
        //* set user info in navbar
        navUserInfo.innerHTML = ""
        createPostBTN.classList.toggle('scale-y-0')
    }else if( token != null && logoutBtn.classList.contains('hidden')) {
        showAndHiddenBtn()
        //* set user info in navbar
        let content = setUserInfo() ;
        console.log(navUserInfo)
        navUserInfo.innerHTML += content[0] ;
        navUserInfo.innerHTML += content[1] ;
        createPostBTN.classList.toggle('scale-y-0')
    }
}


// set navbat button and remove token + user info from localStorage

function logout() {
    // remove token + user info from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user') 
    // setup user interface
    setupUI() ;
    // show alert with successfully logout 
    showAlert('danger-alert','dan')
}

// show and hidden login + logout + register 

function showAndHiddenBtn() {
    
    let btnsId = ['logout',"login" , 'register'] ;
    for( btn of btnsId ) {
        document.getElementById(btn).classList.toggle('hidden') ;
        
    }
}

// setup user information from API when user loge in website

function setUserInfo() {

    let storageUser = localStorage.getItem('user') ;
    console.log(storageUser)
    let user = JSON.parse(storageUser) ;

    let contetn = 
    [
        `<img src="${user.profile_image}" alt="" class="prof-img-sm " id="nav-user-image">`
        ,
        `<h1 class="mx-[15px] font-semibold text-sm md:text-xl" id="nav-user-name">${user.name}</h1>`
    ]
    
    return contetn ;
}














// OPEN AND CLOSE NAVBAR IN MOPILE SCREEN 
let burgerMenu = `                
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg>` 
let closeBtn = `
<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg>`
let burgerMenuBtn = document.getElementById('burger-menu')  ;
let navBar = document.getElementById('nav-bar') ;
let isOpen = true ; 

burgerMenuBtn.onclick = () => {

    if( isOpen ) {
        burgerMenuBtn.innerHTML = closeBtn
        navBar.style.transform = 'translateX(0)'
        changeLayaoutZindex()
        
    }else {
        burgerMenuBtn.innerHTML = burgerMenu
        navBar.style.transform = 'translateX(-100%)'
        
        changeLayaoutZindex()
    }
    layout.classList.toggle('hidden') // hide or show layout layer 
    isOpen = isOpen ? false : true // change the mode 
}

function changeLayaoutZindex() {
    layout.classList.toggle('z-10')
    layout.classList.toggle('z-50')
}

{

// document.getElementById('profile-btn').onclick = () => {
    
//     if(isOpen) {
//         closeNavBar() ;
//     }
// }
// document.getElementById('home-btn').onclick = () => {
    
//     if(isOpen) {
//         closeNavBar() ;
//     }
// }

// function closeNavBar() {
//     burgerMenuBtn.innerHTML = burgerMenu
//     navBar.style.transform = 'translateX(-100%)'
//     layout.classList.toggle('hidden') // hide or show layout layer 
//     isOpen = false 
// }

}

//* base URL API
var baseURL = 'https://tarmeezacademy.com/api/v1'
let createPostBTN = document.getElementsByClassName('create-post')[0]
let postModleType = document.getElementById('post-modle-type')
let createAndUpdataPostBtn = document.getElementById('create-post-btn') ;

//*  Create Post model

let createPostModle = document.getElementsByClassName('create-post-modle')[0] ;
let createPostBtn = document.getElementsByClassName('create-post')[0] ;
let createPostBTnClicked = document.getElementById('create-post-btn') ;

//! set create post molde 
createPostBtn.onclick = () => {
    postModleType.innerHTML = "Create A New Post" ;
    createAndUpdataPostBtn.innerHTML = "create"
    createAndUpdataPostBtn.value = "true" ;
    showAndHiddenCreatePostModle()
}


createPostBTnClicked.onclick = () => {
    // selecte Type Requset
    let typeRequest = createAndUpdataPostBtn.value ; // 1 : POST , 0 : PUT

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
    let URL ;

    if( typeRequest == 'true' ) {
        URL = `${baseURL}/posts`;
    }else { 
        formData.append('_method',"PUT") 
        URL = `${baseURL}/posts/${typeRequest}`
    }

    toggleLoader(true)
    axios.post( URL, formData ,config )
    .then( (response) => {
        // hide the create post modle
        showAndHiddenCreatePostModle()
        // refresh the page to updata all posts
        window.location.reload()
    }).catch( error => {        
        const errorType =  error.response.data.message
        //! done
        showAlert(errorType,"danger-alert")
    }).finally(() => {
        toggleLoader(false)
    })
}

// list of all AddeventLisner
addEventListener( 'click' , function(btn) {

    //*  close create new post modle
    if(btn.target.classList.contains('cls-create-post')) {
        showAndHiddenCreatePostModle()
    }
    //* clear input filed in create new post  modle
    if(btn.target.classList.contains('clear-create-post')) {
        clearInputFiled('title','description')
    }
})

//*  login model
let loginMolde = document.getElementsByClassName('login-modle')[0] ;
let layout = document.getElementsByClassName('layout')[0] ;
let loginBtn = document.getElementById('login') ;

//! set login modle 
loginBtn.onclick =() => {
    showAndHiddenLoginModle()
}

// * setup user interface when open page
setupUI()

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
    
    showAndHiddenRegisterModle()
}

//*  show and hidden popup register modle 

function showAndHiddenRegisterModle() {
    layout.classList.toggle('hidden')        
    registerMolde.classList.toggle('close-modle')
    clearInputFiled('register-username','register-password','name')
}

//*  show and hidden popup create new post  modle 

function showAndHiddenCreatePostModle() {
    layout.classList.toggle('hidden')        
    createPostModle.classList.toggle('close-modle')
    clearInputFiled('title','description')
}

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
    if(btn.target.classList.contains('delete-post-closeBtn')) {
        showAndHideDeletePostModal()
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
    toggleLoader(true)
    axios.post(`${baseURL}/login`, params )
    .then( (response) => {

        //*  show success alert to user
        
        showAlert("logged Successfully",'success-alert')

        //*  store user intformation in localStorage 

        let token = response.data.token ;
        localStorage.setItem('token' , token )  ;
        localStorage.setItem('user',JSON.stringify(response.data.user)) ;

        //*  hidden the popup modle 

        showAndHiddenLoginModle() ;

        //*  setup user interface 
        
        //* Refresh The Page
        window.location.reload() ;
    }).catch( error => {
        const errorType =  error.response.data.message
        //! done
        showAlert(errorType,"danger-alert")
    }).finally(() => {
        toggleLoader(false)
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
    toggleLoader(true)
    axios.post(`${baseURL}/register`, formData )
    .then( (response) => {
        
        //*  show success alert to user
        //! doen 
        showAlert("New User Registred successfully",'success-alert')

        //*  store user intformation in localStorage 

        let token = response.data.token ;
        localStorage.setItem('token' , token )  ;
        localStorage.setItem('user',JSON.stringify(response.data.user)) ;

        //*  hidden the popup modle 

        showAndHiddenRegisterModle() ;

        //*  setup user interface 

        //* Refresh The Page
        window.location.reload() ;

    }).catch( error => {
        const errorType =  error.response.data.message
        //! done
        showAlert(errorType,"danger-alert")
    }).finally(() => {
        toggleLoader(false)
    })
}

//* global popup to show Alert 

function showAlert(alertMessage,type) {

    let Alert = document.getElementById(alert) ; 
    if( type == 'danger-alert' ) {
        Alert = document.getElementById('danger-alert')
    }else {
        Alert = document.getElementById('success-alert')
    }
    Alert.innerHTML = alertMessage ;

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
        try {
            //* SHOW AND HIDE COMMETN SECTION IN POST 
            showAndHidCommentArea();
        }catch( error ) {
            //! fixed this problem by defaaulte
        } 
        try {
            //* SHOW AND HIDE CREATE POST BUTTON 
            createPostBTN.classList.toggle('scale-y-0')
        }catch( error ) {
            //! fixed this problem by defaaulte
        } 
        if( window.location.search != null ) {

            window.location = 'index.html'
        }
        
    }else if( token != null && logoutBtn.classList.contains('hidden')) {

        showAndHiddenBtn()

        //* set user info in navbar
        let content = setUserInfoInNavbar() ;
        navUserInfo.innerHTML += content[0] ;
        navUserInfo.innerHTML += content[1] ;

        try {
            //* SHOW AND HIDE COMMETN SECTION IN POST 
            showAndHidCommentArea();
        }catch( error ) {
            //! fixed this problem by defaaulte
        } 
        try {
            //* SHOW AND HIDE CREATE POST BUTTON 
            createPostBTN.classList.toggle('scale-y-0')
        }catch( error ) {
            //! fixed this problem by defaaulte
        } 

    }
}

// set navbat button and remove token + user info from localStorage

function logout() {
    // remove token + user info from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user') 
    // setup user interface

    //* Refresh The Page
    setupUI()
    window.location = 'index.html' ;
    // show alert with successfully logout 
    //! done
    showAlert("logged out successfully",'success-alert')
}

// show and hidden login + logout + register 

function showAndHiddenBtn() {
    
    let btnsId = ['logout',"login" , 'register'] ;
    for( btn of btnsId ) {
        document.getElementById(btn).classList.toggle('hidden') ;
        
    }
}

// setup user information from API when user loge in website

function setUserInfoInNavbar() {

    let storageUser = localStorage.getItem('user') ;
    let user = JSON.parse(storageUser) ;

    let contetn = 
    [
        `<img src="${user.profile_image}" alt="" class="prof-img-sm " >`
        ,
        `<h1 id="nav-user-name">${user.name}</h1>`
    ]
    
    return contetn ;
}


//* this is for show and hide area comment in the post 

function showAndHidCommentArea() {

    let commentContainer = document.getElementById('comment-area') ;
    commentContainer.classList.toggle('hidden')

}

//* updata post detailes 
function editPostBtnClicked(postObject) {
    postModleType.innerHTML = "Edit Post" ;
    createAndUpdataPostBtn.innerHTML = "updata"
    // show the modle 
    showAndHiddenCreatePostModle()    
    // get detailes of current post
    let post = JSON.parse(decodeURIComponent(postObject)) ;
    let titlePost = document.getElementById('title') ;
    let bodypost = document.getElementById('description') ;
    let imagePost = document.getElementById('image-post') ;

    createAndUpdataPostBtn.value = post.id ;
    // set new value 
    titlePost.value = post.title ;
    bodypost.value = post.body ;

}
//* delete post detailes 
function deletPostBtnClicked(postId) {
    // show delete post modal 
    showAndHideDeletePostModal()
    let acceptDeleteBtn = document.getElementById('Accept-delete-btn') ;

    acceptDeleteBtn.onclick = () => {
        let URL = `${baseURL}/posts/${postId}`
        const token = localStorage.getItem('token') ;
        const config = {
            "headers" : {
                "authorization" : `Bearer ${token}` ,
                "Content-Type" : "multipart/form-data"
            } 
        }
        toggleLoader(true)
        axios.delete(URL,config)
        .then((response) => {
            // hidden delete post modale 
            showAndHideDeletePostModal() 
            showAlert( "The Post Has Been Deleted Successfully", 'success-alert') ;
            // reset Page
            window.location.reload()
        }).catch(error => {
            showAlert(error.response.data , 'danger-alert')
        }).finally(() => {
            toggleLoader(false)
        })
    }
}

// show delete post modale 
function showAndHideDeletePostModal() {
    // selecte delete modal 
    let deleteModal = document.getElementById('popup-modal') ;
    
    deleteModal.classList.toggle('close-modle');
    layout.classList.toggle('hidden')  
}

function profileClicked() {
    const user = JSON.parse(localStorage.getItem('user')) 
    let userId = ""
    if( user != null ) {
        userId = user.id ;
    }
    window.location = `profile.html?userId=${userId}`
}


// change home page to profile 
function userClicked(userId) {
    window.location = `profile.html?userId=${userId}`
}

function toggleLoader(show = true ) {
    console.log('here')
    let loaderContainer = document.getElementById('loader')
    if( show ) {
        loaderContainer.classList.remove('hidden')
        loaderContainer.classList.add('flex')
    }else {
        loaderContainer.classList.add('hidden')
    }
}





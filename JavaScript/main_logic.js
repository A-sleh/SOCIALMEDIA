
//* base URL API
const baseURL = 'https://tarmeezacademy.com/api/v1'
let createPostBTN = document.getElementsByClassName('create-post')[0]

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
    //!
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
    if(type == 'add comment' && error ) {
        Alert.innerHTML = "Unauthentication"
    }else if(type == 'add comment') {
        Alert.innerHTML = "Added A New Comment"
    } 
    else if(type == 'login') {
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
        let content = setUserInfoInNavbar() ;
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

function setUserInfoInNavbar() {

    let storageUser = localStorage.getItem('user') ;
    let user = JSON.parse(storageUser) ;

    let contetn = 
    [
        `<img src="${user.profile_image}" alt="" class="prof-img-sm " id="nav-user-image">`
        ,
        `<h1 class="mx-[15px] font-semibold text-sm md:text-xl" id="nav-user-name">${user.name}</h1>`
    ]
    
    return contetn ;
}




let userDetailes = JSON.parse(localStorage.getItem('user'))


setProfileDetailes(userDetailes)

// set detailes in profile page 
function setProfileDetailes(myProfile,userObject) {
    let user = userObject
    if( myProfile ) {
        user = userDetailes ;
    }else {
        user = JSON.parse(decodeURIComponent(userObject)) ;
        console.log(user)
        window.location = 'profile.html'
    }
    // selecte elements From profile.html
    let userName = document.getElementById('userName')
    let userNameTitle = document.getElementById('name-title')
    let Name = document.getElementById('Name')
    let userImage = document.getElementById('userImage')
    let postNumber = document.getElementById('post-number')
    let commentsNumber = document.getElementById('comments-number')

    userName.innerHTML = user.name
    userNameTitle.innerHTML = user.name
    Name.innerHTML = user.username
    userImage.src = user.profile_image
    postNumber.innerHTML = user.posts_count
    commentsNumber.innerHTML = user.comments_count

}
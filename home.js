
// import All posts 
let postContainer = document.getElementById('posts') ;

// this funtion to create post 

function createpost( post , author ) {
    // set the title of post 
    let title = " ";
    if( post.title != null ) title = post.title ;
    // create the post with API
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
            <p>
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
            </div>
        </div>
    </div>
    `
    postContainer.innerHTML += pos
}

// execute the posts From API requerst
async function executeAllPosts() {
    let response = await fetch('https://tarmeezacademy.com/api/v1/posts')
    let json = await response.json()
    let posts = json.data
    postContainer.innerHTML = ""
    for( post of posts ) {
        let author = post.author ;
        createpost(post,author)
    }
}
// generate all posts
executeAllPosts()

// login model
let loginBtn = document.getElementById('login') ;
let layout = document.getElementsByClassName('layout')[0] ;
let loginMolde = document.getElementsByClassName('login-modle')[0] ;

loginBtn.onclick =() => {
    showAndHiddenLoginModle()
}

addEventListener( 'click' , function(btn) {
    if(btn.target.classList.contains('cls')) {
        showAndHiddenLoginModle()
    }
})

function showAndHiddenLoginModle() {
    layout.classList.toggle('hidden')        
    loginMolde.classList.toggle('close-modle')
}


// login user

let loginBtnClick = document.getElementById('login-btn-click') ;

loginBtnClick.onclick = function() {
    alert('here') ;
}




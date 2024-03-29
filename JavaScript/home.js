
//* import All posts 
let postContainer = document.getElementById('posts') ;


let lastPage = 1 ;
let currentPage = 1 ;
let thePageSholdShow = 1 ;

// ! INFINITE SCROLL
window.addEventListener("scroll" , function() {
    const endOfPage = window.innerHeight + this.window.scrollY >= this.document.body.offsetHeight
    console.log("the innerHeight : " + window.innerHeight + "\nthe window scrollY : " + this.window.scrollY  + "\n offsetHeight : " + this.document.body.offsetHeight )
    if( endOfPage && lastPage >= currentPage ) {
        if(currentPage == thePageSholdShow )currentPage ++ ;
        else return 
        executeAllPosts(currentPage)
    }
})

//* this funtion to create post 

function createpost( post , author ) {

    // set the title of post 

    let title = " ";

    if( post.title != null ) { 

        title = post.title ;
    }

    // create the post with API

    const tagsContainer = createTags(post)

    //! show or hide (edit) Button

    let user = JSON.parse(localStorage.getItem('user')) ;
    let isMyPost = user != null && post.author.id == user.id ;
    let editdBtnContent = ` ` ;
    let deleteBtnContent = ` ` ;
    if(isMyPost) {

        editdBtnContent =`<button id="edit-btn" onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(post))}')">Edit</button>`
        deleteBtnContent =`<button id="delete-btn" onclick = "deletPostBtnClicked(${post.id})">delete</button>`
    }

    let pos = `
    <div class="post cursor-pointer">
        <!-- post headr  -->
        <div class="head-post"  >
            <!-- User information  -->
            <div class="flex items-center cursor-pointer " onclick = "userClicked(${author.id})">
                <img src="${author.profile_image}" alt="" class="prof-img-sm">
                <b class="ml-[6px]">${author.username}</b>
            </div>
            <div class ="flex justify-center items-center" >
                ${editdBtnContent}
                ${deleteBtnContent}
            </div>
        </div>
        <div class="post-info" onclick = "postCliked(${post.id})">
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
                    ( ${post.comments_count} ) comments
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
            <div class="tag">${tag.name}</div>
        `
        div.innerHTML += subTag
    }
    let tempDiv = document.createElement('div') ;
    tempDiv.appendChild(div) ;

    return tempDiv.innerHTML 
}

//*  execute the posts From API requerst
async function executeAllPosts(page) {
    toggleLoader(true)
    let response = await fetch(`${baseURL}/posts?limit=5&page=${page}`)
    let json = await response.json()
    let posts = json.data
    toggleLoader(false)

    // set last Page t
    lastPage = json.meta.last_page

    if(page <= 1) {

        postContainer.innerHTML = "" ;
    } 
    else {
        
        thePageSholdShow ++ ;
    } 
    for( post of posts ) {
        let author = post.author ;
        createpost(post,author)
    }
}
//*  generate all posts
executeAllPosts(1)




// change home page to postDetailes 
function postCliked(postId) {
    window.location = `postDetailes.html?postId=${postId}` ;
}














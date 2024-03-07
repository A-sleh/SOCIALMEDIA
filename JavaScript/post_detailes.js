//! FETCH URL FROM URL
const urlParams = new URLSearchParams(window.location.search)
const postID = urlParams.get("postId") ;

// * select Owner post detailes
let ownerPost = document.getElementById('owner-name') ;
let userName = document.getElementById('user-name') ;
let userImage = document.getElementById('user-image') ;
let postImage = document.getElementById('post-image') ;
let postHistory = document.getElementById('post-history') ;
let postTitle = document.getElementById('post-title') ;
let postContent = document.getElementById('psot-content') ;
let postCommentsNumbers = document.getElementById('comments-numbers') ;
let tagsContainer = document.getElementById('tags')

//*  execute the posts From API requerst
async function executeAllPosts(postID) {
    let response = await fetch(`${baseURL}/posts/${postID}`)
    let json = await response.json()
    let post = json.data
    const comments = post.comments

    let author = post.author
    //! set user infromations
    setPostInfo(author,post)
    //! set tags Section 
    createTags(post)
    //! show All comments in post 
    showAllComments(comments)
}

executeAllPosts(postID)

//* set Post Informations 
function setPostInfo(author,post) {
    //* set main owner name 
    ownerPost.innerHTML = `${author.name} . POST` ;

    //* set user name in header post 
    userName.innerHTML = author.username

    //* set user image in header post 
    userImage.src = author.profile_image

    //* set post iamge in body post 
    postImage.src = post.image
    
    //* set Post History in body post 
    postHistory.innerHTML = post.created_at

    //* set post title in body post 
    postTitle.innerHTML = post.title

    //* set post content in body post 
    postContent.innerHTML = post.body

    //* set post content in body post 
    postCommentsNumbers.innerHTML = post.comments_count
}

//*  this funtion to create tags section 
function createTags(post) {

    const tags = post.tags ;
    tagsContainer.innerHTML = ''
    for( tag of tags ) {
        let subTag = `
            <div class="tag">${tag}</div>
        `
        tagsContainer.appendChild(subTag)
    }
}

// * show All Comments in post 


function showAllComments(comments) {
    
    // select comment container
    let commentsContainer = document.getElementById('post-comments') ;
    commentsContainer.innerHTML = '' //! RESET COMMENTS CONTAINER

    for( comment of comments ) {
        //! ADDED NEW COMMENT
        commentsContainer.innerHTML += fillCommentInfo(comment) ;
    }
}

// fill comment information 

function fillCommentInfo(comment) {

    let finalComment = `
    <!-- comment  -->
    <div class="comment">
        <!--* header-commet  -->
        <div class="flex items-center mb-2">
            <!-- user image  -->
            <img src="${comment.author.profile_image}" alt="" class="prof-img-sm">
            <!-- user name  -->
            <h2 class="font-semibold text-xl ml-2">${comment.author.username}</h2>
        </div>
        <!--* body-commet  -->
        <p class="w-[100%] font-extralight">
            ${comment.body}
        </p>
    </div>
    `
    return finalComment
}

// Add comment on any post 

let commentBtn =document.getElementById('comment-btn') ;

commentBtn.onclick = () => {

    let commentContent = document.getElementById('chat').value ;
    if( commentContent == '' ) { //! checked if the comment are empty
        return 
    }
    const token = localStorage.getItem('token') ; 
    if( token == null ) {
        //! done
        showAlert("Unauthentication","danger-alert")
        return 
    }
    
    let URL = `${baseURL}/posts/${postID}/comments` ;
    console.log(token)
    const params = {
        "body" : commentContent 
    }
    const config = {
        "headers" : {
            "Authorization" : `Bearer ${token}` ,
            'Accept' : "application/json"
        }
    }    

    axios.post(URL,params,config)
    .then( (response) => {
        //! done
        showAlert( "The comment has been created successfully" , 'success-alert')
        document.getElementById('chat').value = ''
        executeAllPosts(postID)
    }).catch( error => {
        //! done
        showAlert( "Unauthentication" , "danger-alert")
    })

}


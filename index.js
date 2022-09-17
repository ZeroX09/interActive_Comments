import {commentIneerHTML,commentsReplyInnerHTML} from './utilsFunctions.js'

const userIcon = document.querySelector('.user-icon');





async function getData(){
   let response= await fetch('./data.json');
    let json = await response.json();
    return json
}




async function appendComments(data){

    data.comments.forEach((item)=>{
        const comment = document.createElement('div');
        comment.className = 'comment-container'
        comment.innerHTML = commentIneerHTML(item,data.currentUser)
       
        const replyComment = document.createElement('div');
        replyComment.className = ' comments-reply'
        replyComment.innerHTML = commentsReplyInnerHTML(item.replies,data.currentUser)
        
        if(item.replies.length !==0 ){
        comment.append(replyComment)
    };
    
    const replyButton = comment.querySelectorAll('.btn-reply');
    replyButton.forEach(item=>item.addEventListener('click',(e)=>handleInput(e,{buttonLabel:"Reply"})))
        document.querySelector('.container').prepend(comment);
    const edit = comment.querySelectorAll('.btn-edit');

    if(edit.length>0){
        edit.forEach(item=>item.addEventListener('click',(e)=>handleInput(e,{buttonLabel:'Update',textareaValue:true})))

    }
})

}


function handleInput(e,{buttonLabel='send',textareaValue=false}){
const inputContainer = document.querySelector('.input-container').cloneNode(true);
   let commentId =  e.currentTarget.dataset.comment;
   let button =  inputContainer.querySelector('.btn');
    button.innerText = buttonLabel;
  let targetComment = document.querySelector(' #'+commentId);
  button.addEventListener('click',()=> targetComment.parentElement.querySelector('.input-container').remove())


  if(textareaValue){
    inputContainer.querySelector('textarea').value = targetComment.querySelector('p').innerText;
  }

  if(targetComment.parentElement.querySelector('.input-container')){
    e.target.style=null;
  
    targetComment.parentElement.querySelector('.input-container').remove()
    return;
  }

  targetComment.after(inputContainer)
}


(async()=>{
    const data = await getData();
    userIcon.src = data.currentUser.image.png
    appendComments(data)
})()
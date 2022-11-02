/**
 * CSCI2720/ESTR2106 Assignment 1
 * Bootstrap Web Page with a Web Form
 *
 * I declare that the assignment here submitted is original
 * except for source material explicitly acknowledged,
 * and that the same or closely related material has not been
 * previously submitted for another course.
 * I also acknowledge that I am aware of University policy and
 * regulations on honesty in academic work, and of the disciplinary
 * guidelines and procedures applicable to breaches of such
 * policy and regulations, as contained in the website.
 *
 * University Guideline on Academic Honesty:
 *   http://www.cuhk.edu.hk/policy/academichonesty
 * Faculty of Engineering Guidelines to Academic Honesty:
 *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
 *
 * Student Name: GU, Zhehao 
 * Student ID  : 1155141578 
 * Date        : 2022/10/18
 */

function changeimg(value){
    let i=document.getElementById("imgs");
    i.src="img"+value+".jpg";
}

function special(){
    sp=document.getElementById("special");
    if (sp.style.display=="block"){
        sp.style.display="none";
    }
    else {
        sp.style.display="block";
    }
}
function sp1(){
    titles=document.getElementsByClassName("sectiontitle")
    for (var i in titles){
        if (titles[i].classList.contains("text-start")){
            titles[i].className="sectiontitle text-center";
        }
        else if (titles[i].classList.contains("text-center")){
            titles[i].className="sectiontitle text-end";
        }
        else if (titles[i].classList.contains("text-end")){
            titles[i].className="sectiontitle text-start";
        }
    }
}
function sp2(){
    let x = prompt("Please enter a new hobby:");
    let newHobby = document.createElement("div");
    newHobby.className="hobbyitem";
    newHobby.innerHTML='<p></p>';
    newHobby.querySelector("p").innerHTML=x;
    document.querySelector("#hobbies").appendChild(newHobby);
}

function sp3(){
    let progress = document.querySelector('#progressbox');
    if (progress.style.display=="none"){
        progress.style.display="block";
    }
    else {
        progress.style.display="none"
    }
}

window.onscroll= function() {
    var progress=document.getElementById("progress");
    var max = document.body.clientHeight - window.innerHeight;
    var pos = window.scrollY;

    progress.style.width=100*pos/max+'%';
};

function loadfile() {
    fetch('comments.txt')
    .then(res => res.text())
    .then(txt => document.querySelector("#comments").innerHTML = txt);
  }
  
function savefile() {
    fetch('comments.txt', {
    method: 'PUT',
    body: document.querySelector("#comments").innerHTML
    });
}

function addcomment(){
    let newEmail=document.querySelector("#new-email");
    let com=document.querySelector("#new-comment");
    var atpos=newEmail.value.indexOf("@");

    if (atpos<1 || atpos+1==newEmail.value.length){
        newEmail.classList.add("is-invalid");
        newEmail.setCustomValidity("Invalid Email! Please enter again");
        return false;
    }
    if (!com.checkValidity() || com.value=='' || com.value.trim()==''){
        com.classList.add("is-invaild");
        document.getElementById("comment_warns").style.display="block";
        return false;
    }

    newEmail.classList.remove("is-invalid");
    com.classList.remove("is-invalid");
    document.getElementById("comment_warns").style.display="none";

    let newComment=document.createElement("div");
    let ele='<div><svg height="100" width="120"><circle cx="50" cy="50" r="40"></svg></div><div><h6></h6><p></p></div>\n'
    newComment.innerHTML=ele;
    newComment.className="d-flex";
    newComment.querySelectorAll("div")[0].className="flex-shrink-0";
    newComment.querySelectorAll("div")[1].className="flex-grow-1";

    let lastComment=document.querySelector("#comments").lastElementChild;
    newComment.id='c'+ (Number(lastComment.id.substr(1))+1);

    newComment.querySelector("h6").innerHTML=newEmail.value;
    newComment.querySelector("p").innerHTML=com.value;
    let color=document.querySelectorAll("input[name=new-color]:checked")[0].value;
    newComment.querySelector("circle").setAttribute("fill", color);

    document.querySelector("#comments").appendChild(newComment);
    document.querySelector("form").reset();
    savefile();
    return true;
}

onDOMContentLoaded = loadfile();
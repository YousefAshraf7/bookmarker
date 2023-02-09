let siteNameEle=document.getElementById("siteName");
let siteUrlEle=document.getElementById("siteUrl");
let submitEle=document.querySelector(".container .form button");
let displayEle=document.querySelector(".boxes .container")
let nameAlertEle=document.querySelector("#name-alert");
let urlAlertEle=document.querySelector("#url-alert")


let sites=[];
// console.log(urlAlertEle)

if(localStorage.getItem("sites")!=null){
    sites=JSON.parse(localStorage.getItem("sites"));
    display();
}

function nameValid(){
        var regexName =  /^[0-9a-zA-Z$-@.]+$/; 
        if(regexName.test(siteNameEle.value) == true){
            nameAlertEle.classList.replace("d-block" , "d-none");
            return true;
        }else if(regexName.test(siteNameEle.value) == false){
            nameAlertEle.classList.replace("d-none" , "d-block");
            nameAlertEle.innerHTML= "This feild cant be empty"
        }
}
function urlValid(){
        var regexUrl = /^(http(s)?:\/\/)?(\w{3,}\.)?[\w-]+\.[-a-zA-Z]{2,3}$/; 
        if(regexUrl.test(siteUrlEle.value) == true){
            urlAlertEle.classList.replace("d-block" , "d-none");
            return true;
        }else if(regexUrl.test(siteUrlEle.value) == false){
            urlAlertEle.classList.replace("d-none" , "d-block");
            return false
        }
   
}
siteNameEle.addEventListener("input", function(){
    nameValid()
    sameName()
});
siteUrlEle.addEventListener("input", urlValid);
submitEle.addEventListener("click",addSite);



// addsite

function addSite(){

    if(urlValid() == true && nameValid()== true && sameName()== true) {
        var site={
            siteName:siteNameEle.value ,
            siteUrl :siteUrlEle.value
        }
        sites.push(site)
        localStorage.setItem("sites" , JSON.stringify(sites))
        display()
        siteNameEle.value="";
        siteUrlEle.value="";
        console.log("ss")
    }
}


//display

function display(){
    temp=``;
    sites.forEach( (ele,i) => {
        temp+=`
        <div class="box mb-2 py-3 ">
        <div class="box-content  p-3 col-8 d-flex justify-content-between">
        <h4 class="col-4">${ele.siteName}</h4>
        <div class="col-4">
        <button class="btn-danger btn  delete " onClick="deleteSite(${i})" >Delete</button>
        <a class="btn btn-primary" href="http://${ele.siteUrl}" target="_blank">visit</a>
        </div>
        </div>
        </div>
        `
    });
    displayEle.innerHTML=temp
}

// delete

function deleteSite(currentIndex){
    console.log(currentIndex)
    sites.splice(currentIndex,1)
    display();
    localStorage.setItem("sites" , JSON.stringify(sites))
    }


// Validating The Same Name
function sameName(){
    for (var i = 0; i < sites.length; i++){
        if (siteNameEle.value == sites[i].siteName){
            // alert('Name already exists')
            nameAlertEle.classList.replace("d-none" , "d-block");
            nameAlertEle.innerHTML= "this name is already used"
            return false;
        }
    }
    return true;
}
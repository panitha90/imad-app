/*console.log('Loaded!');

//change the content of html
var element = document.getElementById('main-text');
element.innerHTML= "I have changed the HTML now";

//move an image
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + 'px';
}
img.onclick = function () {
    var interval = setInterval(moveRight, 50);
};*/

//Applying counter value
/*var button = document.getElementById("counter");
button.onclick = function(){
    //create a request
    var request = new XMLHttpRequest();
    
    //capture the response and store in variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter.toString();
            }
        }
        
    //nOT DONE SO NO ACTION
    };
    request.open('GET','http://panitha90.imad.hasura-app.io/counter',true);
    request.send(null);
};
*/

//submit name
var submit = document.getElementById("submit_btn");
submit.onclick = function(){
  
  //create a request
    var request = new XMLHttpRequest();
    
    //capture the response and store in variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            if(request.status === 200){
                //Capture list of names and render to HTML
                console.log("user logged in");
                alert('Logged in successfully');
            } else if (request.status === 403){
                console.log("password incorect");
                alert('password incorect');
            } else if (request.status === 500){
                console.log("Internal server error");
                alert('Internal server error');
            }
        }
        
    //nOT DONE SO NO ACTION
    };
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    request.open('POST','http://panitha90.imad.hasura-app.io/login', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
  

};

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
var counter = 0;
var button = document.getElementById("counter");
button.onclick = function(){
    //create a request
    var request = new XMLHttpRequest();
    
    //capture the response and store in variable
    request.onReadyStateChange = function(){
        if(request.status == 200){
            var counter = request.responseText;
            var span = document.getElementById("count");
            span.innerHTML = counter.toString();
        }
    };
    //nOT DONE SO NO ACTION
    request.open('GET','http://panitha90.imad.hasura-app.io/counter',true);
    request.send(null);
};

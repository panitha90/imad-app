console.log('Loaded!');

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
};

//Applying counter value
var counter = 0;
var button = document.getElementById('clickme');
button.onclick = function(){
    var element = document.getElementById("counter");
    counter = counter + 1;
    element.innerHTML = counter.toString();
};

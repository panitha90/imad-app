console.log('Loaded!');

//change the content of html
var element = document.getElementById('main-text');
element.innerHTML= "I have changed the HTML now";

//move an image
var image = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 10;
    image.style.marginLeft = marginLeft + 'px';
}
image.onClick = function () {
    var interval = setInterval(moveRight,100);
};


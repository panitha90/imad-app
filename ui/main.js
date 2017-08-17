console.log('Loaded!');

//change the content of html
var element = document.getElementById("main-text");
element.innerHTML= "I have changed the HTML now";

//move an image
var image = document.getElementById('madi');
image.onClick = function(){
  img.style.marginRight = '100px' ;
};
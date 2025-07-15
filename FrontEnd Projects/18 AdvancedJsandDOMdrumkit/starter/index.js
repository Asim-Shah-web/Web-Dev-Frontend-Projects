/*alert("hello world")
document.querySelector("button").addEventListener("click",handleclick);
function handleclick(){
    alert("ok");
}
    */
//anonymous functions
//alert("hello world")
/*var btn_num = document.querySelector(".drum").length;
for (var i = 0; i < btn_num; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function () {
    alert("ok");
  });
}
  */
var btnn = document.querySelectorAll(".drum").length;
for (var i = 0; i < btnn; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", handles);
  function handles() {
    //alert("ok");
    //var audio = new Audio("./sounds/crash.mp3");
    //audio.play();
    //console.log(this.innerHTML)
    //this.style.color="white";
    var htmlButn = this.innerHTML;
    animationeffect(htmlButn);
    switch (htmlButn) {
      case "w":
        var tom1 = new Audio("./sounds/tom-1.mp3");
        tom1.play();
        break;
      case "a":
        var tom2 = new Audio("./sounds/tom-2.mp3");
        tom2.play();
        break;
      case "s":
        var tom3 = new Audio("./sounds/tom-3.mp3");
        tom3.play();
        break;
      case "d":
        var tom4 = new Audio("./sounds/tom-4.mp3");
        tom4.play();
        break;
      case "j":
        var crash = new Audio("./sounds/crash.mp3");
        crash.play();
        break;
      case "k":
        var kick = new Audio("./sounds/kick-bass.mp3");
        kick.play();
        break;
      case "l":
        var snare = new Audio("./sounds/snare.mp3");
        snare.play();
        break;
      default:
        console.log(htmlButn);
        break;
    }
  }
}
for (var i = 0; i < btnn; i++) {
  document.addEventListener("keypress", function (event) {
    var keypressed = event.key;
    animationeffect(keypressed);
    switch (keypressed) {
      case "w":
        var tom1 = new Audio("./sounds/tom-1.mp3");
        tom1.play();
        break;
      case "a":
        var tom2 = new Audio("./sounds/tom-2.mp3");
        tom2.play();
        break;
      case "s":
        var tom3 = new Audio("./sounds/tom-3.mp3");
        tom3.play();
        break;
      case "d":
        var tom4 = new Audio("./sounds/tom-4.mp3");
        tom4.play();
        break;
      case "j":
        var crash = new Audio("./sounds/crash.mp3");
        crash.play();
        break;
      case "k":
        var kick = new Audio("./sounds/kick-bass.mp3");
        kick.play();
        break;
      case "l":
        var snare = new Audio("./sounds/snare.mp3");
        snare.play();
        break;
      default:
        console.log("wrong key pressed");
        break;
    }
  });
}
function animationeffect(userResponse) {
  var newclass = document.querySelector("." + userResponse);

  newclass.classList.add("pressed");
  setTimeout(function () {
    newclass.classList.remove("pressed");
  }, 100);
}

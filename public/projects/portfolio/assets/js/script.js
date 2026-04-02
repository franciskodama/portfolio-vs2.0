// ------------ AVATAR ANIMATION ------------ 

let tl = gsap.timeline()

tl.from(".hello-container", {duration: 1, y: -1000, ease: "elastic"})
tl.from(".francis-container", {duration: 1, x: -2000, ease: "elastic"})
tl.from(".kodama-container", {duration: 1, y: -1000, ease: "elastic"})
tl.from(".linkedin-container", {duration: 1, x: -1600, ease: "elastic"})

tl.to(".js-letter", 1, {
  // backgroundColor: "transparent",
  scale: 0.07, 
  y: -25,
  // yoyo: true, 
  ease: "sine",
  // delay: 1,
  opacity: 1,
  stagger: 0.01
  // {
    // amount: 0.5, 
    // grid: "auto",
    // from: "center"
  // }
});


// ------------ PARALLAX ------------ 

let avatarBg = document.getElementById("avatar-bg")
let francisContainer = document.getElementById("francis-container")
let kodamaContainer = document.getElementById("kodama-container")
let helloContainer = document.getElementById("hello-container")
let linkedinContainer = document.getElementById("linkedin-container")
let scrollArrow = document.getElementById("scroll-arrow")


window.addEventListener('scroll', function(){
  let value = window.scrollY

  avatarBg.style.top = value * 0.5 + "px";
  francisContainer.style.left = -value * 1 + "px";
  kodamaContainer.style.top = -value * 1 + "px";
  helloContainer.style.top = -value * 1.5 + "px";
  linkedinContainer.style.left = value * 1 + "px";
  scrollArrow.style.top = -value * 1.5 + "px";
})

// ------------ THANK YOU MESSAGE ------------ 

const thankYouButton = document.getElementById("button-contact-2")
const thankYouMessage = document.getElementById("thankyou-main-container")
thankYouButton.addEventListener("click", thankYouAppears)

function thankYouAppears() {
  thankYouMessage.style.display = "block"
  setTimeout(thankYouDisappears, 5000)
}

function thankYouDisappears() {
  thankYouMessage.style.display = "none"
}


// TO TOP BUTTON ---------------------------------------

window.onscroll = function () {
  if (pageYOffset >= 200) {
      document.getElementById('backToTop').style.visibility = "visible";
  } else {
document.getElementById('backToTop').style.visibility = "hidden";
  }
};

document.getElementById('backToTop').onclick = function()
{
  scrollTo(document.body, 0, 0);
}

'use strict';
///////////////
// selectors 

const header=document.querySelector('.header')

const nav=document.querySelector('.nav')
const section1= document.querySelector('#section--1')

const navLinks= document.querySelectorAll('.nav__link');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');


const tabs= document.querySelectorAll('.operations__tab');
const tabContainer= document.querySelector('.operations__tab-container');
const tabsContent= document.querySelectorAll('.operations__content');

const allSections=document.querySelectorAll('.section');

///////////////////////////////////////
// Modal window



////////////////////////////
// closing and opening window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////////////////////////////////////
// IMPLEMENTING SMOOOTH SCROLLING
const btnScrollTo= document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click',function (e) {
  e.preventDefault();
  const section1Coords= section1.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());
  // console.log('section1 distance',section1Coords.x,section1Coords.y);
  // console.log('windows scroll coordinates: ',window.pageXOffset,window.pageYOffset);
  
  

  // console.log('height/width viewport',document.documentElement.clientHeight,document.documentElement.clientWidth);

//   window.scrollTo({
//     left:section1Coords.x + window.pageXOffset,
//     top: section1Coords.y + window.pageYOffset,
//     behavior: 'smooth',
// });
section1.scrollIntoView({behavior:'smooth'});
});
/////////////////////////////////////////////
///  implementing scrolling towards specific sections



// navLinks.forEach((navL)=> {
//   navL.addEventListener('click',function (e) {
//         e.preventDefault();
//         const id=navL.getAttribute('href');
//         console.log(id);
//         document.querySelector(id).scrollIntoView({behavior:'smooth'});
//   })
// });


document.querySelector('.nav__links').addEventListener("click",function(e) {
e.preventDefault();
  // console.log(e.target);
  if(e.target.classList.contains('nav__link')) {
    const id=e.target.getAttribute('href');
      // console.log(id);
     document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});

//////////////////////
//  implementing tabbed componenet

tabContainer.addEventListener("click",function(e) {
 e.preventDefault();
 const clicked=e.target.closest('.operations__tab')
 
 // guard clause
 if(!clicked) return;

 // remove active class from all tabs and then add it to the one clicked
tabs.forEach(t=> t.classList.remove('operations__tab--active'));
clicked.classList.add('operations__tab--active');
 
// now show content for the clicked one
// console.log(clicked.dataset.tab);
tabsContent.forEach(c => c.classList.remove('operations__content--active'));
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

});


/////////////////////////////////
// implementing mouseover dimming func on nav
const faddingInOut=function(e) {
  // console.log(this)
 const link= e.target;
  // console.log(link);
  const siblings= link.closest(".nav").querySelectorAll('.nav__link');
  const logo= link.closest('.nav').querySelector('img');
  // console.log('link: ',link, 'siblings: ',siblings,'logo: ',logo);
 siblings.forEach(el =>{
  if(el !== link) el.style.opacity=this;
 });
 logo.style.opacity=this;  
}
nav.addEventListener('mouseover',faddingInOut.bind(0.5));

nav.addEventListener('mouseout',faddingInOut.bind(1));


////////////////////////////////
// implementing revealing elements on scroll

const observerFunction=function(entries,observer) {
  entries.forEach(entry => {
    // console.log(entry); 
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
     observer.unobserve(entry.target);
  });
 ;
}


const sectionObserver= new IntersectionObserver(observerFunction,{
  root:null,
  threshold: 0.3,
});


allSections.forEach(section=>{
  sectionObserver.observe(section);
  section.classList.add('section--hidden');

});
////////////////////////////////
/// 
//  Lazy loading images
//  
const images=document.querySelectorAll('.lazy-img');

const imgObsFunc=function(entries,observer) {
const [entry]= entries;
// console.log(entry);
if(!entry.isIntersecting) return;
// console.log(entry.target)
// replace src with data-src
entry.target.src= entry.target.dataset.src;
entry.target.addEventListener('load',function() {
 entry.target.classList.remove('lazy-img');
})
observer.unobserve(entry.target);

}

const imageObserver = new  IntersectionObserver(imgObsFunc,{
  root:null,
  threshold: 0.2,
  rootMargin: '200px',
});

images.forEach(image =>{
imageObserver.observe(image);
});

//////////////////////////////
//    Slider


// selectors for slider components
const slides=document.querySelectorAll('.slide');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
const slider=document.querySelector('.slider')

let curSlide=0;
const  maxSlides=slides.length;
console.log(maxSlides)



 const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
createDots();
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };


activateDot(0)

const movSlide= () => slides.forEach((s,i) => s.style.transform= `translateX(${100 * (i-curSlide)}%)`);


// next slide
const nextSlide=()=>{
// console.log('Right')
    if(curSlide < (maxSlides-1)){
        curSlide++;
      }
      else{
        curSlide=0;
      }
      movSlide();
      activateDot(curSlide);
}

// previous slide
const prevSlide=() => {
  //  console.log('left');
  if(curSlide > 0){
     curSlide--;
    }
    else{
      curSlide=0;
    }
    movSlide();
    activateDot(curSlide);
}

  btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);



  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      movSlide();
      activateDot(curSlide);
    }
  });

slides.forEach((s,i) => s.style.transform= `translateX(${100 * i}%)`)



//////////////////////////////////////
////////  implementing sticky navigation  using intersectionobserver API

const navHeight=nav.getBoundingClientRect().height;
// console.log(navHeight)
const navSticky=function (entries,observe) {

  const [entry]=entries;
  // console.log(entry); 
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky');
}
const obsHeader=new IntersectionObserver(navSticky,{
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
obsHeader.observe(header)


/*
////////////////////////////////////////////
////////////////////////////
// PRACTICE CONCEPT AND LECTURES
console.log(document);
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

console.log(document.querySelector('.header'));
console.log(document.querySelectorAll('.section'))

console.log(document.getElementById('section--1'))
console.log(document.getElementsByTagName('button')) // collections can be modified on the fly
console.log(document.getElementsByClassName('nav'))



/// CREATING AND INSERTING ELEMENTS
const message= document.createElement('div');
message.classList.add('cookie-message');
// message.textContent='we use cookies for functionality and advanced analytics';
message.innerHTML='we use cookies for advanceed analytics and functionality <button class="btn btn--close-cookie">you got the button</button>'
// inserting elemen
header.append(message);
header.prepend(message);
header.after(message);
header.before(message);

console.log(message);
// deleting
document.querySelector(".btn--close-cookie").addEventListener('click',()=>{
  // message.remove();
  message.parentElement.removeChild(message);
})


//////////////////////////////
// styles attributes and classes
message.style.backgroundColor='#37383d';
message.style.width='120%';

console.log(message.style.backgroundColor)
console.log(message.style.color);  // no answer
console.log(getComputedStyle(message).color)
console.log(getComputedStyle(message).height);

message.style.height=getComputedStyle(message).height + 300 + 'px';
document.documentElement.style.setProperty('--color-primary','orangered')

// ATTRIBUTES
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
logo.alt='Beautiful soap designer';
console.log(logo.alt);
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
console.log(logo.getAttribute('designer','nooah'));

console.log(logo.src);  // http://127.0.0.1:8080/img/logo.png
console.log(logo.getAttribute('src'));  // img/logo.png

const link=document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));  // #

// data attributes
console.log(logo.dataset.versionNumber);

// classes
// logo.classList.add('c','j');
console.log(logo.className);
// logo.classList.remove('c','j');
logo.classList.toggle('c','j');

console.log(logo.classList.contains('c'));
/////////////////////////////
// TYPES OF EVENTS AND EVENT LISTENERS
const h1= document.querySelector('.header');
const alertH1=function (e) {
  alert('you entered the mouse pointer in h1');
}

// h1.addEventListener('mouseenter', alertH1);

setTimeout(()=> h1.removeEventListener('mouseenter',alertH1),3000);
h1.onmouseenter=function (e) {
  alert('you entered the mouse pointer in h1');
}
*/

/*
//////////////////////////////////////
// EVENT PROPAGATION IN PRACTICE
const randomInt=function (min,max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const randomColor=function () {
  return `rgb(${randomInt(0,255)},${0,255},${0,255})`

}

document.querySelector('.nav__link').addEventListener('click',function (e) {
  console.log(this);
  this.style.backgroundColor=randomColor();
  console.log('Nav links',e.target,e.currentTarget);

});


document.querySelector('.nav__links').addEventListener('click',function (e) {
  console.log(this);
  this.style.backgroundColor=randomColor();
  console.log('Container',e.target,e.currentTarget);

});

document.querySelector('.nav').addEventListener('click',function (e) {
  console.log(this);
  this.style.backgroundColor=randomColor();
  console.log('Nav : ',e.target,e.currentTarget);

});

*/
/*
///////////////////////////////////
// DOM TRAVERSING 
const h1=document.querySelector('h1');

// going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.querySelector('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color= 'yellow';
h1.lastElementChild.style.color= 'orangered';

/// Going upwards: parents
const h1=document.querySelector('h1');
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background='var(--gradient-secondary)';
h1.closest('h1').style.background='var(--gradient-primary)';

// going sideways : siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.nextSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach((el)=>{
  if(el !== h1) el.style.transform = 'scale(0.5)';
})
*/
/*
/////////////////////
// STICKY NAVIGATION
const nav=document.querySelector('.nav')
const section1= document.querySelector('#section--1')
const initialCoords=section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll',function(e) {
  const initialCoords=section1.getBoundingClientRect();
  console.log(initialCoords.top);
  console.log(window.scrollY);
  if(window.screenY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  });
// but this is not an optimal solution so 
*/
///////////////////////////////
////  lets learn
///           intersectionOBSERVER API
/*
const obsCallback=function(entries,obseve) {
  entries.forEach(entry => {
    console.log(entry);    
  });
}
const obsOption={
  root: null,
  threshold:[0,0.2],
}
const observer=new IntersectionObserver(obsCallback,obsOption);
const section1= document.querySelector('#section--1')
observer.observe(section1);
*/

// const header=document.querySelector('.header');





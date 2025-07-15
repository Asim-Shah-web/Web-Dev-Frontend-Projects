'use strict';



class Workout{
    id=(Date.now())+''.slice(-10);
    date=new Date();
    clicks=9;
    constructor(distance,duration,coords){
        this.distance=distance;
        this.duration=duration;
        this.coords=coords;
    }
    // prettier-ignore
    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
     return this.description= `${this.type[0].toUpperCase()+this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
    
  click() {
    this.clicks++;
  }
}
class Running extends Workout{
    type='running'
    constructor(distance,duration,coords,cadence){
        super(distance,duration,coords);
        this.cadence=cadence;
        this.calcPace();
        this._setDescription();
    }
    calcPace() {
        // min/km
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout{
    type='cycling'
    constructor(distance,duration,coords,elevationGain){
        super(distance,duration,coords);
        this.elevationGain=elevationGain;
        this.calcSpeed();
        this._setDescription();
    }
    calcSpeed() {
    // min/km
    this.speed = this.distance / this.duration;
    // console.log(this.speed)
    return this.speed;
  }
}





const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// let map;
// let mapEvent;

class App{
    #map;
    #mapZoomLevel=13;
    #mapEvent;
    #workouts=[];
    constructor(){
   /// getting the position and also showing the map included in this function through another func _loadMap
        this._getPosition();

        // getting data/workouts from local storage
       this._getLocalStorage();
// Event listener

// form submission taking coords and marking it
        form.addEventListener('submit',this._newWorkout.bind(this));
        // toggling the form for cycling and running
       inputType.addEventListener('change',this._toggleElevationField);

// move to the popup whose list is clicked
      containerWorkouts.addEventListener('click',this._moveTopopup.bind(this));
}

    _getPosition(){
         if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function () {
    console.log('callback is unsuccessfull');
});
    }

    _loadMap(position){
        const {latitude,longitude}=position.coords;
    // console.log(latitude,longitude);
    const coords= [latitude,longitude];
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},16z?entry=ttu&g_ep=EgoyMDI1MDYyOS4wIKXMDSoASAFQAw%3D%3D`);

     this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.#map);

  this.#map.on('click',this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
    }

    _showForm(mapE){
// handling clicks on maps
  this.#mapEvent=mapE;
   form.classList.remove('hidden');
   inputDistance.focus();
}

_toggleElevationField(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
}
_hideForm(){
    inputDistance.value=inputCadence.value=inputDuration.value=inputElevation.value='';
   form.style.display='none';
    form.classList.add('hidden');
     setTimeout(() => (form.style.display = 'grid'), 1000);

    }

    _newWorkout(e){
e.preventDefault();

// get data from user or form
const type=inputType.value
const distance=+inputDistance.value;
const duration=+inputDuration.value;
const {lat,lng}= this.#mapEvent.latlng;
let workout;

// console.log(type,distance,duration,cadence,elevation);
    
// validate the data
const inputValid= (...input)=> input.every((inp)=>Number.isFinite(inp));
const isPositive= (...input)=> input.every((inp)=> inp > 0);



// if data was
//  invalidate then clear form and show data invalid message


//  if workout running create running objects
if(type==='running'){
    const cadence=+inputCadence.value;

    if(
!inputValid(distance,duration,cadence) && !isPositive(distance,duration,cadence)
    // using guard clause
)return alert('The data in the form is invalid');
workout=new Running(distance,duration,[lat,lng],cadence);
}

//  if workout cycling create cycling object
if(type === 'cycling'){
    const elevation=+inputElevation.value;
    if(
!inputValid(distance,duration,elevation) && !isPositive(distance,duration,elevation)
    // using guard clause
) return alert('The data in the form is invalid');
workout=new Cycling(distance,duration,[lat,lng],elevation)
}

// if data was correct then add new object to workout array
// console.log(workout);
this.#workouts.push(workout);
// render the workout/marker on map 
// display marker
this._renderWorkoutMarker(workout);
// render the workout on list
this._renderWorkout(workout);

  

// hide forms + clear input fields
this._hideForm();

// putting data into localstorage
this._setLocalStorage(workout);


    }

_renderWorkoutMarker(workout){
L.marker(workout.coords).addTo(this.#map)
    .bindPopup(L.popup({
        maxWidth: 250,
        minWidth:100,
        autoClose:false,
        closeOnClick: false,
        className:`${workout.type}-popup`
    }))
    .setPopupContent(`${workout.type==='running'? ' 🏃‍♂️ ':' 🚴‍♀️ '} ${workout.description}`)
    .openPopup();
}

_renderWorkout(workout){
    let html=`
   <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${  
                workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div> `;
          if(workout.type==='running')
          html+=`
           <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>`;

  if(workout.type==='cycling')
    html+=`
  <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">m</span>
          </div>`;
 form.insertAdjacentHTML('afterend',html);
}

_moveTopopup(eformClkd){
//    console.log(eformClkd.target);   
   // handlingthe error when form is clicked before map got loaded
   if(!this.#map) return;
//    console.log(eformClkd.target.closest('.workout'));
   const formC=eformClkd.target.closest('.workout');
   if(!formC) return;
   const form=this.#workouts.find((workout)=>workout.id === formC.dataset.id)
//    console.log(form);
//    console.log(form.coords);
     this.#map.setView(form.coords,this.#mapZoomLevel,{
         animate: true,
      pan: {
        duration: 1,
      },
     });
}

//  setting the data into local storage
_setLocalStorage(workout){
localStorage.setItem('workout',JSON.stringify(this.#workouts));
}
_getLocalStorage(){
const data=JSON.parse(localStorage.getItem('workout'));
// console.log(getworkout);

    if (!data) return;
this.#workouts=data;
this.#workouts.forEach(ele => {
    this._renderWorkout(ele);  
    // this._renderWorkoutMarker(ele);  

});
}
reset(){
    localStorage.removeItem('workout');
    location.reload();
}

}






const app=new App();


// inputType.addEventListener('change',_toggleElevationField)














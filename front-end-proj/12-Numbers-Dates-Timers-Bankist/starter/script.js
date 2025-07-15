'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Asim Shah',
  movements: [100, 4255.23, -106.5, 355000, -42.21, -13.9, 7997, 130.0],
  interestRate: 0.00, // %
  pin: 3333,

  movementsDates: [
    '2025-11-18T21:31:17.178Z',
    '2025-12-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-04-01T10:17:24.185Z',
    '2025-05-08T14:11:59.604Z',
    '2025-05-27T17:01:17.194Z',
    '2025-07-11T23:36:17.929Z',
    '2025-07-12T10:51:36.790Z',
  ],
  currency: 'PKR',
  locale: 'ar-SY', 
};
const accounts = [account1, account2,account3];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
// SET LOGOUT TIMER
const setLogOutTimer=function () {
  // set time to 5 min
  let time=120;
const tick=function() {
  

  // show the remaining time to the ui
  const min = `${Math.trunc(time/60)}`.padStart(2,0);
  const sec = `${Math.trunc(time%60)}`.padStart(2,0);
  labelTimer.textContent=`${min}:${sec}`;  
  // if time=0 then logout the current user
  if(time===0) {
     labelWelcome.textContent = 'Log in to get started'
    containerApp.style.opacity = 0;
  }

  // decrease time by 1sec
  time--;
}
  // call the function after every 1 sec
  // tick();
  timer= setInterval(tick,1000);
  return timer;
}

// function for formatting numbers
const numberFormater=function(locale,movement,currency){
return new Intl.NumberFormat(locale,{
  style:'currency',
  currency: currency, 
}).format(movement);
}

// function for formating date for every movement in the account to be displayed
const formatMovementDate= (date,locale)=>{
  const calcDaysPassed= (date1,date2)=>{
    return Math.round(Math.abs((date2 - date1) / (24 * 60 *60 * 1000)));
  }
  const daysPassed=calcDaysPassed(new Date(),date);
  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`;
//   const year=date.getFullYear();
// const month=`${date.getMonth()+1}`.padStart(2,0);
// const nDate=`${date.getDate()}`.padStart(2,0);
// const hours=date.getHours();
// const min=date.getMinutes();

// const displayDate=`${nDate}/${month}/${year}, ${hours}:${min}`;
return Intl.DateTimeFormat(locale).format(date);
}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const combinedMovsDates= acc.movements.map((mov,i)=>{
    return {
      movements:mov,
      movementsDate:acc.movementsDates.at(i),
    }
  });
  
  // const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  if (sort) combinedMovsDates.sort((a, b) => a.movements - b.movements);
  
  combinedMovsDates.forEach(function (obj, i) {
    const {movements,movementsDate}=obj;
    
    const type = movements > 0 ? 'deposit' : 'withdrawal';

const date = new Date(movementsDate);
const displayDate=formatMovementDate(date,acc.locale);
// intl number
const formatNum=numberFormater(acc.locale,movements,acc.currency);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatNum}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent =numberFormater(acc.locale,acc.balance,acc.currency);
;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${numberFormater(acc.locale,incomes,acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${numberFormater(acc.locale,Math.abs(out),acc.currency)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${numberFormater(acc.locale,interest,acc.currency)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount,timer;
// // fake logging in that needs to be removed later after impplementing dates
// currentAccount=account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// const now=new Date();
// const year=now.getFullYear();
// const month=`${now.getMonth()+1}`.padStart(2,0);
// const nDate=`${now.getDate()}`.padStart(2,0);
// const nDay=now.getDay();
// const hours=now.getHours();
// const min=now.getMinutes();
// const sec=now.getSeconds();
// labelDate.textContent=`${nDate}/${month}/${year}, ${hours}:${min}`;




////////////////////////////////
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
   // create current date
  //  const now=new Date();
  //  const year=now.getFullYear();
  //  const month=`${now.getMonth()+1}`.padStart(2,0);
  //  const nDate=`${now.getDate()}`.padStart(2,0);
  //  const nDay=now.getDay();
  //  const hours=now.getHours();
  //  const min=`${now.getMinutes()}`.padStart(2,0);
  //  const sec=now.getSeconds();
  //  labelDate.textContent=`${nDate}/${month}/${year}, ${hours}:${min}`;
  // 
  // 
  // 
   // creating  a well formatted date
   const options={
     hour:'numeric',
     minute:'numeric',
     month:'numeric',
     year:'numeric',
     weekday:'long',
     day:'numeric',
    };
    // const locale=navigator.language;
    const now=new Date();
    labelDate.textContent= Intl.DateTimeFormat(currentAccount.locale,options).format(now);
    // labelDate.textContent= Intl.DateTimeFormat('ur-PK',options).format(now);


    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    // set logout timer
    if(timer) clearInterval(timer);
    timer=setLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // adding transfer dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString())
    // Update UI
    updateUI(currentAccount);
       // set logout timer
    if(timer) clearInterval(timer);
    timer=setLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
  setTimeout(()=>{

    // Add movement
    currentAccount.movements.push(amount);
    // adding loan dates
    currentAccount.movementsDates.push(new Date().toISOString());
    // Update UI
    updateUI(currentAccount);
       // set logout timer
    if(timer) clearInterval(timer);
    timer=setLogOutTimer();
  },3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

////////////////////////////+/////////////////////
/////////////////////////////////////////////////
/*
// LECTURES

// conversion and checking numbers

// convert a value to number
console.log(typeof 20);
console.log(typeof Number('20'));
console.log(typeof +('20'));

//  base 10 and binary base
console.log( 23 === 23.0);  // 0.3 !== 10/3
console.log(0.1 +0.3 === 0.4);
console.log(0.1 +0.3);
// parsing
console.log(Number.parseInt('10rem',10))
console.log(Number.parseInt('1010pt',2))
console.log(Number.parseInt('r30',10))
console.log(Number.parseFloat('   2.5rem   ',10))
console.log(Number.parseInt('   2.5rem   ',10))

// check if value is NaN
console.log(Number.isNaN(   2.5  ))
console.log(Number.isNaN(+'2.4s'))
console.log(Number.isNaN(23/0))
// checking if a value is number
console.log(Number.isFinite(23/0))
console.log(Number.isFinite(2))
console.log(Number.isFinite('2'))
console.log(Number.isFinite(+'2'))
console.log(Number.isFinite('2l'))
// int or not
console.log(Number.isInteger(+'23'))
console.log(Number.isInteger(23/0))
console.log(Number.isInteger(23.01))
console.log(Number.isInteger(23.00))
/////////////////////////////////
// math and rounding
console.log(Math.sqrt(16));
console.log(16 ** (1/2));
console.log(Math.min(1,23,34,4,5,66,77));
console.log(Math.max(1,23,34,4,5,66,77));
console.log(Math.max(1,23,34,4,5,66,'77d'));
console.log(Math.max(1,23,34,4,'5f',66));
console.log(Math.round(23.3));
console.log(Math.round(23.9));
console.log(Math.round(23.5));
console.log(Math.round(24.5));
console.log(Math.floor(24.5));
console.log(Math.ceil(24.5));
console.log(Math.trunc(24.5));
 
const converInt = (max,min) => Math.trunc(Math.random() * (max-min +1) + min);

console.log(converInt(20,10));
console.log(converInt(700,400));

// remainder
console.log(10 % 3);
labelBalance.addEventListener('click',function () {
  [...document.querySelectorAll('.movements__row')].forEach(function(row,i) {
    if(i % 2 === 0)
    row.style.backgroundColor='orangered';
      if (i % 3 === 0) row.style.backgroundColor = 'blue';
  })
  
});
////////////////////////////
// Numeric Seperators
// 234,567,789,666
const numSep= 123_324_567_345
console.log(numSep);
const PI = 3.1415;
console.log(PI);
console.log(Number('230_000'));  // nan
console.log(parseInt('230_000')); // 230
//////////////////////////////
// Working with BigInt
 console.log(2** 53 -1)
 console.log(2** 53 )
 console.log(2** 53 +1 ) // incorrect
 console.log(2** 53 -1)
 
console.log(1n+2233434454566576867776767787888n + 21231334243435545446546465n);
console.log(231234343455465756n * 23423423345454645n)
const bigNum = 32423435465767786767n ;
const num=4;
// console.log(bigNum * num);
console.log(bigNum * BigInt(num));
console.log(10 / 3);
console.log(10n / 3n); // same answer
console.log(11n / 3n); // same answer

console.log(20n > 20)
console.log(20n > 10)
console.log(20n == 20)
console.log(20n === 20)
console.log(20n =='20')

/////////////////////////////////
// CREATING A DATE 
//  creating date

console.log(new Date());
console.log(new Date("Aug 20 1947 10:34:45"));
console.log(new Date("Aug 14 1947 "));
console.log(account1.movementsDates[0]);

console.log(new Date(2024, 10, 23, 20, 13, 11));
const timeDetail=new Date();
console.log(timeDetail.getFullYear());
console.log(timeDetail.getMonth()+1); // bcz starts from 0
console.log(timeDetail.getDay());
console.log(timeDetail.getDate());
console.log(timeDetail.getHours());
console.log(timeDetail.getMinutes());
console.log(timeDetail.getSeconds());
console.log(timeDetail.getTime());
console.log(timeDetail.toISOString());  //2025-05-17T10:47:17.805Z
console.log(new Date(1747478934496));  // timestamp

console.log(Date.now());
console.log(timeDetail.setFullYear(2049));
console.log(timeDetail);
//////////////////////////////////

// Operations with Dates
const fut= new Date();
console.log(+fut);

const calcDaysPassed= (date1,date2) => {
    return (date2-date1) / (24 * 60* 60 * 1000 );
}
console.log(calcDaysPassed(new Date(2024,4, 17),new Date()));

///////////////////////////////////
// operations with numbers
const optionsForNum={
  style:'currency', // unit, percent
  currency: 'PKR', // unit:"KG",
};
const number = 12333456.23 ;
const num1= new Intl.NumberFormat('de-DE',optionsForNum).format(number);
const num2= new Intl.NumberFormat('en-US',optionsForNum).format(number);
console.log(num1,num2);

///////////////////////
// SETTIMEOUT AND SETINTERVAL
const ingredients=['garlic','spinach'];
const pizzaTimer=setTimeout((ing1,ing2)=>{
  console.log(`Here is your pizza with ${ing1} and ${ing2}`);
},1000,...ingredients);
if(ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setinterval
setInterval(()=>{
  const now = new Date();
  console.log(now);
},1000)
*/
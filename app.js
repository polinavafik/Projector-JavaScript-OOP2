/*Домашнє завдання по темі "ООП в JS 2"
Реалізуйте наступну систему на прототипному успадкуванні:

1. чотири класи для створення об'єктів-сутностей (це можуть бути тварини, покемони, раси і т.д. - проявіть фантазію)

2. у кожного класу має бути мінімум 3 властивості та мінімум 3 методи(але можна й більше)

3. у кожного класу має бути своя унікальна властивість

4. у двох класів має бути спільний предок та спільний метод характерний тільки для них

5. у всіх чотирьох класів має бути один (крім проміжних) клас-предок
*/

// function PPerson(firstName, lastName) {
//     this.firstName = firstName
//     this.lastName = lastName
// }
// PPerson.prototype.getFullName = function() {
//     return `${this.firstName} ${this.lastName}`
// }
// function PUser(firstName, lastName, email, password) {

//     PPerson.call(this, firstName, lastName)
//     this.email = email
//     this.password = password
// }

// PUser.prototype = Object.create(PPerson.prototype)
// PUser.prototype.getEmail = function() {
//     return this.email
// }

function Human(name) {
    this.name = name;
    this.type = 'Human'
}
Human.prototype.areYouARobot = function () {
    console.log(`I'm only human after all, Don't put your blame on me`);
}
//----------------------------------------------


function RegularCitizen(name, type) {
    Human.call(this, name, type)
    this.occupation = 'Regular Citizen';
    this.mood = getMood();
}
RegularCitizen.prototype.introduce = function () {
    console.log(`My name is ${this.name} and Im a regular folk`);
}
RegularCitizen.prototype.shareMood = function () {
    console.log(`Why whould you ask me that😃`);
}
RegularCitizen.prototype.changeMood = function () {
    this.mood = getMood();
}
//-------------------------------------------------


function FactoryWorker(name, type) {
    Human.call(this, name, type)
    this.mood = 'Happy'
    this.occupation = 'Factory Worker';
    this.workDaysCounter = 0;
}
FactoryWorker.prototype = Object.create(Human.prototype)
FactoryWorker.prototype.introduce = function () {
    console.log(`My name is ${this.name} and I am Happy no matter what!`);
}
FactoryWorker.prototype.workerPhrase = function () {
    console.log(`I work at the Happiness Factory`);
}
FactoryWorker.prototype.work = function () {
    this.workDaysCounter = this.workDaysCounter + 1;
}


function HappinessChecker(name, type, mood, occupation, workDaysCounter) {
    FactoryWorker.call(this, name, type, mood, occupation, workDaysCounter)
    this.hasHappyMeter = true;
    this.happyCheckerCount = 0;
    this.position = 'Happiness Checker';
}
HappinessChecker.prototype = Object.create(FactoryWorker.prototype)
HappinessChecker.prototype.checkHappiness = function (citizen) {
    if (citizen.mood === 'Happy') {
        console.log(`${citizen.name} is happy`)
        citizen.state = 'checked';
    } else if (citizen.mood !== 'Happy') {
        console.log(`${citizen.name} is not happy`)
        citizen.state = 'notHappy';
    }

    this.happyCheckerCount = this.happyCheckerCount + 1;
}
HappinessChecker.prototype.catFact = function () {
    console.log(`Cats are believed to be the only mammals who don’t taste sweetness`)
}


function SandessRemover(name, type, mood, occupation, workDaysCounter) {
    FactoryWorker.call(this, name, type, mood, occupation, workDaysCounter)
    this.hasHappyPills = true;
    this.position = 'Sandess Remover';
}
SandessRemover.prototype = Object.create(FactoryWorker.prototype)
SandessRemover.prototype.removeSadness = function (citizen) {
    if (citizen.state === 'notHappy' && citizen.mood === 'Sad') {
        console.log(`${citizen.name} needs some happiness pills`)
        console.log(`Giving ${citizen.name} some pills`)
        citizen.mood = 'Happy'
        citizen.state = 'usedPills';
        console.log(`Now ${citizen.name} is Happy`)
    } else if (citizen.state === 'notHappy' && citizen.mood === 'Angry') {
        console.log(`${citizen.name} is angry! We cannot help here... Call the executer...`)
        citizen.state = 'Ready for Execution'
    } else {
    }
}


function RebelExecuter(name, type, mood, occupation, workDaysCounter) {
    FactoryWorker.call(this, name, type, mood, occupation, workDaysCounter)
    this.hasWeapon = true;
    this.position = 'Rebel Executer';
}
RebelExecuter.prototype = Object.create(FactoryWorker.prototype)
RebelExecuter.prototype.executeRebel = function (citizen) {
    if (citizen.state === 'Ready for Execution') {
        console.log(`We're sorry we couldn help you, now you ~must~ be executed. Goodbye, ${citizen.name}`)
        localStorage.setItem('mess', true)
    } else {
    }
}

function MessCleaner(name, type, mood, occupation, workDaysCounter) {
    FactoryWorker.call(this, name, type, mood, occupation, workDaysCounter)
    this.hasUniqueFeature = true;
    this.position = 'Mess Cleaner';
}
MessCleaner.prototype = Object.create(FactoryWorker.prototype)
MessCleaner.prototype.cleanMess = function () {
    if (localStorage.getItem('mess') === 'true') {
        console.log(`${this.name} is cleaning the mess`)
        localStorage.setItem('mess', false)
    } else {
        console.log(`Nothing to clean here`)
    }
}



const Angela = new HappinessChecker('Angela Martin', 'Happy')
const Andy = new SandessRemover('Andy Bernard', 'Happy')
const Dwight = new RebelExecuter('Dwight Schrute', 'Happy')
const Creed = new MessCleaner('Creed Bratton', 'Happy')

const Pam = new RegularCitizen('Pam Beesly')
const Jim = new RegularCitizen('Jim Halpert')
const Stanley = new RegularCitizen('Stanley Hudson')
const Kevin = new RegularCitizen('Kevin Malone')
const Kelly = new RegularCitizen('Kelly Kapoor')
const Ryan = new RegularCitizen('Ryan Howard')


console.log('---------------------------------------')
console.log('Introducing a Worker and a Citizent from a Happiness Factory Project😃')
console.log(Angela)
console.log(Pam)


console.log('---------------------------------------')
console.log('Time for annual happiness checking!😃')

Angela.checkHappiness(Pam)
Angela.checkHappiness(Jim)
Angela.checkHappiness(Stanley)
Angela.checkHappiness(Kevin)
Angela.checkHappiness(Kelly)
Angela.checkHappiness(Ryan)


console.log('---------------------------------------')
console.log('Lest fix up those who are in need😃')
Andy.removeSadness(Pam)
Andy.removeSadness(Jim)
Andy.removeSadness(Stanley)
Andy.removeSadness(Kevin)
Andy.removeSadness(Kelly)
Andy.removeSadness(Ryan)


console.log('---------------------------------------')
console.log('Goodbuy to all the disturbance😃')
Dwight.executeRebel(Pam)
Dwight.executeRebel(Jim)
Dwight.executeRebel(Stanley)
Dwight.executeRebel(Kevin)
Dwight.executeRebel(Kelly)
Dwight.executeRebel(Ryan)

console.log('---------------------------------------')
console.log('Cleaning process if needed😃')
Creed.cleanMess()





function getRandomNumber() {
    const random = Math.floor(Math.random() * 4)
    return random;
}
function getMood() {
    let mood;
    let result = getRandomNumber();
    if (result === 1 || result === 3) {
        mood = 'Happy'
    } else if (result === 2) {
        mood = 'Sad'
    } else if (result === 0) {
        mood = 'Angry'
    }
    return mood
}

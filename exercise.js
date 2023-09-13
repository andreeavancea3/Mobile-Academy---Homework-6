class Vehicle {
    constructor(maxSpeed, tank, lps, kmps, money) {
        this.currentSpeed = 0;
        this.maxSpeed = maxSpeed;
        this.tank = tank;
        this.lps = lps;
        this.kmps = kmps;
        this.gasConsumed = 0;
        this.kmDrove = 0;
        this.expenses = 0;
        this.money = money;
        this.timer = null;
    }

    drive() {
        if (this.currentSpeed < this.maxSpeed) {
            this.currentSpeed++;
        }
        const gasUsage = this.lps * this.currentSpeed;
        if (this.tank >= gasUsage) {
            this.tank -= gasUsage;
            this.gasConsumed += gasUsage;
            this.kmDrove += this.kmps * this.currentSpeed;
        }
        else {
            this.stop();
        }
    }

    stop() {
        this.currentSpeed = 0;
    }

    putGas() {
        if (this.money > 0) {
            const gasToAdd = this.tank < this.money ? this.tank : this.money;
            this.tank += gasToAdd;
            this.money -= gasToAdd;
        }
    }

    pay() {
        const gasPrice = 2;
        this.expenses += this.gasConsumed * gasPrice; 
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.drive();
            this.pay();
        }, 1000); 
    }

    stopTimer() {
        clearInterval(this.timer);
    }
}

class Motorcycle extends Vehicle {
    constructor(money) {
        super(120, 30, 0.3, 1.5, money);
    }
}

class Car extends Vehicle {
    constructor(money) {
        super(200, 50, 0.5, 2, money);
    }
}

class Truck extends Vehicle {
    constructor(money) {
        super(100, 100, 1, 0.9, money);
    }
}

const motorcycle = new Motorcycle(100);
const motorcycleInfoElement = document.getElementById("motorcycle-info");

let isJourneyInProgress = false;

function updateMotorcycleInfo() {
    motorcycleInfoElement.innerHTML = `
        <p>Current Speed: ${motorcycle.currentSpeed}</p>
        <p>Max Speed: ${motorcycle.maxSpeed}</p>
        <p>Tank: ${motorcycle.tank} liters</p>
        <p>LPS (Liters per Second): ${motorcycle.lps}</p>
        <p>KMPS (Kilometers per Second): ${motorcycle.kmps}</p>
        <p>Gas Consumed: ${motorcycle.gasConsumed} liters</p>
        <p>Kilometers Drove: ${motorcycle.kmDrove} km</p>
        <p>Expenses: ${motorcycle.expenses} money</p>
        <p>Money: ${motorcycle.money} money</p>
    `;
}

document.getElementById("startJourneyButton").addEventListener("click", () => {
    if (!isJourneyInProgress) {
        isJourneyInProgress = true;
        
        function startJourney() {
            motorcycle.drive();
            motorcycle.pay();
            updateMotorcycleInfo();
            
            if (motorcycle.currentSpeed > 0 && motorcycle.tank > 0) {
                requestAnimationFrame(startJourney); 
            } else {
                isJourneyInProgress = false; 
            }
        }
        
        startJourney();
    }
});


updateMotorcycleInfo();
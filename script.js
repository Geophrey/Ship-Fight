/* 
    To run this file, you will need to install Node.js (https://nodejs.org/en)
    Once installed, open up the terminal in VSCode and type: node script
*/

// wait returns a promise and can be handled with async/await
import { wait } from "./util.js";
import setup from "prompt-sync";

const prompt = setup();

async function start() {
    // an example of how to get started
    let nameOfShip = prompt("What is the name of your ship? ");
    await wait(1000);
    console.log(`Your ship name is: ${nameOfShip}`);
}

class AnyShip {
    constructor(shipName, hull, firepower, accuracy) {
        this.shipName = shipName;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
    }

    shipInfo() {
        console.log(
            `Ship name: ${this.shipName}\nHull: ${this.hull}\nFirepower: ${this.firepower}\nAccuracy: ${this.accuracy}`
        );
    }

    attack(target) {
        if (Math.random() < this.accuracy) {
            console.log(
                `${this.shipName} hits ${target.shipName} for ${this.firepower} damage!`
            );
            target.hull -= this.firepower;
        } else {
            console.log(`${this.shipName} missed!`);
        }

        if(target.hull <= 0){
            console.log(`${target.shipName} is destroyed`)
        }
    }
}

const totalAlienShips = [];

for (let i = 1; i <= 6; i++) {
    totalAlienShips.push(
        new AnyShip(
            `Alien${i}`,
            Math.floor(Math.random() * 4) + 3,
            Math.floor(Math.random() * 3) + 2,
            (Math.random() * (0.8 - 0.6) + 0.6).toFixed(2)
        )
    );
}

//console.log(totalAlienShips)
console.log(totalAlienShips[5])
totalAlienShips[0].attack(totalAlienShips[5])
console.log(totalAlienShips[5])


// ship1.create()

// class UserShip extends Ship {
//     static create(index) {
//         const hull = this.randInt(3, 6);
//         const fp   = this.randInt(2, 4);
//         const acc  = this.randFloat(0.6, 0.8);    /
//         return new Alien(`Alien #${index}`, hull, fp, acc);
//     }

//     //userRetreat() {}
// }

//start();
//ship1.shipInfo();

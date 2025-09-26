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

    const player = new UserShip(`${nameOfShip}`, 20, 5, 0.7);

    console.log(player);
    console.log(player.hull);

    // let decision = prompt(`Attack or Retreat? (a or r?)`)
    // decision = decision.toLowerCase

    let retreat = false;

    for (let i = 0; i < totalAlienShips.length; i++) {
        totalAlienShips[i].shipInfo();
        if (retreat || !player.isAlive()) {
            break;
        }

        while (totalAlienShips[i].isAlive() && player.isAlive()) {
            player.attack(totalAlienShips[i]);

            if (totalAlienShips[i].isAlive()) {
                totalAlienShips[i].attack(player);
                if (!player.isAlive()){
                    console.log("game over")
                    break
                }
            } else {
                console.log(`Ship destroyed`);
                let decision = prompt(`Retreat? (yes or no?)`);
                if (decision == "yes") {
                    console.log("player chose retreat");
                    retreat = true;
                    break;
                }
            }
            player.shipInfo();
            totalAlienShips[i].shipInfo();
            // if (decision == "r") {
            //     console.log("player chose retreat");
            //     retreat = true;
            //     break;
            // } else {
            //     decision = prompt(`Attack or Retreat? (a or r?)`);
            // }

            // player.attack(totalAlienShips[i])
            // let decision = prompt(`Attack or Retreat? (a or r?)`);
            // decision = decision.toLowerCase();
            // console.log(decision);

            // if (decision == "a") {
            //     console.log("player chose attack");
            //     player.attack(totalAlienShips[i]);
            //     if (totalAlienShips[i].isAlive()) {
            //         totalAlienShips[i].attack(player);
            //     }
            //     else {
            //         console.log(`Ship destroyed`)
            //         decision = prompt(`Retreat? (yes or no?)`);
            //     }
            //     player.shipInfo();
            //     totalAlienShips[i].shipInfo();
            // } else if (decision == "r") {
            //     console.log("player chose retreat");
            //     retreat = true;
            //     break;
            // } else {
            //     decision = prompt(`Attack or Retreat? (a or r?)`);
            // }
        }
    }
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
            `Ship name: ${this.shipName}; Hull: ${this.hull}; Firepower: ${this.firepower}; Accuracy: ${this.accuracy}`
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

        if (target.hull <= 0) {
            console.log(`${target.shipName} is destroyed`);
        }
    }

    isAlive() {
        return this.hull > 0;
    }
}

const totalAlienShips = [];

for (let i = 1; i <= 6; i++) {
    totalAlienShips.push(
        new AnyShip(
            `Alien${i}`,
            Math.floor(Math.random() * 4) + 3,
            Math.floor(Math.random() * 3) + 2,
            Number((Math.random() * (0.8 - 0.6) + 0.6).toFixed(2))
        )
    );
}

console.log(totalAlienShips);
// console.log(totalAlienShips[5])
// totalAlienShips[0].attack(totalAlienShips[5])
// totalAlienShips[5].hull = 0;
// console.log(totalAlienShips[5])

// ship1.create()

class UserShip extends AnyShip {
    // super() {
    //     // super();
    // }

    retreat() {
        console.log(`${this.shipName} retreats...`);
    }

    // static create(index) {
    //     const hull = this.randInt(3, 6);
    //     const fp   = this.randInt(2, 4);
    //     const acc  = this.randFloat(0.6, 0.8);
    //     return new UserShip(`Alien #${index}`, hull, fp, acc);
    // }
}

// const player = new UserShip(`USS Assembly`, 20, 5, 0.7);

start();

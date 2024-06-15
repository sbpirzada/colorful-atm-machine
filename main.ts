#!/usr/env code

import inquirer from "inquirer";
import chalk from "chalk"

//Initialize user balance and pin code
let myBalance = 10000;
let myPin = 1345;

//Print welcome Message
console.log(chalk.green("\n \tWelcome to Shah Bano Pirzada - ATM Machine.\n"));

let pinAnswer = await inquirer.prompt([
    {
    name: "pin",
    type: "number",
    message: chalk.yellow("Enter your pin code")
}
])  

if (pinAnswer.pin === myPin){
    console.log(chalk.redBright("\nPin is correct, Login Successfully!\n"));
    // console.log(`Current Account Balance is ${myBalance}`)

    let operationAns = await inquirer.prompt([
        {
        name: "operation",
        type: "list",
        message: chalk.gray("\nSelect an operation\n"),
        choices: ["Withdraw Amount", "Check Balance"]
    }
])
    if(operationAns.operation === "Withdraw Amount"){
        let withdrawAns = await inquirer.prompt([
            {
            name: "withdrawMethod",
            type: "list",
            message: chalk.cyan("\nSelect a withdrawal method\n"),
            choices: ["Fast Cash", "Enter Amount"]
            }
        ])
        if(withdrawAns.withdrawMethod === "Fast Cash"){
            let fastCashAns = await inquirer.prompt([
            {
                name: "fastCash",
                type: "list",
                message: chalk.yellowBright("\nSelect an Amount\n"),
                choices: [500, 1000, 2000, 5000, 10000, 20000, 25000]
            }
        ])
        if(fastCashAns.fastCash > myBalance){
            console.log(chalk.yellowBright("\nInsufficient Balance\n"));
        }
        else{
            myBalance -= fastCashAns.fastCash
            console.log(chalk.redBright(`\n${fastCashAns.fastCash} Withdraw Successfully\n`));
            console.log(chalk.cyanBright(`Your remaining balance is: ${myBalance}\n`));
        }
        }
        if(withdrawAns.withdrawMethod === "Enter Amount"){
        let amountAns = await inquirer.prompt([
            {
            name: "amount",
            type: "number",
            message: chalk.blue("\nEnter the Amount to Withdraw:\n")
        }
    ])
    if(amountAns.amount > myBalance){
        console.log(chalk.greenBright("\nInsufficient Balance\n"));
    }
    else{
        myBalance -= amountAns.amount;
        console.log(chalk.grey(`\n${amountAns.amount} Withdraw Successfully.`));
        console.log(chalk.magentaBright(`Your remaining balance is: ${myBalance}\n`));
    }
        
       }
    }
    else if(operationAns.operation === "Check Balance"){
        console.log(chalk.red(`\nYour account balance is: ${myBalance}`));
    }

else if (operationAns.operation === "Check Balance"){
    console.log(chalk.yellowBright(`Your Account Balance is: ${myBalance}\n`));
}
}
else{
    console.log(chalk.whiteBright("\nPin is Incorrect, Try again!\n"));
}
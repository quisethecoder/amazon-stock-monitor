const prompt = require("prompt-sync")();


var gender = prompt("Are you a male or female? (M - male, F - female): ");

if(gender == "M" || gender == "F"){
    console.log(gender);
}else{
    console.log("Try Again");
}



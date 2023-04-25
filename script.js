// Define variables
let milk = 0;
let cowMilked = 0;
let plotOfLand = 1;
let farm = 0;
let business = 0;
let ranch = 0;
let farmCost = 100;
let businessCost = 1000;
let ranchCost = 10000;

// Define functions
function milkCow() {
  milk += plotOfLand;
  cowMilked++;
  updateMilk();
}

function updateMilk() {
  document.getElementById("milk").innerHTML = `${milk} cups of milk`;
}

function buyFarm() {
  if (milk >= farmCost) {
    milk -= farmCost;
    farm++;
    plotOfLand *= 2;
    farmCost *= 2;
    updateMilk();
    updateUpgrades();
  }
}

function buyBusiness() {
  if (milk >= businessCost) {
    milk -= businessCost;
    business++;
    plotOfLand *= 2;
    businessCost *= 10;
    updateMilk();
    updateUpgrades();
  }
}

function buyRanch() {
  if (milk >= ranchCost) {
    milk -= ranchCost;
    ranch++;
    plotOfLand *= 2;
    ranchCost *= 100;
    updateMilk();
    updateUpgrades();
  }
}

function updateUpgrades() {
  document.getElementById("farm").innerHTML = `Farm (${farm}): ${farmCost} cups of milk`;
  document.getElementById("business").innerHTML = `Business (${business}): ${businessCost} cups of milk`;
  document.getElementById("ranch").innerHTML = `Ranch (${ranch}): ${ranchCost} cups of milk`;
}

// Add event listeners
document.getElementById("cow").addEventListener("click", milkCow);
document.getElementById("buy-farm").addEventListener("click", buyFarm);
document.getElementById("buy-business").addEventListener("click", buyBusiness);
document.getElementById("buy-ranch").addEventListener("click", buyRanch);

// Update initial values
updateMilk();
updateUpgrades();

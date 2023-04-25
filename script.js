// Set up variables
let cupsOfMilk = 20;
let cupPrice = 0;
let clickValue = 5;
let farmers = 2;
let farmerPrice = 0;
let autoInterval;

// Set up DOM references
const cow = document.getElementById("cow");
const cupDisplay = document.getElementById("cups-of-milk");
const clicker = document.getElementById("clicker");
const farmerContainer = document.getElementById("farmer-container");
const farmerDisplay = document.getElementById("farmers");
const farmerButton = document.getElementById("farmer-button"); // Add reference to farmer button

// Add event listener to the clicker
clicker.addEventListener("click", function() {
  cupsOfMilk += clickValue;
  updateCupDisplay();
  animateFarmers();
});

// Add event listener to the farmer container to buy a farmer
farmerButton.addEventListener("click", function() { // Add event listener to farmer button
  if (cupsOfMilk >= farmerPrice) {
    cupsOfMilk -= farmerPrice;
    farmers++;
    farmerPrice = Math.round(farmerPrice * 1.1);
    updateCupDisplay();
    updateFarmerDisplay();
    animateFarmers();
  }
});

// Start auto-milking when enough farmers are bought
function startAuto() {
  autoInterval = setInterval(function() {
    cupsOfMilk += farmers;
    updateCupDisplay();
  }, 1000);
}

// Stop auto-milking when there are no farmers
function stopAuto() {
  clearInterval(autoInterval);
}

// Update the cup display
function updateCupDisplay() {
  cupDisplay.textContent = Math.round(cupsOfMilk);
}

// Update the farmer display
function updateFarmerDisplay() {
  farmerDisplay.textContent = farmers;
}

// Animate the farmers when the cow is clicked
function animateFarmers() {
  farmerContainer.querySelectorAll(".farmer").forEach(function(farmer) {
    farmer.style.animation = "none";
    void farmer.offsetWidth; // trigger reflow
    farmer.style.animation = null;
  });
}

// Update the price of the farmer and start auto-milking if needed
function updateFarmerPrice() {
  farmerPrice = Math.round(farmerPrice * 1.1);
  updateCupDisplay();
  updateFarmerDisplay();
  if (farmers > 0 && !autoInterval) {
    startAuto();
  }
}

// Set up upgrade functions
function upgradeToFarm() {
  clickValue = 2;
  cupPrice = 100;
  const farmUpgrade = document.getElementById("farm-upgrade");
  farmUpgrade.textContent = "Upgrade to Business ($500)";
  farmUpgrade.removeEventListener("click", upgradeToFarm);
  farmUpgrade.addEventListener("click", upgradeToBusiness);
  updateCupDisplay();
}

function upgradeToBusiness() {
  clickValue = 5;
  cupPrice = 500;
  const businessUpgrade = document.getElementById("business-upgrade");
  businessUpgrade.textContent = "Upgrade to Corporation ($1000)";
  businessUpgrade.removeEventListener("click", upgradeToBusiness);
  businessUpgrade.addEventListener("click", upgradeToCorporation);
  updateCupDisplay();
}

function upgradeToCorporation() {
  clickValue = 10;
  cupPrice = 1000;
  const corporationUpgrade = document.getElementById("corporation-upgrade");
  corporationUpgrade.style.display = "none";
  updateCupDisplay();
}

// Add event listeners to the upgrade buttons
document.getElementById("farm-upgrade").addEventListener("click", upgradeToFarm);
document.getElementById("business-upgrade").addEventListener("click", upgradeToBusiness);
document.getElementById("corporation-upgrade").addEventListener("click", upgradeToCorporation);

// Add event listener to the reset button
document.getElementById("reset-button").addEventListener("click", function() {
  cupsOfMilk = 0;
  clickValue = 1;
  cupPrice = 10;
  farmers = 0;
  farmerPrice = 10;
  clearInterval(autoInterval);
  updateCupDisplay();
  updateFarmerDisplay();
  const farmUpgrade = document.getElementById("farm-upgrade");
  farmUpgrade.textContent = "Upgrade to Farm ($100)";
  farmUpgrade.removeEventListener("click", upgradeToFarm);
  farmUpgrade.addEventListener("click", upgradeToFarm);
  const businessUpgrade = document.getElementById("business-upgrade");
  businessUpgrade.style.display = "inline-block";
  businessUpgrade.textContent = "Upgrade to Business ($500)";
  businessUpgrade.removeEventListener("click", upgradeToBusiness);
  businessUpgrade.addEventListener("click", upgradeToBusiness);
  const corporationUpgrade = document.getElementById("corporation-upgrade");
  corporationUpgrade.style.display = "inline-block";
  corporationUpgrade.textContent = "Upgrade to Corporation ($1000)";
  corporationUpgrade.removeEventListener("click", upgradeToCorporation);
  corporationUpgrade.addEventListener("click", upgradeToCorporation);
});

// Call the initial update functions
updateCupDisplay();
updateFarmerDisplay();


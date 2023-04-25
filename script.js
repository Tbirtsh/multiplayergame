let milk = 0;
let autoClickers = 0;
let autoClickerPrice = 10;
let upgrades = [
  { name: "Farm", price: 50 },
  { name: "Business", price: 1000 },
  { name: "Ranch", price: 5000 },
  { name: "Farmer", price: autoClickerPrice }
];

function updateMilkDisplay() {
  document.getElementById("milk").textContent = "Milk: " + milk.toFixed(0);
}

function updateAutoClickerDisplay() {
  document.getElementById("auto-clickers").textContent = "Auto-Clickers: " + autoClickers;
}

function updateUpgradeDisplay() {
  let menu = document.getElementById("menu");
  menu.innerHTML = "";
  for (let i = 0; i < upgrades.length; i++) {
    let upgrade = upgrades[i];
    let button = document.createElement("button");
    button.classList.add("upgrade");
    button.classList.add(upgrade.name.toLowerCase());
    button.textContent = upgrade.name + " (" + upgrade.price.toFixed(0) + ")";
    button.disabled = milk < upgrade.price;
    button.addEventListener("click", function() {
      milk -= upgrade.price;
      upgrade.price *= 1.1;
      if (upgrade.name === "Farmer") {
        autoClickers++;
        updateAutoClickerDisplay();
        upgrade.price = Math.ceil(autoClickerPrice * Math.pow(1.1, autoClickers));
        button.textContent = upgrade.name + " (" + upgrade.price.toFixed(0) + ")";
      }
      updateMilkDisplay();
      updateUpgradeDisplay();
    });
    menu.appendChild(button);
  }
}

document.getElementById("cow").addEventListener("click", function() {
  milk += 1;
  updateMilkDisplay();
});

setInterval(function() {
  milk += autoClickers;
  updateMilkDisplay();
}, 1000);

updateMilkDisplay();
updateAutoClickerDisplay();
updateUpgradeDisplay();

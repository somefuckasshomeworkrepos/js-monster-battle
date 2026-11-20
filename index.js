const player = {
  name: "Герой",
  health: 100,
  attackPower: 20,
};

const monster = {
  name: "Гоблін",
  health: 80,
  attackPower: 15,
};

const inventory = ["меч", "щит", "зілля здоров'я"];

function attack() {
  console.log(`${player.name} атакує монстра!`);
  monster.health = Math.max(0, monster.health - player.attackPower);
  console.log(`Здоров'я монстра: ${monster.health} HP`);
}

function monsterAttack() {
  console.log("Монстр атакує героя!");
  player.health = Math.max(0, player.health - monster.attackPower);
  console.log(`Здоров'я героя: ${player.health} HP`);
}

function showStatus() {
  console.log(`\n${player.name}: ${player.health} HP`);
  console.log(`${monster.name}: ${monster.health} HP`);
  console.log(`Інвентар: ${inventory.join(", ")}`);
}

console.log('Гра «Битва з монстром»\n');
showStatus();

let round = 1;

while (player.health > 0 && monster.health > 0) {
  console.log(`\n=== Раунд ${round} ===`);
  attack();

  if (monster.health > 0) {
    monsterAttack();
  }

  round++;
}

if (player.health > 0) {
  console.log(`\nПеремога! ${player.name} переміг монстра!`);
} else {
  console.log(`\nПоразка! ${player.name} програв битву.`);
}
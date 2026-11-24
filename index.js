const readline = require("node:readline");

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

const inventory = ["Меч", "Щит", "Зілля здоров'я"];

function attack() {
  console.log(`${player.name} атакує монстра!`);
  monster.health = Math.max(0, monster.health - player.attackPower);
  console.log(`Здоров'я монстра: ${monster.health} HP`);
}

function monsterAttack() {
  console.log(`${monster.name} атакує героя!`);
  player.health = Math.max(0, player.health - monster.attackPower);
  console.log(`Здоров'я героя: ${player.health} HP`);
}

function showStatus() {
  console.log(`\nГравець: ${player.name}`);
  console.log(`Здоров'я: ${player.health} HP`);
  console.log(`Монстр: ${monster.name}`);
  console.log(`Здоров'я: ${monster.health} HP`);
}

console.log('Гра «Битва з монстром»');
console.log("Інвентар:");

for (let index = 0; index < inventory.length; index += 1) {
  console.log(`- ${inventory[index]}`);
}

showStatus();

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let round = 1;
console.log('\nВведіть "attack", щоб атакувати, "status" для стану або "quit" для виходу.');

terminal.setPrompt("> ");
terminal.prompt();

terminal.on("line", (input) => {
  const command = input.trim().toLowerCase();

  if (command === "attack" && player.health > 0 && monster.health > 0) {
    console.log(`\n=== Раунд ${round} ===`);
    attack();

    if (monster.health > 0) {
      monsterAttack();
    }

    round += 1;
  } else if (command === "status") {
    showStatus();
  } else if (command === "quit") {
    terminal.close();
    return;
  } else {
    console.log('Невідома команда. Введіть "attack", "status" або "quit".');
  }

  if (player.health <= 0 || monster.health <= 0) {
    terminal.close();
    return;
  }

  terminal.prompt();
});

terminal.on("close", () => {
  if (player.health > 0 && monster.health <= 0) {
    console.log("\nПеремога!");
    console.log(`${player.name} переміг монстра!`);
  } else if (player.health <= 0) {
    console.log("\nПоразка!");
    console.log(`${player.name} програв битву.`);
  } else {
    console.log("\nБитву завершено достроково.");
  }
});
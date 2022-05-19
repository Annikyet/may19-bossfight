let enemy = 'coke'
let hero = 'monster'

let attacks = {
  explode: {
    name: 'Explode',
    baseDamage: 100,
    hitRate: 10,
    critRate: 10
  },
  puncture: {
    name: 'Puncture',
    baseDamage: 20,
    hitRate: 80,
    critRate: 20
  },
  fizzle: {
    name: 'Fizzle',
    baseDamage: 8,
    hitRatee: 80,
    critRate: 8
  }
}

let combatants = {
  coke: {
    name: 'Coke',
    party: 'enemy',
    image: '',
    baseHealth: 120,
    maxHealth: 120,
    health: 120,
    level: 1,
    isAlive: true,
    attacks: [
      'fizzle'
    ]
  },
  monster: {
    name: 'Monster',
    party: 'hero',
    image: 'https://images.heb.com/is/image/HEBGrocery/001621707-1?id=e7HRf1&amp;fmt=jpg&amp;dpr=off&amp;fit=constrain,1&amp;wid=196&amp;hei=196',
    baseHealth: 120,
    maxHealth: 120,
    health: 120,
    level: 1,
    isAlive: true,
    attacks: [
      'explode',
      'puncture'
    ]
  }
}

function calcDamage(attack, attacker) {
  let damage = 0
  if (Math.random() * 100 <= attacks[attack].hitRate) {
    damage = (1 + (Math.random() - 0.5) * 0.4) * attacks[attack].baseDamage
    if (Math.random() * 100 <= attacks[attack].critRate) {
      damage += 2
    }
  }
  return Math.floor(damage * combatants[attacker].level)
}

function getAttackHtml(attack) {
  return `
  <div class="col-6">
  <button class="btn btn-primary w-100" onclick="attack('${attack}', 'monster', 'coke')">${attacks[attack].name}!</button>
  </div>
  `
}

function enemyDeath(combatant) {
  const levelFactor = 1.2
  combatants[combatant].level *= levelFactor
  combatants[combatant].maxHealth = Math.floor(combatants[combatant].maxHealth * levelFactor)
  combatants[combatant].health = combatants[combatant].maxHealth
}

function heroDeath(combatant) {
  console.log('you ded')
}

function attack(attack, attacker, defender) {
  console.log(attacker + " used " + attack + " against " + defender)
  if(combatants[attacker].isAlive) {
    let damage = calcDamage(attack, attacker)
    console.log('dmg: ' + damage)
    if (combatants[defender].health <= damage) {
      if (combatants[defender].party === 'enemy') {
        enemyDeath(defender)
      } else if (combatants[defender].party === 'hero') {
        heroDeath(defender)
      }
    } else {
      combatants[defender].health -= damage
    }
    draw()
  }
}

// document.getElementById('hero-card').innerHTML = getAttackHtml('explode')

function getHeroCardHtml(combatant) {
  let html = `
      <div class="card">
      <img src="https://thiscatdoesnotexist.com" alt="" class="card-img">
      <div class="card-body">
        <h2 class="card-title">${combatants[combatant].name}</h2>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" style="width: ${100 * combatants[combatant].health / combatants[combatant].maxHealth}%;" 
          ria-valuenow="${combatants[combatant].health}" aria-valuemin="0" aria-valuemax="${combatants[combatant].maxHealth}" id="boss-hp">${combatants[combatant].health}HP</div>
        </div>
        <div class="row mt-3">`

  for (let a = 0; a < combatants[combatant].attacks.length; a++) {
    html += getAttackHtml(combatants[combatant].attacks[a])
  }
  html += `</div></div></div>`

  return html
}

function getEnemyCardHtml(combatant) {
  return `
      <div class="card">
      <img src="https://thiscatdoesnotexist.com" alt="" class="card-img">
      <div class="card-body">
        <h2 class="card-title">${combatants[combatant].name}</h2>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" style="width: ${100 * combatants[combatant].health / combatants[combatant].maxHealth}%;" 
          ria-valuenow="${combatants[combatant].health}" aria-valuemin="0" aria-valuemax="${combatants[combatant].maxHealth}" id="boss-hp">${combatants[combatant].health}HP</div>
        </div></div></div>`
}

function draw() {
  document.getElementById('boss-card').innerHTML = getEnemyCardHtml(enemy)
  document.getElementById('hero-card').innerHTML = getHeroCardHtml(hero)
}

draw()

setInterval(attack, 500, 'fizzle', 'coke', 'monster')
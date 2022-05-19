class Attack {
  constructor(id, name, baseDamage, hitRate, critRate) {
    this.id = id
    this.name = name
    this.baseDamage = baseDamage
    this.hitRate = hitRate
    this.critRate = critRate
  }

  get damage() {
    let damage = 0
    if (Math.random() * 100 <= this.hitRate) {
      damage = this.baseDamage + (this.baseDamage * 0.4 * (Math.random() - 0.5))
      if (Math.random() + 100 <= this.critRate) {
        damage *= 2
      }
    }
    return Math.floor(damage)
  }
  
  get html() {
    return `
    <div class="col-6">
    <button class="btn btn-primary w-100" onclick="control.heroAttack('${this.id}')">${this.name}!</button>
    </div>
    `
  }
}

class Hero {
  constructor(id, name, image, health, attacks) {
    this.id = id
    this.name = name
    this.image = image
    this.maxHealth = health
    this.health = health
    this.attacks = attacks
    this.isAlive = true
  }
  
  attack(attack) {
    if (this.isAlive) {
      let damage = this.attacks[attack].damage
      boss.takeDamage(damage)
    }
  }
  
  takeDamage(damage) {
    if (damage >= this.health) {
      this.health = 0
      this.isAlive = false
      draw.death(this.id)
    } else {
      this.health -= damage
    }
    draw.hero()
  }
  
  get html() {
    let attackHtml = ``
    for (const a in this.attacks) {
      attackHtml += this.attacks[a].html
    }

    return `
    <div class="card">
      <img src="https://thiscatdoesnotexist.com" alt="" class="card-img">
      <div class="card-body">
        <h2 class="card-title">${this.name}</h2>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" style="width: ${100 * this.health / this.maxHealth}%;" 
          ria-valuenow="${this.health}" aria-valuemin="0" aria-valuemax="${this.maxHealth}" id="boss-hp">${this.health}HP</div>
        </div>
        <div class="row mt-3">
          ${attackHtml}
        </div>
      </div>
    </div>
    `
  }
}

class Enemy {
  constructor(id, name, image, health, attacks) {
    this.id = id
    this.name = name
    this.image = image
    this.maxHealth = health
    this.level = 1
    this.health = health
    this.attacks = attacks
  }
  
  attack() {
    console.log(this.attacks)
    console.log(this.attacks.length)
    debugger
    let attack = Math.floor(Math.random() * this.attacks.length)
    console.log(attack)
    console.log(this.attacks[attack])
    let damage = Math.floor(this.attacks[attack].damage * this.level)
    hero.takeDamage(damage)
  }

  takeDamage(damage) {
    if (damage >= this.health) {
      this.level *= 1.2
      this.health = Math.floor(this.maxHealth * this.level)
    } else {
      this.health -= damage
    }
    draw.boss()
  }

  get html() {
    return `
      <div class="card">
        <img src="${this.image}" alt="" class="card-img">
        <div class="card-body">
          <h2 class="card-title">Monster</h2>
          <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: ${100 * this.health / (this.maxHealth * this.level)}%;"
            aria-valuenow="${this.health}" aria-valuemin="0" aria-valuemax="${Math.floor(this.maxHealth * this.level)}" id="boss-hp">${this.health}HP</div>
          </div>
        </div>
      </div>
    `
  }
}

class Draw {
  death(id) {
    console.log(id + ' dead...')
  }

  hero() {
    document.getElementById('hero-card').innerHTML = hero.html
  }

  boss() {
    document.getElementById('boss-card').innerHTML = boss.html
  }
}

class Control {
  heroAttack(id) {
    hero.attack(id)
    console.log('hero hp: ' + hero.health)
    console.log('boss hp: ' + boss.health)
  }
}

let draw = new Draw
let control = new Control

let scratch = new Attack('scratch', 'Scratch', 10, 90, 10)
let bite = new Attack('bite', 'Bite', 20, 80, 20)
let bark = new Attack('bark', 'Bark', 8, 80, 8)

let hero = new Hero('meow', 'Meowmeow', 'https://thiscatdoesnotexist.com', 120, {scratch: scratch, bite: bite})
let boss = new Enemy('monster', 'Monster', 'https://images.heb.com/is/image/HEBGrocery/001621707-1?id=e7HRf1&amp;fmt=jpg&amp;dpr=off&amp;fit=constrain,1&amp;wid=196&amp;hei=196', 120, [bark, bite])

draw.hero()
draw.boss()

function bossAttacks() {
  boss.attack
}

// setInterval(boss.attack, 1000)

// boss.attack()
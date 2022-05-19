class Attack {
  constructor(id, name, baseDamage, hitRate, critRate) {
    this.id
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
}

class Hero {
  constructor(id, name, health, mana, attacks) {
    this.id = id
    this.name = name
    this.health = health
    this.mana = mana
    this.attacks = attacks
  }
}

class Enemy {
  constructor(id, name, health, attacks) {
    this.id = id
    this.name = name
    this.health = health
    this.attacks = attacks
  }
  
  attack() {
  }
}

let scratch = new Attack('scratch', 'Scratch', 10, 90, 10)
let bite = new Attack('bite', 'Bite', 20, 80, 20)
let bark = new Attack('bark', 'Bark', 8, 80, 8)

let hero =  new Hero('meow', 'Meowmeow', 120, 40, 20, {
    scratch: scratch,
    bite: bite
  })

let boss = new Enemy(
  'doge', 'Doge', 120, [bark, bite])
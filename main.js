import { Pokemon } from './pokemon.js'
import { random } from './tools.js'
import { pokemons } from './pokemons.js'

const buttons = document.querySelectorAll('.button.action-button')
const logsWrapper = document.querySelector('#logs')
const control = document.querySelector('#control')


let isGameFinished = false

const initCounter = () => {
    const LIMIT = 7;
    let counter = 0

    return () => {
        counter = counter + 1 >= LIMIT ? LIMIT : counter + 1    

        if (counter != LIMIT) {
            console.log(`[${counter}/${LIMIT-1}]`);
        }
        else {
            console.log(`Ходы закончились`)
        }

        return counter + 1 <= LIMIT
    }
}


const pokemon1 = pokemons[random(0, pokemons.length - 1)]
const pokemon2 = pokemons[random(0, pokemons.length - 1)]

let Player1 = new Pokemon({
    ...pokemon1,
    selector: 'character',
})

let Player2 = new Pokemon({
    ...pokemon2,
    selector: 'enemy',
})

const listenerHandler = (limits) => {
    if (!isGameFinished) {
        const Player1Log = Player1.changeHP(random(...limits), Player2);

        if (Player1.isDead) {
            finishGame()
        } else {
            const charmLog = Player2.changeHP(random(...limits), Player1);
            logsWrapper.innerHTML = logsWrapper.innerHTML.concat(`<p>${Player1Log}</p>`, `<p>${charmLog}</p>`)
        }

        if (Player2.isDead) {
            finishGame()
        }
    }
}

const initPlayer1 = () => {
    control.innerHTML = ''

    Player1.attacks.forEach((item) => {
        const btn = document.createElement('button')
        btn.classList.add('button', 'action-button')
        btn.innerText = item.name

        const inc = initCounter(item.maxCount)

        btn.addEventListener('click', () => {
            if (inc()) {
                listenerHandler([item.minDamage, item.maxDamage])
            }
        })

        control.appendChild(btn)
    })
}

const finishGame = () => {

    const pokemon1 = pokemons[random(0, pokemons.length - 1)]
    const pokemon2 = pokemons[random(0, pokemons.length - 1)]

    Player1 = new Pokemon({
        ...pokemon1,
        selector: 'character',
    })

    Player2 = new Pokemon({
        ...pokemon2,
        selector: 'enemy',
    })

    initPlayer1()
}

initPlayer1()

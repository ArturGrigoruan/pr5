import { random } from './tools.js'

export class Pokemon {
    namePL
    name
    isDead
    elHP
    elProgressbar
    elImg
    defaultHP
    damageHP

    constructor({ name, selector, hp, attacks = [], img}) {
        this.namePL = document.querySelector(`#name-${selector}`)
        this.name = name;
        this.elHP = document.querySelector(`#health-${selector}`),
        this.elProgressbar = document.querySelector(`#progressbar-${selector}`)
        this.defaultHP = hp
        this.damageHP = hp
        this.isDead = false
        this.attacks = attacks

        this.elProgressbar.classList.remove('critical', 'low')
        const elImg = document.querySelector(`#img-${selector}`)
        elImg.src = img        
        this.renderHP()
    }

    
    renderHP() {
        this.renderName();
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderName(){
        this.namePL.innerText = this.name;
    }

    renderHPLife() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP + ' HP';
    }

    renderProgressbarHP() {
        this.elProgressbar.style.width = this.damageHP + '%';

        const width = parseFloat(this.elProgressbar.style.width)

        if (width < 20) {
            this.elProgressbar.classList.add('critical')
        } else if (width < 60) {
            this.elProgressbar.classList.add('low')
        }
    }

    generateLog({ name }, damaged) {
        const logs = [
            `${this.name} вспомнил что-то важное, но неожиданно ${name}, не помня себя от испуга, ударил в предплечье врага. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} поперхнулся, и за это ${name} с испугу приложил прямой удар коленом в лоб врага. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} забылся, но в это время наглый ${name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} пришел в себя, но неожиданно ${name} случайно нанес мощнейший удар. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} поперхнулся, но в это время ${name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} удивился, а ${name} пошатнувшись влепил подлый удар. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} высморкался, но неожиданно ${name} провел дробящий удар. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} пошатнулся, и внезапно наглый ${name} беспричинно ударил в ногу противника -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} расстроился, как вдруг, неожиданно ${name} случайно влепил стопой в живот соперника. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
            `${this.name} пытался что-то сказать, но вдруг, неожиданно ${name} со скуки, разбил бровь сопернику. -${damaged}, [${this.damageHP}/${this.defaultHP}]`,
        ];

        return logs[random(logs.length) - 1]
    }

    changeHP(count, enemy) {
        if (!this.isDead) {
            if (this.damageHP < count) {
                this.damageHP = 0;
                alert(`${this.name} dead`);
                this.isDead = true;
            } else {
                this.damageHP -= count;
            }

            this.renderHP();

            return this.generateLog(enemy, count)
        }
    }
}
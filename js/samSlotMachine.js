const btn = document.querySelector('#randomizeButton');
const btn2 = document.querySelector('#getLatestValue');

const results = {
machine1Top: document.querySelector('#machine1ResultTop'),
machine2Top: document.querySelector('#machine2ResultTop'),
machine3Top: document.querySelector('#machine3ResultTop'),

machine1Center: document.querySelector('#machine1ResultCenter'),
machine2Center: document.querySelector('#machine2ResultCenter'),
machine3Center: document.querySelector('#machine3ResultCenter'),

machine1Bottom: document.querySelector('#machine1ResultBottom'),
machine2Bottom: document.querySelector('#machine2ResultBottom'),
machine3Bottom: document.querySelector('#machine3ResultBottom')
};

const el1T = document.querySelector('#machine1Top');
const el2T = document.querySelector('#machine2Top');
const el3T = document.querySelector('#machine3Top');

const el1 = document.querySelector('#machine1Center');
const el2 = document.querySelector('#machine2Center');
const el3 = document.querySelector('#machine3Center');

const el1B = document.querySelector('#machine1Bottom');
const el2B = document.querySelector('#machine2Bottom');
const el3B = document.querySelector('#machine3Bottom');

const machine1Top = new SlotMachine(el1T, { active: 4, direction: 'down' });
const machine2Top = new SlotMachine(el2T, { active: 4, direction: 'down' });
const machine3Top = new SlotMachine(el3T, { active: 4, direction: 'down' });

const machine1Center = new SlotMachine(el1, { active: 4, direction: 'down' });
const machine2Center = new SlotMachine(el2, { active: 4, direction: 'down' });
const machine3Center = new SlotMachine(el3, { active: 4, direction: 'down' });

const machine1Bottom = new SlotMachine(el1B, { active: 4, direction: 'down' });
const machine2Bottom = new SlotMachine(el2B, { active: 4, direction: 'down' });
const machine3Bottom = new SlotMachine(el3B, { active: 4, direction: 'down' });

function onComplete(active) {
    results[this.element.id].innerText = `${this.active}`; //Index
}

btn.addEventListener('click', () => {
    machine1Top.shuffle(2, onComplete);
    setTimeout(() => machine2Top.shuffle(2, onComplete), 500);
    setTimeout(() => machine3Top.shuffle(2, onComplete), 1000);

    machine1Center.shuffle(2, onComplete);
    setTimeout(() => machine2Center.shuffle(2, onComplete), 500);
    setTimeout(() => machine3Center.shuffle(2, onComplete), 1000);

    machine1Bottom.shuffle(2, onComplete);
    setTimeout(() => machine2Bottom.shuffle(2, onComplete), 500);
    setTimeout(() => machine3Bottom.shuffle(2, onComplete), 1000);


    setTimeout(() => {
    console.log(
    document.getElementById("machine1ResultTop").textContent+" "
    +document.getElementById("machine2ResultTop").textContent+" "
    +document.getElementById("machine3ResultTop").textContent+"\n"

    +document.getElementById("machine1ResultCenter").textContent+" "
    +document.getElementById("machine2ResultCenter").textContent+" "
    +document.getElementById("machine3ResultCenter").textContent+"\n"

    +document.getElementById("machine1ResultBottom").textContent+" "
    +document.getElementById("machine2ResultBottom").textContent+" "
    +document.getElementById("machine3ResultBottom").textContent)

    compareValues();
    }, 2000);
});

function compareValues() { 
    // 3xBar  = 0 
    // bar    = 1
    // 2xBar  = 2
    // 7      = 3
    // cherry = 4 

    //paytable 
    let cherryTopPayout = 2000;
    let cherryCenterPayout = 1000;
    let cherryBottomPayout = 4000;
    let symbols3xBarPayout = 50;
    let symbols7Payout = 150;
    let symbols2xBarPayout = 20;
    let symbolsBarPayout = 10;
    let oneSymbolBarPayout = 5;
    let cherryAnd7Payout = 75;

    const itemArrResults = [];
    currentValue = parseInt($('#current_balance').val());
    console.log(currentValue);
    

    const resultMachine1Top = parseInt(results.machine1Top.textContent);
    const resultMachine2Top = parseInt(results.machine2Top.textContent);
    const resultMachine3Top = parseInt(results.machine3Top.textContent);

    const resultMachine1Center = parseInt(results.machine1Center.textContent);
    const resultMachine2Center = parseInt(results.machine2Center.textContent);
    const resultMachine3Center = parseInt(results.machine3Center.textContent);

    const resultMachine1Bottom = parseInt(results.machine1Bottom.textContent);
    const resultMachine2Bottom = parseInt(results.machine2Bottom.textContent);
    const resultMachine3Bottom = parseInt(results.machine3Bottom.textContent);


    itemArrResults.push(
        resultMachine1Top, resultMachine2Top, resultMachine3Top, 
        resultMachine1Center, resultMachine2Center, resultMachine3Center,
        resultMachine1Bottom, resultMachine2Bottom, resultMachine3Bottom
        );

    console.log('Array itemResults', itemArrResults);

    //Cherry Top Line
    if (resultMachine1Top === 4 && resultMachine2Top === 4 && resultMachine3Top === 4) {
        $('#current_balance').val(currentValue += cherryTopPayout);
        console.log('Top Line Cherry payout 2000')
    }

    //Cherry Center Line
    if (resultMachine1Center === 4 && resultMachine2Center === 4 && resultMachine3Center === 4) {
        $('#current_balance').val(currentValue += cherryCenterPayout);
        console.log('Center Line Cherry payout 1000')
    }

    //Cherry Bottom Line
    if (resultMachine1Bottom === 4 && resultMachine2Bottom === 4 && resultMachine3Bottom === 4) {
        $('#current_balance').val(currentValue += cherryBottomPayout);
        console.log('Center Line Cherry payout 4000')
    }

    //3 7symbols on any line
    if (itemArrResults.includes(3)) {
        let count = itemArrResults.filter(value => value === 3).length ;
        if (count >= 3) {     
            $('#current_balance').val(currentValue += symbols7Payout);
            console.log ('yes this spin has 7 symbols', count);
        }
    }

    //3 3xbar symbols on any line 
    if (itemArrResults.includes(0)) {
        let count = itemArrResults.filter(value => value === 0).length ;
        if (count >= 3) {     
            $('#current_balance').val(currentValue += symbols3xBarPayout);
            console.log ('yes this spin has 3 3xbar symbols', count);
        }
    }

    //3 2xbar symbols on any line 
    if (itemArrResults.includes(2)) {
        let count = itemArrResults.filter(value => value === 2).length ;
        if (count >= 3) {     
            $('#current_balance').val(currentValue += symbols2xBarPayout);
            console.log ('yes this spin has 3 2xbar symbols', count);
        }
    }

    //3 Bar symbols on any line && 1 bar symbol on any line
    if (itemArrResults.includes(1)) {
        let count = itemArrResults.filter(value => value === 1).length ;
        if (count >= 3) {     
            $('#current_balance').val(currentValue += symbolsBarPayout);
            console.log ('yes this spin has 3 bar symbols', count);
        } else { 
            $('#current_balance').val(currentValue += oneSymbolBarPayout);
            console.log ('yes this spin has 1 bar symbol', count);
        }
    }

    //Any combination of Cherry and 7 symbols on any line 
    if (itemArrResults.includes(3) && itemArrResults.includes(4)) {
        $('#current_balance').val(currentValue += cherryAnd7Payout);
    }


}


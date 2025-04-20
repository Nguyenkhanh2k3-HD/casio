let screen = '0';
let history = [];

function updateScreen() {
    document.getElementById('screen').value = screen;
}

function pressButton(button) {
    if (button === 'CE') {
        screen = '0';
    } else if (button === '←') {
        screen = screen.length > 1 ? screen.slice(0, -1) : '0';
    } else if (button === '%') {
        screen = (parseFloat(screen) / 100).toString();
    } else if (button === '+/-') {
        screen = screen[0] === '-' ? screen.slice(1) : '-' + screen;
    } else if (button === '=') {
        try {
            const expression = screen.replace('X', '*');
            const result = eval(expression);
            screen = result.toString();
            history.push({ calculation: expression + ' = ' + screen, result: screen });
            updateHistory();
        } catch (e) {
            screen = 'Error';
        }
    } else {
        if (screen === '0' || screen === 'Error') {
            screen = button;
        } else {
            screen += button;
        }
    }
    updateScreen();
}

function updateHistory() {
    const historyTable = document.getElementById('historyTable').getElementsByTagName('tbody')[0];
    historyTable.innerHTML = '';
    history.forEach(entry => {
        const row = historyTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = entry.calculation;
        cell2.textContent = entry.result;
    });
}

// Initialize screen
updateScreen();
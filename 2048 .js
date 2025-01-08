document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('td');
    const size = 4;

    // Récupère la valeur d'une cellule donnée
    function getValue(i, j) {
        return cells[i * size + j].textContent === '' ? 0 : parseInt(cells[i * size + j].textContent);
    }

    // Définit la valeur d'une cellule donnée
    function setValue(i, j, value) {
        cells[i * size + j].textContent = value === 0 ? '' : value;
    }

    // Vérifie si une cellule est vide
    function isEmpty(i, j) {
        return cells[i * size + j].textContent === '';
    }

    // Démarre une nouvelle partie
    function newGame() {
        Array.from(cells).forEach(cell => cell.textContent = ''); // Réinitialise les cellules
        generateNewNumber();
        generateNewNumber();
    }

    // Génère un nouveau numéro dans une cellule vide
    function generateNewNumber() {
        const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
        if (emptyCells.length > 0) {
            const newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            newCell.textContent = Math.random() < 0.85 ? 2 : 4;
        }
    }

    // Déplacement à droite
    function moveRight() {
        let moved = false;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(getValue(i, j));
            }
            const newRow = shiftRight(row);
            for (let j = 0; j < size; j++) {
                if (row[j] !== newRow[j]) {
                    moved = true;
                }
                setValue(i, j, newRow[j]);
            }
        }
        if (moved) generateNewNumber();
    }

    // Déplacement à gauche
    function moveLeft() {
        let moved = false;
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(getValue(i, j));
            }
            const newRow = shiftLeft(row);
            for (let j = 0; j < size; j++) {
                if (row[j] !== newRow[j]) {
                    moved = true;
                }
                setValue(i, j, newRow[j]);
            }
        }
        if (moved) generateNewNumber();
    }

    // Déplacement vers le haut
    function moveUp() {
        let moved = false;
        for (let j = 0; j < size; j++) {
            let column = [];
            for (let i = 0; i < size; i++) {
                column.push(getValue(i, j));
            }
            const newColumn = shiftLeft(column);
            for (let i = 0; i < size; i++) {
                if (column[i] !== newColumn[i]) {
                    moved = true;
                }
                setValue(i, j, newColumn[i]);
            }
        }
        if (moved) generateNewNumber();
    }

    // Déplacement vers le bas
    function moveDown() {
        let moved = false;
        for (let j = 0; j < size; j++) {
            let column = [];
            for (let i = 0; i < size; i++) {
                column.push(getValue(i, j));
            }
            const newColumn = shiftRight(column);
            for (let i = 0; i < size; i++) {
                if (column[i] !== newColumn[i]) {
                    moved = true;
                }
                setValue(i, j, newColumn[i]);
            }
        }
        if (moved) generateNewNumber();
    }

    // Décale les éléments d'une ligne vers la droite
    function shiftRight(row) {
        row = row.filter(val => val !== 0);
        for (let i = row.length; i < size; i++) {
            row.unshift(0);
        }
        for (let i = size - 1; i > 0; i--) {
            if (row[i] === row[i - 1]) {
                row[i] *= 2;
                row[i - 1] = 0;
            }
        }
        return row.filter(val => val !== 0).concat(Array(size - row.length).fill(0));
    }

    // Décale les éléments d'une ligne vers la gauche
    function shiftLeft(row) {
        row = row.filter(val => val !== 0);
        for (let i = row.length; i < size; i++) {
            row.push(0);
        }
        for (let i = 0; i < size - 1; i++) {
            if (row[i] === row[i + 1]) {
                row[i] *= 2;
                row[i + 1] = 0;
            }
        }
        return row.filter(val => val !== 0).concat(Array(size - row.length).fill(0));
    }

    // Écoute les touches pour les mouvements
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowRight':
                moveRight();
                break;
        }
    });

    newGame(); // Lance une nouvelle partie au chargement
});
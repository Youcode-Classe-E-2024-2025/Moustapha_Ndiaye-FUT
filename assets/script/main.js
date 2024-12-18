// Charger les données des joueurs
function loadPlayersData() {
    return fetch('assets/data/DB/players.json') 
        .then(response => response.json())
        .catch(error => {
            console.error('Erreur de chargement des données', error);
        });
}

// Créer la carte d'un joueur
function createPlayersCard(player, positionName) {
    const isGoalkeeper = player.position.toUpperCase() === 'GK';
    // Équivalences des labels de statistiques
    const statsLabels = isGoalkeeper 
        ? ['RA', 'DI', 'HN', 'KI', 'RE', 'SP', 'PO']
        : ['RA', 'PA', 'SH', 'PAS', 'DR', 'DE', 'PH'];

    // Équivalences des valeurs de statistiques
    const statsValues = isGoalkeeper 
        ? [player.rating, player.diving, player.handling, player.kicking, player.reflexes, player.speed, player.positioning]
        : [player.rating, player.pace, player.shooting, player.passing, player.dribbling, player.defending, player.physical];

    // Créer un élément HTML pour la carte
    const playerCard = document.createElement('div');
    playerCard.innerHTML = `
        <div class="relative" style="width: 150px; height: 260px; background-image: url('/assets/data/images/icon-25.png'); background-size: cover; background-position: center;">
            <div class="flex justify-around">
                <div class="mt-[25%] ml-1">
                    <p class="font-semibold text-xs">${player.position}</p>
                    <img src="${player.flag}" alt="${player.name}">
                </div>
                <div class="mt-[20%] ml-1">
                    <img src="${player.photo}" alt="${player.name}" class="object-cover transition-transform duration-300 group-hover:scale-110">
                </div>
            </div>
            <div>
                <p class="font-bold text-xs mt-2 ml-1">${player.name}</p>
            </div>
            <div class="flex-col">
                <div class="flex space-x-1 tex-sm">
                    ${statsLabels.map(label => `<p class="font-bold text-xs mt-2 ml-1">${label}</p>`).join('')}
                </div>
                <div class="flex space-x-2 tex-sm">
                    ${statsValues.map(value => `<p class="text-xs   mt-2 ml-1">${value}</p>`).join('')}
                </div>
            </div>
        </div>
    `;

    playerCard.addEventListener('click', () => {
        updatePositionPlayers(player, positionName);
        playerCard.classList.add('hidden');
        document.querySelector('.newPlayers').classList.add('hidden');
    });

    return playerCard;
}

// Mettre à jour les positions des joueurs
function updatePositionPlayers(player, positionName) {
    const positionPlayers = document.querySelectorAll(`[id="${positionName.toUpperCase()}"], [id="${positionName.toLowerCase()}"]`);
    const isGoalkeeper = player.position.toUpperCase() === 'GK';
    const statsLabels = isGoalkeeper
        ? ['RA', 'DI', 'HN', 'KI', 'RE', 'SP', 'PO']
        : ['RA', 'PA', 'SH', 'PAS', 'DR', 'DE', 'PH'];

    const statsValues = isGoalkeeper
        ? [player.rating, player.diving, player.handling, player.kicking, player.reflexes, player.speed, player.positioning]
        : [player.rating, player.pace, player.shooting, player.passing, player.dribbling, player.defending, player.physical];

    positionPlayers.forEach(positionPlayer => {
        //apporter la modification
        positionPlayer.innerHTML = `
            <div class="relative lg:w-24 lg:h-48 w-24 h-26">
                <div class="flex justify-around">
                    <div class="mt-[20%]">
                        <img src="${player.photo}" alt="${player.name}" class="object-cover transition-transform duration-300 group-hover:scale-110">
                    </div>
                </div>
            </div>
        `;
    });
}

// Gérer le clic sur une position
function handlePositionClick(positionName) {
    const newPlayersContainer = document.querySelector('.newPlayers');
    const playersContainer = document.querySelector('.newPlayers .players-container');

    newPlayersContainer.classList.remove('hidden');

    loadPlayersData().then(data => {
        const players = data.players.filter(player => player.position === positionName.toUpperCase());
        playersContainer.innerHTML = ''; // Vider les anciennes cartes

        if (players.length === 0) {
            playersContainer.innerHTML = `<p>${positionName} non trouvé</p>`;
            return;
        }

        players.forEach(player => {
            const playerCard = createPlayersCard(player, positionName);
            playersContainer.appendChild(playerCard);
        });
    });
}

// Attacher les écouteurs d'événements pour les positions
function positionEventListener() {
    const positionsToListen = [
        'LW', 'RW', 'CM', 'CB', 'LB', 'RB', 'GK', 'CDM', 'LWB', 'RWB', 'LM', 'RM',
    ];

    positionsToListen.forEach(position => {
        const elements = document.querySelectorAll(`[id="${position.toLowerCase()}"], [id="${position.toUpperCase()}"]`);
        elements.forEach(element => {
            element.addEventListener('click', () => {
                handlePositionClick(position);
            });
        });
    });
}


// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
    // Récupérer les éléments HTML
    const input = document.getElementById('teamNameInput');
    const validateButton = document.getElementById('validateTeamName');
    const teamNameDiv = document.querySelector('.teamName');

    // Ajouter un écouteur d'événement sur le bouton
    validateButton.addEventListener('click', () => {
        // Récupérer la valeur de l'input
        const teamName = input.value.trim();

        // Vérifier si l'input n'est pas vide
        if (teamName !== '') {
            // Mettre à jour le contenu du div avec la valeur de l'input
            teamNameDiv.textContent = `name of your team : ${teamName}`;

            // Afficher le div
            teamNameDiv.classList.remove('hidden');
        } else {
            // Cacher le div si l'input est vide
            teamNameDiv.textContent = '';
            teamNameDiv.classList.add('hidden');
            alert('Veuillez entrer un nom d\'équipe.');
        }
    });
});


// Attacher les écouteurs d'événements une fois le DOM chargé
document.addEventListener('DOMContentLoaded', positionEventListener);


// --------------------------------------------------------------------------

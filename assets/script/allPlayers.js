// Fonction pour gérer les opérations CRUD sur les cartes de joueurs
function setupPlayerCardCRUD(playerCard, player) {
  // Créer un menu dropdown pour les options
  const optionsDropdown = document.createElement('div');
  optionsDropdown.classList.add('absolute', 'top-0', 'right-0', 'm-2', 'bg-white', 'border', 'rounded', 'shadow-lg', 'hidden', 'z-10');
  optionsDropdown.innerHTML = `
    <ul>
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer view-player">View</li>
      <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer edit-player">edit</li>
      <li class="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer delete-player">delete</li>
    </ul>
  `;

  // Ajouter un bouton pour option
  const optionsButton = document.createElement('button');
  optionsButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="7" r="1"/>
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="17" r="1"/>
    </svg>
  `;
  optionsButton.classList.add('absolute', 'top-2', 'right-2', 'z-10');

  // Ajouter le bouton et le dropdown à la carte
  playerCard.style.position = 'relative';
  playerCard.appendChild(optionsButton);
  playerCard.appendChild(optionsDropdown);

  // Toggler le dropdown
  optionsButton.addEventListener('click', (e) => {
    e.stopPropagation();
    optionsDropdown.classList.toggle('hidden');
  });

  // Fermer le dropdown si on clique ailleurs
  document.addEventListener('click', (e) => {
    if (!playerCard.contains(e.target)) {
      optionsDropdown.classList.add('hidden');
    }
  });

  // Opération Lecture (View)
  optionsDropdown.querySelector('.view-player').addEventListener('click', () => {
    openPlayerDetailsModal(player);
  });

  // Opération Modification (Edit)
  optionsDropdown.querySelector('.edit-player').addEventListener('click', () => {
    openEditPlayerModal(player);
  });

  // Opération Suppression (Delete)
  optionsDropdown.querySelector('.delete-player').addEventListener('click', () => {
    deletePlayer(player);
  });
}

// Modal pour voir les détails du joueur
function openPlayerDetailsModal(player) {
  const isGoalkeeper = player.position.toUpperCase() === 'GK';
    // Équivalences des labels de statistiques
    const statsLabels = isGoalkeeper
    ? ['Reflexes', 'Clearances', 'Height', 'Saves', 'Reactions', 'Speed', 'Positioning']
    : ['Reaction', 'Passing', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical'];

    // Équivalences des valeurs de statistiques
    const statsValues = isGoalkeeper 
        ? [player.rating, player.diving, player.handling, player.kicking, player.reflexes, player.speed, player.positioning]
        : [player.rating, player.pace, player.shooting, player.passing, player.dribbling, player.defending, player.physical];

  const modal = document.createElement('div');
  modal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50');
  modal.innerHTML = `
  <div class="bg-white p-6 rounded-lg max-w-md w-full">
    <!-- Header with Player Position and Flag -->
    <div class="flex justify-around items-center">
      <div class="mt-[25%] ml-3">
        <p class="font-semibold text-lg">${player.position}</p>
        <img src="${player.flag}" alt="${player.name}" class="w-10 h-6 mt-2">
      </div>
      <!-- Player Image -->
      <div class="mt-[20%]">
        <img src="${player.photo}" alt="${player.name}" class="object-cover w-24 h-24 rounded-full border-4 border-gray-200 shadow-lg transition-transform duration-300 group-hover:scale-110">
      </div>
    </div>

    <!-- Player Name -->
    <div class="mt-4 text-center">
      <p class="font-bold text-xl">${player.name}</p>
    </div>

    <!-- Player Stats -->
    <div class="mt-6">
      <div class="grid grid-cols-2 gap-4">
        <!-- Labels for Stats -->
        <div class="space-y-2">
          ${statsLabels.map(label => `<p class="font-semibold text-sm">${label}</p>`).join('')}
        </div>

        <!-- Values for Stats -->
        <div class="space-y-2">
          ${statsValues.map(value => `<p class="text-sm">${value}</p>`).join('')}
        </div>
      </div>
    </div>

    <!-- Close Button -->
    <div class="mt-4 text-center">
      <button class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg close-modal">Close</button>
    </div>
  </div>
`;


  document.body.appendChild(modal);

  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

// Modal pour modifier un joueur
function openEditPlayerModal(player) {
  const isGoalkeeper = player.position.toUpperCase() === 'GK';
  // Stat labels based on the player's position
  const statsLabels = isGoalkeeper
    ? ['Reflexes', 'Clearances', 'Height', 'Saves', 'Reactions', 'Speed', 'Positioning']
    : ['Reaction', 'Passing', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical'];

  // Stat values based on the player's position
  const statsValues = isGoalkeeper 
    ? [player.rating, player.diving, player.handling, player.kicking, player.reflexes, player.speed, player.positioning]
    : [player.rating, player.pace, player.shooting, player.passing, player.dribbling, player.defending, player.physical];

  // Create the modal structure
  const modal = document.createElement('div');
  modal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50');
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 class="text-xl font-bold mb-4">Modifier le Joueur</h2>
      <form id="editPlayerForm">
        <!-- Basic Player Info -->
        <input type="text" name="name" value="${player.name}" placeholder="Nom" class="w-full mb-2 p-2 border rounded">
        <input type="text" name="position" value="${player.position}" placeholder="Position" class="w-full mb-2 p-2 border rounded">
        <input type="text" name="nationality" value="${player.nationality}" placeholder="Nationalité" class="w-full mb-2 p-2 border rounded">
        <input type="number" name="rating" value="${player.rating}" placeholder="Évaluation" class="w-full mb-2 p-2 border rounded">

        <!-- Player Stats -->
        ${statsLabels.map((label, index) => `
          <input type="number" name="${label.toLowerCase()}" value="${statsValues[index]}" placeholder="${label}" class="w-full mb-2 p-2 border rounded">
        `).join('')}

        <div class="flex justify-between mt-4">
          <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Enregistrer</button>
          <button type="button" class="bg-red-500 text-white px-4 py-2 rounded close-modal">Annuler</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const form = modal.querySelector('#editPlayerForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const updatedPlayer = {
      ...player,
      name: formData.get('name'),
      position: formData.get('position'),
      nationality: formData.get('nationality'),
      rating: formData.get('rating'),
    };

    // Add stats values to updatedPlayer
    statsLabels.forEach((label) => {
      updatedPlayer[label.toLowerCase()] = formData.get(label.toLowerCase());
    });

    // Call the updatePlayer function to handle the updated player data
    updatePlayer(updatedPlayer);

    // Close the modal
    document.body.removeChild(modal);
  });

  // Close the modal when clicking "Annuler"
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

// Fonction de suppression de joueur
function deletePlayer(player) {
  const confirmDelete = confirm(`Do you delete ${player.name} ?`);
  if (confirmDelete) {
    // Logique de suppression (à adapter selon votre backend)
    console.log('Player deleted:', player);
    
    // Supprimer visuellement la carte du joueur
    const playerCard = document.querySelector(`[data-player-id="${player.id}"]`);
    if (playerCard) {
      playerCard.remove();
    }
  }
}

// Fonction de mise à jour de joueur
function updatePlayer(updatedPlayer) {
  console.log('Joueur mis à jour:', updatedPlayer);
  
  // Mettre à jour la carte du joueur
  const playerCard = document.querySelector(`[data-player-id="${updatedPlayer.id}"]`);
  if (playerCard) {
    // Mettre à jour les éléments textuels si nécessaire
    const nameElement = playerCard.querySelector('.player-name');
    const positionElement = playerCard.querySelector('.player-position');
    
    if (nameElement) nameElement.textContent = updatedPlayer.name;
    if (positionElement) positionElement.textContent = updatedPlayer.position;
  }
}


function createPlayerCard(player) {
  const isGoalkeeper = player.position.toUpperCase() === 'GK';
    // Équivalences des labels de statistiques
    const statsLabels = isGoalkeeper 
        ? ['RA', 'DI', 'HN', 'KI', 'RE', 'SP', 'PO']
        : ['RA', 'PA', 'SH', 'PAS', 'DR', 'DE', 'PH'];

    // Équivalences des valeurs de statistiques
    const statsValues = isGoalkeeper 
        ? [player.rating, player.diving, player.handling, player.kicking, player.reflexes, player.speed, player.positioning]
        : [player.rating, player.pace, player.shooting, player.passing, player.dribbling, player.defending, player.physical];

  // Créer un conteneur pour la carte du joueur
  const playerCard = document.createElement('div');
  playerCard.classList.add(
    'relative', 
    'bg-white', 
    'border', 
    'rounded-lg', 
    'p-4', 
    'shadow-md', 
    'hover:shadow-lg', 
    'transition-shadow'
  );

  // Contenu de la carte
  playerCard.innerHTML = `
        <div class="relative" style="width: 200px; height: 300px; background-image: url('/assets/data/images/icon-25.png'); background-size: cover; background-position: center;">
            <div class="flex justify-around">
                <div class="mt-[25%] ml-3">
                    <p class="font-semibold">${player.position}</p>
                    <img src="${player.flag}" alt="${player.name}">
                </div>
                <div class="mt-[20%]">
                    <img src="${player.photo}" alt="${player.name}" class="object-cover transition-transform duration-300 group-hover:scale-110">
                </div>
            </div>
            <div>
                <p class="font-bold text-sm ml-5 mt-2">${player.name}</p>
            </div>
            <div class="flex-col">
                <div class="flex space-x-1 tex-sm">
                    ${statsLabels.map(label => `<p class="font-bold text-sm ml-5 mt-2">${label}</p>`).join('')}
                </div>
                <div class="flex space-x-2 tex-sm">
                    ${statsValues.map(value => `<p class="text-sm ml-5 mt-2">${value}</p>`).join('')}
                </div>
            </div>
        </div>
    `;

  return playerCard;
}

// Fonction modifiée de chargement des joueurs
function loadPlayers() {
  fetch('../data/DB/players.json')
    .then(response => response.json())
    .then(data => {
      const playersContainer = document.getElementById('playersContainer');
      playersContainer.innerHTML = ''; // Vider le conteneur avant de charger

      data.players.forEach(player => {
        const playerCard = createPlayerCard(player);
        
        // Ajouter un attribut data pour identifier le joueur
        playerCard.setAttribute('data-player-id', player.id);
        
        // Ajouter le support CRUD
        setupPlayerCardCRUD(playerCard, player);
        
        playersContainer.appendChild(playerCard);
      });
    })
    .catch(error => {
      console.error('Erreur de chargement du fichier JSON:', error);
    });
}

// Appel initial
loadPlayers();
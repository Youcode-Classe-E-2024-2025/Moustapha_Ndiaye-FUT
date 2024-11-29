fetch('../data/DB/players.json')
  .then(response => response.json())
  .then(data => {
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'p-6');

    data.players.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.classList.add(
        'relative',
        'group',
        'bg-white',
        'rounded-2xl',
        'shadow-lg',
        'overflow-hidden',
        'transform',
        'transition-all',
        'duration-300',
        'hover:scale-105',
        'hover:shadow-2xl'
      );

      playerCard.innerHTML = `
        <div class="relative">
          <div class="relative h-48 overflow-hidden">
            <img 
              src="${player.photo}" 
              alt="${player.name}" 
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            >
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
              <h2 class="text-white text-xl font-bold text-center truncate">${player.name}</h2>
            </div>
          </div>
          
          <div class="p-4 space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-gray-100 p-2 rounded-lg text-center">
                <p class="text-xs text-gray-600">Position</p>
                <p class="font-semibold">${player.position}</p>
              </div>
              <div class="bg-gray-100 p-2 rounded-lg text-center">
                <p class="text-xs text-gray-600">Nationality</p>
                <p class="font-semibold">${player.nationality}</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
              <div class="bg-blue-50 p-2 rounded-lg text-center">
                <p class="text-xs text-blue-600">Rating</p>
                <p class="font-bold text-blue-800">${player.rating}</p>
              </div>
              <div class="bg-green-50 p-2 rounded-lg text-center">
                <p class="text-xs text-green-600">Pace</p>
                <p class="font-bold text-green-800">${player.pace}</p>
              </div>
              <div class="bg-red-50 p-2 rounded-lg text-center">
                <p class="text-xs text-red-600">Shooting</p>
                <p class="font-bold text-red-800">${player.shooting}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-around items-center p-4 border-t border-gray-200">
            <button class="edit-btn flex items-center justify-center bg-green-500 text-white p-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors w-24 space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button class="delete-btn flex items-center justify-center bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors w-24 space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            
          </div>
        </div>
      `;

      // Ajout d'événements pour les boutons
      const editBtn = playerCard.querySelector('.edit-btn');
      const deleteBtn = playerCard.querySelector('.delete-btn');

      editBtn.addEventListener('click', () => {
        console.log('Éditer le joueur:', player.name);
        // Logique d'édition à implémenter
      });

      deleteBtn.addEventListener('click', () => {
        console.log('Supprimer le joueur:', player.name);
        // Logique de suppression à implémenter
      });

      playersContainer.appendChild(playerCard);
    });
  })
  .catch(error => {
    console.error('Erreur de chargement du fichier JSON: ', error);
  });

// --------------------------------------------------------------------------------------------------------------------------------
// const params = new URLSearchParams(window.location.search);
// const addPlayerMode = params.get('addPlayer');

// if (addPlayerMode === 'true') {
//     console.log('Mode ajout de joueur activé');
//     // Ajoute une classe ou une indication visuelle, si nécessaire
// }
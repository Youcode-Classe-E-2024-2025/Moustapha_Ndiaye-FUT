function handlePositionClick(positionName) {
    // Sélectionner TOUS les conteneurs avec ce nom de position, insensible à la casse
    const positionElements = document.querySelectorAll(`[id="${positionName.toLowerCase()}"], [id="${positionName.toUpperCase()}"]`);
    const newPlayersContainer = document.querySelector('.newPlayers');
    const playersContainer = document.querySelector('.newPlayers .players-container');

    // Afficher le conteneur si caché
    newPlayersContainer.classList.remove('hidden');

    // Charger les données depuis le fichier JSON
    fetch('assets/data/DB/players.json')
        .then(response => response.json())
        .then(data => {
            // Vider les anciennes cartes
            playersContainer.innerHTML = '';

            // Filtrer les joueurs par position (en utilisant le nom de position standard)
            const players = data.players.filter(player => player.position === positionName.toUpperCase());

            // Si aucun joueur n'est trouvé
            if (players.length === 0) {
                playersContainer.innerHTML = `<p class="text-gray-600">Aucun ${positionName} trouvé.</p>`;
                return;
            }

            // Créer les cartes pour les joueurs trouvés
            players.forEach(player => {
                const playerCard = document.createElement('div');
                playerCard.classList.add(
                    // 'relative',
                    // 'group',
                    // 'rounded-2xl',
                    // 'shadow-lg',
                    // 'overflow-hidden',
                    // 'transform',
                    // 'transition-all',
                    // 'duration-300',
                    // 'hover:scale-105',
                    // 'hover:shadow-2xl',
                );

                if (player.position !== 'GK' && player.position !== 'gk') {
                    playerCard.innerHTML = `
                    <div class="relative" style="width: 200px; height: 300px; 
                        background-image: url('/assets/data/images/icon-25.png'); 
                        background-size: cover; 
                        background-position: center;">
                      
                       <div class="flex justify-around">
                           <div class="mt-[25%] ml-3">
                            <p class="font-semibold">${player.position}</p>
                            <img src="${player.flag}" alt="${player.name}">
                          </div>
                          <div class="mt-[20%]">
                          <img 
                            src="${player.photo}" 
                            alt="${player.name}" 
                            class="object-cover transition-transform duration-300 group-hover:scale-110">
                        </div>
                       </div>
            
                       <div class="">
                          <p class="font-bold text-sm ml-5 mt-2">${player.name}</p>
                       </div>
            
                       <div class="flex-col">
                           <div class="flex space-x-1 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">RA</p>
                                <p class="font-bold text-sm ml-5 mt-2">PA</p>
                                <p class="font-bold text-sm ml-5 mt-2">SH</p>
                                <p class="font-bold text-sm ml-5 mt-2">PAS</p>
                                <p class="font-bold text-sm ml-5 mt-2">DR</p>
                                <p class="font-bold text-sm ml-5 mt-2">DE</p>
                                <p class="font-bold text-sm ml-5 mt-2">PH</p>
                          </div>
                           <div class="flex space-x-2 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">${player.rating}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.pace}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.shooting}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.passing}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.dribbling}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.defending}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.physical}</p>
                          </div>
                       </div> 
                    </div>
                  `;
            
                  }else{
                    playerCard.innerHTML = `
                    <div class="relative" style="width: 200px; height: 300px; 
                        background-image: url('/assets/data/images/icon-25.png'); 
                        background-size: cover; 
                        background-position: center;">
                      
                       <div class="flex justify-around">
                           <div class="mt-[25%] ml-3">
                            <p class="font-semibold">${player.position}</p>
                            <img src="${player.flag}" alt="${player.name}">
                          </div>
                          <div class="mt-[20%]">
                          <img 
                            src="${player.photo}" 
                            alt="${player.name}" 
                            class="object-cover transition-transform duration-300 group-hover:scale-110">
                        </div>
                       </div>
            
                       <div class="">
                          <p class="font-bold text-sm ml-5 mt-2">${player.name}</p>
                       </div>
            
                       <div class="flex-col">
                           <div class="flex space-x-1.5 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">RA</p>
                                <p class="font-bold text-sm ml-5 mt-2">DI</p>
                                <p class="font-bold text-sm ml-5 mt-2">HN</p>
                                <p class="font-bold text-sm ml-5 mt-2">KI</p>
                                <p class="font-bold text-sm ml-5 mt-2">RE</p>
                                <p class="font-bold text-sm ml-5 mt-2">SP</p>
                                <p class="font-bold text-sm ml-5 mt-2">PO</p>
            
                          </div>
                           <div class="flex space-x-2 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">${player.rating}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.diving}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.handling}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.kicking}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.reflexes}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.speed}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.positioning}</p>
                          </div>
                       </div>
                    </div>
                  `;
            
                  }
              
                playerCard.addEventListener('click', () => {
                    // Mettre à jour TOUS les éléments avec cet ID pour afficher le joueur sur le terrain
                    positionElements.forEach(positionElement => {
                       
                if (player.position !== 'GK' && player.position !== 'gk') {
                    positionElement.innerHTML = `
                    <div class="relative" style="width: 200px; height: 300px; 
                        background-image: url('/assets/data/images/icon-25.png'); 
                        background-size: cover; 
                        background-position: center;">
                      
                       <div class="flex justify-around">
                           <div class="mt-[25%] ml-3">
                            <p class="font-semibold">${player.position}</p>
                            <img src="${player.flag}" alt="${player.name}">
                          </div>
                          <div class="mt-[20%]">
                          <img 
                            src="${player.photo}" 
                            alt="${player.name}" 
                            class="object-cover transition-transform duration-300 group-hover:scale-110">
                        </div>
                       </div>
            
                       <div class="">
                          <p class="font-bold text-sm ml-5 mt-2">${player.name}</p>
                       </div>
            
                       <div class="flex-col">
                           <div class="flex space-x-1 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">RA</p>
                                <p class="font-bold text-sm ml-5 mt-2">PA</p>
                                <p class="font-bold text-sm ml-5 mt-2">SH</p>
                                <p class="font-bold text-sm ml-5 mt-2">PAS</p>
                                <p class="font-bold text-sm ml-5 mt-2">DR</p>
                                <p class="font-bold text-sm ml-5 mt-2">DE</p>
                                <p class="font-bold text-sm ml-5 mt-2">PH</p>
                          </div>
                           <div class="flex space-x-2 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">${player.rating}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.pace}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.shooting}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.passing}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.dribbling}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.defending}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.physical}</p>
                          </div>
                       </div> 
                    </div>
                  `;
            
                  }else{
                    positionElement.innerHTML = `
                    <div class="relative" style="width: 200px; height: 300px; 
                        background-image: url('/assets/data/images/icon-25.png'); 
                        background-size: cover; 
                        background-position: center;">
                      
                       <div class="flex justify-around">
                           <div class="mt-[25%] ml-3">
                            <p class="font-semibold">${player.position}</p>
                            <img src="${player.flag}" alt="${player.name}">
                          </div>
                          <div class="mt-[20%]">
                          <img 
                            src="${player.photo}" 
                            alt="${player.name}" 
                            class="object-cover transition-transform duration-300 group-hover:scale-110">
                        </div>
                       </div>
            
                       <div class="">
                          <p class="font-bold text-sm ml-5 mt-2">${player.name}</p>
                       </div>
            
                       <div class="flex-col">
                           <div class="flex space-x-1.5 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">RA</p>
                                <p class="font-bold text-sm ml-5 mt-2">DI</p>
                                <p class="font-bold text-sm ml-5 mt-2">HN</p>
                                <p class="font-bold text-sm ml-5 mt-2">KI</p>
                                <p class="font-bold text-sm ml-5 mt-2">RE</p>
                                <p class="font-bold text-sm ml-5 mt-2">SP</p>
                                <p class="font-bold text-sm ml-5 mt-2">PO</p>
            
                          </div>
                           <div class="flex space-x-2 tex-sm">
                                <p class="font-bold text-sm ml-5 mt-2">${player.rating}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.diving}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.handling}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.kicking}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.reflexes}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.speed}</p>
                                <p class="font-bold text-sm ml-5 mt-2">${player.positioning}</p>
                          </div>
                       </div>
                    </div>
                  `;
            
                  }
                        
                    });

                

                    // Supprimer la carte du joueur sélectionné de la liste des remplaçants
                    playerCard.remove(); // Enlève la carte du joueur de l'affichage des remplaçants

                    // Ajouter le joueur sélectionné dans la liste des remplaçants (optionnel)
                    replacePlayers = replacePlayers.filter(replacePlayer => replacePlayer.id !== player.id);

                    // (Optionnel) Mettre à jour la liste des remplaçants dans l'affichage après la suppression
                    updateSubstitutesList();

                    replacePlayers.push(player); // Ajoute le joueur à la liste
                    updateSubstitutesList(); // Mette à jour la liste pour réafficher le joueur ajouté
                });


                playersContainer.appendChild(playerCard);
            });
        })
        .catch(error => {
            console.error('Erreur de chargement du fichier JSON: ', error);
        });
}

// Fonction pour attacher les écouteurs d'événements
function attachEventListeners() {
    const positionsToListen = [
        'LW', 'RW', 'CM', 'CB', 'LB', 'RB', 'GK', 'CDM', 'LWB', 'RWB', 'LM', 'RM',
    ];

    positionsToListen.forEach(position => {
        // Sélectionner tous les éléments avec cet ID (peu importe la casse)
        const elements = document.querySelectorAll(`[id="${position.toLowerCase()}"], [id="${position.toUpperCase()}"]`);

        // Ajouter l'événement à chaque élément trouvé
        elements.forEach(element => {
            element.addEventListener('click', () => handlePositionClick(position));
        });
    });
}

// Attacher les écouteurs d'événements une fois le DOM chargé
document.addEventListener('DOMContentLoaded', attachEventListeners);
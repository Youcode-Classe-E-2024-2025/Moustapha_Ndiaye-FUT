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
                    'relative',
                    'group',
                    'rounded-2xl',
                    'shadow-lg',
                    'overflow-hidden',
                    'transform',
                    'transition-all',
                    'duration-300',
                    'hover:scale-105',
                    'hover:shadow-2xl',
                );

                playerCard.innerHTML = `
                    <div class="relative">
                        <div class="relative overflow-hidden">
                            <img 
                                src="${player.photo}" 
                                alt="${player.name}" 
                                class="object-cover transition-transform duration-300 group-hover:scale-110"
                            >
                            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 ">
                                <h2 class="text-white text-sm font-bold text-center truncate">${player.name}</h2>
                            </div>
                        </div>
                        <div class="p-1 space-y-2">
                            <div class="grid grid-cols-2 gap-2">
                                <div class="text-white text-center">
                                    <p class="font-semibold">${player.position}</p>
                                </div>
                                <div class="rounded-lg text-center">
                                    <img src="${player.flag}" alt="Drapeau" class="">
                                </div>
                            </div>
                            <hr>
                            <div class="space-y-1">
                                <p class="text-white text-sm"><strong>Rating:</strong> ${player.rating}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Style supplémentaire pour l'arrière-plan
                playerCard.style.backgroundImage = 'url("/assets/data/images/badge_total_rush-removebg-preview.png")';
                playerCard.style.backgroundSize = 'cover';
                playerCard.style.backgroundPosition = 'center';

                // // Ajouter l'événement 'click' pour sélectionner le joueur
                // playerCard.addEventListener('click', () => {
                //     // Mettre à jour TOUS les éléments avec cet ID
                //     positionElements.forEach(positionElement => {
                //         positionElement.innerHTML = `
                //             <div class="relative">
                //                 <div class="relative overflow-hidden">
                //                     <img 
                //                         src="${player.photo}" 
                //                         alt="${player.name}" 
                //                         class="object-cover transition-transform duration-300 group-hover:scale-110"
                //                     >
                //                     <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 ">
                //                         <h2 class="text-white text-sm font-bold text-center truncate">${player.name}</h2>
                //                     </div>
                //                 </div>
                //                 <div class="p-1 space-y-2">
                //                     <div class="grid grid-cols-2 gap-2">
                //                         <div class="text-white text-center">
                //                             <p class="font-semibold">${player.position}</p>
                //                         </div>
                //                         <div class="rounded-lg text-center">
                //                             <img src="${player.flag}" alt="Drapeau" class="">
                //                         </div>
                //                     </div>
                //                     <hr>
                //                     <div class="space-y-1">
                //                         <p class="text-white text-sm"><strong>Rating:</strong> ${player.rating}</p>
                //                     </div>
                //                 </div>
                //             </div>
                //         `;
                //     });
                // });
                // Ajouter l'événement 'click' pour sélectionner le joueur
                //         playerCard.addEventListener('click', () => {
                //             // Mettre à jour TOUS les éléments avec cet ID pour afficher le joueur sur le terrain
                //             positionElements.forEach(positionElement => {
                //                 positionElement.innerHTML = `
                //     <div class="relative">
                //         <div class="relative overflow-hidden">
                //             <img 
                //                 src="${player.photo}" 
                //                 alt="${player.name}" 
                //                 class="object-cover transition-transform duration-300 group-hover:scale-110"
                //             >
                //             <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 ">
                //                 <h2 class="text-white text-sm font-bold text-center truncate">${player.name}</h2>
                //             </div>
                //         </div>
                //         <div class="p-1 space-y-2">
                //             <div class="grid grid-cols-2 gap-2">
                //                 <div class="text-white text-center">
                //                     <p class="font-semibold">${player.position}</p>
                //                 </div>
                //                 <div class="rounded-lg text-center">
                //                     <img src="${player.flag}" alt="Drapeau" class="">
                //                 </div>
                //             </div>
                //             <hr>
                //             <div class="space-y-1">
                //                 <p class="text-white text-sm"><strong>Rating:</strong> ${player.rating}</p>
                //             </div>
                //         </div>
                //     </div>
                // `;
                //             });

                //             // Supprimer la carte du joueur sélectionné de la liste des remplaçants
                //             playerCard.remove(); // Enlève la carte du joueur de l'affichage des remplaçants

                //             // (Optionnel) Vous pouvez aussi mettre à jour la liste des remplaçants dans le code JavaScript
                //             // Par exemple, si vous avez une liste d'objets représentant les joueurs :
                //             replacePlayers = replacePlayers.filter(replacePlayer => replacePlayer.id !== player.id);

                //             // (Optionnel) Vous pouvez mettre à jour l'affichage de la liste des remplaçants ici si nécessaire
                //             updateSubstitutesList();
                //         });
                playerCard.addEventListener('click', () => {
                    // Mettre à jour TOUS les éléments avec cet ID pour afficher le joueur sur le terrain
                    positionElements.forEach(positionElement => {
                        positionElement.innerHTML = `
                <div class="relative">
                    <div class="relative overflow-hidden">
                        <img 
                            src="${player.photo}" 
                            alt="${player.name}" 
                            class="object-cover transition-transform duration-300 group-hover:scale-110"
                        >
                        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 ">
                            <h2 class="text-white text-sm font-bold text-center truncate">${player.name}</h2>
                        </div>
                    </div>
                    <div class="p-1 space-y-2">
                        <div class="grid grid-cols-2 gap-2">
                            <div class="text-white text-center">
                                <p class="font-semibold">${player.position}</p>
                            </div>
                            <div class="rounded-lg text-center">
                                <img src="${player.flag}" alt="Drapeau" class="">
                            </div>
                        </div>
                        <hr>
                        <div class="space-y-1">
                            <p class="text-white text-sm"><strong>Rating:</strong> ${player.rating}</p>
                        </div>
                    </div>
                </div>
                `;
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
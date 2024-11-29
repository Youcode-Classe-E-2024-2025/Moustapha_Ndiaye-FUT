GK.addEventListener('click', () => {
    const newPlayersContainer = document.querySelector('.newPlayers');
    const playersContainer = document.querySelector('.newPlayers .players-container');

    // Afficher le conteneur si caché
    newPlayersContainer.classList.remove('hidden');

    // Charger les données
    fetch('assets/data/DB/players.json')
        .then(response => response.json())
        .then(data => {
            // Vider les anciennes cartes
            playersContainer.innerHTML = '';

            console.log(data); // La base de données est bien chargée  

            // Filtrer les gardiens
            const goalkeepers = data.players.filter(player => player.position === "GK");

            if (goalkeepers.length === 0) {
                playersContainer.innerHTML = '<p class="text-gray-600">Aucun gardien trouvé.</p>';
                return;
            }

            goalkeepers.forEach(player => {
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

                playerCard.style.backgroundImage = 'url("/assets/data/images/badge_total_rush-removebg-preview.png")';
                playerCard.style.backgroundSize = 'cover'; 
                playerCard.style.backgroundPosition = 'center'; 

                // Ajouter l'événement 'click' ici
                playerCard.addEventListener('click', () => {
                    const gkElement = document.querySelector('#gk'); // Sélectionner l'élément #gk
                    if (gkElement) {
                        gkElement.innerHTML = `
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
                    }
                });

                playersContainer.appendChild(playerCard);
            });
        })
        .catch(error => {
            console.error('Erreur de chargement du fichier JSON: ', error);
        });
});


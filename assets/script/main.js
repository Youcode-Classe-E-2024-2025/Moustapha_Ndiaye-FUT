

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

            console.log(data); //la base de donne est bien chargee  

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
                            // 
                        </div>
             </div>
         </div>
       `;
                playerCard.style.backgroundImage = 'url("/assets/data/images/badge_total_rush-removebg-preview.png")';
                playerCard.style.backgroundSize = 'cover';  // Assure que l'image couvre toute la carte
                playerCard.style.backgroundPosition = 'center'; // Centrer l'image


                // Ajout de l'événement de sélection du joueur
                playerCard.addEventListener('click', () => {
                    const gkImage = document.querySelector('#gk');  // Sélectionner l'image du gardien
                    const gkParent = gkImage.parentElement; // Conteneur parent pour les ajustements

                    // Remplacer l'image du gardien par l'image du joueur sélectionné
                    gkImage.style.backgroundImage = 'url("/assets/data/images/badge_total_rush-removebg-preview.png")';
                    gkImage.style.backgroundSize = 'cover';  
                    gkImage.style.backgroundPosition = 'center'; 
                    gkImage.src = player.photo;
                    

                    // Créer un élément pour afficher le nom du joueur
                    const nameElement = document.createElement('div');
                    nameElement.classList.add('absolute', 'bottom-10', 'left-1/2', 'transform', '-translate-x-1/2', 'text-white', 'font-bold', 'text-xl', 'p-1');
                    nameElement.textContent = player.name;

                    // Créer un élément pour afficher le pays du joueur
                    const countryElement = document.createElement('div');
                    countryElement.classList.add('absolute', 'bottom-4', 'left-1/2', 'transform', '-translate-x-1/2', 'text-white', 'text-lg');
                    countryElement.innerHTML = player.nationality
                    // Ajouter les éléments sur l'image du gardien
                    gkParent.appendChild(nameElement);
                    gkParent.appendChild(countryElement);
                });

                playersContainer.appendChild(playerCard);
            });


        })
        .catch(error => {
            console.error('Erreur de chargement du fichier JSON: ', error);
        });
});

// // Constants for selectors and paths
// const SELECTORS = {
//     newPlayersContainer: '.newPlayers',
//     playersContainer: '.newPlayers .players-container',
//     gkImage: '#gk'
// };

// const PATHS = {
//     playersDatabase: 'assets/data/DB/players.json'
// };

// // Utility functions
// const createElementWithClasses = (tag, classes = []) => {
//     const element = document.createElement(tag);
//     element.classList.add(...classes);
//     return element;
// };

// const createPlayerCard = (player) => {
//     // Validate player data
//     if (!player || !player.photo || !player.name) {
//         console.error('Invalid player data', player);
//         return null;
//     }

//     const playerCard = createElementWithClasses('div', [
//         'relative', 'rounded-2xl', 'shadow-lg', 'overflow-hidden'
//     ]);

//     playerCard.style.backgroundImage = 'url("/assets/data/images/badge_total_rush-removebg-preview.png")';
//     playerCard.style.backgroundSize = 'cover';
//     playerCard.style.backgroundPosition = 'center';

//     playerCard.innerHTML = `
//         <div class="relative">
//             <div class="relative overflow-hidden">
//                 <img 
//                     src="${player.photo}" 
//                     alt="${player.name}" 
//                     class="object-cover"
//                 >
//                 <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50">
//                     <h2 class="text-white text-sm font-bold text-center truncate">${player.name}</h2>
//                 </div>
//             </div>
//             <div class="p-1 space-y-2">
//                 <div class="grid grid-cols-2 gap-2">
//                     <div class="text-white text-center">
//                         <p class="font-semibold">${player.position || 'N/A'}</p>
//                     </div>
//                     <div class="rounded-lg text-center">
//                         <img src="${player.flag}" alt="Flag" class="">
//                     </div>
//                 </div>
//                 <hr>
//                 <div class="space-y-1">
//                     <p class="text-white text-sm"><strong>Rating:</strong> ${player.rating || 'N/A'}</p>
//                 </div>
//             </div>
//         </div>
//     `;

//     return playerCard;
// };

// const updateMainGoalkeeperDisplay = (player) => {
//     const gkImage = document.querySelector(SELECTORS.gkImage);
//     const gkParent = gkImage.parentElement;

//     // Clear previous name and country elements
//     gkParent.querySelectorAll('.dynamic-player-info').forEach(el => el.remove());

//     if (!player || !player.photo) {
//         console.error('Invalid player data for display');
//         return;
//     }

//     gkImage.src = player.photo;
//     gkImage.style.backgroundImage = 'url("/assets/data/images/badge_total_rush-removebg-preview.png")';
//     gkImage.style.backgroundSize = 'cover';
//     gkImage.style.backgroundPosition = 'center';

//     const nameElement = createElementWithClasses('div', [
//         'absolute', 'bottom-10', 'left-1/2', 'transform', 
//         '-translate-x-1/2', 'text-white', 'font-bold', 'text-xl', 
//         'p-1', 'dynamic-player-info'
//     ]);
//     nameElement.textContent = player.name;

//     const countryElement = createElementWithClasses('div', [
//         'absolute', 'bottom-4', 'left-1/2', 'transform', 
//         '-translate-x-1/2', 'text-white', 'text-lg', 
//         'dynamic-player-info'
//     ]);
//     countryElement.textContent = player.country || 'Unknown';

//     gkParent.appendChild(nameElement);
//     gkParent.appendChild(countryElement);

//     // Deactivate hover effects for all player cards
//     const playersContainer = document.querySelector(SELECTORS.playersContainer);
//     if (playersContainer) {
//         const playerCards = playersContainer.querySelectorAll('.relative');
//         playerCards.forEach(card => {
//             // Remove hover classes
//             card.classList.remove(
//                 'group', 
//                 'transform', 
//                 'transition-all', 
//                 'duration-300', 
//                 'hover:scale-105', 
//                 'hover:shadow-2xl'
//             );
//             // Remove hover effects from child images
//             const images = card.querySelectorAll('img');
//             images.forEach(img => {
//                 img.classList.remove('transition-transform', 'duration-300', 'group-hover:scale-110');
//             });
//         });
//     }
// };

// const loadGoalkeepers = async () => {
//     try {
//         const newPlayersContainer = document.querySelector(SELECTORS.newPlayersContainer);
//         const playersContainer = document.querySelector(SELECTORS.playersContainer);

//         // Ensure containers exist
//         if (!newPlayersContainer || !playersContainer) {
//             throw new Error('Player containers not found');
//         }

//         // Show container
//         newPlayersContainer.classList.remove('hidden');

//         // Fetch and validate data
//         const response = await fetch(PATHS.playersDatabase);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         if (!data.players || !Array.isArray(data.players)) {
//             throw new Error('Invalid data structure');
//         }

//         // Filter goalkeepers
//         const goalkeepers = data.players.filter(player => player.position === "GK");
        
//         // Clear previous content
//         playersContainer.innerHTML = '';

//         if (goalkeepers.length === 0) {
//             playersContainer.innerHTML = '<p class="text-gray-600">No goalkeepers found.</p>';
//             return;
//         }

//         // Create and append player cards
//         goalkeepers.forEach(player => {
//             const playerCard = createPlayerCard(player);
//             if (playerCard) {
//                 playerCard.addEventListener('click', () => updateMainGoalkeeperDisplay(player));
//                 playersContainer.appendChild(playerCard);
//             }
//         });

//     } catch (error) {
//         console.error('Error loading goalkeepers:', error);
//         const playersContainer = document.querySelector(SELECTORS.playersContainer);
//         if (playersContainer) {
//             playersContainer.innerHTML = `
//                 <p class="text-red-600">
//                     Failed to load players. ${error.message}
//                 </p>
//             `;
//         }
//     }
// };

// // Add event listener with error handling
// const gkElement = document.getElementById('GK');
// if (gkElement) {
//     gkElement.addEventListener('click', loadGoalkeepers);
// } else {
//     console.error('GK element not found');
// }


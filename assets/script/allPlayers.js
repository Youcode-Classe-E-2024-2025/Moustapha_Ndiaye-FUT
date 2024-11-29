fetch('../data/DB/players.json')
  .then(response => response.json())
  .then(data => {
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'p-6');

    data.players.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.classList.add(
        // 'relative',
        // 'group',
        // 'bg-white',
        // 'rounded-xl',
        // 'shadow-sm',
        // 'overflow-hidden',
        // 'transform',
        // 'transition-all',
        // 'duration-300',
        // 'hover:scale-105',
        // 'hover:shadow-2xl'
        'w-full',
        'h-full'
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



      // // Ajout d'événements pour les boutons
      // const editBtn = playerCard.querySelector('.edit-btn');
      // const deleteBtn = playerCard.querySelector('.delete-btn');

      // editBtn.addEventListener('click', () => {
      //   console.log('Éditer le joueur:', player.name);
      //   // Logique d'édition à implémenter
      // });

      // deleteBtn.addEventListener('click', () => {
      //   console.log('Supprimer le joueur:', player.name);
      //   // Logique de suppression à implémenter
      // });

      playersContainer.appendChild(playerCard);
    });
  })
  .catch(error => {
    console.error('Erreur de chargement du fichier JSON: ', error);
  });


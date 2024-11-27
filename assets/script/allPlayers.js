fetch('../data/DB/players.json')
  .then(response => response.json())
  .then(data => {
    const playersContainer = document.getElementById('playersContainer'); // Assurez-vous d'avoir cet élément dans votre HTML

    data.players.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.classList.add('player-card');
      
      playerCard.innerHTML = `
        <img src="${player.photo}" alt="${player.name}">
        <h2>${player.name}</h2>
        <p>Position: ${player.position}</p>
        <p>Nationalité: ${player.nationality}</p>
        <p>Club: ${player.club}</p>
        <p>Note: ${player.rating}</p>
        <p>Vitesse: ${player.pace}</p>
        <p>Tirs: ${player.shooting}</p>
        <p>Passes: ${player.passing}</p>
        <p>Dribbles: ${player.dribbling}</p>
        <p>Défense: ${player.defending}</p>
        <p>Physique: ${player.physical}</p>
      `;

      playersContainer.appendChild(playerCard);
    });
  })
  .catch(error => {
    console.error('Erreur de chargement du fichier JSON: ', error);
  });

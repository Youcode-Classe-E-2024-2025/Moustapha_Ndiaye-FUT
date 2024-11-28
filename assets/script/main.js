const players = document.querySelectorAll('.player');

players.addEventListener('mouseover', () => {
    if (!players.classList.contains('content-added')) {
        players.innerHTML = `
            <div class="bg-white rounded p-2">
                <button>Add Player</button>
            </div>
        `;
        players.classList.add('content-added'); // Ajout d'une classe pour éviter plusieurs modifications
    }
});

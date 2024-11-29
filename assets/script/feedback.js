
    // Validation du champ "Satisfaction Level"
    // if (!satisfactionLevel) {
    //     valid = false;
    //     document.getElementById('satisfaction-error').classList.remove('hidden');
    // }

    document.getElementById('feedback-form').addEventListener('submit', function(event) {
        event.preventDefault();  // Empêche la soumission par défaut
    
        // Récupération des valeurs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const feedbackType = document.getElementById('feedback-type').value;
        const satisfactionLevel = document.querySelector('#starRating i.selected') ? true : false;
        const message = document.getElementById('message').value.trim();
    
        // Réinitialisation des messages d'erreur
        resetErrorMessages();
    
        // Variable pour vérifier si tout est valide
        let valid = true;
    
        // Validation du champ "Name"
        if (name === "") {
            valid = false;
            document.getElementById('name-error').classList.remove('hidden');
        }
    
        // Validation du champ "Email"
        if (email === "" || !validateEmail(email)) {
            valid = false;
            document.getElementById('email-error').classList.remove('hidden');
        }
    
        // Validation du champ "Feedback Type"
        if (feedbackType === "") {
            valid = false;
            document.getElementById('feedback-type-error').classList.remove('hidden');
        }
    
        // Validation du champ "Message"
        if (message === "") {
            valid = false;
            document.getElementById('message-error').classList.remove('hidden');
        }
    
        // Si tout est valide, soumettre le formulaire
        if (valid) {
            alert('Feedback submitted successfully!');
    
            // Vider le formulaire après l'alerte
            document.getElementById('feedback-form').reset();  // Réinitialise tous les champs du formulaire
    
            // Réinitialiser les étoiles sélectionnées
            document.querySelectorAll('.star').forEach(star => {
                star.classList.remove('selected');
            });
        }
    });
    
    // Fonction de validation de l'email
    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }
    
    // Fonction pour réinitialiser les messages d'erreur
    function resetErrorMessages() {
        document.querySelectorAll('.text-red-500').forEach(element => {
            element.classList.add('hidden');
        });
    }
    
    // Gestion de la sélection des étoiles
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            document.querySelectorAll('.star').forEach(s => s.classList.remove('selected')); // Retirer les anciennes sélections
            this.classList.add('selected'); // Ajouter la classe "selected" à l'étoile cliquée
        });
    });
    
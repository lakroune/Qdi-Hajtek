<!DOCTYPE html>
<html>

<head>
    <style>
        .button {
            background-color: #1B4F72;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <h1>Réinitialisation de mot de passe</h1>
    <p>Bonjour,</p>
    <p>Vous recevez cet e-mail car nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.
    </p>

    <p>Votre code de réinitialisation est : <strong>{{ $resetLink }}</strong></p>

    <p>Si vous n'avez pas demandé de réinitialisation, aucune autre action n'est requise.</p>

    <p>Cordialement,<br>L'équipe Qdi Hajtek</p>
</body>

</html>

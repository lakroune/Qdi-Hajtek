<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #e1e1e1;
        }

        .header {
            background-color: #1B4F72;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .code-box {
            background-color: #f4f4f4;
            border: 2px dashed #D35400;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 10px;
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            color: #1B4F72;
        }

        .footer {
            font-size: 12px;
            color: #888;
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Qdi Hajtek</h1>
        </div>
        <h2>Bonjour {{ $user->nom }} {{ $user->prenom }},</h2>
        <p>Merci de vous être inscrit. Pour activer votre compte, veuillez utiliser le code de vérification suivant :
        </p>

        <div class="code-box">
            {{ $code }}
        </div>

        <p>Si vous avez des questions, n'hesitez pas a nous contacter.</p>


    </div>
</body>

</html>

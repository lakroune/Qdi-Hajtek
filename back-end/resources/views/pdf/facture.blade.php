<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>Facture #{{ $data['id'] }}</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            color: #333;
            line-height: 1.6;
        }

        .wrap {
            padding: 2rem 1.5rem;
            background: #ffffff;
        }

        .header {
            display: table;
            width: 100%;
            border-bottom: 2px solid #1B4F72;
            padding-bottom: 16px;
            margin-bottom: 24px;
        }

        .header-left {
            display: table-cell;
            vertical-align: middle;
        }

        .header-right {
            display: table-cell;
            text-align: right;
            vertical-align: top;
        }

        .logo {
            font-size: 22px;
            font-weight: bold;
            color: #1B4F72;
        }

        .titre {
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .muted {
            color: #64748B;
        }

        .parties {
            width: 100%;
            margin-bottom: 24px;
        }

        .partie-box {
            display: inline-block;
            width: 47%;
            vertical-align: top;
        }

        .partie-box.right {
            margin-left: 5%;
        }

        .section-label {
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #1B4F72;
            border-bottom: 1px solid #E2E8F0;
            padding-bottom: 4px;
            margin-bottom: 8px;
        }

        .partie-box p {
            font-size: 12px;
            color: #64748B;
            margin-top: 2px;
        }

        .partie-box strong {
            font-size: 12px;
            color: #1e293b;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-top: 8px;
        }

        thead th {
            background: #F8FAFC;
            padding: 10px 12px;
            text-align: left;
            color: #1B4F72;
            font-weight: bold;
            border-bottom: 2px solid #CBD5E1;
        }

        tbody td {
            padding: 10px 12px;
            border-bottom: 1px solid #E2E8F0;
            color: #1e293b;
        }

        tbody td small {
            color: #64748B;
            font-size: 11px;
        }

        .col-ref {
            text-align: center;
            font-family: monospace;
            font-size: 11px;
        }

        .col-amt {
            text-align: right;
            font-weight: bold;
        }

        .total-block {
            margin-top: 20px;
            text-align: right;
        }

        .total-pill {
            display: inline-block;
            background: #1B4F72;
            color: #ffffff;
            padding: 8px 18px;
            border-radius: 4px;
            font-size: 15px;
            font-weight: bold;
        }

        .statut {
            margin-top: 8px;
            font-size: 12px;
            color: #1D9E75;
        }

        .code-confirmation {
            margin-top: 4px;
            font-size: 12px;
            color: #1D9E75;
        }

        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 11px;
            color: #94A3B8;
            border-top: 1px solid #E2E8F0;
            padding-top: 10px;
        }
    </style>
</head>

<body>
    <div class="wrap">

        <div class="header">
            <div class="header-left">
                <span class="logo">Qdi Hajtek</span>
            </div>
            <div class="header-right">
                <div class="titre">FACTURE</div>
                <div class="muted">N° : {{ $data['id'] }}</div>
                <div class="muted">Date : {{ $data['date_creation'] }}</div>
            </div>
        </div>

        <div class="parties">
            <div class="partie-box">
                <div class="section-label">De (client)</div>
                <strong>{{ $data['client']['nom_complet'] }}</strong>
                <p>CIN : {{ $data['client']['cin'] }}</p>
                <p>Ville : {{ $data['client']['ville'] }}</p>
                <p>Email : {{ $data['client']['email'] }}</p>
            </div>

            <div class="partie-box right">
                <div class="section-label">À (artisan)</div>
                <strong>{{ $data['artisan']['nom_complet'] }}</strong>
                <p>Spécialité : {{ $data['artisan']['specialite'] }}</p>
                <p>Ville : {{ $data['artisan']['ville'] }}</p>
                <p>Email : {{ $data['artisan']['email'] }}</p>
            </div>
        </div>

        <div style="clear: both;"></div>

        <table>
            <thead>
                <tr>
                    <th style="width: 58%;">Description du service</th>
                    <th style="text-align: center;">Réf. paiement</th>
                    <th style="text-align: right;">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <strong>{{ $data['details_service']['titre'] }}</strong><br>
                        <small>Date de début : {{ $data['details_service']['date_debut'] }}</small>
                    </td>
                    <td class="col-ref">
                        {{ $data['paiement']['reference_stripe'] }}
                    </td>
                    <td class="col-amt">
                        {{ $data['paiement']['montant_total'] }} {{ $data['paiement']['devise'] }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="total-block">
            <div class="total-pill">
                Total : {{ $data['paiement']['montant_total'] }} {{ $data['paiement']['devise'] }}
            </div>
            <div class="statut">
                Statut du paiement : <strong>{{ strtoupper($data['paiement']['statut']) }}</strong>
            </div>
            <div class="code-confirmation">
                Code de confirmation de fin de service : {{ $data['details_service']['code_confirmation'] }}. À
                transmettre à l'artisan pour confirmer la réalisation des travaux et procéder au paiement.
            </div>

        </div>

        <div class="footer">
            Qdi Hajtek — Plateforme de mise en relation artisans / clients au Maroc.<br>
            Ceci est une facture générée automatiquement. Merci de votre confiance.
        </div>

</body>

</html>

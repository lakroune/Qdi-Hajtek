<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture #{{ $num_facture }}</title>
    <style>
        body { font-family: sans-serif; color: #333; }
        .header { border-bottom: 2px solid #0F172A; padding-bottom: 20px; }
        .logo { font-size: 24px; font-weight: bold; color: #1B4F72; }
        .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        .table th { background: #F1F5F9; padding: 10px; text-align: left; border-bottom: 2px solid #CBD5E1; }
        .table td { padding: 10px; border-bottom: 1px solid #E2E8F0; }
        .total { text-align: right; margin-top: 30px; font-size: 20px; font-weight: bold; color: #1B4F72; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 12px; color: #64748B; }
    </style>
</head>
<body>
    <div class="header">
        <span class="logo">Qdi Hajtek</span>
        <div style="float: right;">
            <strong>FACTURE</strong><br>
            N°: {{ $num_facture }}<br>
            Date: {{ $date }}
        </div>
    </div>

    <div style="margin-top: 40px;">
        <div style="width: 50%; float: left;">
            <h4 style="color: #1B4F72; margin-bottom: 5px;">DE (ARTISAN)</h4>
            <strong>{{ $artisan_name }}</strong><br>
            {{ $artisan_email }}
        </div>
        <div style="width: 50%; float: right; text-align: right;">
            <h4 style="color: #1B4F72; margin-bottom: 5px;">À (CLIENT)</h4>
            <strong>{{ $client_name }}</strong><br>
            {{ $client_email }}
        </div>
    </div>

    <div style="clear: both;"></div>

    <table class="table">
        <thead>
            <tr>
                <th>Service / Description</th>
                <th>Prix Unit</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($items as $item)
            <tr>
                <td>{{ $item['description'] }}</td>
                <td>{{ $item['price'] }} DH</td>
                <td>{{ $item['price'] }} DH</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total">
        TOTAL : {{ $total }} DH
    </div>

    <div class="footer">
        Merci de votre confiance en Qdi Hajtek.
    </div>
</body>
</html>
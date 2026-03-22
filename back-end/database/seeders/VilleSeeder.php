<?php

namespace Database\Seeders;

use App\Models\Ville;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VilleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $villes = [
            'Safi',
            'Casablanca',
            'Marrakech',
            'Rabat',
            'Tanger',
            'Agadir',
            'Fès',
            'Meknès',
            'Oujda',    
            'Kenitra',
            'Tétouan',
            'Temara',
            'Laâyoune',
            'Mohammédia',
            'El Jadida'
        ];

        foreach ($villes as $ville) {
            Ville::create([
                'ville' => $ville
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'creer offre',
            'modifier offre',
            'supprimer offre',
            'afficher offre',
            'ajouter service',
            'modifier service',
            'supprimer service',
            'afficher service',
            'creer portfolio',
            'modifier portfolio',
            'supprimer portfolio',
            'afficher portfolio',
            'modifier profile',
            'creer profile',
            'supprimer profile',
            'afficher profile',
            'creer client',
            'modifier client',
            'supprimer client',
            'afficher client',
            'creer utilisateur',
            'modifier utilisateur',
            'supprimer utilisateur',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $roleClient = Role::create(['name' => 'client']);
        $roleArtisan = Role::create(['name' => 'artisan']);
        $roleAdmin = Role::create(['name' => 'admin']);


        $roleClient->givePermissionTo([
            'creer offre',
            'modifier offre',
            'supprimer offre',
            'afficher offre',
            'modifier profile',
            'afficher profile',
            'afficher service',
            'afficher portfolio'
        ]);

        $roleArtisan->givePermissionTo([
            'afficher offre',
            'ajouter service',
            'modifier service',
            'supprimer service',
            'afficher service',
            'creer portfolio',
            'modifier portfolio',
            'supprimer portfolio',
            'afficher portfolio',
            'modifier profile',
            'afficher profile'
        ]);

        $roleAdmin->givePermissionTo(Permission::all());
    }
}

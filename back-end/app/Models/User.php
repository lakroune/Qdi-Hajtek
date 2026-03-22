<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'email',
        'password',
        'lastname',
        'firstname',
        'city',
        'code_verification',
    ];
    protected $guard_name = 'api';


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'code_verification',
        'updated_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function client()
    {
        return $this->hasOne(Client::class, 'id', 'id');
    }
    public function artisan()
    {
        return $this->hasOne(Artisan::class, 'id', 'id');
    }

    public function admin()
    {
        return $this->hasOne(Admin::class, 'id', 'id');
    }
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function isAdmin(): bool
    {
        return $this->roles()->where('name', 'admin')->exists();
    }
    public function isClient(): bool
    {
        return $this->roles()->where('name', 'client')->exists();
    }
    public function isArtisan(): bool
    {
        return $this->roles()->where('name', 'artisan')->exists();
    }

    public function assignRole(string $roleName): bool
    {
        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            return false;
        }
        if (!$this->roles()->where('role_id', $role->id)->exists()) {
            $this->roles()->attach($role->id);
        }
        return true;
    }

    public function removeRole(string $roleName): bool
    {
        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            return false;
        }
        if ($this->roles()->where('role_id', $role->id)->exists()) {
            $this->roles()->detach($role->id);
        }
        return true;
    }

    public function hasRole(string $roleName): bool
    {
        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            return false;
        }
        return $this->roles()->where('role_id', $role->id)->exists();
    }
    public function hasRoles(array $roleNames): bool
    {
        foreach ($roleNames as $roleName) {
            if ($this->hasRole($roleName)) {
                return true;
            }
        }
        return false;
    }
    // has one role like clinet just for example
    public function hasOneRole(string $roleName): bool
    {
        $roles = $this->roles()->get();

        if (count($roles) === 1 and $roles[0]->name === $roleName) {
            return true;
        }
        return false;
    }

    public function notHasRole(string $roleName): bool
    {
        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            return false;
        }
        return !$this->roles()->where('role_id', $role->id)->exists();
    }

    public function hasEmailVerified(): bool
    {
        return $this->email_verified_at !== null;
    }

    public function isActive(): bool
    {
        return $this->client->statut === "actif";
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@instantkey.test'],
            [
                'name' => 'Admin INSTANT KEY',
                'email' => 'admin@instantkey.test',
                'password' => Hash::make('password'),
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'demo@instantkey.test'],
            [
                'name' => 'Demo Gamer',
                'email' => 'demo@instantkey.test',
                'password' => Hash::make('password'),
                'is_admin' => false,
                'email_verified_at' => now(),
            ]
        );

        $this->call([
            PlatformSeeder::class,
            GenreSeeder::class,
            ProductSeeder::class,
            DiscountCodeSeeder::class,
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Platform;
use Illuminate\Database\Seeder;

class PlatformSeeder extends Seeder
{
    public function run(): void
    {
        $platforms = [
            ['name' => 'Steam', 'slug' => 'steam', 'color' => '#66c0f4'],
            ['name' => 'Epic Games', 'slug' => 'epic-games', 'color' => '#0078f2'],
            ['name' => 'GOG', 'slug' => 'gog', 'color' => '#86328a'],
            ['name' => 'Origin', 'slug' => 'origin', 'color' => '#f56c2d'],
            ['name' => 'Battle.net', 'slug' => 'battle-net', 'color' => '#148eff'],
            ['name' => 'PlayStation Network', 'slug' => 'psn', 'color' => '#0070d1'],
            ['name' => 'Xbox', 'slug' => 'xbox', 'color' => '#107c10'],
            ['name' => 'Nintendo eShop', 'slug' => 'nintendo-eshop', 'color' => '#e60012'],
        ];

        foreach ($platforms as $platform) {
            Platform::updateOrCreate(['slug' => $platform['slug']], $platform);
        }
    }
}

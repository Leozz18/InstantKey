<?php

namespace Database\Seeders;

use App\Models\DiscountCode;
use Illuminate\Database\Seeder;

class DiscountCodeSeeder extends Seeder
{
    public function run(): void
    {
        $codes = [
            ['code' => 'WELCOME10', 'type' => 'percent', 'value' => 10, 'usage_limit' => 1000],
            ['code' => 'SUMMER20', 'type' => 'percent', 'value' => 20, 'usage_limit' => 500],
            ['code' => 'INSTANT5', 'type' => 'fixed', 'value' => 5, 'usage_limit' => null],
            ['code' => 'BLACKFRIDAY', 'type' => 'percent', 'value' => 30, 'usage_limit' => 200],
        ];

        foreach ($codes as $code) {
            DiscountCode::updateOrCreate(['code' => $code['code']], $code);
        }
    }
}

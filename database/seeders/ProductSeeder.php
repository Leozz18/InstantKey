<?php

namespace Database\Seeders;

use App\Models\Genre;
use App\Models\KeyStock;
use App\Models\Platform;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $games = [
            [
                'title' => 'Cyberpunk 2077: Phantom Liberty',
                'platform' => 'steam', 'genre' => 'rpg',
                'developer' => 'CD Projekt Red', 'publisher' => 'CD Projekt',
                'description' => 'Spy-thriller espansione di Cyberpunk 2077 ambientata nel pericoloso quartiere di Dogtown a Night City. Diventa un agente sotto copertura intrappolato in una rete di intrighi geopolitici.',
                'price' => 24.99, 'original_price' => 39.99,
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80',
                'youtube_id' => 'rgVKpQEYjpw',
                'release_date' => '2023-09-26', 'is_featured' => true,
                'system_requirements' => "OS: Windows 10/11 64-bit\nCPU: Intel Core i7-12700 / AMD Ryzen 7 7800X3D\nRAM: 16 GB\nGPU: NVIDIA RTX 2060 SUPER / AMD RX 5700 XT\nStorage: 70 GB SSD",
            ],
            [
                'title' => 'Elden Ring',
                'platform' => 'steam', 'genre' => 'rpg',
                'developer' => 'FromSoftware', 'publisher' => 'Bandai Namco',
                'description' => 'Un nuovo, fantastico mondo creato da Hidetaka Miyazaki e George R. R. Martin. Esplora le Terre Intermedie, sconfitti boss leggendari e diventa il Lord degli Anelli.',
                'price' => 41.99, 'original_price' => 59.99,
                'image_url' => 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1600&q=80',
                'youtube_id' => 'E3Huy2cdih0',
                'release_date' => '2022-02-25', 'is_featured' => true,
                'system_requirements' => "OS: Windows 10\nCPU: Intel Core i7-8700K\nRAM: 12 GB\nGPU: NVIDIA GTX 1070 8GB\nStorage: 60 GB",
            ],
            [
                'title' => 'Baldur\'s Gate 3',
                'platform' => 'steam', 'genre' => 'rpg',
                'developer' => 'Larian Studios', 'publisher' => 'Larian Studios',
                'description' => 'Riunisci il tuo gruppo, torna nei Forgotten Realms in un racconto di amicizia e tradimento, sacrificio e sopravvivenza, e l\'attrazione di un potere assoluto.',
                'price' => 49.99, 'original_price' => 59.99,
                'image_url' => 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80',
                'youtube_id' => '1T22wNvoNiU',
                'release_date' => '2023-08-03', 'is_featured' => true,
                'system_requirements' => "OS: Windows 10 64-bit\nCPU: Intel I5 4690 / AMD FX 4350\nRAM: 8 GB\nGPU: Nvidia GTX 970 / RX 480\nStorage: 150 GB",
            ],
            [
                'title' => 'The Witcher 3: Wild Hunt',
                'platform' => 'gog', 'genre' => 'rpg',
                'developer' => 'CD Projekt Red', 'publisher' => 'CD Projekt',
                'description' => 'Sei Geralt di Rivia, mercenario uccisore di mostri. Caccia il Wild Hunt in un\'avventura epica nel più grande RPG open world mai creato.',
                'price' => 9.99, 'original_price' => 29.99,
                'image_url' => 'https://images.unsplash.com/photo-1612404730960-5c71577fca11?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1545569310-018e1ad8b1fd?w=1600&q=80',
                'youtube_id' => 'c0i88t0Kacs',
                'release_date' => '2015-05-19', 'is_featured' => true,
                'system_requirements' => "OS: Windows 7/8/10 64-bit\nCPU: Intel CPU Core i5-2500K 3.3GHz\nRAM: 6 GB\nGPU: Nvidia GPU GeForce GTX 660\nStorage: 35 GB",
            ],
            [
                'title' => 'Red Dead Redemption 2',
                'platform' => 'steam', 'genre' => 'open-world',
                'developer' => 'Rockstar Games', 'publisher' => 'Rockstar Games',
                'description' => 'America, 1899. La fine dell\'epoca del Far West è arrivata. Arthur Morgan e la banda di Van der Linde sono dei fuorilegge in fuga.',
                'price' => 29.99, 'original_price' => 59.99,
                'image_url' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=80',
                'youtube_id' => 'eaW0tYpxyp0',
                'release_date' => '2019-12-05',
                'system_requirements' => "OS: Windows 10\nCPU: Intel Core i7-4770K\nRAM: 12 GB\nGPU: Nvidia GeForce GTX 1060 6GB\nStorage: 150 GB SSD",
            ],
            [
                'title' => 'Hogwarts Legacy',
                'platform' => 'steam', 'genre' => 'adventure',
                'developer' => 'Avalanche Software', 'publisher' => 'Warner Bros',
                'description' => 'Un gioco di ruolo immersivo open world ambientato nel mondo introdotto per la prima volta nei libri di Harry Potter. Imbarcati in un viaggio attraverso luoghi familiari e nuovi.',
                'price' => 34.99, 'original_price' => 59.99,
                'image_url' => 'https://images.unsplash.com/photo-1577281612259-a51e3132bd4d?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=1600&q=80',
                'youtube_id' => '1O6Qstncpnc',
                'release_date' => '2023-02-10', 'is_featured' => true,
                'system_requirements' => "OS: Windows 10 64-bit\nCPU: Intel Core i5-8400 / AMD Ryzen 5 2600\nRAM: 16 GB\nGPU: NVIDIA GeForce GTX 1070 / AMD RX Vega 56\nStorage: 85 GB SSD",
            ],
            [
                'title' => 'Call of Duty: Modern Warfare III',
                'platform' => 'battle-net', 'genre' => 'fps',
                'developer' => 'Sledgehammer Games', 'publisher' => 'Activision',
                'description' => 'Nella sequel diretto del campione record-breaker, Capitano Price e la Task Force 141 affrontano l\'ultimativa minaccia.',
                'price' => 49.99, 'original_price' => 69.99,
                'image_url' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80',
                'youtube_id' => 'V3v7yVkkPag',
                'release_date' => '2023-11-10',
                'system_requirements' => "OS: Windows 10 64-bit\nCPU: Intel Core i5-6600K / AMD Ryzen 5 1400\nRAM: 8 GB\nGPU: NVIDIA GeForce GTX 960 / AMD RX 470\nStorage: 149 GB",
            ],
            [
                'title' => 'EA SPORTS FC 24',
                'platform' => 'origin', 'genre' => 'sports',
                'developer' => 'EA Vancouver', 'publisher' => 'EA Sports',
                'description' => 'Vivi l\'unico vero gioco di calcio con oltre 19.000 calciatori, oltre 700 squadre, oltre 30 leghe. La nuova era del calcio inizia ora.',
                'price' => 39.99, 'original_price' => 79.99,
                'image_url' => 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1600&q=80',
                'youtube_id' => '8lH3wd5-Hj0',
                'release_date' => '2023-09-29',
                'system_requirements' => "OS: Windows 10 64-bit\nCPU: Intel Core i5-6600k / AMD Ryzen 5 1600\nRAM: 8 GB\nGPU: NVIDIA GeForce GTX 1050 Ti / AMD RX 570\nStorage: 100 GB",
            ],
            [
                'title' => 'Counter-Strike 2',
                'platform' => 'steam', 'genre' => 'fps',
                'developer' => 'Valve', 'publisher' => 'Valve',
                'description' => 'Il successore di CS:GO, costruito sul Source 2 engine. Per oltre due decenni, Counter-Strike ha offerto un\'esperienza competitiva all\'avanguardia.',
                'price' => 0.00, 'original_price' => null,
                'image_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1600&q=80',
                'youtube_id' => 'P_jUW2hG28o',
                'release_date' => '2023-09-27',
                'system_requirements' => "OS: Windows 10\nCPU: 4 hardware CPU threads - Intel Core i5 750\nRAM: 8 GB\nGPU: Video card must be 1 GB or more, DirectX 11+\nStorage: 85 GB",
            ],
            [
                'title' => 'Starfield',
                'platform' => 'steam', 'genre' => 'rpg',
                'developer' => 'Bethesda Game Studios', 'publisher' => 'Bethesda Softworks',
                'description' => 'Il primo nuovo universo di Bethesda in 25 anni. Crea il personaggio che vuoi ed esplora con libertà senza precedenti più di 1000 pianeti.',
                'price' => 44.99, 'original_price' => 69.99,
                'image_url' => 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&q=80',
                'youtube_id' => 'kfYEiTdsyas',
                'release_date' => '2023-09-06',
                'system_requirements' => "OS: Windows 10/11\nCPU: AMD Ryzen 5 3600X / Intel i5-10600K\nRAM: 16 GB\nGPU: AMD Radeon RX 6800 XT / NVIDIA GeForce RTX 2080\nStorage: 125 GB SSD",
            ],
            [
                'title' => 'Hades II',
                'platform' => 'steam', 'genre' => 'indie',
                'developer' => 'Supergiant Games', 'publisher' => 'Supergiant Games',
                'description' => 'Sequel del pluripremiato Hades. Combattere fuori dall\'Inferno usando i poteri concessi dagli dèi dell\'Olimpo.',
                'price' => 29.99, 'original_price' => null,
                'image_url' => 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1512149074996-e923ac45be6a?w=1600&q=80',
                'youtube_id' => 'mXBzfaIz7Z4',
                'release_date' => '2024-05-06', 'is_featured' => true,
                'system_requirements' => "OS: Windows 10\nCPU: Dual Core 2.4 GHz\nRAM: 4 GB\nGPU: 2GB VRAM / DirectX 11+\nStorage: 20 GB",
            ],
            [
                'title' => 'Forza Horizon 5',
                'platform' => 'xbox', 'genre' => 'racing',
                'developer' => 'Playground Games', 'publisher' => 'Xbox Game Studios',
                'description' => 'Il tuo Horizon Adventure ti aspetta in Messico, con paesaggi mozzafiato e centinaia di auto incredibili.',
                'price' => 27.99, 'original_price' => 59.99,
                'image_url' => 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=80',
                'youtube_id' => 'FYH9n37B7Yw',
                'release_date' => '2021-11-09',
                'system_requirements' => "OS: Windows 10\nCPU: Intel i5-4460 / AMD Ryzen 3 1200\nRAM: 8 GB\nGPU: NVIDIA GeForce GTX 970 / AMD RX 470\nStorage: 110 GB",
            ],
            [
                'title' => 'God of War Ragnarök',
                'platform' => 'psn', 'genre' => 'action',
                'developer' => 'Santa Monica Studio', 'publisher' => 'Sony Interactive',
                'description' => 'Kratos e Atreus devono viaggiare in ognuno dei Nove Regni alla ricerca di risposte mentre le forze asgardiane si preparano alla guerra.',
                'price' => 49.99, 'original_price' => 79.99,
                'image_url' => 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1600&q=80',
                'youtube_id' => 'EE-4GvjKcfs',
                'release_date' => '2022-11-09',
                'system_requirements' => "Console PS5\nO PlayStation 4 / 4 Pro\nNetwork: PlayStation Plus per multiplayer",
            ],
            [
                'title' => 'The Legend of Zelda: Tears of the Kingdom',
                'platform' => 'nintendo-eshop', 'genre' => 'adventure',
                'developer' => 'Nintendo EPD', 'publisher' => 'Nintendo',
                'description' => 'Una nuova avventura per Link in cieli incantati e oltre. Sequel di Breath of the Wild.',
                'price' => 54.99, 'original_price' => 69.99,
                'image_url' => 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80',
                'youtube_id' => 'uHGShqcAHlQ',
                'release_date' => '2023-05-12', 'is_featured' => true,
                'system_requirements' => "Console Nintendo Switch\nNintendo Switch OLED\nNintendo Switch Lite",
            ],
            [
                'title' => 'Resident Evil 4 Remake',
                'platform' => 'steam', 'genre' => 'horror',
                'developer' => 'Capcom', 'publisher' => 'Capcom',
                'description' => 'L\'agente speciale del governo statunitense Leon S. Kennedy viene inviato nelle profondità di una remota campagna europea per salvare la figlia del Presidente.',
                'price' => 29.99, 'original_price' => 59.99,
                'image_url' => 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=80',
                'youtube_id' => 'D5b6tHFmYW4',
                'release_date' => '2023-03-24',
                'system_requirements' => "OS: Windows 10/11\nCPU: AMD Ryzen 3 1200 / Intel Core i5-7500\nRAM: 8 GB\nGPU: AMD Radeon RX 560 / NVIDIA GeForce GTX 1050 Ti\nStorage: 60 GB",
            ],
            [
                'title' => 'Stardew Valley',
                'platform' => 'steam', 'genre' => 'simulation',
                'developer' => 'ConcernedApe', 'publisher' => 'ConcernedApe',
                'description' => 'Hai ereditato la vecchia fattoria di tuo nonno nella Stardew Valley. Riuscirai a vivere nel mondo rurale?',
                'price' => 9.99, 'original_price' => 13.99,
                'image_url' => 'https://images.unsplash.com/photo-1592492152545-9695d3f473f4?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80',
                'youtube_id' => 'ot7uXNQskhs',
                'release_date' => '2016-02-26',
                'system_requirements' => "OS: Windows Vista o superiore\nCPU: 2 Ghz\nRAM: 2 GB\nGPU: 256 mb\nStorage: 500 MB",
            ],
            [
                'title' => 'Minecraft',
                'platform' => 'epic-games', 'genre' => 'survival',
                'developer' => 'Mojang Studios', 'publisher' => 'Mojang Studios',
                'description' => 'Un gioco su come piazzare blocchi e andare in avventure. Crea, costruisci, esplora e sopravvivi nel mondo dei blocchi.',
                'price' => 23.95, 'original_price' => 26.95,
                'image_url' => 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=1600&q=80',
                'youtube_id' => 'MmB9b5njVbA',
                'release_date' => '2011-11-18',
                'system_requirements' => "OS: Windows 7+\nCPU: Intel Core i3-3210\nRAM: 4 GB\nGPU: GeForce 400 Series o AMD Radeon HD 7000 series\nStorage: 4 GB",
            ],
            [
                'title' => 'Hollow Knight: Silksong',
                'platform' => 'steam', 'genre' => 'indie',
                'developer' => 'Team Cherry', 'publisher' => 'Team Cherry',
                'description' => 'Diventa la cacciatrice mortale e regale Hornet in un nuovo regno con sfide letali.',
                'price' => 19.99, 'original_price' => null,
                'image_url' => 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80',
                'youtube_id' => 'pFAknD_9U7c',
                'release_date' => '2024-12-01',
                'system_requirements' => "OS: Windows 7+\nCPU: Intel Core 2 Duo E5200\nRAM: 4 GB\nGPU: GeForce 9800GTX+ (1GB)\nStorage: 9 GB",
            ],
            [
                'title' => 'GTA V Premium Edition',
                'platform' => 'steam', 'genre' => 'open-world',
                'developer' => 'Rockstar North', 'publisher' => 'Rockstar Games',
                'description' => 'Esplora il mondo emozionante di Los Santos e Blaine County nelle migliori versioni mai realizzate.',
                'price' => 14.99, 'original_price' => 29.99,
                'image_url' => 'https://images.unsplash.com/photo-1605457212560-d1cae51d3edb?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1600&q=80',
                'youtube_id' => 'QkkoHAzjnUs',
                'release_date' => '2015-04-14',
                'system_requirements' => "OS: Windows 10 64-bit\nCPU: Intel Core 2 Quad CPU Q6600\nRAM: 4 GB\nGPU: NVIDIA 9800 GT 1GB\nStorage: 72 GB",
            ],
            [
                'title' => 'Diablo IV',
                'platform' => 'battle-net', 'genre' => 'rpg',
                'developer' => 'Blizzard Entertainment', 'publisher' => 'Blizzard',
                'description' => 'Lilith è tornata e il mondo di Sanctuary è in pericolo. La caccia al male è iniziata.',
                'price' => 39.99, 'original_price' => 69.99,
                'image_url' => 'https://images.unsplash.com/photo-1531956656798-56686eeacb27?w=600&q=80',
                'cover_url' => 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80',
                'youtube_id' => '0SSYzl9fXOQ',
                'release_date' => '2023-06-06',
                'system_requirements' => "OS: Windows 10 64-bit\nCPU: Intel Core i5-2500K / AMD FX-8350\nRAM: 8 GB\nGPU: NVIDIA GeForce GTX 660 / AMD R9 280\nStorage: 90 GB SSD",
            ],
        ];

        foreach ($games as $data) {
            $platform = Platform::where('slug', $data['platform'])->first();
            $genre = Genre::where('slug', $data['genre'])->first();

            if (! $platform || ! $genre) {
                continue;
            }

            $product = Product::updateOrCreate(
                ['slug' => Str::slug($data['title'])],
                [
                    'title' => $data['title'],
                    'slug' => Str::slug($data['title']),
                    'platform_id' => $platform->id,
                    'genre_id' => $genre->id,
                    'developer' => $data['developer'],
                    'publisher' => $data['publisher'],
                    'description' => $data['description'],
                    'system_requirements' => $data['system_requirements'],
                    'price' => $data['price'],
                    'original_price' => $data['original_price'],
                    'image_url' => $data['image_url'],
                    'cover_url' => $data['cover_url'],
                    'youtube_id' => $data['youtube_id'],
                    'release_date' => $data['release_date'],
                    'is_featured' => $data['is_featured'] ?? false,
                    'is_active' => true,
                ]
            );

            $existing = $product->keys()->count();
            $needed = max(0, 25 - $existing);

            for ($i = 0; $i < $needed; $i++) {
                KeyStock::create([
                    'product_id' => $product->id,
                    'key_code' => $this->generateKey(),
                    'status' => 'available',
                ]);
            }
        }
    }

    private function generateKey(): string
    {
        $segments = [];
        for ($i = 0; $i < 5; $i++) {
            $segments[] = strtoupper(Str::random(5));
        }

        return implode('-', $segments);
    }
}

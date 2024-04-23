<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LanguageSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            TypeSeeder::class,
            LessonSeeder::class,
            VocabularySeeder::class,
            KaiwaSeeder::class,
            GrammarSeeder::class,
            TestSeeder::class,
            QuestionSeeder::class,
            LessonUserSeeder::class,
            JapaneseAlphabetSeeder::class,
            AnswerSeeder::class,
            TestUserSeeder::class,
            PostSeeder::class,
            LikeSeeder::class,
            CommentSeeder::class,
            ViewSeeder::class
        ]);
    }
}

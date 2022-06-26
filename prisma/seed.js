#! /usr/local/bin/node

const { mealSeeder } = require( './seeders/mealSeeder' )

const seeders = [
  mealSeeder
]

seeders.forEach( async ( seeder ) => {
  await seeder()
})

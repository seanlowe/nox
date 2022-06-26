#! /usr/local/bin/node

const { PrismaClient } = require( '@prisma/client' )
const prisma = new PrismaClient()

const meals = [
  {
    name: 'Cereal',
    type: 'Breakfast',
    lastMade: null,
  },
  {
    name: 'Toast',
    type: 'Breakfast',
    lastMade: null,
  },
  {
    name: 'Sandwiches',
    type: 'Lunch',
    lastMade: null,
  },
  {
    name: 'Grilled Cheese',
    type: 'Lunch',
    lastMade: null,
  },
  {
    name: 'Pizza',
    type: 'Dinner',
    lastMade: null,
  },
  {
    name: 'Meatloaf',
    type: 'Dinner',
    lastMade: null,
  },
]

const mealSeeder = async () => {
  return prisma.meal.createMany({
    data: meals,
  })
}

module.exports.mealSeeder = mealSeeder

#! /usr/local/bin/node

const { db } = require( '../../utilities/scripts/js/check-db-connection' )

const meals = [
  {
    name: 'Cereal',
    type: 'Dinner',
    lastMade: null,
  },
  {
    name: 'Toast',
    type: 'Dinner',
    lastMade: null,
  },
  {
    name: 'Sandwiches',
    type: 'Dinner',
    lastMade: null,
  },
  {
    name: 'Grilled Cheese',
    type: 'Dinner',
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
  {
    name: 'Orange Chicken',
    type: 'Dinner',
    lastMade: null,
  },
]

const mealSeeder = async () => {
  return db.meal.createMany({
    data: meals,
  })
}

module.exports.mealSeeder = mealSeeder

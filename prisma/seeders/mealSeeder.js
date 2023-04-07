#! /usr/local/bin/node

const { db } = require( '../../utilities/js/check-db-connection' )

const meals = [
  {
    name: 'Cereal',
    type: 'dinner',
    lastMade: null,
  },
  {
    name: 'Toast',
    type: 'dinner',
    lastMade: null,
  },
  {
    name: 'Sandwiches',
    type: 'dinner',
    lastMade: null,
  },
  {
    name: 'Grilled Cheese',
    type: 'dinner',
    lastMade: null,
  },
  {
    name: 'Pizza',
    type: 'dinner',
    lastMade: null,
  },
  {
    name: 'Meatloaf',
    type: 'dinner',
    lastMade: null,
  },
  {
    name: 'Orange Chicken',
    type: 'dinner',
    lastMade: null,
  },
]

const mealSeeder = async () => {
  return db.meal.createMany({
    data: meals,
  })
}

module.exports.mealSeeder = mealSeeder

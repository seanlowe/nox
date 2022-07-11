#! /usr/local/bin/node

import { db } from '../../utilities/scripts/check-db-connection'

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
  return db.meal.createMany({
    data: meals,
  })
}

module.exports.mealSeeder = mealSeeder

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const handleGet = async ( req, res ) => {
  const { query } = req

  const meals = await prisma.meal.findMany({
    where: {
      ...query
    },
  })

  return res.status( 200 ).json({ meals })
}

const store = async ( req, res ) => {
  const { body } = req
  const {
    name,
    type,
  } = body

  const newMeal = {
    name,
    type,
    lastMade: null,
  }

  const meal = await prisma.meal.create({
    data: newMeal,
  })
  
  return meal
}


export default async function handler( req, res ) {
  switch ( req.method ) {
  case 'POST':
    return store( req, res )
  case 'GET':
    return handleGet( req, res )
  default:
    console.error( 'get fucked' )
    break
  }
  res.end()
}

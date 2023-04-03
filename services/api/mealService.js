import shell from 'shelljs'

const FREYR_STORAGE_PATH = './storage/freyr'

const checkWeekFileExists = () => {
  return shell.test( '-e', `${FREYR_STORAGE_PATH}/week.json` )
}

export const storeWeekToFile = ( data, isNewWeek, res ) => {
  // check if file exists, and if not, then create file and write
  // current week's meal schedule to it
  const weekExists = checkWeekFileExists()
  if ( !weekExists ) {
    shell.touch( `${FREYR_STORAGE_PATH}/week.json` )
    shell.echo( data ).to( `${FREYR_STORAGE_PATH}/week.json` )
  }

  if ( isNewWeek ) {
    // allow overwriting the week file with the new week
    shell.echo( data ).to( `${FREYR_STORAGE_PATH}/week.json` )
  }

  return res.status( 201 ).json({ message: 'success' })
}

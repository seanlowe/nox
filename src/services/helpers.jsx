export const convertCapitalizedObjectToLowercaseObject = ( obj ) => {
  if ( !obj ) {
    return {}
  }

  Object.keys( obj ).forEach(( key ) => {
    if ( typeof obj[key] === 'object' ) {
      convertCapitalizedObjectToLowercaseObject( obj[key] )
    }
    const newKey = key[0].toLowerCase() + key.slice( 1 )
    if ( newKey === key ) {
      return
    }

    obj[newKey] = obj[key]
    delete obj[key]
  })

  return obj
}

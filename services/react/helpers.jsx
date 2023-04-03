export const convertCapitalizedObjectToLowercaseObject = ( obj ) => {
  Object.keys( obj ).forEach(( key ) => {
    if ( typeof obj[key] === 'object' ) {
      convertCapitalizedObjectToLowercaseObject( obj[key] )
    }
    const newKey = key.toLowerCase()
    if ( newKey === key ) {
      return
    }

    obj[newKey] = obj[key]
    delete obj[key]
  })

  return obj
}

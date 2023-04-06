const webpack = require( 'webpack' )
const dotenv = require( 'dotenv' )

const { parsed: myEnv } = dotenv.config({
  path: './.env',
})

module.exports = {
  distDir: '../.next',
  webpack: ( config ) => {
    config.plugins.push( new webpack.EnvironmentPlugin( myEnv ))
      
    return config
  },
}

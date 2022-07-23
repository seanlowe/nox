// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [ {
    name: 'nox',
    script: 'npm run dev',
    log_date_format: 'MM/DD/YYYY HH:mm',
    error_file: './storage/logs/error.log',
    out_file: './storage/logs/info.log',
    watch: true,
    env: { NODE_ENV: 'development' }, // makes it start in dev mode when --env flag not passed
    env_dev: { NODE_ENV: 'development' },
    env_prod: { NODE_ENV: 'production' },
  } ]
}

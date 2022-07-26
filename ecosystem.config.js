// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [ {
    name: 'nox',
    script: 'npm run dev',
    // Logs
    log_date_format: 'MM/DD/YYYY HH:mm',
    error_file: './storage/logs/error.log',
    out_file: './storage/logs/info.log',
    // environment settings
    env: { NODE_ENV: 'development' }, // makes it start in dev mode when --env flag not passed
    env_dev: { NODE_ENV: 'development' },
    env_prod: { NODE_ENV: 'production' },
    // settings
    ignore_watch: [ './storage/*/*.log', './storage/*/*.json', 'node_modules', '.next', '.git' ],
    restart_delay: 1500,
    watch: true,
  } ]
}

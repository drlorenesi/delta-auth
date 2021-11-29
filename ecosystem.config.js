// If you are using an `.env` file,
// make sure it is on the same level as ecosystem.config.js file
module.exports = {
  apps: [
    {
      // General
      name: 'Node Auth',
      script: './apps/node-auth/src/server.js',
      watch: './apps/node-auth',
      watch_delay: 1000,
      ignore_watch: [
        './apps/node-auth/node_modules',
        './apps/node-auth/erros.log',
      ],
      // Advanced Features
      instances: 4,
      exec_mode: 'cluster',
      max_memory_restart: '300M',
      env: {
        ENTORNO: 'produccion',
        PORT: '9000',
      },
      // Log Files
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      merge_logs: true,
    },
  ],
};

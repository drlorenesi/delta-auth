// pm2 start/stop/restart ecosystem.config.js
// pm2 flush
module.exports = {
  apps: [
    {
      // General
      name: 'Backend',
      script: './src/server.js',
      // Advanced Features
      instances: 4,
      exec_mode: 'cluster',
      watch: true,
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

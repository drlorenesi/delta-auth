module.exports = {
  apps: [
    {
      // General
      name: 'Backend',
      script: './apps/backend/server.js',
      watch: './apps/backend',
      watch_delay: 1000,
      ignore_watch: [
        './apps/backend/node_modules',
        './apps/backend/.env',
        './apps/backend/erros.log',
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

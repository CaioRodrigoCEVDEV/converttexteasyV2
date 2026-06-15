require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'converttexteasy-v2',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/home/sites/converttexteasyV2',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3005,
      },
    },
  ],
};

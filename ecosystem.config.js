/*eslint-env node*/

module.exports = {
  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: '188.226.186.195',
      ref: 'origin/master',
      repo: 'git@bitbucket.org:valeriivasin/valeriivasin.com.git',
      path: '/var/www/valeriivasin.com',
      'post-deploy': 'yarn && yarn run build && /etc/init.d/nginx restart',
      env: {
        NODE_ENV: 'production'
      }
    }
  }
};

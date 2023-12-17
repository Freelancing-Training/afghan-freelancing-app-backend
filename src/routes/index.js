const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../config/config');
const freelancerRoutes = require('./freelancer.route');
const profileRoutes = require('./profile.route');
const jobsRoutes = require('./job.route');
const proposalRoutes = require('./proposal.route');
const offerRoutes = require('./offer.route');
const messageRoutes = require('./message.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/jobs',
    route: jobsRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
  {
    path: '/proposals',
    route: proposalRoutes,
  },
  {
    path: '/offers',
    route: offerRoutes,
  },
  {
    path: '/messages',
    route: messageRoutes,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

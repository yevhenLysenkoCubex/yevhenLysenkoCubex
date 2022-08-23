import paths from './paths';

import Home from 'pages/Home';

import Signup from 'pages/Signup';
import Signin from 'pages/Signin';
import Checkout from 'pages/Checkout';
import Confirmation from 'pages/Confirmation';
import Belonging from 'pages/Belonging';
import Authorization from 'pages/Authorization';

import Results from 'pages/Results';
import Slots from 'pages/Slots';
import Details from 'pages/Details';
import Payment from 'pages/Payment';

import Profile from 'pages/Profile';
import Booking from 'pages/Booking';

import Filter from 'components/Filter';

import { Testing } from 'pages/Testing';

const routes = [
  {
    path: paths().homepage,
    Component: Home,
    isPrivate: false,
    isRestricted: true,
  },
  {
    path: paths().auth,
    Component: Authorization,
    isPrivate: false,
    isRestricted: false,
  },
  {
    path: paths().signup,
    Component: Signup,
    isPrivate: false,
    isRestricted: true,
  },
  {
    path: paths().signin,
    Component: Signin,
    isPrivate: false,
    isRestricted: true,
  },
  {
    path: paths().checkout,
    Component: Checkout,
    isPrivate: false,
    isRestricted: true,
  },
  // Must be restricted!
  {
    path: paths().confirmation,
    Component: Confirmation,
    isPrivate: false,
    isRestricted: false,
  },
  {
    path: paths().belonging,
    Component: Belonging,
    isPrivate: false,
    isRestricted: false,
  },
  {
    path: paths().results,
    Component: Results,
    isPrivate: false,
    isRestricted: true,
  },
  {
    path: paths().resultsID,
    Component: Slots,
    isPrivate: false,
    isRestricted: true,
  },
  {
    path: paths().details,
    Component: Details,
    isPrivate: false,
    isRestricted: true,
  },
  {
    path: paths().payment,
    Component: Payment,
    isPrivate: false,
    isRestricted: false,
  },
  {
    path: paths().profile,
    Component: Profile,
    isPrivate: true,
    isRestricted: false,
  },
  {
    path: paths().booking,
    Component: Booking,
    isPrivate: true,
    isRestricted: false,
  },
  // For testing!
  {
    path: '/filter',
    Component: Filter,
    isPrivate: false,
    isRestricted: false,
  },
  {
    path: '/testing',
    Component: Testing,
    isPrivate: false,
    isRestricted: false,
  },
];

export default routes;

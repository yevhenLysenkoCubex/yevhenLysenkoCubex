const paths = (params?: Record<string, string>) => ({
  // Homepage
  homepage: '/',

  // Authorization
  auth: '/auth',
  signup: '/signup',
  signin: '/signin',
  checkout: '/checkout',
  confirmation: '/confirmation',
  profile: '/profile',

  // Results
  results: '/results',
  resultsID: `/results/${params?.ID || ':ID'}`,
  details: '/details',
  payment: '/payment',
  belonging: '/belonging',
  booking: '/booking',
});

export default paths;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

import routes from 'routes/data';

import Public from 'routes/Public';
import Private from 'routes/Private';

export const socket = io(
  'https://one-check-orchestrator-staging.herokuapp.com/events',
);

export const SocketContext = React.createContext<Socket>(socket);

const App = (): JSX.Element => {
  return (
    <SocketContext.Provider value={socket}>
      <Routes>
        {routes.map((route: any) => {
          const { path, isPrivate, isRestricted, Component } = route;
          return isPrivate ? (
            <Route
              path={path}
              key={path}
              element={
                <Private>
                  <Component />
                </Private>
              }
            />
          ) : (
            <Route
              path={path}
              key={path}
              element={
                <Public isRestricted={isRestricted}>
                  <Component />
                </Public>
              }
            />
          );
        })}
      </Routes>
      {/* <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results/:id" element={<Slots />} />
        <Route path="/details" element={<Details />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/user/checkout" element={<UserCheckout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/belonging" element={<Belonging />} /> */}
    </SocketContext.Provider>
  );
};

export default App;

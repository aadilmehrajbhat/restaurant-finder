import { hot } from 'react-hot-loader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '~/theme';
import RestaurantListing from '~/components/restaurant-listing';
import RestaurantDetail from '~/components/restaurant-detail';

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<RestaurantListing />} />
        <Route path="r/:id" element={<RestaurantDetail />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);

export default hot(module)(App);

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import _LayOut from './pages/LayOut';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={_LayOut}></Route>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

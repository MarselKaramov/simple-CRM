import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/processes/routing/config/router-config';
import { store } from './store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <ConfigProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;

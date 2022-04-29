import {container} from '../domain/container';
import './app.style.css';
import ContainerContext from './contexts/container.context';

import MainPage from './pages/main/main.page';

function App() {
  return (
    <ContainerContext.Provider value={container}>
      <div className="App">
        <MainPage />
      </div>
    </ContainerContext.Provider>
  );
}

export default App;

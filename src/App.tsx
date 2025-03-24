import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Layout from './components/Layout/Layout';
import CocktailList from './pages/CocktailList/CocktailList.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback';
import './styles/global.scss';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/margarita" replace />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/:cocktailCode" element={<CocktailList />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import ItemList from './pages/ItemList';
import ItemForm from './pages/ItemForm';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><ItemList /></PrivateRoute>} />
            <Route path="/items/new" element={<PrivateRoute><ItemForm /></PrivateRoute>} />
            <Route path="/items/:id/edit" element={<PrivateRoute><ItemForm /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
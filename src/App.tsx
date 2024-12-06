import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import { AuthProvider } from './context/AuthContext';
import FormularioPostagem from './components/postagens/formularioPostagem/FormularioPostagem';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import Perfil from './pages/perfil/Perfil';
import ListaPostagens from './components/postagens/listapostagens/ListaPostagens';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <AuthProvider>
      <ToastContainer/>
        <BrowserRouter>
        <ToastContainer/>
          <Navbar />
          <div className='min-h-[85vh]'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
              <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
              <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  );
}
export default App;
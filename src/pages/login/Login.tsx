import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import "./Login.css";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import { RotatingLines } from "react-loader-spinner";
import { GiAcousticMegaphone } from "react-icons/gi";

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin } = useContext(AuthContext);

  const { isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="flex bg-white items-center justify-center h-[93.5vh]">
      <div className="flex bg-grey-p w-[90vw] h-[80vh] rounded-3xl">
        <div className="flex w-screen p-4">
          <div className="flex items-center p-10 justify-center w-1/2">
            <div
              className="flex items-center justify-center w-full h-[25vw]
            bg-ilMegaphone bg-cover"
            ></div>
          </div>
          <div
            className="flex flex-col items-center justify-center w-1/2 h-full 
          bg-white rounded-2xl"
          >
            <div className="flex flex-col items-center mt-10 w-full h-full">
              
              <GiAcousticMegaphone className="w-20 h-20 mb-16" />

              <div className="flex flex-col items-center justify-center mb-16 gap-4">
                <h1 className="text-slate-900 text-5xl font-medium">
                  Bem vindo!
                </h1>
                <p>Preencha as credenciais para acessar.</p>
              </div>

              <form
                className="flex justify-center items-center flex-col w-full px-12"
                onSubmit={login}
              >
                <div className="flex flex-col w-full">
                  <label htmlFor="usuario" className="font-semibold">
                    Usuário
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Meu usuario..."
                    className="border-b-2 border-slate-700 p-2 mb-10 font-light"
                    value={usuarioLogin.usuario}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="senha" className="font-semibold">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="senha"
                    name="senha"
                    placeholder="Minha senha..."
                    className="border-b-2 border-slate-700 p-2 mb-10 font-light"
                    value={usuarioLogin.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-black text-white w-full py-2 flex justify-center"
                >
                  {isLoading ? (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  ) : (
                    <span>Entrar</span>
                  )}
                </button>

                <p className="flex mt-16 gap-2 font-normal">
                  Ainda não tem uma conta?
                  <Link
                    to="/cadastro"
                    className="font-semibold text-indigo-800 hover:underline"
                  >
                    Cadastre-se
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

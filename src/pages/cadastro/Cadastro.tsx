/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../../models/Usuario";
import { cadastrarUsuario } from "../../services/Service";
import "./Cadastro.css";
import { toastAlerta } from "../../utils/toastAlerta";
import { GiAcousticMegaphone } from "react-icons/gi";

function Cadastro() {
  // eslint-disable-next-line prefer-const
  let navigate = useNavigate();

  const [confirmaSenha, setConfirmaSenha] = useState<string>("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
  });

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
  });

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      back();
    }
  }, [usuarioResposta]);

  function back() {
    navigate("/login");
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        await cadastrarUsuario(
          `/usuarios/cadastrar`,
          usuario,
          setUsuarioResposta
        );
        toastAlerta("Usuário cadastrado com sucesso", "sucesso");
      } catch (error) {
        toastAlerta("Erro ao cadastrar o Usuário", "erro");
      }
    } else {
      toastAlerta(
        "Dados inconsistentes. Verifique as informações de cadastro.",
        "info"
      );
      setUsuario({ ...usuario, senha: "" }); // Reinicia o campo de Senha
      setConfirmaSenha(""); // Reinicia o campo de Confirmar Senha
    }
  }

  return (
    <div className="flex bg-white items-center justify-center h-[87vh]">
      <div className="flex bg-grey-p w-[90vw] h-[80vh] rounded-3xl">
        <div className="flex w-screen p-4">
          <div className="flex items-center p-8 justify-center w-1/2">
            <div
              className="flex items-center justify-center w-full h-[20vw]
            bg-ilSingin bg-cover"
            ></div>
          </div>
          <div
            className="flex flex-col items-center justify-center w-1/2 h-full
          bg-white rounded-2xl"
          >
            <div className="flex flex-col items-center w-full h-full p-8">
              <GiAcousticMegaphone className="w-20 h-20 mb-16" />

              <div className="flex flex-col items-center justify-center mb-10 gap-4">
                <h1 className="text-slate-900 text-5xl font-medium">
                  Cadastre-se!
                </h1>
                <p>Faça o seu registro e ajude Mogi das Cruzes.</p>
              </div>

              <form
                className="flex justify-center items-center flex-col w-full gap-3"
                onSubmit={cadastrarNovoUsuario}
              >
                <div className="flex flex-col w-full">
                  <label htmlFor="nome" className="font-semibold">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Seu nome..."
                    className="border-b-2 border-slate-700 p-2 mb-2 font-light"
                    value={usuario.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="usuario" className="font-semibold">
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Usuario"
                    className="border-b-2 border-slate-700 p-2 mb-2 font-light"
                    value={usuario.usuario}
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
                    placeholder="Senha"
                    className="border-b-2 border-slate-700 p-2 mb-2 font-light"
                    value={usuario.senha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="confirmarSenha" className="font-semibold">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    placeholder="Confirmar Senha"
                    className="border-b-2 border-slate-700 p-2 mb-2 font-light"
                    value={confirmaSenha}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleConfirmarSenha(e)
                    }
                  />
                </div>
                <div className="flex flex-col justify-around w-full gap-3 mt-10">
                  <button
                    className="flex items-center justify-center rounded-2xl 
                    text-white bg-black w-full py-3"
                    type="submit"
                  >
                    Cadastrar
                  </button>
                  <button
                    className="flex items-center justify-center rounded-2xl 
                    text-white bg-QUEIMADA w-full py-3"
                    onClick={back}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;

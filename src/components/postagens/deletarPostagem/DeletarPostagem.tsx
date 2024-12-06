/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar, deletar } from "../../../services/Service";
import { toastAlerta } from "../../../utils/toastAlerta";
import { IoCloseSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

function DeletarPostagem() {
  const [postagem, setPostagem] = useState<Postagem>({} as Postagem);
  const [colorBg, setColorBg] = useState<string>();

  // eslint-disable-next-line prefer-const
  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (postagem) {
      setColorBg(
        postagem.tag === "INUNDACAO"
          ? "#04357E"
          : postagem.tag === "ALAGAMENTO"
          ? "#0561B6"
          : postagem.tag === "QUEIMADA"
          ? "#960000"
          : ""
      );
    }
  }, [postagem]);

  const styleBgColor = {
    backgroundColor: colorBg,
  };

  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function retornar() {
    navigate("/home");
  }

  async function deletarPostagem() {
    try {
      await deletar(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toastAlerta("Postagem apagada com sucesso", "sucesso");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toastAlerta("Erro ao apagar a postagem", "erro");
    }

    retornar();
  }
  return (
    <div className="container w-full mx-auto flex flex-col items-center mt-20">
      <div className="flex w-full justify-end">
        <Link to="/home">
          <IoCloseSharp className="w-8 h-8" />
        </Link>
      </div>

      <h1 className="text-4xl text-center my-4 font-semibold">
        Deletar postagem
      </h1>

      <p className="text-center font-normal mb-4">
        Você tem certeza de que deseja apagar a postagem a seguir?
      </p>

      {postagem.tag && (
        <div className="flex flex-col w-full py-10 px-20">
          <div
            className="flex flex-col w-full rounded-md overflow-hidden 
          shadow-xl border border-grey-s/15 p-4 gap-4"
          >
            <div className="flex justify-end">
              <p
                className="rounded-xl px-2 font-semibold text-white"
                style={styleBgColor}
              >
                {postagem.tag}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-semibold">Endereço:</p>

              <div
                className="flex w-full bg-grey-s/20 items-center gap-3 px-2
              rounded-2xl break-words"
              >
                <FaLocationDot className="text-black" />
                <p>
                  {postagem.rua}, {postagem.numero} - {postagem.bairro}
                </p>
              </div>
            </div>

            <div className="flex flex-col break-words">
              <p className="font-semibold">Postagem:</p>

              <div className="flex px-4 gap-2">
                <p className="font-semibold">Titulo:</p>
                <p>{postagem.titulo}</p>
              </div>

              <div className="flex px-4 gap-2">
                <p className="font-semibold">Texto:</p>
                <p>{postagem.texto}</p>
              </div>

              <div className="flex px-4 gap-2">
                <p className="font-semibold">Data da postagem:</p>
                <p>
                  {new Intl.DateTimeFormat(undefined, {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date(postagem.data))}
                </p>
              </div>
            </div>

            <div className="flex flex-col break-words">
              <p className="font-semibold">Usuário:</p>

              <div className="flex px-4 gap-2">
                <p className="font-semibold">Nome:</p>
                <p>{postagem.usuario?.nome}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-20 mt-10">
        <button
          className="w-full px-8 py-2 bg-black font-bold text-white rounded-2xl"
          onClick={deletarPostagem}
        >
          Sim
        </button>

        <button
          className="w-full px-8 py-2 bg-QUEIMADA font-bold text-white rounded-2xl"
          onClick={retornar}
        >
          Não
        </button>
      </div>
    </div>
  );
}

export default DeletarPostagem;

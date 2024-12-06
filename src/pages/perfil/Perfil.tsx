/* eslint-disable prefer-const */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import loginLogo from "../../assets/capa.jpg";
import { toastAlerta } from "../../utils/toastAlerta";
import ListaPostagensPerfil from "../../components/postagens/listapostagens/ListaPostagensPerfil";
import { RiAccountCircleFill } from "react-icons/ri";

function Perfil() {
  let navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      toastAlerta("Você precisa estar logado", "info");
      navigate("/login");
    }
  }, [usuario.token]);

  return (
    <div className="container w-full mt-4 rounded-2xl overflow-hidden flex">
      <div className="flex flex-col ml-8 mt-20 break-words">
        <div className="flex flex-col w-full bg-grey-p p-6 rounded-xl gap-4">
          <div className="flex gap-2 items-center">
            <RiAccountCircleFill className="w-12 h-12 text-grey-s" />
            <p className="font-bold">{usuario.nome}</p>
          </div>

          <div className="flex gap-3">
            <p className="font-bold">Email:</p>
            <p>{usuario.usuario}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-4xl">Minhas publicações</h1>
        <ListaPostagensPerfil idUser={usuario.id} />
      </div>
    </div>
  );
}

export default Perfil;

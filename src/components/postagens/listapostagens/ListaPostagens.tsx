/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagens/CardPostagens";
import { toastAlerta } from "../../../utils/toastAlerta";

function ListaPostagens() {
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  // eslint-disable-next-line prefer-const
  // let navigate = useNavigate();

  const { handleLogout } = useContext(AuthContext);
  // const token = usuario.token;

  // useEffect(() => {
  //   if (token === '') {
  //     toastAlerta('Você precisa estar logado', 'info');
  //     navigate('/');
  //   }
  // }, [token]);

  async function buscarPostagens() {
    try {
      await buscar("/postagens", setPostagens);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        toastAlerta("O token expirou, favor logar novamente", "info");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarPostagens();
  }, [postagens.length]);
  return (
    <>
      {postagens.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div
        className="flex w-[100vw] justify-items-center my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
      >
        {postagens.map((postagem) => (
          <CardPostagem key={postagem.id} post={postagem} />
        ))}
      </div>
    </>
  );
}

export default ListaPostagens;

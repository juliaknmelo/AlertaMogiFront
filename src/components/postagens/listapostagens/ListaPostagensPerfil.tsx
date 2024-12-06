/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";
import Postagem from "../../../models/Postagem";
import { buscarPerfil } from "../../../services/Service";
import CardPostagem from "../cardpostagens/CardPostagens";
import { toastAlerta } from "../../../utils/toastAlerta";

interface ListaPostagensPerfilProps {
    idUser: number
}


function ListaPostagens({idUser}: ListaPostagensPerfilProps) {
  const [postagens, setPostagens] = useState<Postagem[]>([]);

  const [postUser, setPostUser] = useState<Postagem[]>([]);

  useEffect(() => {
    const filterPost: Postagem[] = postagens.filter(post => { return (post.usuario?.id === idUser)});

    setPostUser(filterPost);

  }, [postagens])

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
      await buscarPerfil("/postagens", setPostagens);
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
      {postUser.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="pl-8 pr-8 mx-auto my-4 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {postUser.map((postagem) => (
            <CardPostagem key={postagem.id} post={postagem} />
        ))}
      </div>
    </>
  );
}

export default ListaPostagens;

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Postagem from "../../../models/Postagem";
import { AuthContext } from "../../../context/AuthContext";
import { FaLocationDot } from "react-icons/fa6";
import INUNDACAO from "../../../assets/INUNDACAO.jpg";
import ALAGAMENTO from "../../../assets/ALAGAMENTO.jpg";
import QUEIMADA from "../../../assets/QUEIMADA.jpg";

interface CardPostagemProps {
  post: Postagem;
}

function CardPostagem({ post }: CardPostagemProps) {
  const { usuario } = useContext(AuthContext);

  let cardComponent;
  const url: string =
    post.tag === "INUNDACAO"
      ? INUNDACAO
      : post.tag === "ALAGAMENTO"
      ? ALAGAMENTO
      : post.tag === "QUEIMADA"
      ? QUEIMADA
      : "";
  const colorBg =
    post.tag === "INUNDACAO"
      ? "#04357E"
      : post.tag === "ALAGAMENTO"
      ? "#0561B6"
      : post.tag === "QUEIMADA"
      ? "#960000"
      : "";

  const styleBgImage = {
    backgroundImage: `url(${url})`,
  };

  const styleBgColor = {
    backgroundColor: colorBg,
  };

  console.log(post.tag);

  if (usuario.token !== "" && usuario.id == post.usuario?.id) {
    cardComponent = (
      <div
        className="font-padrão flex flex-col rounded-md overflow-hidden 
      hover:shadow-xl w-[45vw] mt-4 max-w-[500px]"
      >
        <div className={`flex w-full h-[250px] bg-cover`} style={styleBgImage}>
          <div className="w-full flex justify-end p-4">
            <p
              className={`flex h-6 rounded-lg p-2 items-center text-txt-white 
                font-bold`}
              style={styleBgColor}
            >
              {post.tag}
            </p>
          </div>
        </div>

        <div className={`p-4 rounded-md`} style={styleBgColor}>
          <div className="flex flex-col px-4 items-center"></div>
          <div>
            {/* Card novo daqui para baixo */}

            <div
              className="flex gap-2 items-center bg-silver rounded-lg 
            px-2"
            >
              <FaLocationDot className="text-txt-white" />

              <p className="text-txt-white">
                {post.rua}, {post.numero} - {post.bairro}
              </p>
            </div>

            <div className="mt-6 break-words">
              <p className="text-txt-white">{post.texto}</p>
            </div>

            <div className="mt-6">
              <p className="text-lg font-bold text-txt-white">
                Postado por: {post.usuario?.nome}
              </p>
            </div>

            <div className="flex justify-end">
              <p className="text-txt-white">
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(post.data))}
              </p>
            </div>

            {/* Card novo daqui para cima */}
          </div>
        </div>
        {/* Apacere só logado */}
        <div className={`flex text-left text-txt-white`} style={styleBgColor}>
          <Link
            to={`/editarPostagem/${post.id}`}
            className=" pl-4 text-white bg-indigo-400 hover:bg-indigo-800 flex 
            py-2"
          >
            <button>Editar</button>
          </Link>
          <Link
            to={`/deletarPostagem/${post.id}`}
            className="pl-4 text-white bg-red-400 hover:bg-red-700 w-20 flex"
          >
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    );
  } else
    cardComponent = (
      <div
        className="font-padrão flex flex-col rounded-md overflow-hidden 
      hover:shadow-xl w-[45vw] mt-4 max-w-[500px]"
      >
        <div className={`flex w-full h-[250px] bg-cover`} style={styleBgImage}>
          <div className="w-full flex justify-end p-4">
            <p
              className={`flex h-6 rounded-lg p-2 items-center text-txt-white 
                font-bold`}
              style={styleBgColor}
            >
              {post.tag}
            </p>
          </div>
        </div>

        <div className={`p-4 rounded-md`} style={styleBgColor}>
          <div className="flex flex-col px-4 items-center"></div>
          <div>
            {/* Card novo daqui para baixo */}

            <div
              className="flex gap-2 items-center bg-silver rounded-lg 
            px-2"
            >
              <FaLocationDot className="text-txt-white" />

              <p className="text-txt-white">
                {post.rua}, {post.numero} - {post.bairro}
              </p>
            </div>

            <div className="mt-6 break-words">
              <p className="text-txt-white">{post.texto}</p>
            </div>

            <div className="mt-6">
              <p className="text-lg font-bold text-txt-white">
                Postado por: {post.usuario?.nome}
              </p>
            </div>

            <div className="flex justify-end">
              <p className="text-txt-white">
                {new Intl.DateTimeFormat(undefined, {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date(post.data))}
              </p>
            </div>

            {/* Card novo daqui para cima */}
          </div>
        </div>
      </div>
    );

  return <>{cardComponent}</>;
}

export default CardPostagem;

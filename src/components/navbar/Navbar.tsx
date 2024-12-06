import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toastAlerta } from "../../utils/toastAlerta";
import ModalPostagem from "../postagens/modalPostagem/ModalPostagem";
import { GiAcousticMegaphone } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { MdAccountCircle, MdOutlineLogout } from "react-icons/md";

function Navbar() {
  // eslint-disable-next-line prefer-const
  let navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);

  function logout() {
    handleLogout();
    toastAlerta("Usuário deslogado com sucesso", "sucesso");
    navigate("/login");
  }

  let navbarComponent;

  if (usuario.token !== "") {
    navbarComponent = (
      <div className="w-full  bg-grey text-black flex justify-center py-4 px-4 font-padrão">
        <div className="container flex justify-between text-lg">
          <Link
            to="/home"
            className="flex gap-3 items-center justify-center text-3xl font-bold uppercase"
          >
            ALERTA MOGI
            <GiAcousticMegaphone />
          </Link>

          <div className="flex gap-6">
            <div className="flex items-center justify-center gap-2 
            p-2 hover:bg-grey-s hover:rounded-xl">
              <FaPlus className="w-5 h-5"/>
              <ModalPostagem />
            </div>
            <Link to="/perfil" className="flex items-center justify-center gap-2 
            p-2 hover:bg-grey-s hover:rounded-xl">
              <MdAccountCircle className="w-6 h-6"/>
              Perfil
            </Link>
            <Link to="" onClick={logout} className="flex items-center justify-center gap-2 
            p-2 hover:bg-grey-s hover:rounded-xl">
              <MdOutlineLogout className="w-6 h-6"/>
              Sair
            </Link>
          </div>
        </div>
      </div>
    );
  } else
    navbarComponent = (
      <div className="w-full  bg-grey text-black flex justify-center py-4 px-4 font-padrão">
        <div className="container flex justify-between text-lg">
          <Link
            to="/home"
            className="flex gap-3 items-center text-3xl font-bold uppercase"
          >
            ALERTA MOGI
          </Link>

          <div
            className="flex w-auto hover:bg-[#939393]/50 hover:rounded-xl 
          px-4 items-center font-semibold"
          >
            <Link to="/login" className="">
              Login
            </Link>
          </div>
        </div>
      </div>
    );

  return <>{navbarComponent}</>;
}

export default Navbar;

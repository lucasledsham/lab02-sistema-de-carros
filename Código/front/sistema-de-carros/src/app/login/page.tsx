import React from "react";
import Navbar from "@/components/navbar";
import CadastroForm from "./_form";

export default function Page() {
  return (
    <>
      <Navbar
              links={[
                { href: "/registro", title: "Criar conta" },
                
                
              ]}
              className=""
            />
      <h1 className="p-8 text-center text-6xl">Locadora "Azilacol"</h1>
      <CadastroForm />
    </>
  );
}
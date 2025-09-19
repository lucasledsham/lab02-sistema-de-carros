import React from "react";
import Navbar from "@/components/navbar";
import CadastroForm from "./_form";

export default function Page() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className="p-8 text-center text-6xl">Locadora "inserir"</h1>
      <CadastroForm />
    </>
  );
}
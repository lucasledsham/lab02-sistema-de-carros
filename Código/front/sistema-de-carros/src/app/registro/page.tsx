import React from "react";
import Navbar from "@/components/navbar";
import CadastroForm from "./_form";

export default function Page() {
  return (
    <>
      <Navbar></Navbar>
      <h1 className=" text-center text-6xl mt-12">Locadora azilacol</h1>
      <CadastroForm />
    </>
  );
}
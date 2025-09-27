"use client";
import React, { useRef } from "react";
import Navbar from "@/components/navbar";
import CadastroForm from "./_form";
import ListaPedidos from "./_lista";

export default function Page() {
  const listaRef = useRef<{ carregarPedidos: () => void }>(null);

  const handlePedidoCadastrado = () => {
    // Recarregar lista quando um Pedido for cadastrado
    if (listaRef.current) {
      listaRef.current.carregarPedidos();
    }
  };
  return (
    <>
      <Navbar
        links={[
          { href: "/alugar", title: "Alugar" },
          
          { href: "/login", title: "Sair" },
        ]}
        className=""
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-center mb-2">Gestão de Pedidos</h1>
          <p className="text-muted-foreground text-center">
            Faça seus pedidos e gerencie-os facilmente
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário de Cadastro */}
          <div className="order-2 lg:order-1">
            <CadastroForm onPedidoCadastrado={handlePedidoCadastrado} />
          </div>
          
          {/* Lista de Pedidos */}
          <div className="order-1 lg:col-span-2">
            <ListaPedidos ref={listaRef} />
          </div>
        </div>
      </div>
    </>
  );
}
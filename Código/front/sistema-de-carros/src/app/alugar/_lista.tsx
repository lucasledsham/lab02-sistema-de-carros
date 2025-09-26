"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, DollarSign,  Edit, Trash2, Car, CarFront } from "lucide-react";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import { pedidosAPI } from "@/lib/api";
import EditPedidosModal from "./_edit-modal";

export interface Pedido {
  id: number;
  carro: string;
  preco: number;
  data: Date;
  duracao?: number;
}

export interface Carro{
  id: number;
  modelo: string;
  cor: string;
  preco: number;
  disponivel: boolean;
}

const ListaPedidos = forwardRef<{ carregarPedidos: () => void }, {}>((props, ref) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar produtos da API
  const carregarPedidos = async () => {
    try {
      setIsLoading(true);
      console.log("=== CARREGANDO PEDIDOS DA API ===");
      const pedidosDaAPI = await pedidosAPI.listar();
      console.log("pedidos carregados da API:", pedidosDaAPI);
      console.log("Quantidade de pedidos:", pedidosDaAPI.length);
      
      // Mapear dados da API para o formato esperado
      const pedidosMapeados = pedidosDaAPI.map((pedidos: any, index: number) => {
        console.log(`Mapeando pedidos ${index + 1} da API:`, pedidos);
        
                // Mapear campos do backend para o frontend
                const pedidosMapeado = {
                  id: pedidos.id || (index + 1),
                  nome: pedidos.nome || `pedidos ${index + 1}`,
                  carro: pedidos.carro || "Carro",
                  preco: parseFloat(pedidos.preco || 0),
                  data: new Date(pedidos.data) || new Date(),
                };
        
        console.log(`pedidos ${index + 1} mapeado:`, pedidosMapeado);
        return pedidosMapeado;
      });
      
      console.log("Pedidos mapeados:", pedidosMapeados);
      setPedidos(pedidosMapeados);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
      setPedidos([
        { id: 1, carro: "Fox", preco: 100, data: new Date(), duracao: 7 },
        { id: 2, carro: "Gol", preco: 200, data: new Date(), duracao: 14 },
        { id: 2, carro: "Ford Ka", preco: 100, data: new Date(), duracao: 14 }
      ]);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  // Expor função para o componente pai
  useImperativeHandle(ref, () => ({
    carregarPedidos
  }));

  const formatPreco = (preco: number) => {
    const precoNumerico = typeof preco === 'number' ? preco : parseFloat(preco) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(precoNumerico);
  };

  const handleEdit = (pedido: Pedido) => {
    console.log("Abrindo edição para pedido:", pedido);
    setEditingPedido(pedido);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingPedido(null);
    setIsEditModalOpen(false);
  };

  const handlePedidoEditado = () => {
    console.log("=== PEDIDO EDITADO - RECARREGANDO LISTA ===");
    console.log("Pedido editado com sucesso!");
    // Recarregar lista após edição
    carregarPedidos();
    console.log("Lista recarregada!");
  };

  const handleDelete = async (id: number) => {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      try {
        await pedidosAPI.excluir(id);
        console.log("Pedido excluído com sucesso!");
        alert("Pedido excluído com sucesso!");
        // Recarregar lista após exclusão
        carregarPedidos();
      } catch (error) {
        console.error("Erro ao excluir pedido:", error);
        alert(`Erro ao excluir pedido: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      }
    }
  };

  return (
    <Card className="w-full  border-0 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 ">
            <CarFront className="h-8 w-8 text-black" />
            Lista de Pedidos ({pedidos.length})
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={carregarPedidos}
            className=""
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 ">
            <RefreshCw className="h-12 w-12 mx-auto mb-4 animate-spin " />
            <p>Carregando pedidos...</p>
          </div>
        ) : pedidos.length === 0 ? (
          <div className="text-center py-8 ">
            <Car className="h-8 w-8 text-black" />
            <p>Nenhum pedido cadastrado</p>
            <p className="text-sm">Cadastre o primeiro pedido usando o formulário ao lado</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pedidos.map((pedido, index) => (
              <div
                key={pedido.id}
                className="border  rounded-xl p-4  transition-all duration-200 hover:shadow-sm "
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8  rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold ">
                          {typeof pedido.id === 'number' ? pedido.id : (index + 1)}
                        </span>
                      </div>
                      
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-700">{formatPreco(pedido.preco)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        
                        <span className="">Veiculo:</span>
                        <span className="font-medium ">{pedido.carro || "Carro"}</span>
                        
                        
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        
                        <span className="">Inicio/Duração:</span>
                        <span className="font-medium ">{pedido.data ? new Date(pedido.data).toLocaleDateString() : ""}</span>
                        <span className="font-medium ">{pedido.duracao} dias</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(pedido)}
                      className=""
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(pedido.id)}
                      className="text-red-600 hover:text-red-700 border-red-300 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Modal de Edição */}
      <EditPedidosModal
        pedido={editingPedido}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onPedidoEditado={handlePedidoEditado}
      />
    </Card>
  );
});

ListaPedidos.displayName = "ListaPedidos";

export default ListaPedidos;

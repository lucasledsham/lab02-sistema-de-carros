"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, CarFront, DollarSign, } from "lucide-react";
import { useState, useEffect } from "react";
import { pedidosAPI } from "@/lib/api";
import { Pedido } from "./_lista";
import { Card } from "@/components/ui/card";

const editPedidoSchema = z.object({
  carro: z.string().min(3, "O nome do carro deve ter pelo menos 3 caracteres"),
  preco: z.number().min(0, "O preço deve ser um número positivo"),
  duracao: z.number().min(1, "A duração deve ser pelo menos 1 dia"),
}).refine((data) => {
  console.log("Validação do schema:", data);
  return true;
});



interface EditPedidoModalProps {
  pedido: Pedido | null;
  isOpen: boolean;
  onClose: () => void;
  onPedidoEditado: () => void;
}

export default function EditPedidosModal({
  pedido,
  isOpen,
  onClose,
  onPedidoEditado,
}: EditPedidoModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof editPedidoSchema>>({
    resolver: zodResolver(editPedidoSchema),
    defaultValues: {
      carro: "",
      preco: 0,
      duracao: 1,

      
    },
  });

  // Atualizar valores do formulário quando o pedido mudar
  useEffect(() => {
    if (pedido) {
      console.log("=== CARREGANDO pedido NO MODAL ===");
      console.log("Pedido recebido no modal:", pedido);
      
      const valoresFormulario = {
        carro: pedido.carro || "",
        preco: pedido.preco || 0,
        duracao: pedido.duracao || 1,

      };
      
      console.log("Valores do formulário preparados:", valoresFormulario);
      
      // Resetar o formulário com os novos valores
      form.reset(valoresFormulario);
      
      console.log("Formulário atualizado. Valores atuais:", form.getValues());
    }
  }, [pedido, form]);

  const onSubmit = async (values: z.infer<typeof editPedidoSchema>) => {
    console.log("=== INÍCIO DA EDIÇÃO ===");
    console.log("onSubmit chamado com valores:", values);
    console.log("pedido atual:", pedido);
    console.log("Form state:", form.formState);
    console.log("Form values:", form.getValues());
    
    if (!pedido) {
      console.log("Nenhum pedido selecionado");
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("Editando pedido:", { id: pedido.id, ...values });
      
      // Preparar dados para o backend (mapear para os campos corretos)
      const dadosPedido = {
        carro: values.carro,
        preco: values.preco,
        duracao: values.duracao,

      };
      
      console.log("Dados preparados para envio:", dadosPedido);
      console.log("URL da API:", `http://localhost:9090/pedidos/${pedido.id}`);
      
      // Testar se a API está funcionando
      console.log("Testando conexão com API...");
      
      // Chamar API real
      const resultado = await pedidosAPI.atualizar(pedido.id, dadosPedido);
      console.log("Resposta da API:", resultado);
      
      // Verificar se a atualização foi bem-sucedida
      if (resultado) {
        console.log("✅ pedido atualizado com sucesso!");
      } else {
        console.log("⚠️ Resposta vazia da API");
      }
      
      console.log("pedido editado com sucesso no backend!");
      
      // Recarregar lista após edição
      onPedidoEditado();
      
      alert("pedido editado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao editar pedido:", error);
      console.error("Detalhes do erro:", error);
      alert(`Erro ao editar pedido: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Card>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md  border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 ">
            <CarFront className="h-8 w-8 text-black" />
            Editar pedido
          </DialogTitle>
          <DialogDescription className="">
            Atualize as informações do pedido selecionado
          </DialogDescription>
        </DialogHeader>

      
        <Form {...form}>
          <form onSubmit={(e) => {
            console.log("Form submit event triggered");
            e.preventDefault();
            form.handleSubmit(onSubmit)(e);
          }} className="space-y-4">
            <FormField
              control={form.control}
              name="carro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-semibold text-sm mb-2 block">Nome do carro *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Novo carro" 
                      className="bg-white rounded-lg h-11 transition-all duration-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="preco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2  font-semibold text-sm mb-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      Preço *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2  text-sm font-medium">
                          R$
                        </span>
                        <Input 
                          placeholder="0,00" 
                          type="number" 
                          step="0.01"
                          className="pl-8 bg-white rounded-lg h-11 transition-all duration-200"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="duracao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2  font-semibold text-sm mb-2">
                      
                      Duração*
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        
                        <Input 
                          placeholder="0,00" 
                          type="number" 
                          step="0.01"
                          className="pl-8 bg-white rounded-lg h-11 transition-all duration-200"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
                
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className=""
              >
                Cancelar
              </Button>
              
              
              <Button
                type="submit"
                disabled={isLoading}
                onClick={() => {
                  console.log("Botão Salvar clicado");
                  console.log("Form state:", form.formState);
                  console.log("Form values:", form.getValues());
                }}
                className=" text-white font-semibold"
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
            
            
          </form>
        </Form>
        
      </DialogContent>
    </Dialog>
    </Card>
  );
}

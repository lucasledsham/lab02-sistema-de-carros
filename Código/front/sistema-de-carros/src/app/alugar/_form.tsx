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
import { Car, DollarSign, Package } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pedidosAPI } from "@/lib/api";

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
</head>;

const formSchema = z
  .object({
    carro: z.string().min(3, "O nome do carro deve ter pelo menos 3 caracteres"),
    preco: z.number().min(0, "O preço deve ser um número positivo"),
    data: new Date(),
    duracao: z.number().min(1, "A duração deve ser pelo menos 1 dia"),
    
  })
  

interface CadastroFormProps {
  onPedidoCadastrado?: () => void;
}

export default function CadastroForm({ onPedidoCadastrado }: CadastroFormProps) {
  //const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carro: "",
      preco: 0,
      duracao: 1,
      data: new Date(),
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Cadastrando pedido:", values);
      
              // Preparar dados para o backend (mapear para os campos corretos)
              const dadosPedido = {
                nome: values.carro,
                preco: values.preco,
                data: (values.data as Date).toISOString(),
                duracao: values.duracao,
              };
      
      console.log("Dados preparados para cadastro:", dadosPedido);
      
      console.log("Enviando para API:", dadosPedido);
      
      // Chamar API real
      await pedidosAPI.criar(dadosPedido);
      
      console.log("Pedido cadastrado com sucesso no backend!");
      alert("Pedido cadastrado com sucesso!");
      form.reset();
      // Notificar componente pai para recarregar lista
      onPedidoCadastrado?.();
    } catch (error) {
      console.error("Erro ao cadastrar pedido:", error);
      alert(`Erro ao cadastrar pedido: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }
  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-0 ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardHeader className="pb-6 text-center">
            <div className="mx-auto w-16 h-16  rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Car className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-2xl font-bold  mb-2">Cadastro de pedido</h1>
            <p className="text-sm ">
              Preencha os dados do pedido para cadastrá-lo no sistema
            </p>
          </CardHeader>

          <CardContent className="space-y-6 px-6">
            <FormField
              control={form.control}
              name="carro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" font-semibold text-sm mb-2 block">
                    Nome do pedido *
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Digite o nome do pedido" 
                      className="bg-white rounded-lg h-11 transition-all duration-200"
                      {...field}
                      aria-describedby={form.formState.errors.carro ? "carro-error" : undefined}
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
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm font-medium">
                          R$
                        </span>
                        <Input 
                          placeholder="0,00" 
                          type="number" 
                          step="0.01"
                          className="pl-8 bg-white rounded-lg h-11 transition-all duration-200"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          aria-describedby={form.formState.errors.preco ? "preco-error" : undefined}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duracao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2  font-semibold text-sm mb-2">
                      Duração *
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="0" 
                          type="number" 
                          step="1"
                          className="pl-8 bg-white rounded-lg h-11 transition-all duration-200"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          aria-describedby={form.formState.errors.duracao ? "duracao-error" : undefined}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="data"
              render={({ field:{onChange,...field} }) => (
                <FormItem>
                  <FormLabel>Dia *</FormLabel>
                  <FormControl>
                    
                    <Input className="w-[180px]"
                      placeholder=""
                      type="date"
                      {...field}
                      onChange={(e) => onChange(new Date(e.target.value))}
                      value={field.value && (typeof field.value === "string" || typeof field.value === "number" || field.value instanceof Date)
                        ? new Date(field.value).toISOString().split('T')[0]
                        : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            
            
          </CardContent>

          <CardFooter className="flex justify-center pt-6 pb-6">
            <Button 
              type="submit" 
              className="w-full max-w-xs  text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
            >
              <Car className="h-8 w-8 text-white" />
              Alugar carro
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

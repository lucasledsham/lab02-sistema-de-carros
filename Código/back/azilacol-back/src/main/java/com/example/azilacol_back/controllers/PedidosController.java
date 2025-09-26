package com.example.azilacol_back.controllers;

import com.example.azilacol_back.dtos.PedidoDTO;
import com.example.azilacol_back.models.Pedido;
import com.example.azilacol_back.repositories.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RequestMapping("/pedidos")
@RequiredArgsConstructor
@Validated
@RestController
public class PedidosController {

    private final PedidoRepository pedidoRepository;

    @PostMapping("")
    public ResponseEntity<?> cadastrarPedido(@RequestBody PedidoDTO pedidoDTO){
        Pedido novoPedido = Pedido.builder()
                .nome(pedidoDTO.nome())
                .preco(pedidoDTO.preco())
                .data(pedidoDTO.data())
                .duracao(pedidoDTO.duracao())
                .build();

        pedidoRepository.save(novoPedido);

        return ResponseEntity.ok().body(novoPedido.getId());
    }

    @PutMapping("{id}")
    public ResponseEntity<?> editarPedido(@PathVariable String id, @RequestBody PedidoDTO pedidoDTO){
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));

        pedido.setNome(pedido.getNome());
        pedido.setDuracao(pedido.getDuracao());
        pedido.setPreco(pedidoDTO.preco());

        pedidoRepository.save(pedido);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deletarPedido(@PathVariable String id){
        Pedido pedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pedido não encontrado"));

        pedidoRepository.delete(pedido);

        return ResponseEntity.ok().build();
    }
}

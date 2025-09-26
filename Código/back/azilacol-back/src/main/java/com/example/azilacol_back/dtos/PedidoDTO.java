package com.example.azilacol_back.dtos;

import java.math.BigDecimal;
import java.time.Instant;

public record PedidoDTO (String nome, BigDecimal preco, Instant data, int duracao){
}

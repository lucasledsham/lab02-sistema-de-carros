package com.example.azilacol_back.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;

@Document(collection = "pedidos")
@Data
@EqualsAndHashCode(of = "id")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    @Id
    private String id;

    private String nome;

    private BigDecimal preco;

    private Instant data;

    private int duracao;

}

package com.example.azilacol_back.repositories;

import com.example.azilacol_back.models.Pedido;
import com.example.azilacol_back.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends MongoRepository<Pedido, String> {
}

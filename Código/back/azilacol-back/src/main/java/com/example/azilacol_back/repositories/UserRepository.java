package com.example.azilacol_back.repositories;

import com.example.azilacol_back.models.User;
import com.example.azilacol_back.models.UserRole;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByNome(String username);
}

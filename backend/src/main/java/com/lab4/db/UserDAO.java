package com.lab4.db;

import com.lab4.db.interfaces.UserDAOLocal;
import com.lab4.entity.UserEntity;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class UserDAO implements UserDAOLocal {

    @PersistenceContext(unitName = "lab4")
    private EntityManager entityManager;

    @Override
    public void save(UserEntity user) {
        entityManager.persist(user);
        entityManager.flush();
    }

    @Override
    public UserEntity find(Long id) {
        return entityManager.find(UserEntity.class, id);
    }

    @Override
    public List<UserEntity> findAll() {
        return entityManager.createQuery("SELECT u FROM UserEntity u", UserEntity.class).getResultList();
    }

    @Override
    public void update(Long id, UserEntity user) {
        entityManager.merge(user);
    }

    @Override
    public void delete(UserEntity user) {
        entityManager.remove(entityManager.contains(user) ? user : entityManager.merge(user));
    }

    @Override
    public UserEntity findByUsername(String username) {
        List<UserEntity> users = entityManager.createQuery(
            "SELECT u FROM UserEntity u WHERE u.username = :username", UserEntity.class)
            .setParameter("username", username)
            .getResultList();
        return users.isEmpty() ? null : users.get(0);
    }
}

package com.lab4.db;

import com.lab4.entity.RefreshTokenEntity;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class RefreshTokenDAO implements GenericDAO<RefreshTokenEntity, Long> {

    @PersistenceContext(unitName = "lab4")
    private EntityManager entityManager;

    @Override
    public void save(RefreshTokenEntity token) {
        entityManager.persist(token);
        entityManager.flush();
    }

    @Override
    public RefreshTokenEntity find(Long id) {
        return entityManager.find(RefreshTokenEntity.class, id);
    }

    @Override
    public List<RefreshTokenEntity> findAll() {
        return entityManager.createQuery("SELECT t FROM RefreshTokenEntity t", RefreshTokenEntity.class)
                            .getResultList();
    }

    @Override
    public void update(Long id, RefreshTokenEntity token) {
        entityManager.merge(token);
    }

    @Override
    public void delete(RefreshTokenEntity token) {
        entityManager.remove(entityManager.contains(token) ? token : entityManager.merge(token));
    }

    public List<RefreshTokenEntity> findByUserId(Long userId) {
        return entityManager.createQuery(
            "SELECT t FROM RefreshTokenEntity t WHERE t.userId = :userId", RefreshTokenEntity.class)
            .setParameter("userId", userId)
            .getResultList();
    }

    public RefreshTokenEntity findByTokenHash(String tokenHash) {
        List<RefreshTokenEntity> tokens = entityManager.createQuery(
            "SELECT t FROM RefreshToken t WHERE t.tokenHash = :hash", RefreshTokenEntity.class)
            .setParameter("hash", tokenHash)
            .getResultList();
        return tokens.isEmpty() ? null : tokens.get(0);
    }
}

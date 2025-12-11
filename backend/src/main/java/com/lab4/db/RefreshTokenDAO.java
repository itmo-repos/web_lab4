package com.lab4.db;

import com.lab4.db.interfaces.RefreshTokenDAOLocal;
import com.lab4.entity.RefreshTokenEntity;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Stateless
public class RefreshTokenDAO implements RefreshTokenDAOLocal {

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

    @Override
    public List<RefreshTokenEntity> findByUserId(Long userId) {
        return entityManager.createQuery(
            "SELECT t FROM RefreshTokenEntity t WHERE t.userId = :userId AND t.revoked = FALSE AND t.expiresAt > CURRENT_TIMESTAMP", RefreshTokenEntity.class)
            .setParameter("userId", userId)
            .getResultList();
    }

    @Override
    public RefreshTokenEntity findByTokenHash(String tokenHash) {
        List<RefreshTokenEntity> tokens = entityManager.createQuery(
            "SELECT t FROM RefreshTokenEntity t WHERE t.tokenHash = :hash AND t.revoked = FALSE AND t.expiresAt > CURRENT_TIMESTAMP", RefreshTokenEntity.class)
            .setParameter("hash", tokenHash)
            .getResultList();
        return tokens.isEmpty() ? null : tokens.get(0);
    }
}

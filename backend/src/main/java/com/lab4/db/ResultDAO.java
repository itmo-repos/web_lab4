package com.lab4.db;

import java.util.List;

import com.lab4.db.interfaces.GenericDAO;
import com.lab4.entity.ResultEntity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ejb.Stateless;

@Stateless
public class ResultDAO implements GenericDAO<ResultEntity, Long> {

    @PersistenceContext(unitName = "lab4")
    private EntityManager entityManager;

    @Override
    public void save(ResultEntity result) {
        entityManager.persist(result);
        entityManager.flush();
    }

    @Override
    public ResultEntity find(Long id) {
        return entityManager.find(ResultEntity.class, id);
    }

    @Override
    public List<ResultEntity> findAll() {
        return entityManager.createQuery("SELECT r FROM ResultEntity r", ResultEntity.class).getResultList();
    }

    @Override
    public void update(Long result_id, ResultEntity result) {
        entityManager.merge(result);
    }


    @Override
    public void delete(ResultEntity result) {
        entityManager.remove(entityManager.contains(result) ? result : entityManager.merge(result));
    }
}

package com.lab4.bean;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

import com.lab4.db.GenericDAO;
import com.lab4.entity.ResultEntity;

@ApplicationScoped
public class ResultService {

    @Inject
    private GenericDAO<ResultEntity, Long> resultDAO;

    public List<ResultEntity> getAllResults() {
        return resultDAO.findAll();
    }

    public ResultEntity getResult(Long id) {
        return resultDAO.find(id);
    }

    public void addResult(ResultEntity result) {
        resultDAO.save(result);
    }

    public void updateResult(Long id, ResultEntity result) {
        resultDAO.update(id, result);
    }

    public void deleteResult(ResultEntity result) {
        resultDAO.delete(result);
    }
}

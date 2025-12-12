package com.lab4.bean;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.util.List;

import com.lab4.db.interfaces.ResultDAOLocal;
import com.lab4.dto.PointRequest;
import com.lab4.entity.ResultEntity;
import com.lab4.model.AreaHitChecker;

@ApplicationScoped
public class ResultService {

    @Inject
    private ResultDAOLocal resultDAO;

    public List<ResultEntity> getAllResults() {
        return resultDAO.findAll();
    }

    public ResultEntity getResult(Long id) {
        return resultDAO.find(id);
    }

    public void addResultBasedOnRequest(PointRequest request) {
        ResultEntity newPoint = ResultEntity.builder()
                                            .x(request.x())
                                            .y(request.y())
                                            .r(request.r())
                                            .hit(AreaHitChecker.checkHit(request))
                                            .build();
        resultDAO.save(newPoint);
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

    public void clearAll() {
        resultDAO.clearAll();
    }
}

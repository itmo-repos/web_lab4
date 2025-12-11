package com.lab4.db.interfaces;

import java.util.List;

import com.lab4.entity.RefreshTokenEntity;


// НУ ЗАЧЕЕМ нам нижектить по интерфейсу? В чем проблема для контейнера инжектить по типу
public interface RefreshTokenDAOLocal extends GenericDAO<RefreshTokenEntity, Long> {
    RefreshTokenEntity findByTokenHash(String tokenHash);
    List<RefreshTokenEntity> findByUserId(Long userId);
}
package com.lab4.db.interfaces;

import com.lab4.entity.UserEntity;

public interface UserDAOLocal extends GenericDAO<UserEntity, Long> {
    public UserEntity findByUsername(String username);
}

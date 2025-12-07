package com.lab4.db;

import java.util.List;

public interface GenericDAO<T, ID> {
    void save(T entity);
    T find(ID id);
    
    void update(ID id, T entity);
    void delete(T entity);

    List<T> findAll();
}

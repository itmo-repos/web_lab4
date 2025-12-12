package com.lab4.db.interfaces;

import com.lab4.entity.ResultEntity;

public interface ResultDAOLocal extends GenericDAO<ResultEntity, Long> {
    void clearAll ();
}

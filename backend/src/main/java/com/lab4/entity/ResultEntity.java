package com.lab4.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lab4_table", schema = "s467669")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(precision = 38, scale = 20)
    private BigDecimal x;

    @Column(precision = 38, scale = 20)
    private BigDecimal y;
    
    @Column(precision = 38, scale = 20)
    private BigDecimal r;
    
    private Boolean hit;
}

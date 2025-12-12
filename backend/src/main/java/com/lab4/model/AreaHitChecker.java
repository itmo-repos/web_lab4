package com.lab4.model;

import java.math.BigDecimal;
import java.math.MathContext;

import com.lab4.dto.PointRequest;


public class AreaHitChecker {
    private static final MathContext MATH_CONTEXT = new MathContext(50);

    private AreaHitChecker() {

    }
    
    public static String validateParameters(PointRequest point) {

        BigDecimal xBD = point.x(), yBD = point.y(), rBD = point.r();

        if (xBD.abs(MATH_CONTEXT).compareTo(new BigDecimal("4.0", MATH_CONTEXT)) > 0) {
            return "Ошибка валидации: X по модулю не должно превышать 4";
        }

        if (yBD.compareTo(new BigDecimal("-5")) < 0 || yBD.compareTo(new BigDecimal("3")) > 0) {
            return "Ошибка валидации: Y должно быть от -5 до 3";
        }

        if (rBD.abs(MATH_CONTEXT).compareTo(new BigDecimal("4.0", MATH_CONTEXT)) > 0) {
            return "Ошибка валидации: R по модулю не должно превышать 4";
        }

        return null;
    }

    public static boolean checkHit(PointRequest point) {

        BigDecimal xBD = point.x(), yBD = point.y(), rBD = point.r();

        if (rBD.signum() < 0) {
            rBD = rBD.abs();
            xBD = xBD.negate();
            yBD = yBD.negate();
        }

        BigDecimal half = new BigDecimal("0.5", MATH_CONTEXT);
        
        if (xBD.signum() > 0 && yBD.signum() > 0) {

            BigDecimal xSquared = xBD.multiply(xBD, MATH_CONTEXT);
            BigDecimal ySquared = yBD.multiply(yBD, MATH_CONTEXT);
            BigDecimal rHalf = rBD.multiply(half, MATH_CONTEXT);
            BigDecimal rHalfSquared = rHalf.multiply(rHalf, MATH_CONTEXT);
            BigDecimal sum = xSquared.add(ySquared, MATH_CONTEXT);

            return sum.compareTo(rHalfSquared) <= 0;

        } else if (xBD.signum() <= 0 && yBD.signum() >= 0) {
            return false;

        } else if (xBD.signum() < 0 && yBD.signum() < 0) {

            BigDecimal rHalf = rBD.multiply(half, MATH_CONTEXT);
            BigDecimal negX = xBD.negate();
            BigDecimal negY = yBD.negate();
            
            return negY.compareTo(rHalf) <= 0 && negX.compareTo(rBD) <= 0;
        } else {
            BigDecimal negY = yBD.negate();

            BigDecimal rHalf = rBD.multiply(half, MATH_CONTEXT);
            BigDecimal maxY = rHalf.subtract(xBD, MATH_CONTEXT);

            return negY.compareTo(maxY) <= 0;
        }
    }

}

package com.example.crudapp.aspect;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class LoggingAspect {

    @Pointcut("within(@org.springframework.stereotype.Service *)")
    public void serviceMethods(){}

    @Before("serviceMethods()")
    public void logMethodEntry(JoinPoint joinPoint){
        String methodName = joinPoint.getSignature().toShortString();
        log.debug("Вызов метода: {} с аргументом: {}", methodName, joinPoint.getArgs());
    }

    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logMethodExit(JoinPoint joinPoint, Object result){
        String methodName = joinPoint.getSignature().toShortString();
        log.debug("Метод {} вернул: {}", methodName, result);
    }
    @AfterThrowing(pointcut = "serviceMethods()", throwing = "exception")
    public void logException(JoinPoint joinPoint, Throwable exception){
        String methodName = joinPoint.getSignature().toShortString();
        log.error("В методе {} ошибка: {}", methodName, exception.getMessage());
    }
}

package com.aldisued.iot.monitoring.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class ControllerAdvisor {

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<Map<String, String>> handleResourceNotFound(
      ResourceNotFoundException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(Map.of("message", exception.getMessage()));
  }

  @ExceptionHandler(DuplicateSensorException.class)
  public ResponseEntity<Map<String, String>> handleDuplicateSensor(
      DuplicateSensorException exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(Map.of("message", exception.getMessage()));
  }
}

package com.aldisued.iot.monitoring.service;


import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MeasurementCalculatorService {

  public List<Double> filterByAverageDeviation(List<Double> values, Double deviation) {
    if(deviation < 0 || deviation > 1) {
      throw new IllegalArgumentException("Deviation must be between 0.0 and 1.0!");
    }

    double average = values.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    double lowerBound = average - (deviation * average);
    double upperBound = average + (deviation * average);

    return values.stream()
        .filter(value -> value >= lowerBound && value <= upperBound)
        .toList();
  }

  public List<Double> getMovingAverage(List<Double> data, int windowSize) {
    // TODO: Task 10
    return List.of();
  }

}

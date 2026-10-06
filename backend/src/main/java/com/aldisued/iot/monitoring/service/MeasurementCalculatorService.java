package com.aldisued.iot.monitoring.service;


import java.util.ArrayList;
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
    if(windowSize <= 0 || windowSize > data.size()) {
      throw new IllegalArgumentException("Invalid window size value!");
    }

    List<Double> movingAverages = new ArrayList<>();
    for(int i = 0; i <= data.size() - windowSize; i++) {
      double sum = 0;
      for(int j = 0; j < windowSize; j++) {
        sum += data.get(i + j);
      }
      movingAverages.add(sum / windowSize);
    }

    return movingAverages;
  }

}

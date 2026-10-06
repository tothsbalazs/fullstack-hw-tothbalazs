package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.entity.SensorReading;
import com.aldisued.iot.monitoring.entity.SensorType;
import com.aldisued.iot.monitoring.repository.SensorReadingRepository;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class MeasurementService {

  private final SensorReadingRepository sensorReadingRepository;

  public MeasurementService(SensorReadingRepository sensorReadingRepository) {
    this.sensorReadingRepository = sensorReadingRepository;
  }

  public List<Double> getMeasurementValuesBySensorType(SensorType sensorType, LocalDateTime from,
      LocalDateTime to) {
    List<SensorReading> readingValues = sensorReadingRepository.findBySensorTypeAndTimestampBetween(sensorType, from, to);

    return readingValues.stream()
        .sorted(Comparator.comparing(SensorReading::getTimestamp))
        .map(SensorReading::getValue)
        .toList();
  }

  public Optional<Double> getAverageTemperature(LocalDateTime from, LocalDateTime to) {
    return sensorReadingRepository
        .findBySensorTypeAndTimestampBetween(SensorType.TEMPERATURE, from, to)
        .stream()
        .mapToDouble(SensorReading::getValue)
        .average()
        .stream()
        .boxed()
        .findFirst();
  }

}

package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.entity.Alert;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.exception.ResourceNotFoundException;
import com.aldisued.iot.monitoring.repository.AlertRepository;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import java.util.UUID;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class AlertService {

  private final AlertRepository alertRepository;
  private final SensorRepository sensorRepository;
  private final KafkaTemplate<String, AlertDto> kafkaTemplate;

  public AlertService(AlertRepository alertRepository, SensorRepository sensorRepository,
      KafkaTemplate<String, AlertDto> kafkaTemplate) {
    this.alertRepository = alertRepository;
    this.sensorRepository = sensorRepository;
    this.kafkaTemplate = kafkaTemplate;
  }

  public Alert saveAlert(AlertDto alertDto) {
    Sensor sensor = sensorRepository.findById(alertDto.sensorId())
      .orElseThrow(() -> new ResourceNotFoundException(
        "Sensor with ID " + alertDto.sensorId() + " not found"));

    Alert savedAlert = alertRepository.save(new Alert(alertDto.message(), alertDto.timestamp(), sensor));

    kafkaTemplate.send("alerts", alertDto);

    return savedAlert;
  }

  public AlertDto findLastAlertBySensorId(UUID sensorId) {
    Alert alert = alertRepository.findFirstBySensorIdOrderByTimestampDesc(sensorId)
      .orElseThrow(() -> new ResourceNotFoundException(
        String.format("No alert found for sensor %s", sensorId)));

    return new AlertDto(alert.getSensor().getId(), alert.getMessage(), alert.getTimestamp());
  }
}

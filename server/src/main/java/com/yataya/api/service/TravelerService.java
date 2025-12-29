package com.yataya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yataya.api.model.Traveler;

import java.util.List;

@Service
public class TravelerService {

  @Autowired

  public List<Traveler> loadTravelers() {
    return List.of(
        new Traveler("Alice", "WAS", 38.8951, -77.0364),
        new Traveler("Bob", "NYC", 40.7128, -74.0060),
        new Traveler("Charlie", "LON", 51.5074, -0.1278));
  }

}

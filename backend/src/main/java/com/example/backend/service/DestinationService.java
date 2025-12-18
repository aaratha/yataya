package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.Destination;
import com.example.backend.model.Traveler;

import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
public class DestinationService {

  @Autowired
  private DistanceService distanceService;

  public List<Destination> loadDestinations() { // to be replaced with POST body or DB
    return List.of(
        new Destination("New York", "NYC", 40.7128, -74.0060),
        new Destination("London", "LON", 51.5074, -0.1278),
        new Destination("Paris", "PAR", 48.8566, 2.3522),
        new Destination("Tokyo", "TYO", 35.6895, 139.6917),
        new Destination("Dubai", "DXB", 25.276987, 55.296249));
  }

  public List<Destination> selectTopCandidates(List<Traveler> travelers) {
    List<Destination> allCandidates = loadDestinations();
    // Compute sum distances per candidate
    for (Destination candidate : allCandidates) {
      double totalDistance = distanceService.sumDistances(candidate, travelers);
      candidate.setDistanceScore(totalDistance);
    }
    // Sort and pick top 3
    return allCandidates.stream()
        .sorted(Comparator.comparingDouble(Destination::getDistanceScore))
        .limit(3)
        .collect(Collectors.toList());
  }

  public Destination computeGeometricMedian(List<Traveler> travelers) {
    // Optional: implement Weiszfeld algorithm using 3D Cartesian coordinates
    return null; // placeholder
  }

  // public SuggestedVenue selectOptimalCandidate(List<Destination> candidates) {
  // // Evaluate total cost from FlightService + HotelService
  // // Apply constraints (max flight time, transfers, hotel preferences)
  // // Return SuggestedVenue
  // return null; // placeholder
  // }
}

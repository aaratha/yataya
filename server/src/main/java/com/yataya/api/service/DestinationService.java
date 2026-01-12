package com.yataya.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yataya.api.model.Destination;
import com.yataya.api.model.Traveler;

import java.util.List;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
public class DestinationService {

    @Autowired
    private DistanceService distanceService;
    private List<Destination> destinations;

    public void setDestinations(List<Destination> destinations) {
        this.destinations = destinations;
    }

    public List<Destination> getDestinations() { // to be replaced with POST body or DB
        return destinations;
    }

    public List<Destination> selectTopCandidates(List<Traveler> travelers) {
        List<Destination> allCandidates = getDestinations();
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

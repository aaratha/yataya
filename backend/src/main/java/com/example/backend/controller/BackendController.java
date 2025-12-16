package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.backend.service.CandidateService;
import com.example.backend.service.FlightService;
import com.example.backend.service.HotelService;
import com.example.backend.service.BookingService;

import java.util.Map;

@RestController
@RequestMapping("/api/travel")
public class BackendController {

  @Autowired
  private CandidateService candidateService;

  @Autowired
  private FlightService flightService;

  @Autowired
  private HotelService hotelService;

  @Autowired
  private BookingService bookingService;

  @PostMapping("/plan")
  public SuggestedVenue planTrip(@RequestBody List<Traveler> travelers) {
    // Step 1: Compute top candidate locations
    List<CandidateLocation> topCandidates = candidateService.selectTopCandidates(travelers);

    // Step 2: Fetch flight options for top candidates
    flightService.fetchFlightsForCandidates(travelers, topCandidates);

    // Step 3: Fetch hotel options for top candidates
    hotelService.fetchHotelsForCandidates(topCandidates);

    // Step 4: Evaluate total cost and constraints, select best option
    SuggestedVenue finalChoice = candidateService.selectOptimalCandidate(topCandidates);

    return finalChoice;
  }

  @PostMapping("/book")
  public BookingConfirmation bookTrip(@RequestBody SuggestedVenue venue) {
    return bookingService.bookFlightsAndHotels(venue);
  }
}

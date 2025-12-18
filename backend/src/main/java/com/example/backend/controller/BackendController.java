package com.example.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.backend.service.DestinationService;
import com.example.backend.service.TravelerService;
// import com.example.backend.service.FlightService;
// import com.example.backend.service.HotelService;
// import com.example.backend.service.BookingService;

import com.example.backend.model.Traveler;
import com.example.backend.model.Destination;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/travel")
@CrossOrigin(origins = "http://localhost:5173") // allow your frontend
public class BackendController {

  // FOR FUTURE USE: Accessing AMADEUS API credentials from environment variables
  // @Value("${AMADEUS_CLIENT_ID}")
  // private String amadeusClientId;
  //
  // @Value("${AMADEUS_CLIENT_SECRET}")
  // private String amadeusClientSecret;

  @Autowired
  private DestinationService destinationService;

  @Autowired
  private TravelerService travelerService;

  // @Autowired
  // private FlightService flightService;
  //
  // @Autowired
  // private HotelService hotelService;
  //
  // @Autowired
  // private BookingService bookingService;

  public BackendController(DestinationService destinationService, TravelerService travelerService) {
    this.destinationService = destinationService;
    this.travelerService = travelerService;
  }

  @PostMapping("/top-destinations")
  public List<Destination> getTopDestinations(@RequestBody List<Traveler> travelers) {
    // Call your service method
    return destinationService.selectTopCandidates(travelers);
  }

  // @PostMapping("/plan")
  // public SuggestedVenue planTrip(@RequestBody List<Traveler> travelers) {
  // // Step 1: Compute top candidate locations
  // List<Destination> topCandidates =
  // candidateService.selectTopCandidates(travelers);
  //
  // // Step 2: Fetch flight options for top candidates
  // flightService.fetchFlightsForCandidates(travelers, topCandidates);
  //
  // // Step 3: Fetch hotel options for top candidates
  // hotelService.fetchHotelsForCandidates(topCandidates);
  //
  // // Step 4: Evaluate total cost and constraints, select best option
  // SuggestedVenue finalChoice =
  // candidateService.selectOptimalCandidate(topCandidates);
  //
  // return finalChoice;
  // }

  // @PostMapping("/book")
  // public BookingConfirmation bookTrip(@RequestBody SuggestedVenue venue) {
  // return bookingService.bookFlightsAndHotels(venue);
  // }
}

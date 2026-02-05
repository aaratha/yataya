
package com.yataya.api.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.yataya.api.service.DestinationService;
import com.yataya.api.service.AmadeusService;
import com.yataya.api.service.TravelerService;
// import com.example.yataya.api.service.FlightService;
// import com.example.yataya.api.service.HotelService;
// import com.example.yataya.api.service.BookingService;

import com.yataya.api.model.Traveler;
import com.yataya.api.model.Destination;
import com.yataya.api.model.CitySearchResult;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/travel")
@CrossOrigin(origins = "http://localhost") // allow your frontend
public class YatayaApiController {

  // FOR FUTURE USE: Accessing AMADEUS API credentials from environment variables
  // @Value("${AMADEUS_CLIENT_ID}")
  // private String amadeusClientId;
  //
  // @Value("${AMADEUS_CLIENT_SECRET}")
  // private String amadeusClientSecret;

  @Autowired
  private DestinationService destinationService;

  @Autowired
  private AmadeusService amadeusService;

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

  public YatayaApiController(DestinationService destinationService, TravelerService travelerService,
      AmadeusService amadeusService) {
    this.destinationService = destinationService;
    this.travelerService = travelerService;
    this.amadeusService = amadeusService;
  }

  @PostMapping("/set-destinations")
  public void setDestinations(@RequestBody List<Destination> destinations) {
    destinationService.setDestinations(destinations);
  }

  @PostMapping("/top-destinations")
  public List<Destination> getTopDestinations(@RequestBody List<Traveler> travelers) {
    // Call your service method
    return destinationService.selectTopCandidates(travelers);
  }

  @GetMapping("/city-search")
  public List<CitySearchResult> searchCities(@RequestParam("keyword") String keyword) {
    return amadeusService.searchCities(keyword);
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

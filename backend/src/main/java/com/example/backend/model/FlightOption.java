package com.example.backend.model;

public class FlightOption {
  private String airline;
  private String originIATA;
  private String destinationIATA;
  private double price;
  private int durationMinutes;
  private int transfers;
  private String flightId; // API-specific ID for booking

  public FlightOption() {
  } // No-args constructor

  public FlightOption(String airline, String originIATA, String destinationIATA, double price, int durationMinutes,
      int transfers, String flightId) {
    this.airline = airline;
    this.originIATA = originIATA;
    this.destinationIATA = destinationIATA;
    this.price = price;
    this.durationMinutes = durationMinutes;
    this.transfers = transfers;
    this.flightId = flightId;
  }

  public String getAirline() {
    return airline;
  }

  public void setAirline(String airline) {
    this.airline = airline;
  }

  public String getOriginIATA() {
    return originIATA;
  }

  public void setOriginIATA(String originIATA) {
    this.originIATA = originIATA;
  }

  public String getDestinationIATA() {
    return destinationIATA;
  }

  public void setDestinationIATA(String destinationIATA) {
    this.destinationIATA = destinationIATA;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public int getDurationMinutes() {
    return durationMinutes;
  }

  public void setDurationMinutes(int durationMinutes) {
    this.durationMinutes = durationMinutes;
  }

  public int getTransfers() {
    return transfers;
  }

  public void setTransfers(int transfers) {
    this.transfers = transfers;
  }

  public String getFlightId() {
    return flightId;
  }

  public void setFlightId(String flightId) {
    this.flightId = flightId;
  }
}

package com.yataya.api.model;

public class Traveler {
  private String name;
  private String cityIATA; // e.g., WAS, NYC
  private double latitude; // Optional if you want precise coords
  private double longitude;
  private int maxFlightDuration; // in minutes
  private int maxTransfers; // maximum number of connecting flights
  // Other preferences: airlines, seat class, etc.

  // Getters, setters, constructors
  public Traveler() {
  } // No-args constructor (needed for JSON deserialization)

  public Traveler(String name, String cityIATA, double latitude, double longitude) {
    this.name = name;
    this.cityIATA = cityIATA;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCityIATA() {
    return cityIATA;
  }

  public void setCityIATA(String cityIATA) {
    this.cityIATA = cityIATA;
  }

  public double getLatitude() {
    return latitude;
  }

  public void setLatitude(double latitude) {
    this.latitude = latitude;
  }

  public double getLongitude() {
    return longitude;
  }

  public void setLongitude(double longitude) {
    this.longitude = longitude;
  }
}

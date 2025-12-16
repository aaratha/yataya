package com.example.backend.model;

public class Destination {
  private String cityName;
  private String cityIATA;
  private double latitude;
  private double longitude;
  private double distanceScore; // Sum of Haversine distances to all travelers
  private double totalCost; // Combined flight + hotel cost after API check

  public Destination() {
  } // No-args constructor

  public Destination(String cityName, String cityIATA, double latitude, double longitude) {
    this.cityName = cityName;
    this.cityIATA = cityIATA;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public String getCityName() {
    return cityName;
  }

  public void setCityName(String cityName) {
    this.cityName = cityName;
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

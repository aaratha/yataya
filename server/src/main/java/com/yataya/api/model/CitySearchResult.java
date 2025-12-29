package com.yataya.api.model;

public class CitySearchResult {
  private String name;
  private String iataCode;
  private double latitude;
  private double longitude;

  public CitySearchResult() {
  }

  public CitySearchResult(String name, String iataCode, double latitude, double longitude) {
    this.name = name;
    this.iataCode = iataCode;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getIataCode() {
    return iataCode;
  }

  public void setIataCode(String iataCode) {
    this.iataCode = iataCode;
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

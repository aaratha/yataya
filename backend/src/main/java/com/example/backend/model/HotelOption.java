package com.example.backend.model;

public class HotelOption {
  private String hotelName;
  private String address;
  private double pricePerNight;
  private int availableRooms;
  private String hotelId; // API-specific ID for booking

  public HotelOption() {
  } // No-args constructor

  public HotelOption(String hotelName, String address, double pricePerNight, int availableRooms, String hotelId) {
    this.hotelName = hotelName;
    this.address = address;
    this.pricePerNight = pricePerNight;
    this.availableRooms = availableRooms;
    this.hotelId = hotelId;
  }

  public String getHotelName() {
    return hotelName;
  }

  public void setHotelName(String hotelName) {
    this.hotelName = hotelName;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public double getPricePerNight() {
    return pricePerNight;
  }

  public void setPricePerNight(double pricePerNight) {
    this.pricePerNight = pricePerNight;
  }

  public int getAvailableRooms() {
    return availableRooms;
  }

  public void setAvailableRooms(int availableRooms) {
    this.availableRooms = availableRooms;
  }

  public String getHotelId() {
    return hotelId;
  }

  public void setHotelId(String hotelId) {
    this.hotelId = hotelId;
  }
}

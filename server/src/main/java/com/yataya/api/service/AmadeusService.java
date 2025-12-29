package com.yataya.api.service;

import com.yataya.api.model.CitySearchResult;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Service
public class AmadeusService {
  private static final String BASE_URL = "https://test.api.amadeus.com";

  @Value("${amadeus.client-id}")
  private String clientId;

  @Value("${amadeus.client-secret}")
  private String clientSecret;

  private final RestTemplate restTemplate = new RestTemplate();
  private final ObjectMapper objectMapper = new ObjectMapper();

  private String accessToken;
  private Instant tokenExpiry = Instant.EPOCH;

  public List<CitySearchResult> searchCities(String keyword) {
    if (keyword == null || keyword.isBlank()) {
      return List.of();
    }

    String token = getAccessToken();
    String url = String.format(
        "%s/v1/reference-data/locations?subType=CITY&keyword=%s",
        BASE_URL,
        encode(keyword));

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(token);
    HttpEntity<Void> request = new HttpEntity<>(headers);

    String responseBody = restTemplate
        .exchange(url, org.springframework.http.HttpMethod.GET, request, String.class)
        .getBody();

    return parseCityResults(responseBody);
  }

  private synchronized String getAccessToken() {
    if (accessToken != null && Instant.now().isBefore(tokenExpiry)) {
      return accessToken;
    }

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
    form.add("grant_type", "client_credentials");
    form.add("client_id", clientId);
    form.add("client_secret", clientSecret);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(form, headers);
    String responseBody = restTemplate
        .postForObject(BASE_URL + "/v1/security/oauth2/token", request, String.class);

    try {
      JsonNode root = objectMapper.readTree(responseBody);
      accessToken = root.path("access_token").asText(null);
      int expiresIn = root.path("expires_in").asInt(0);
      tokenExpiry = Instant.now().plusSeconds(Math.max(0, expiresIn - 30));
      if (accessToken == null) {
        throw new IllegalStateException("Missing access token from Amadeus");
      }
      return accessToken;
    } catch (IOException e) {
      throw new IllegalStateException("Failed to parse Amadeus token response", e);
    }
  }

  private List<CitySearchResult> parseCityResults(String responseBody) {
    if (responseBody == null || responseBody.isBlank()) {
      return List.of();
    }

    List<CitySearchResult> results = new ArrayList<>();

    try {
      JsonNode root = objectMapper.readTree(responseBody);
      JsonNode data = root.path("data");
      if (!data.isArray()) {
        return List.of();
      }

      for (JsonNode node : data) {
        String name = node.path("name").asText("");
        String iataCode = node.path("iataCode").asText("");
        JsonNode geoCode = node.path("geoCode");
        if (name.isBlank() || iataCode.isBlank() || geoCode.isMissingNode()) {
          continue;
        }
        double latitude = geoCode.path("latitude").asDouble(Double.NaN);
        double longitude = geoCode.path("longitude").asDouble(Double.NaN);
        if (Double.isNaN(latitude) || Double.isNaN(longitude)) {
          continue;
        }
        results.add(new CitySearchResult(name, iataCode, latitude, longitude));
      }
    } catch (IOException e) {
      throw new IllegalStateException("Failed to parse Amadeus city response", e);
    }

    return results;
  }

  private String encode(String value) {
    return java.net.URLEncoder.encode(value, java.nio.charset.StandardCharsets.UTF_8);
  }
}

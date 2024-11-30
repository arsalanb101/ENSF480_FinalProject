package com.acmeplex.controllers;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/seats")
public class SeatController {
    @GetMapping("/{movieId}")
    public Map<String, String> getSeats(@PathVariable int movieId) {
        Map<String, String> seatMap = new HashMap<>();
        seatMap.put("A1", "Available");
        seatMap.put("A2", "Booked");
        seatMap.put("A3", "Available");
        return seatMap;
    }
}

package com.acmeplex.controllers;

import com.acmeplex.models.Movie;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {
    @GetMapping
    public List<Movie> getMovies() {
        return Arrays.asList(
                new Movie(1, "Interstellar", "A science fiction epic.", "9:00 AM, 12:00 PM, 6:00 PM"),
                new Movie(2, "Oppenheimer", "The story of J. Robert Oppenheimer.", "10:00 AM, 3:00 PM, 8:00 PM")
        );
    }
}

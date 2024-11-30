package com.acmeplex.models;

import jakarta.persistence.*;

@Entity
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String row; // Row identifier (e.g., A, B, C)
    private int number; // Seat number
    private boolean isBooked; // Booking status

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private Movie movie; // Movie associated with this seat

    public Seat() {
    }

    public Seat(String row, int number, boolean isBooked, Movie movie) {
        this.row = row;
        this.number = number;
        this.isBooked = isBooked;
        this.movie = movie;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public boolean isBooked() {
        return isBooked;
    }

    public void setBooked(boolean booked) {
        isBooked = booked;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }
}


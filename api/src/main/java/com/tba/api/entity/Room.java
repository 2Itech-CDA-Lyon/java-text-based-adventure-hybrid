package com.tba.api.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * Represents a place the player can visit
 */
@Entity
@Table(name = "rooms")
public class Room {

    /**
     * Database identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    /**
    * Room name 
    */
    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}

package com.tba.api.entity;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    /**
     * List of all items present in the room
     */
    @OneToMany
    @JoinColumn(name = "room_id")
    @JsonIgnore
    private List<Item> items;

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

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}

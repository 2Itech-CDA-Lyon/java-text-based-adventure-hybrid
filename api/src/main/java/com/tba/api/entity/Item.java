package com.tba.api.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * Represents an item that can be found in a room
 */
@Entity
@Table(name = "items")
public class Item
{
    /**
     * Database identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    /**
     * Item name
     */
    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;
    /**
     * The room the item can be found in
     */
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Room getRoom() {
        return room;
    }
    public void setRoom(Room room) {
        this.room = room;
    }
}

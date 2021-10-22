package com.tba.api.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

/**
 * Represents a direction tjhe player can take to move from one room to another
 */
@Entity
@Table(name = "directions")
public class Direction
{
    /**
     * Database identifier
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;
    /**
     * The display name of the direction
     */
    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;
    /**
     * The command used to take the direction
     */
    @NotBlank
    @Column(name = "command", unique = true, nullable = false)
    private String command;

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
    public String getCommand() {
        return command;
    }
    public void setCommand(String command) {
        this.command = command;
    }
}

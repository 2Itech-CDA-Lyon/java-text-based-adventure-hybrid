package com.tba.api.controller.api;

import java.util.List;

import javax.validation.Valid;

import com.tba.api.entity.Direction;
import com.tba.api.repository.DirectionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/directions")
@CrossOrigin
public class DirectionController {
    
    @Autowired
    private DirectionRepository directionRepository;

    @GetMapping
    public List<Direction> list()
    {
        return directionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Direction single(@PathVariable int id)
    {
        return directionRepository.findById(id).orElseThrow(
            () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Direction #" + id + " does not exist."); }
        );
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Direction create(@Valid @RequestBody Direction direction)
    {
        try {
            return directionRepository.save(direction);
        }
        catch (DataIntegrityViolationException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Direction with command " + direction.getCommand() + " already exists.");
        }
    }

    @PutMapping("/{id}")
    public Direction replace(@PathVariable int id, @Valid @RequestBody Direction newDirection) {
        try {
            return directionRepository.findById(id)
                .map(direction -> {
                    direction.setName(newDirection.getName());
                    direction.setCommand(newDirection.getCommand());
                    return directionRepository.save(direction);
                })
                .orElseGet(() -> {
                    newDirection.setId(id);
                    return directionRepository.save(newDirection);
                });
        }
        catch (DataIntegrityViolationException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Direction with command " + newDirection.getCommand() + " already exists.");
        }
    }

    @PatchMapping("/{id}")
    public Direction update(@PathVariable int id, @RequestBody Direction newDirection) {
        try {
            return directionRepository.findById(id)
                .map(direction -> {
                    if (newDirection.getName() != null) {
                        direction.setName(newDirection.getName());
                    }
                    if (newDirection.getCommand() != null) {
                        direction.setCommand(newDirection.getCommand());
                    }
                    return directionRepository.save(direction);
                })
                .orElseThrow(
                    () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Direction #" + id + " does not exist."); }
                );
        }
        catch (DataIntegrityViolationException exception) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Direction with command " + newDirection.getCommand() + " already exists.");
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id)
    {
        if (directionRepository.existsById(id)) {
            directionRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Direction #" + id + " does not exist.");
        }
    }
}

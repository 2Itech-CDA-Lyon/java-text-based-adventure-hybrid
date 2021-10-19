package com.tba.api.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import javax.validation.Valid;

import com.tba.api.entity.Room;
import com.tba.api.repository.RoomRepository;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    // GET /api/rooms   Récupère tous les lieux
    @GetMapping
    public List<Room> list()
    {
        return roomRepository.findAll();
    }

    // GET /api/rooms/:id   Récupère un lieu particulier
    @GetMapping("/{id}")
    public Room single(@PathVariable int id)
    {
        return roomRepository.findById(id).orElseThrow(
            () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room #" + id + " does not exist."); }
        );
    }

    // POST /api/rooms   Crée un nouveau lieu
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Room create(@Valid @RequestBody Room room)
    {
        return roomRepository.save(room);
    }

    // PUT /api/rooms/:id   Remplace un lieu existant
    @PutMapping("/{id}")
    public Room replace(@PathVariable int id, @Valid @RequestBody Room newRoom) {
        return roomRepository.findById(id)
            .map(room -> {
                room.setName(newRoom.getName());
                return roomRepository.save(room);
            })
            .orElseGet(() -> {
                newRoom.setId(id);
                return roomRepository.save(newRoom);
            });
    }

    // PATCH /api/rooms/:id Mettre à jour les propriétés d'un lieu existant
    @PatchMapping("/{id}")
    public Room update(@PathVariable int id, @RequestBody Room newRoom) {
        return roomRepository.findById(id)
            .map(room -> {
                if (newRoom.getName() != null) {
                    room.setName(newRoom.getName());
                }
                return roomRepository.save(room);
            })
            .orElseThrow(
                () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room #" + id + " does not exist."); }
            );
    }

    // DELETE /api/rooms/:id    Supprime un lieu existant
    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id){
        if (roomRepository.existsById(id)) {
            roomRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Room #" + id + " does not exist.");
        }
    }
}

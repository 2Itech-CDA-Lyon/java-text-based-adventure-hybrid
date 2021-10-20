package com.tba.api.controller.api;

import java.util.List;

import javax.validation.Valid;

import com.tba.api.entity.Item;
import com.tba.api.repository.ItemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemController
{
    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> list()
    {
        return itemRepository.findAll();
    }

    @GetMapping("/{id}")
    public Item single(@PathVariable int id)
    {
        return itemRepository.findById(id).orElseThrow(
            () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item #" + id + " does not exist."); }
        );
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public Item postMethodName(@Valid @RequestBody Item item)
    {
        return itemRepository.save(item);
    }
    
    @PutMapping("/{id}")
    public Item replace(@PathVariable int id, @Valid @RequestBody Item newItem) {
        return itemRepository.findById(id)
            .map(item -> {
                item.setName(newItem.getName());
                item.setRoom(newItem.getRoom());
                return itemRepository.save(item);
            })
            .orElseGet(() -> {
                newItem.setId(id);
                return itemRepository.save(newItem);
            });
    }

    @PatchMapping("/{id}")
    public Item update(@PathVariable int id, @RequestBody Item newItem) {
        return itemRepository.findById(id)
            .map(item -> {
                if (newItem.getName() != null) {
                    item.setName(newItem.getName());
                }
                if (newItem.getRoom() != null) {
                    item.setRoom(newItem.getRoom());
                }
                return itemRepository.save(item);
            })
            .orElseThrow(
                () -> { throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item #" + id + " does not exist."); }
            );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable int id){
        if (itemRepository.existsById(id)) {
            itemRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item #" + id + " does not exist.");
        }
    }
}

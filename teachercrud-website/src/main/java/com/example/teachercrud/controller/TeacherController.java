package com.example.teachercrud.controller;

import com.example.teachercrud.entity.Teacher;
import com.example.teachercrud.repository.TeacherRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    private final TeacherRepository repo;

    public TeacherController(TeacherRepository repo) {
        this.repo = repo;
    }

    // CREATE
    @PostMapping
    public Teacher addTeacher(@RequestBody Teacher t) {
        return repo.save(t);
    }

    // READ
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return repo.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable Long id,
                                 @RequestBody Teacher t) {
        Teacher existing = repo.findById(id).orElseThrow();
        existing.setName(t.getName());
        existing.setSubject(t.getSubject());
        return repo.save(existing);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable Long id) {
        repo.deleteById(id);
    }
}

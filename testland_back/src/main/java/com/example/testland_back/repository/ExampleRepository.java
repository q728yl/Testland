package com.example.testland_back.repository;

import com.example.testland_back.entity.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExampleRepository extends JpaRepository<Example, Long> {
    Example findExampleByExampleId(Long exampleId);
}

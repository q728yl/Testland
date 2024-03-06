package com.example.testland_back.repository;

import com.example.testland_back.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findCategoryByContent(String content);
    Category findCategoryByCategoryId(Long id);
}

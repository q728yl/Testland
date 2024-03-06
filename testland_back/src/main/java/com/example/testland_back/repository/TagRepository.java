package com.example.testland_back.repository;

import com.example.testland_back.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findTagByTagId(Long tagId);
    Tag findTagByContent(String content);
}

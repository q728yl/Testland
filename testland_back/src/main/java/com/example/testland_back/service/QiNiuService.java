package com.example.testland_back.service;

import com.example.testland_back.util.Msg;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.Map;

public interface QiNiuService {
    Msg uploadImageQiniu(MultipartFile multipartFile);

    Msg downloadImage(String path);
}

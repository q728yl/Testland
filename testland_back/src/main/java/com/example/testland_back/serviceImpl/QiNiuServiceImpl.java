package com.example.testland_back.serviceImpl;

import com.example.testland_back.service.QiNiuService;
import com.example.testland_back.util.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.testland_back.util.ImageUtils;
@Service
public class QiNiuServiceImpl implements QiNiuService {
    @Autowired
    ImageUtils imageUtils;

    @Override
    public Msg uploadImageQiniu(MultipartFile multipartFile) {
        System.out.println("upload-serviceImpl");
        String path = imageUtils.uploadImageQiniu(multipartFile);
        if (path != null) {
            return new Msg(1, "上传图片成功", path);
        } else {
            return new Msg(-1, "上传图片失败");
        }
    }

    @Override
    public Msg downloadImage(String path) {
        String crackedPath = imageUtils.getDownloadUrl(path);
        if (crackedPath != null) {
            return new Msg(1, "下载图片成功", crackedPath);
        } else {
            return new Msg(-1, "上传图片失败");
        }
    }
}

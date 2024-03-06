package com.example.testland_back.util;


//import com.example.esdemo.pojo.QiNiuImage;
import com.qiniu.common.QiniuException;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.Region;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @author eiqiu
 * @date 2023/1/9
 * 七牛云图片上传
 */
@Component
public class ImageUtils {


    private String accessKey="ChdAUYxFFQcJ3UWKHHdmVCwyMy0LHWvgcUFoSS7c";


    private String secretKey="RyzLD08qmY4mml-6qGYEo8AS9GPpSJc3Wy2ad9Fs";


    private String bucket="lightece-imgs";

    private String filename="testland/";

    private String link="http://myimg.lightece.top/";


//    private String url="http://idv19du.qiniudns.com/";

    private String url="http://myimg-lightece-top-idvlmtd.qiniudns.com/";
    /** 七牛文件上传管理器 */
    private UploadManager uploadManager;

    /** 七牛文件管理器 */
    private BucketManager bucketManager;

    /** 七牛云认证工具 */
    private Auth auth;

    /** 七牛云上传的token */
    private String token;

    @PostConstruct
    private void init() {
        uploadManager = new UploadManager(new Configuration(Region.autoRegion()));
        auth = Auth.create(accessKey, secretKey);
        bucketManager = new BucketManager(auth, new Configuration(Region.autoRegion()));
        token = auth.uploadToken(bucket);
    }

    /**
     * 多文件上传至七牛云
     * @param multipartFiles 文件集合
     * @return 文件外链映射集合
     */
//    public Map<String, List<String>> uploadImages(MultipartFile[] multipartFiles){
//        Map<String,List<String>> map = new HashMap<>();
//        List<String> imageUrls = new ArrayList<>();
//        for(MultipartFile file : multipartFiles){
//            QiNiuImage qiNiuImage = uploadImageQiniu(file);
//            imageUrls.add(qiNiuImage.getPath());
//        }
//        map.put("imageUrl",imageUrls);
//        return map;
//    }

    /**
     * 上传文件至七牛云
     * @param multipartFile 文件
     * @return 文件外链地址
     */
    public String uploadImageQiniu(MultipartFile multipartFile){
        System.out.println("upload");
        try {
            //1、获取文件上传的流
            byte[] fileBytes = multipartFile.getBytes();

            /**
             * 此处可以根据不同的业务类型，创立相应的文件夹，方便管理
             * 为了方便，此处仅使用日期来创立文件夹
             *  */

            //2、创建日期目录分隔
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd");
            String datePath = dateFormat.format(new Date());

            //3、获取文件名
            String originalFilename = multipartFile.getOriginalFilename();
            assert originalFilename != null;
            // 文件类型
            String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
            // 生成新的文件名
            String fileKey = UUID.randomUUID().toString().replace("-", "");
            String bucket = this.bucket;
            // 文件在bucket下的存储目录
            String path = filename + datePath+"/"+ fileKey + suffix;

            //4.上传图片至七牛云
            uploadManager.put(fileBytes,path,token);

            // 这里进行了自定义封装，
            /**
             * {bucket: "文件所在bucket“,
             * fileKey: "文件的新名称，全局唯一，方便存入数据库”,
             * path: "外链地址，用于前端展示"
             * fileName: "文件在bucket下的存储目录,便于删除"}
             */
            System.out.println("upload");
            System.out.println(path);
            return path;

        } catch (IOException e) {
            e.printStackTrace();
            System.out.println(e);
        }
        return null;
    }

    /**
     *
     * @param bucketName 空间名称
     * @param fileName 文件存储位置：如 /2023/1/9/sadihfuehjdshdcjbhuasd.png
     * @return 是否删除
     */
    public boolean removeImageQiniu(String bucketName, String fileName) {
        try {
            bucketManager.delete(bucketName, fileName);
        } catch (QiniuException e) {
            e.printStackTrace();
        }
        return true;
    }


    public String getDownloadUrl(String targetUrl) {
//        //根据密钥配置,获取Auth对象
//        Auth auth = Auth.create(accessKey, secretKey);
//        //获取下载文件路径，即：donwloadUrl
//        String downloadUrl = auth.privateDownloadUrl(targetUrl);
//        System.out.println("download");
        System.out.println(link + targetUrl);
        return link + targetUrl;
    }

}


package com.example.testland_back.util;

import java.io.*;
import java.nio.file.*;
import java.util.zip.*;

public class FileOperation {
    public static void unzip(String zipFilePath, String destinationFolder) throws IOException {
        Path destDir = Path.of(destinationFolder);
        try (ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath))) {
            ZipEntry entry = zipIn.getNextEntry();
            while (entry != null) {
                Path filePath = destDir.resolve(entry.getName());
                if (!entry.isDirectory()) {
                    createParentDirectories(filePath);
                    Files.copy(zipIn, filePath, StandardCopyOption.REPLACE_EXISTING);

                    // 还原文件属性
                    File file = filePath.toFile();
                    file.setLastModified(entry.getTime()); // 恢复文件的修改时间
                    file.setReadable(true); // 设置为可读
                    file.setWritable(true); // 设置为可写
                    file.setExecutable(true); // 设置为可执行
                } else {
                    Files.createDirectories(filePath);
                }
                zipIn.closeEntry();
                entry = zipIn.getNextEntry();
            }
        }
    }

    // 创建父目录
    public static void createParentDirectories(Path filePath) throws IOException {
        Path parentDir = filePath.getParent();
        if (parentDir != null && !Files.exists(parentDir)) {
            Files.createDirectories(parentDir);
        }
    }

    // 移动文件至上一级目录
    public static void moveFilesToParentDirectory(String sourceFolderPath, String targetFolderPath) throws IOException {
        File sourceFolder = new File(sourceFolderPath);
        File[] files = sourceFolder.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    moveFilesToParentDirectory(file.getAbsolutePath(), targetFolderPath);
                } else {
                    String fileName = file.getName();
                    String destinationPath = targetFolderPath + File.separator + fileName;
                    Files.move(file.toPath(), Path.of(destinationPath), StandardCopyOption.REPLACE_EXISTING);
                }
            }
        }
    }

    // 删除目录及其内容
    public static void deleteDirectory(String directoryPath) {
        File directory = new File(directoryPath);
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectory(file.getAbsolutePath());
                } else {
                    file.delete();
                }
            }
        }
        directory.delete();
    }
    public static void clearDirectoryContents(File directory) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    clearDirectoryContents(file);
                }
                file.delete();
            }
        }
    }

}

//package com.example.testland_back.util;
//
//import org.json.JSONObject;
//
//public class Msg {
//    private int status;
//    private String message;
//    private JSONObject data;
//
//    public Msg() {
//        this.status = 0;
//        this.message = "";
//        this.data = null;
//    }
//
//    public Msg(int status) {
//        this.status = status;
//        this.message = "";
//        this.data = null;
//    }
//
//    public Msg(int status, String message) {
//        this.status = status;
//        this.message = message;
//        this.data = null;
//    }
//
//    public Msg(int status, String message, JSONObject data) {
//        this.status = status;
//        this.message = message;
//        this.data = data;
//    }
//}


package com.example.testland_back.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Msg {
    private int status;
    private String message;
    private Object data;

    public Msg(int status) {
        this.status = status;
        this.message = "";
        this.data = null;
    }

    public Msg(int status, String message) {
        this.status = status;
        this.message = message;
        this.data = null;
    }

    public Msg(int status, Object data) {
        this.status = status;
        this.message = "";
        this.data = data;
    }

//    public Msg(int status, String message, Object data) {
//        this.status = status;
//        this.message = message;
//        this.data = data;
//    }

}

package com.mainProject.server.domain.chat;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;

@Controller
public class ChatController {
    @GetMapping("/")
    public String index(){
        return "error";
    }

    @GetMapping("/{id}")
    public String chattingRoom(@PathVariable String id, HttpSession session, Model model){
        model.addAttribute("name", id);

//        if(id.equals("guest")){
//            model.addAttribute("name", "guest");
//        }else if(id.equals("master")){
//            model.addAttribute("name", "master");
//        }else if(id.equals("loose")){
//            model.addAttribute("name", "loose");
//        }else{
//            return "error";
//        }
        return "chattingRoom";
    }
}
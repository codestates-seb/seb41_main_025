package com.mainProject.server.domain.content.service;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.entity.Ott;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class CrawlingService {
    private final ContentService contentService;

    static final String id = "webdriver.chrome.driver";
    static final String path = "/usr/bin/chromedriver";
//    static final String path = "/Users/keumbipark/Downloads/chromedriver";
    /*final String id = "webdriver.chrome.driver";
    final String path = "C:\\drivers\\chromedriver.exe";*/

    public void createCrawling(String ottCrawling) {
        System.setProperty(id, path);
        ChromeOptions options = new ChromeOptions();

        String url = "https://movie.daum.net/main";
        WebDriver driver = new ChromeDriver(options);
        driver.get(url);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        WebElement productDiv = driver.findElement(By.className(ottCrawling));

        List<WebElement> productList = productDiv.findElements(By.className("item_poster"));

        List<String> movieList = new ArrayList<>();

        for (WebElement li : productList) {
            Content content = new Content();
            Ott ott = new Ott();
            ott.setContent(content);
            String contentLink = li.findElement(By.className("link_txt")).getAttribute("href");
            String contentPoster = li.findElement(By.className("img_thumb")).getAttribute("src");
            String contentOttRank = li.findElement(By.className("thumb_item")).getAttribute("data-tiara-ordnum");

            movieList.addAll(innerCrawling(contentLink));

            String contentOpenAt = movieList.get(0); // 개봉0
            String contentGenre = movieList.get(1); // 장르 1
            String contentCountry = movieList.get(2); // 국가 2
            String contentGrade = movieList.get(3); // 등급 3
            String contentRunningTime = movieList.get(4); // 러닝타임 4
            String contentScore = movieList.get(5); // 평점5
            String contentAttendance = movieList.get(6); // 누적관객6
            String contentTitle = movieList.get(7); // 타이틀 7
            String contentBody = movieList.get(8); // desc 8
            String contentOttList = movieList.get(9); // Ott 9


            content.setContentOpenAt(contentOpenAt); // 개봉0
            content.setContentGenre(contentGenre); // 장르 1
            content.setContentCountry(contentCountry);// 국가 2
            content.setContentGrade(contentGrade); // 등급 3
            content.setContentRunningTime(contentRunningTime); // 러닝타임 4
            content.setContentScore(contentScore); // 평점5
            content.setContentAttendance(contentAttendance); // 누적관객6
            content.setContentTitle(contentTitle); // 타이틀 7
            content.setContentBody(contentBody); // desc8
            content.setContentOttList(contentOttList); // Ott 9
            content.setContentOttName(ottCrawling.split("-")[0]);
            content.setContentOttRank(contentOttRank);

            content.setContentPoster(contentPoster);
            ott.setOttRank(contentOttRank);
            ott.setOttName(ottCrawling.split("-")[0]);
            content.getOttList().add(ott);

            contentService.createCrawlingContent(content);

            movieList.clear();
        }


        driver.close();
    }

    public static List<String> innerCrawling(String movieLink){
        System.setProperty(id, path);
        ChromeOptions options = new ChromeOptions();
        String url = movieLink;
        WebDriver driver = new ChromeDriver(options);
        driver.get(url);

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        WebElement productDiv = driver.findElement(By.className("kakao_content"));

        List<String> result = new ArrayList<>();
        Map<String, String> infoMap = new HashMap<>();
        String titleList = productDiv.findElement(By.className("tit_movie")).findElement(By.className("txt_tit")).getText();
        String descList = productDiv.findElement(By.className("box_detailinfo")).findElement(By.className("desc_cont")).getText();
        String ottList = productDiv.findElement(By.className("info_detail")).findElement(By.className("group_btn")).getText();

        String infoList = productDiv.findElement(By.className("info_detail")).findElement(By.className("detail_cont")).getText();
        String[] infoArray = infoList.split("\n");
        for(int i = 0; i < infoArray.length; i++) { //인포정보에서 7가지만 가져온다.
            String[] infoArray2 = infoArray[i].split(" ");
            String key = infoArray2[0];
            String value = "";
            for(int k=1; k<infoArray2.length; k++) {
                    value += infoArray2[k];
            }
            infoMap.put(key, value);
        }

        result.add(infoMap.get("개봉"));
        result.add(infoMap.get("장르"));
        result.add(infoMap.get("국가"));
        result.add(infoMap.get("등급"));
        result.add(infoMap.get("러닝타임"));
        result.add(infoMap.get("평점"));
        result.add(infoMap.get("누적관객"));
        result.add(titleList);
        result.add(descList);
        result.add(ottList);
        driver.close();

        return result;
    }
}

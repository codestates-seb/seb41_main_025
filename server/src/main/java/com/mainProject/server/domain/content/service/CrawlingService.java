package com.mainProject.server.domain.content.service;

import com.mainProject.server.domain.content.entity.Content;
import com.mainProject.server.domain.content.entity.Ott;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CrawlingService {
    private final ContentService contentService;

    static final String id = "webdriver.chrome.driver";
    static final String path = "/Users/keumbipark/Downloads/chromedriver";
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
            String contentRank = li.findElement(By.className("thumb_item")).getAttribute("data-tiara-ordnum");

            movieList.addAll(innerCrawling(contentLink));

            String contentOpenAt = movieList.get(0);
            String contentTitle = movieList.get(1);
            String contentBody = movieList.get(2);

            content.setContentBody(contentBody);
            content.setContentPoster(contentPoster);
            content.setContentOpenAt(contentOpenAt);
            content.setContentTitle(contentTitle);
            content.setRank(contentRank);
            content.setOttName(ottCrawling.split("-")[0]);

            ott.setRank(contentRank);
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
        String openAtList = productDiv.findElement(By.className("info_detail")).findElement(By.className("list_cont")).getText();
        String titleList = productDiv.findElement(By.className("tit_movie")).findElement(By.className("txt_tit")).getText();
        String descList = productDiv.findElement(By.className("box_detailinfo")).findElement(By.className("desc_cont")).getText();

        result.add(openAtList);
        result.add(titleList);
        result.add(descList);
        driver.close();

        return result;
    }
}

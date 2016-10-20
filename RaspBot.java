package com.test;

import static org.junit.Assert.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.ChromeDriverManager;

public class RaspBot {
	private static WebDriver driver;
	private static WebDriverWait wait;
	
	@BeforeClass
	public static void intialize() throws Exception {
		ChromeDriverManager.setup();
		driver = new ChromeDriver();
		
		driver.get("https://rasbot.slack.com/"); 
		wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));
		
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Type in our test user login info.
		email.sendKeys("rsukuma2@ncsu.edu");
		pw.sendKeys("davps2005");

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();
		
		wait.until(ExpectedConditions.titleContains("general"));
	}

	@AfterClass
	public static void close() throws Exception {
//		driver.close();
//		driver.quit();
	}
	
	
	@Test
	public void TestAddUser() throws InterruptedException
	{
		
				
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("@restbot");
		messageBot.sendKeys(Keys.RETURN);
		
		
		
		
		//select the bot
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'Add user to admin group')]/ancestor::button")));							
		
		
		List<WebElement> addUserButton = driver.findElements(By.xpath("//text()[contains(.,'Add user to admin group')]/ancestor::button"));
		assertNotNull(addUserButton);
				
		addUserButton.get(addUserButton.size()-1).click();
		
		
		
		
		
		//select user kjani
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'kjani')]/ancestor::button")));							
		
		
		List<WebElement> selectKjani = driver.findElements(By.xpath("//text()[contains(.,'kjani')]/ancestor::button"));
		assertNotNull(selectKjani);
								
		selectKjani.get(selectKjani.size()-1).click();
		
						
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'Are you sure you want')]/ancestor::div")));							
						
		//confirm selection as yes for ketan
		WebElement confirm = driver.findElement(By.xpath("//text()[contains(.,'Are you sure you want ')]/ancestor::div//a[@class='btn dialog_go btn_primary']"));
		assertNotNull(confirm);
		confirm.click();
				
		Thread.sleep(2000);								
										
	//	wait.until(ExpectedConditions.titleContains("bots"));		
		
		}
	
	@Test
	public void testRestify() throws InterruptedException {
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("@restbot");
		messageBot.sendKeys(Keys.RETURN);
//		System.out.println("Menu loaded");
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'Restify Tables')]/ancestor::button")));
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		List<WebElement> buttons = driver.findElements(By.xpath("//text()[contains(.,'Restify Tables')]/ancestor::button"));
		assertNotNull(buttons);
		WebElement lastButton = buttons.get(buttons.size()-1);
		lastButton.click();
//		System.out.println("Tables Loaded");
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'species')]/ancestor::button")));
		List<WebElement> tableButtons = driver.findElements(By.xpath("//text()[contains(.,'species')]/ancestor::button"));
		assertNotNull(tableButtons);
		WebElement lastTableButton = tableButtons.get(tableButtons.size()-1);
		lastTableButton.click();
//		System.out.println("Confirmation pop up shown");
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'Are you sure you want to restify')]/ancestor::div//a[@class='btn dialog_go btn_primary']")));
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		WebElement confirmPopup = driver.findElement(By.xpath("//text()[contains(.,'Are you sure you want to restify')]/ancestor::div//a[@class='btn dialog_go btn_primary']"));
		assertNotNull(confirmPopup);
		confirmPopup.click();
		Thread.sleep(2000);
//		System.out.println("Popup clicked");
		
//		Thread.sleep(2000);
		
		wait.withTimeout(10, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		List<WebElement> postButtons = driver.findElements(By.xpath("//text()[contains(.,'POST')]/ancestor::button"));
		assertNotNull(postButtons);
		WebElement postButton = postButtons.get(postButtons.size()-1);
//		System.out.println(postButton.getTagName());
//		System.out.println(postButtons.size());
		if(postButton.isDisplayed()){
			postButton.click();
		}
		
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
	}
	
	@Test
	public void testConfiguration() throws InterruptedException{
		
		WebElement messageBot = driver.findElement(By.id("message-input"));
		messageBot.sendKeys("@restbot");
		messageBot.sendKeys(Keys.RETURN);
//		System.out.println("Menu loaded");
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'Configure Tables')]/ancestor::button")));
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		List<WebElement> buttons = driver.findElements(By.xpath("//text()[contains(.,'Configure Tables')]/ancestor::button"));
		assertNotNull(buttons);
		WebElement lastButton = buttons.get(buttons.size()-1);
		lastButton.click();
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'100/DAY')]/ancestor::button")));
		List<WebElement> configButtons = driver.findElements(By.xpath("//text()[contains(.,'100/DAY')]/ancestor::button"));
		assertNotNull(configButtons);
		WebElement lastConfigButton = configButtons.get(configButtons.size()-1);
		lastConfigButton.click();
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//text()[contains(.,'Are you sure you want to set this quota')]/ancestor::div//a[@class='btn dialog_go btn_primary']")));
		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);
		WebElement confirmPopup = driver.findElement(By.xpath("//text()[contains(.,'Are you sure you want to set this quota')]/ancestor::div//a[@class='btn dialog_go btn_primary']"));
		assertNotNull(confirmPopup);
		confirmPopup.click();
		Thread.sleep(2000);
		
		
	}

}

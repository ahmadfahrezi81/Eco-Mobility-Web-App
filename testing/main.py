from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time

# List of credentials to test
credentials = [
    {"email": "invalidemail1@example.com", "password": "wrongpassword1"},
    {"email": "invalidemail2@example.com", "password": "wrongpassword2"},
    {"email": "invalidemail3@example.com", "password": "wrongpassword3"},
]

driver = webdriver.Chrome()

try:
    for cred in credentials:
        driver.get("https://um-eco-mobility.vercel.app/sign-in")

        # Wait for the page to load completely
        time.sleep(2)

        # Locate the email input field and enter an email
        email_input = driver.find_element(By.ID, "email")
        email_input.clear()  # Clear previous input
        email_input.send_keys(cred["email"])

        # Locate the password input field and enter a password
        password_input = driver.find_element(By.ID, "password")
        password_input.clear()  # Clear previous input
        password_input.send_keys(cred["password"])

        # Locate the "Sign In" button and click it
        sign_in_button = driver.find_element(
            By.XPATH, '//button[contains(text(), "Sign In")]'
        )
        sign_in_button.click()

        time.sleep(2)

        # Here, you can check for a response or error message to determine the result of the login attempt
        # For example, check if an error message is displayed
        try:
            error_message = driver.find_element(By.CLASS_NAME, "error")
            print(f"Login attempt with {cred['email']} failed: {error_message.text}")
        except:
            print(
                f"Login attempt with {cred['email']} might have succeeded or no error message found."
            )

finally:
    # Close the WebDriver session
    driver.quit()

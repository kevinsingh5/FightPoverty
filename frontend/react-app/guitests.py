#!/usr/bin/env python

import unittest
import time
import re
from selenium import webdriver
from selenium.webdriver.common.by import By 
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC 
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.keys import Keys

#Selenium Test Cases
#./guitests.py to run
class FightPoverty(unittest.TestCase):

	def setUp(self):
		self.home_url = 'http://www.fightpoverty.online/'
		self.browser = webdriver.Firefox()
		self.browser.get(self.home_url)
		self.browser.maximize_window()

	#Test Case 1 Good
	def testPageTitle(self):
		self.browser.get('http://fightpoverty.online')
		self.assertIn('FightPoverty', self.browser.title)

	#Test Case 2 Good
	def testCityPageHeading(self):
		self.browser.get('http://fightpoverty.online/cities')
		element = self.browser.find_element_by_class_name("jumbotron-heading").text
		self.assertIn('Cities', element)

	#Test Case 3 Good
	def testCountyPageHeading(self):
		self.browser.get('http://fightpoverty.online/counties')
		element = self.browser.find_element_by_class_name("jumbotron-heading").text
		self.assertIn('Counties', element)

	#Test Case 4 Good
	def testCharityPageHeading(self):
		self.browser.get('http://fightpoverty.online/charities')
		element = self.browser.find_element_by_class_name("jumbotron-heading").text
		self.assertIn('Charities', element)

	#Test Case 5 Good
	def testAboutPageHeading(self):
		self.browser.get('http://fightpoverty.online/about')
		element = self.browser.find_element_by_class_name("my-4").text
		self.assertIn('About Us', element)

	#Test Case 6 Good
	def testAboutPageText(self):
		self.browser.get('http://fightpoverty.online/about')
		element = self.browser.find_element_by_xpath('//*[@id="content"]/div/div/div/div[1]/p').text
		self.assertIn('Our goal is to allow users to browse a database that ranks charities aiming to fight poverty in cities around the United States. Easily find charities and organizations in your city or county you would like to help out! Our intended users are those who want to help others in need and make an impact not only in their community, but those across the U.S.', element)
	
	#Test Case 7 Good
	def testCharityPageText(self):
		self.browser.get('http://fightpoverty.online/charities')
		element = self.browser.find_element_by_xpath('//*[@id="content"]/div/div/div/section/div/p').text
		self.assertIn('Learn about different charities across the U.S.', element)

	#Test Case 8 Good
	def testCountyPageText(self):
		self.browser.get('http://fightpoverty.online/counties')
		element = self.browser.find_element_by_xpath('//*[@id="content"]/div/div/div/div[1]/section/div/p').text
		self.assertIn('Look up any of the counties in the U.S. and find out information about local charities and poverty statistics', element)

	#Test Case 9 Good
	def testCityPageText(self):
		self.browser.get('http://fightpoverty.online/cities')
		element = self.browser.find_element_by_xpath('//*[@id="content"]/div/div/div/section/div/p').text
		self.assertIn('Browse our large database that contains information on over 350 cities in the U.S.', element)

	#Test Case 10 Good
	def testHomePageCitiesButton(self):
		self.browser.get('http://fightpoverty.online/')
		button = self.browser.find_element_by_css_selector('a.btn.btn-lg.btn-primary')
		href_data = button.get_attribute('cities.html')
		if href_data is None:
			is_clickable = False

	#Test Case 11 Good
	def test_title(self):
		self.assertEqual(self.browser.title, 'FightPoverty')

	#Test Case 12 Good
	def test_about_page(self):
		navbar_link = self.browser.find_element_by_link_text('About').click()
		self.assertEqual(self.browser.current_url, 'http://www.fightpoverty.online/about')

	#Test Case 13 Good
	def test_city_navbar(self):
		self.browser.get("http://fightpoverty.online/cities")
		try:
			self.browser.find_element_by_class_name("navbar-brand").click()
			pass
		except NoSuchElementException:
			self.fail("The element does not exist")

	#Test Case 14 Good
	def test_county_navbar(self):
		self.browser.get("http://fightpoverty.online/counties")
		try:
			self.browser.find_element_by_class_name("navbar-brand").click()
			pass
		except NoSuchElementException:
			self.fail("The element does not exist")

	#Test Case 15 Good
	def test_charities_navbar(self):
		self.browser.get("http://fightpoverty.online/charities")
		try:
			self.browser.find_element_by_class_name("navbar-brand").click()
			pass
		except NoSuchElementException:
			self.fail("The element does not exist")

	#Test Case 16 Good
	def test_all_nav_bar_links_together(self):
		time.sleep(1)

		self.browser.find_element_by_link_text('Cities').click()
		self.assertEqual("http://www.fightpoverty.online/cities", self.browser.current_url)

		time.sleep(1)

		self.browser.find_element_by_link_text('Counties').click()
		self.assertEqual("http://www.fightpoverty.online/counties", self.browser.current_url)

		time.sleep(1)

		self.browser.find_element_by_link_text('Charities').click()
		self.assertEqual("http://www.fightpoverty.online/charities", self.browser.current_url)

		time.sleep(1)

		self.browser.find_element_by_link_text('About').click()
		self.assertEqual("http://www.fightpoverty.online/about", self.browser.current_url)


	def tearDown(self):
		self.browser.quit()

if __name__ == '__main__':
	unittest.main(verbosity=2)

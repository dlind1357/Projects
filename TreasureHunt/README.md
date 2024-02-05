# Treasure Hunt
## Description:
My project utilizes python, Flask, SQL, html, CSS, and JavaScript to make a website that lets someone play my game called Treasure Hunt.
### Game Summary:
The player is stuck on an island and needs to find the island’s treasure while also avoiding landmines using their landmine detector. The player can reveal tiles by clicking on them. If a tile turns cyan, then that means that a treasure has been found and the number of “Treasures Left” above the game board decreases. If a tile reveals a number, then that means that there is a certain number of landmines surrounding that tile. Clicking the “?” button below the game board will allow the player to mark tiles that they think are landmines. If a player finds all of the treasures, the player wins! But if the player clicks on a landmine, the player loses and the game reveals the locations of all the treasures and landmines.
### Inspiration:
My inspiration for this project was the game Minesweeper. I used to play this game all the time when I was a child but always found the game of avoiding landmines to be too simple. In my game, I’ve added the treasure elements as an extra stimulus for the player. I also wanted a way to keep track of the total number of games I played and how many of those games I won so that I could estimate my own skill level. By creating an account on my website, the user will be able to play the game and see their own win statistics.
## Files:
### Static:
* styles.css contains the stylistic elements used in my website. It makes the background color of the website blue, the font Comic Sans, and the font color white. It also sets the size restrictions for images which also helps the site adjust itself according to the screen size. There are also different colors for the landmine numbers in the game depending on the number of landlines nearby.
* treasurehunt.js contains the JavaScript code to play the game.
#### Images:
* click.png is an example of clicking tiles that are not landmines or treasures.
* landmine.png is an example of what happens after clicking on a landmine.
* mark.png is an example of what happens after marking some tiles.
* number.png is an example of what happens when clicking on a tile reveals a number.
* startgame.png is what the player first sees when they click on “Warm Up” in the Navigation Bar.
* treasure.png is what happens when clicking on a tile turns it cyan.
### Templates:
* apology.html is the error page that tells the user what went wrong when using my website such as typing in an invalid username/password when logging in.
* directions.html is the page that shows the user how to play the treasure hunt game as well as pictures and examples to further guide the user’s understanding of the gameplay.
* index.html is the homepage where the user can see how many games they have played and how many of those games that they won.
* layout.html contains the general layout of each of the website’s pages outside the html body tags.
* login.html is the page that prompts the user to log in using their username and password.
* register.html is the page that prompts the user to make their account by choosing a username and password. 
* startgame.html is the page that lets the user play the game treasure hunt. This game will be included in the total number of hands played and/or won via a form tag in this file that takes no user input but has an action and method for submission. I debated on whether or not the form should submit the number 1 to be added to the database but decided against it. This way, if the player has knowledge of html they won’t be able to change the number of games they won and submit that number.
* warmup.html is the page that lets the user play an easier version of the game treasure hunt. This game is not included in the total number of games played and/or won.
* win.html is the page that the user is redirected to after winning a game from startgame.html.
### app.py
This file contains the python code that utilizes Flask app routing in order to map the URLs to specific functions that will handle the logic and actions for that URL. 
#### Functions written by me for app.py
* index(): This holds the logic needed to obtain the player statistics and then display them in the homepage.
* directions(): This will send the user to the directions page.
* startgame(): This will send the user to a page to start the game.
* warmup(): This will send the user to start the warm up game. 
* win(): This function will receive a signal from the website in the form of POST and then it will update the database. Even though a form is submitted in the html and JavaScript  files, this function doesn’t actually try to get the information that the form sends because there is no form information. If the player wins, this function will receive the signal to add 1 to the user's win statistic.
### final.db
This file is the database of users and each user’s game statistics.
### helpers.py
This file contains the login function and an apology function which simply uses jinja to send to the user the error and error code.
### requirements.txt
This file tells Flask what it needs for the website to work.



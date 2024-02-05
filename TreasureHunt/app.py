from cs50 import SQL
from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required

# Configure application
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///final.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    # home page which will show the user their win statistics
    dbuser = db.execute("SELECT * FROM users WHERE id = ?", session.get("user_id"))[0]

    userwin = dbuser["win"]
    usertotal = dbuser["total"]

    return render_template(
        "index.html", win=userwin, total=usertotal
    )


@app.route("/directions", methods=["GET"])
@login_required
def directions():
    # directions page to tell the player how to play the game
    return render_template("directions.html")


@app.route("/startgame", methods=["GET"])
@login_required
def startgame():
    #at the start of the game, update total games to total games + 1 in database
    dbuser = db.execute("SELECT * FROM users WHERE id = ?", session.get("user_id"))[0]
    usertotal = dbuser["total"]
    db.execute(
            "UPDATE users SET total = ? WHERE id = ?",
            (int(usertotal) + 1),
            session.get("user_id")
        )
    #start game
    return render_template("startgame.html")


@app.route("/warmup", methods=["GET"])
@login_required
def warmup():
    #start warmup game
    return render_template("warmup.html")


@app.route("/win", methods=["POST"])
@login_required
def win():
    #when win a game, update win to win + 1 in database
    dbuser = db.execute("SELECT * FROM users WHERE id = ?", session.get("user_id"))[0]
    userwin = dbuser["win"]
    db.execute(
            "UPDATE users SET win = ? WHERE id = ?",
            (int(userwin) + 1),
            session.get("user_id")
        )
    #send user to win page
    return render_template("win.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    # user choose username but render an apology if the user’s input is blank or the username already exists
    if request.method == "POST":
        regusername = request.form.get("username")
        if not regusername:
            return apology("Input username", 400)
        rows = db.execute("SELECT * FROM users WHERE username = ?", regusername)
        if len(rows) >= 1:
            return apology("Username already exists", 400)

        # user choose password
        # user confirm password and render an apology if either input is blank or the passwords do not match
        regpassword = request.form.get("password")
        confpassword = request.form.get("confirmation")
        if not regpassword:
            return apology("Input password", 400)
        if not confpassword:
            return apology("Confirm password", 400)
        if regpassword != confpassword:
            return apology("Passwords do not match", 400)

        # INSERT the new user into users, storing a hash of the user’s password, not the password itself. Hash the user’s password with generate_password_hash
        db.execute(
            "INSERT INTO users (username, hash) VALUES(?, ?)",
            regusername,
            generate_password_hash(regpassword),
        )
        return render_template("login.html")
    else:
        return render_template("register.html")


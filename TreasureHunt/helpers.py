from flask import redirect, render_template, session
from functools import wraps


def apology(message, code=400):
    # error message

    return render_template("apology.html", top=code, bottom=(message))


def login_required(f):
    #login required

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function

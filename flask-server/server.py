from flask import Flask

app = Flask(__name__)

# Members API Route
@app.route("/contents")
def contents():
    return {"contents": ["Page1", "Page2", "Page3"]}

if __name__ == "__main__":
    app.run(debug=True)
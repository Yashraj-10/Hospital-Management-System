from website import create_app
from flask_cors import CORS
app = create_app()
CORS(app)
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, threaded=False)

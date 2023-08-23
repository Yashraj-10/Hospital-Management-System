from flask import Flask
from os import path
import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import psycopg2


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hjshjhdjah kjshkjdhjs'
    app.config["JWT_SECRET_KEY"] = "ewwgwgwrg"
    jwt = JWTManager(app)

    from .dba import dba
    from .doc import doc
    from .deo import deo
    from .fdo import fdo
    from .auth import auth

    app.register_blueprint(dba, url_prefix='/')
    app.register_blueprint(doc, url_prefix='/')
    app.register_blueprint(deo, url_prefix='/')
    app.register_blueprint(fdo, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')


    return app

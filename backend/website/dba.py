import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint

dba = Blueprint('dba', __name__)

def get_db_connection():
    conn = psycopg2.connect(host='127.0.0.1', database='hms', user="postgres", password="jarhasy", port=5432)
    return conn
import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint
from .auth import check_token, get_db_connection

fdo = Blueprint('fdo', __name__)

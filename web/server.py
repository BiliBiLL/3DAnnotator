import os
import sys
from flask import Flask, make_response, render_template, request, json, send_file, jsonify
import numpy as np
import cv2
from PIL import Image
from io import *
from app import read_ptb

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True

@app.route('/',methods=['GET','POST'])
def gohome():
    return render_template('index.html')
    
    
@app.route('/handle_data',methods=['GET','POST'])
def handle_data():
    #file = request.form['file'] 
    #colorImg = Image.fromarray(color,'RGB')
    
    #header,color,coordinate,intensity,label = read_ptb();
    
    
    with open('data.txt') as json_file:  
        data = json.load(json_file)  
    res = jsonify({'header':data['header'],'color': data['color'],'label':data['label']})  
    return res
    
if __name__ == "__main__":
    extra_dirs = ['../static']
    extra_files = extra_dirs[:]
    app.run(extra_files=extra_files)

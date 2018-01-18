import struct
import numpy as np
import json

import matplotlib.pyplot as plt
from skimage.color import label2rgb

def dissolveData():
    ptb_file = open("../fileCache/Cov017_seg.ptb","rb")
    ptb_data = ptb_file.read()
    
    header = struct.unpack('2i12d',ptb_data[0:104])
    row = header[0]
    col = header[1]
    print row
    print col

    #panoramic_data = np.empty(shape=[row,col,8]) #total 8 fields as one point data
    color = np.empty(shape=[row,col,3])
    coordinate = np.empty(shape=[row,col,3])
    intensity = np.empty(shape=[row,col,1])
    label = np.empty(shape=[row,col,1])
    start_idx = 104
    for j in xrange(col-1,-1,-1):
        for i in xrange(row-1,-1,-1):
            coordinate[i][j] = struct.unpack('3f',ptb_data[start_idx:start_idx+12])
            color[i][j] = struct.unpack('3i',ptb_data[start_idx+12:start_idx+24])
            intensity[i][j] = struct.unpack('f',ptb_data[start_idx+24:start_idx+28])
            label[i][j] = struct.unpack('i',ptb_data[start_idx+28:start_idx+32])
            start_idx += 32
    
    ptb_file.close()
    
    print label.shape
    image_label_overlay = label2rgb(label[:,:,0],image_alpha=0.4)
    print image_label_overlay.shape
    plt.imshow(image_label_overlay)
    plt.show()
    
    data = {}
    data['header'] = header
    data['color'] =  color.tolist()
    data['label'] =  label.tolist()
    data['label_mask'] = image_label_overlay
    #jsonify({'header':header,'color': color.tolist(),'label':label.tolist()})
    with open('data.txt', 'w') as outfile:  
        json.dump(data, outfile)
        
if __name__ == "__main__":
    dissolveData()

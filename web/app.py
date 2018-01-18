import struct
import numpy as np

def read_ptb():
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
    for j in xrange(0,col):
        for i in xrange(0,row):
            coordinate[i][j] = struct.unpack('3f',ptb_data[start_idx:start_idx+12])
            color[i][j] = struct.unpack('3i',ptb_data[start_idx+12:start_idx+24])
            intensity[i][j] = struct.unpack('f',ptb_data[start_idx+24:start_idx+28])
            label[i][j] = struct.unpack('i',ptb_data[start_idx+28:start_idx+32])
            start_idx += 32
    
    ptb_file.close()
    
    #print color[0][0]
    #print label[0][0]
    return header,color.tolist(),coordinate.tolist(),intensity.tolist(),label.tolist()
    

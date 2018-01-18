# Multi-class Image Segments Annotator
This is a web application for custom multi-class annotation. The current applied algorithm in back-end is GrabCut. We may switch to other more efficient algorithms later, but for the sake of completion of the application, we will keep use GrabCut for the moment. There is also a manual mode for fine-tuning.


### Installation
Since this is still incomplete, I haven't put an dependencies file into repo, which is necessary for running the flask back-end. But if you want to try it, you have to install following python dependencies:

- flask
- PIL    # pillow.
- openCV for python # install [openCV3](http://www.pyimagesearch.com/2016/10/24/ubuntu-16-04-how-to-install-opencv/) or install *opencv-python* using 'pip install opencv-python'


### Deployment
execute server.py 


### Instructions
The project was primarily built up with Javascript, Python flask, jQuery. In terms of jQuery, I used jqtree to implement the tree view of naming system. For more information about jqtree, please go to [jqtree](http://mbraak.github.io/jqTree/). Some of the downloaded Javascript files were not useful in the project. You can just leave them there. Regarding saving files, I used FileSaver.js widget to allow client-side downloading. For more information go to [FileSaver](https://github.com/eligrey/FileSaver.js/).

The structure of project was organized as follow:

- **static**: static files such as Javascript scripts, images, css, sass.

- **template**: HTML webpage file.

- **FileCache**: Load with big data files temporary

To run the project, simply type ``` python server.py ``` after download the repo. The prompt will show a local URL. Open up it in the browser to run the application.

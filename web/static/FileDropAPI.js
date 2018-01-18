function addDNDListeners() { 
    var container = document.getElementById("container"); 
    var fileList = document.getElementById("fileList"); 
    // 拖拽进入目标对象时触发
    container.addEventListener("dragenter", function(event) 
    { 
        fileList.innerHTML =''; 
        event.stopPropagation(); 
        event.preventDefault(); 
    }, false); 
    // 拖拽在目标对象上时触发
    container.addEventListener("dragover", function(event) 
    { 
        event.stopPropagation(); 
        event.preventDefault(); 
    }, false); 
    // 拖拽结束时触发
    container.addEventListener("drop", handleDrop, false); 
} 


function handleDrop(event) { 
   // 获取拖拽的文件列表
    var files = event.dataTransfer.files; 
    event.stopPropagation(); 
    event.preventDefault(); 
    var fileList = document.getElementById("fileList"); 
    // 展示文件缩略图，文件名和上传进度，上传文件
    for (var i = 0; i < files.length; i++) { 
        var file = files[i]; 
        var li = document.createElement('li'); 
        var progressbar = document.createElement('div'); 
        var img = document.createElement('img'); 
        var name = document.createElement('span'); 
        progressbar.className = "progressBar"; 
        img.src = files[i].getAsDataURL(); 
        img.width = 32; 
        img.height = 32; 
        name.innerHTML = file.name; 
        li.appendChild(img); 
        li.appendChild(name); 
        li.appendChild(progressbar); 
        fileList.appendChild(li); 
        uploadFile(file, progressbar) 
    } 
}

function uploadFile(file, progressbar) { 
    var xhr = new XMLHttpRequest(); 
    var upload = xhr.upload; 
 
    var p = document.createElement('p'); 
    p.textContent = "0%"; 
    progressbar.appendChild(p); 
    upload.progressbar = progressbar; 
    // 设置上传文件相关的事件处理函数
    upload.addEventListener("progress", uploadProgress, false); 
    upload.addEventListener("load", uploadSucceed, false); 
    upload.addEventListener("error", uploadError, false); 
    // 上传文件
    xhr.open("POST", "/handle_data"); 
    xhr.overrideMimeType("application/octet-stream"); 
    xhr.sendAsArrayBuffer(file.getAsBinary()); 
} 


function uploadProgress(event) { 
    if (event.lengthComputable) { 
       // 将进度换算成百分比
        var percentage = Math.round((event.loaded * 100) / event.total); 
        console.log("percentage:" + percentage); 
        if (percentage < 100) { 
            event.target.progressbar.firstChild.style.width = (percentage*2) + "px"; 
            event.target.progressbar.firstChild.textContent = percentage + "%"; 
        } 
    } 
} 


function uploadSucceed(event) { 
    event.target.progressbar.firstChild.style.width = "200px"; 
    event.target.progressbar.firstChild.textContent = "100%"; 
} 
function uploadError(error) { 
    alert("error: " + error); 
}


window.addEventListener("load", addDNDListeners, false);

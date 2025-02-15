// script.js

let ster = "";
let images = "";
let imagesid = "";
let db = "";
let objectStorereadwrite = "";
let objectStorereadonly = "";
let xiancheng = true;
let nai3cankaotupian = "";
let comfyuicankaotupian = "";

// 默认的 ComfyUI 工作流 JSON (根据你的需要修改)
let json = `{
  "nodes": [
    {
      "id": 1,
      "type": "LoadImage",
      "inputs": {}
    },
    {
      "id": 2,
      "type": "KSampler",
      "inputs": {}
    }
  ],
  "links": []
}`;  // 你的 json (请替换为你自己的 JSON 内容)
let json2 = `{
    "3": {
      "inputs": {
        "seed": "%seed%",
        "steps": "%steps%",
        "cfg": "%cfg_scale%",
        "sampler_name": "%sampler_name%",
        "scheduler": "karras",
        "denoise": 1,
        "model": [
          "15",
          0
        ],
        "positive": [
          "20",
          1
        ],
        "negative": [
          "7",
          0
        ],
        "latent_image": [
          "19",
          0
        ]
      },
      "class_type": "KSampler",
      "_meta": {
        "title": "K采样器"
      }
    },
    "4": {
      "inputs": {
        "ckpt_name": "%MODEL_NAME%"
      },
      "class_type": "CheckpointLoaderSimple",
      "_meta": {
        "title": "Checkpoint加载器(简易)"
      }
    },
    "7": {
      "inputs": {
        "text": "%negative_prompt%",
        "speak_and_recognation": true,
        "clip": [
          "4",
          1
        ]
      },
      "class_type": "CLIPTextEncode",
      "_meta": {
        "title": "CLIP文本编码器"
      }
    },
    "8": {
      "inputs": {
        "samples": [
          "3",
          0
        ],
        "vae": [
          "4",
          2
        ]
      },
      "class_type": "VAEDecode",
      "_meta": {
        "title": "VAE解码"
      }
    },
    "23": {
      "inputs": {
        "filename_prefix": "ComfyUI",
        "images": [
          "8",
          0
        ]
      },
      "class_type": "SaveImage",
      "_meta": {
        "title": "保存图像"
      }
    },
    "13": {
      "inputs": {
        "preset": "%ipa%",
        "model": [
          "20",
          0
        ]
      },
      "class_type": "IPAdapterUnifiedLoader",
      "_meta": {
        "title": "IPAdapter加载器"
      }
    },
    "14": {
      "inputs": {
        "image": "%comfyuicankaotupian%",
        "upload": "image"
      },
      "class_type": "LoadImage",
      "_meta": {
        "title": "加载图像"
      }
    },
    "15": {
      "inputs": {
        "weight": "%c_quanzhong%",
        "weight_faceidv2": "%c_idquanzhong%",
        "weight_type": "style and composition",
        "combine_embeds": "concat",
        "start_at": 0,
        "end_at": 1,
        "embeds_scaling": "K+mean(V) w/ C penalty",
        "layer_weights": "0:0, 1:0, 2:0, 3:"%c_xijie%", 4:0, 5:0, 6:"%c_fenwei%", 7:0, 8:0, 9:0, 10:0",
        "speak_and_recognation": true,
        "model": [
          "13",
          0
        ],
        "ipadapter": [
          "13",
          1
        ],
        "image": [
          "14",
          0
        ]
      },
      "class_type": "IPAdapterMS",
      "_meta": {
        "title": "应用IPAdapter Mad Scientist"
      }
    },
    "19": {
      "inputs": {
        "width": "%width%",
        "height": "%height%",
        "batch_size": 1
      },
      "class_type": "EmptyLatentImage",
      "_meta": {
        "title": "空Latent"
      }
    },
    "20": {
      "inputs": {
        "positive": "%prompt%",
        "打开可视化PromptUI": "",
        "speak_and_recognation": true,
        "model": [
          "4",
          0
        ],
        "clip": [
          "4",
          1
        ]
      },
      "class_type": "WeiLinComfyUIPromptToLorasOnly",
      "_meta": {
        "title": "WeiLin 正向提示词Lora自动加载"
      }
    }
  }`;// 你的 json2 (请替换为你自己的 JSON2 内容, 或者使用我提供的默认 json2)
let json3 = `{
  "3": {
    "inputs": {
      "seed": "%seed%",
      "steps": "%steps%",
      "cfg": "%cfg_scale%",
      "sampler_name": "%sampler_name%",
      "scheduler": "karras",
      "denoise": 1,
      "model": [
        "39",
        0
      ],
      "positive": [
        "39",
        1
      ],
      "negative": [
        "7",
        0
      ],
      "latent_image": [
        "5",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "K采样器"
    }
  },
  "5": {
    "inputs": {
      "width": "%width%",
      "height": "%height%",
      "batch_size": 1
    },
    "class_type": "EmptyLatentImage",
    "_meta": {
      "title": "空Latent"
    }
  },
  "7": {
    "inputs": {
      "text": "%negative_prompt%",
      "speak_and_recognation": true,
      "clip": [
        "14",
        1
      ]
    },
    "class_type": "CLIPTextEncode",
    "_meta": {
      "title": "CLIP文本编码器"
    }
  },
  "8": {
    "inputs": {
      "samples": [
        "3",
        0
      ],
      "vae": [
        "14",
        2
      ]
    },
    "class_type": "VAEDecode",
    "_meta": {
      "title": "VAE解码"
    }
  },
  "14": {
    "inputs": {
      "ckpt_name": "%MODEL_NAME%"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Checkpoint加载器(简易)"
    }
  },
  "23": {
    "inputs": {
      "model_name": "bbox/face_yolov8m.pt"
    },
    "class_type": "UltralyticsDetectorProvider",
    "_meta": {
      "title": "检测加载器"
    }
  },
  "25": {
    "inputs": {
      "model_name": "sam_vit_b_01ec64.pth",
      "device_mode": "AUTO"
    },
    "class_type": "SAMLoader",
    "_meta": {
      "title": "SAM加载器"
    }
  },
  "26": {
    "inputs": {
      "model_name": "segm/person_yolov8m-seg.pt"
    },
    "class_type": "UltralyticsDetectorProvider",
    "_meta": {
      "title": "检测加载器"
    }
  },
  "30": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": [
        "35",
        0
      ]
    },
    "class_type": "SaveImage",
    "_meta": {
      "title": "保存图像"
    }
  },
  "35": {
    "inputs": {
      "guide_size": 512,
      "guide_size_for": true,
      "max_size": 1024,
      "seed": "%seed%",
      "steps": "%steps%",
      "cfg": "%cfg_scale%",
      "sampler_name": "%sampler_name%",
      "scheduler": "normal",
      "denoise": 0.5,
      "feather": 5,
      "noise_mask": true,
      "force_inpaint": true,
      "bbox_threshold": 0.5,
      "bbox_dilation": 10,
      "bbox_crop_factor": 3,
      "sam_detection_hint": "center-1",
      "sam_dilation": 0,
      "sam_threshold": 0.93,
      "sam_bbox_expansion": 0,
      "sam_mask_hint_threshold": 0.7000000000000001,
      "sam_mask_hint_use_negative": "False",
      "drop_size": 10,
      "wildcard": "",
      "cycle": 1,
      "inpaint_model": false,
      "noise_mask_feather": 20,
      "speak_and_recognation": true,
      "image": [
        "8",
        0
      ],
      "model": [
        "39",
        0
      ],
      "clip": [
        "14",
        1
      ],
      "vae": [
        "14",
        2
      ],
      "positive": [
        "39",
        1
      ],
      "negative": [
        "7",
        0
      ],
      "bbox_detector": [
        "23",
        0
      ],
      "sam_model_opt": [
        "25",
        0
      ],
      "segm_detector_opt": [
        "26",
        1
      ]
    },
    "class_type": "FaceDetailer",
    "_meta": {
      "title": "面部细化"
    }
  },
  "39": {
    "inputs": {
      "positive": "%prompt%",
      "打开可视化PromptUI": "",
      "speak_and_recognation": true,
      "model": [
        "14",
        0
      ],
      "clip": [
        "14",
        1
      ]
    },
    "class_type": "WeiLinComfyUIPromptToLorasOnly",
    "_meta": {
      "title": "WeiLin 正向提示词Lora自动加载"
    }
  }
}`;// 你的 json3 (请替换为你自己的 JSON3 内容, 或者使用我提供的默认 json3)

const dbName = 'tupian';
const dbVersion = 1;
const objectStoreName = 'tupianhuancun';

async function Storereadwrite(data){//使用数据库
  const request = indexedDB.open(dbName, dbVersion);
  request.onerror = function(event) {
  console.error('Failed to open database:', event.target.error);
  };
  request.onsuccess = function(event) {
      db = event.target.result;
   const dbeadwrite = db.transaction([`${objectStoreName}`], 'readwrite');
   objectStorereadwrite = dbeadwrite.objectStore(`${objectStoreName}`);
   objectStorereadwrite.put(data);

  };
  request.onupgradeneeded = function(event) {
      const db = event.target.result;
      // 判断对象存储是否存在
      if (!db.objectStoreNames.contains(objectStoreName)) {
        // 如果对象存储不存在，则创建它
        const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id' });
        console.log('Object store created:', objectStoreName);
      } else {
        console.log('Object store already exists:', objectStoreName);
      }
    };

}

async function Storereadonly(id){//使用数据库
 return new Promise((resolve, reject) => {
   const request = indexedDB.open(dbName, dbVersion);
  request.onerror = function(event) {
  console.error('Failed to open database:', event.target.error);
  };
   request.onerror = function(event) {
            reject(event.target.error);
   };
   request.onupgradeneeded = function(event) {
              const db = event.target.result;
              // 判断对象存储是否存在
              if (!db.objectStoreNames.contains(objectStoreName)) {
                // 如果对象存储不存在，则创建它
                const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id' });
                console.log('Object store created:', objectStoreName);
              } else {
                console.log('Object store already exists:', objectStoreName);
              }
   };

   request.onsuccess = function(event) {
              const db = event.target.result;
              const dbreadonly = db.transaction([`${objectStoreName}`], 'readonly');
              objectStorereadonly = dbreadonly.objectStore(`${objectStoreName}`);
             const req =objectStorereadonly.get(id)
             req.onsuccess = function(event) {
              const data = event.target.result;
              resolve(data);
            };
     };


});
}
async function Storedelete(id){//使用数据库
   const request = indexedDB.open(dbName, dbVersion);
  request.onerror = function(event) {
  console.error('Failed to open database:', event.target.error);
  };
   request.onerror = function(event) {
            reject(event.target.error);
   };
   request.onupgradeneeded = function(event) {
              const db = event.target.result;
              // 判断对象存储是否存在
              if (!db.objectStoreNames.contains(objectStoreName)) {
                // 如果对象存储不存在，则创建它
                const objectStore = db.createObjectStore(objectStoreName, { keyPath: 'id' });
                console.log('Object store created:', objectStoreName);
              } else {
                console.log('Object store already exists:', objectStoreName);
              }
   };

    request.onsuccess = function(event) {
              const db = event.target.result;
              const dbreadonly = db.transaction([`${objectStoreName}`], 'readwrite');
              const readwrite = dbreadonly.objectStore(`${objectStoreName}`);
              readwrite.delete(id);
     };

}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function generateRandomSeed() {
    // 生成一个在 0 到 999999999 之间的随机整数
    return Math.floor(Math.random() * 10000000000);
}

function unzipFile(arrayBuffer) {
    return new Promise((resolve, reject) => {
        JSZip.loadAsync(arrayBuffer)
            .then(function(zip) {
            console.log("ZIP 文件加载成功");

            // 遍历 ZIP 文件中的所有文件
            zip.forEach(function (relativePath, zipEntry) {
                console.log("文件名:", zipEntry.name);

                // // 解压每个文件
                // zipEntry.async('blob').then(function(blob) {
                //     console.log("文件大小:", blob.size);
                //     // 处理解压后的文件内容

                //     resolve(blob);
                // });
                zipEntry.async('base64').then(function(base64String) {
                    console.log("文件大小:", base64String.size);
                    resolve(base64String);
                });
            });
        }).catch(reject);
    }) }

function extractPrompt(str, start, end) {
    return str//.replace(":", '').replace("：", '')
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const base64Image = e.target.result;
    nai3cankaotupian=base64Image;
    // Process the base64 image data here
    console.log(base64Image);
  };

  reader.readAsDataURL(file);
}

async  function handleImageUpload2(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const binaryReader = new FileReader();

  reader.onload = function(e) {
    const base64Image = e.target.result;
    nai3cankaotupian=base64Image;
    console.log(base64Image);
    // Process the base64 image data here
    console.log(base64Image);
  };


  binaryReader.onload = function(e) {
      const binaryData = e.target.result;
      const formData = new FormData();
      
      // 构造 original_ref 对象
      const original_ref = {
          filename: file.name,
          type: "input",
          subfolder: "clipspace"
      };

      // 添加所有必要的字段
      formData.append('image', new Blob([binaryData], { type: file.type }), file.name);


      let url111 = external_api.getSettings().sdUrl.trim().replaceAll("7860","8188");

      GM_xmlhttpRequest({
          method: "POST",
          url: `${url111}/upload/image`, // 修改为正确的接口路径
          data: formData,
          // 不需要手动设置 Content-Type，让浏览器自动处理 FormData
          onload: function(response) {
              if (response.status >= 200 && response.status < 300) {
                  console.log("上传成功", response);
                  try {
                      const result = JSON.parse(response.responseText);
                      comfyuicankaotupian=result.name;
                      console.log("服务器返回数据:", result);
                  } catch(e) {
                      console.log("原始返回数据:", response.responseText);
                  }
              } else {
                  alert("上传失败");
                  try {
                      const errorData = JSON.parse(response.responseText);
                      console.error("错误详情:", errorData);
                  } catch(e) {
                      console.error("原始错误信息:", response.responseText);
                  }
              }
          },
          onerror: function(error) {
              alert("网络错误");
          }
      });
  };

  binaryReader.onerror = function(error) {
      console.error("文件读取错误", error);
  };

  reader.readAsDataURL(file);
  binaryReader.readAsArrayBuffer(file);
}

async function setItemImg(tag,img){
   let md5=CryptoJS.MD5(tag).toString();
   if(imagesid==""){

    imagesid={};

   }

  let  time=new Date().getTime();

  imagesid[md5]=[time];

const data = { id: `${md5}`, tupian: `${img}` };
const data2 = { id: "tupianshuju", shuju: `${JSON.stringify(imagesid)}` };
Storereadwrite(data);
Storereadwrite(data2);


};

async function getItemImg(tag){

    let md5=CryptoJS.MD5(tag).toString();
    if(imagesid==""){//载入图片数据

     let imageid=await Storereadonly("tupianshuju");

    if(!imageid){
        return false;
    }
        imagesid={};
        imagesid=JSON.parse(imageid.shuju);

for (let [key, value] of Object.entries(imagesid)) {

    if(await delDate(value)){

     Reflect.deleteProperty(imagesid, key);

     await Storedelete(key);

    }

    }
    const data = { id: "tupianshuju", shuju: `${JSON.stringify(imagesid)}` };
    await Storereadwrite(data);

}
if(imagesid.hasOwnProperty(md5)){
        let image=await Storereadonly(md5);
        console.log("image",image);
        return  image.tupian;

    }

    return false;
};


async function delDate(tagdate){

        // 获取当前日期
        const currentDate = new Date();

        // 计算当前日期和目标日期之间的差值 (以毫秒为单位)
        const timeDiff = currentDate.getTime() - Number(tagdate);

        // 将毫秒转换为天数
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        // 判断是否超过缓存时间
        if (daysDiff > Number(external_api.getSettings().cache)) {
           return true;
        } else {
           return false;
        }

}

async function isMobileDevice() {
return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

async function zhengmian(text,prom,AQT) {

 if(text==''){

    return  prom+", "+AQT;
 }else{

    return  text+", "+prom+", "+AQT;
 }

}

async  function fumian(text,UCP){
console.log("negativePrompt",external_api.getSettings().negativePrompt)
if(text==""){

    return UCP;

}else if(UCP==""){

    return  text;
}else{

   return  UCP+", "+text;
}

}

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用 requestAnimationFrame 实现更流畅的震动
function addSmoothShakeEffect(imgElement) {
// 确保图片有定位属性
if (getComputedStyle(imgElement).position === 'static') {
    imgElement.style.position = 'relative';
}

const startTime = Date.now();
const duration = 300; // 持续时间（毫秒）
const amplitude = 3; // 震动幅度

function shake() {
    const elapsed = Date.now() - startTime;
    
    if (elapsed < duration) {
        // 使用正弦函数创建震动效果
        const offset = amplitude * Math.sin(elapsed / duration * Math.PI * 10);
        imgElement.style.left = `${offset}px`;
        
        requestAnimationFrame(shake);
    } else {
        // 重置位置
        imgElement.style.left = '0px';
    }
}

requestAnimationFrame(shake);
}

async function replacepro(payload,json){

  json=json.replaceAll("\"%seed%\"",Number(payload.seed));
  json=json.replaceAll("\"%steps%\"",Number(payload.steps)); 
  json=json.replaceAll("\"%cfg_scale%\"",Number(payload.cfg_scale)); 
  json=json.replaceAll("\"%sampler_name%\"",`${'"'+payload.sampler_name+'"'}`); 
  json=json.replaceAll("\"%width%\"",Number(payload.width)); 
  json=json.replaceAll("\"%height%\"",Number(payload.height)); 
  json=json.replaceAll("\"%negative_prompt%\"",`${'"'+payload.negative_prompt+'"'}`); 
  json=json.replaceAll("\"%prompt%\"",`${'"'+payload.prompt+'"'}`); 
  json=json.replaceAll("\"%MODEL_NAME%\"",`"${payload.MODEL_NAME.trim()}.safetensors"`); 
  json=json.replaceAll("\"%c_quanzhong%\"",Number(payload.c_quanzhong)); 
  json=json.replaceAll("\"%c_idquanzhong%\"",Number(payload.c_idquanzhong)); 
  json=json.replaceAll("\"%c_xijie%\"",Number(payload.c_xijie)); 
  json=json.replaceAll("\"%c_fenwei%\"",Number(payload.c_fenwei)); 
  json=json.replaceAll("\"%comfyuicankaotupian%\"",`${'"'+payload.comfyuicankaotupian+'"'}`); 
  json=json.replaceAll("\"%ipa%\"",`${'"'+payload.ipa+'"'}`); 
  
  console.log(json);
  return json
}

function checkSendBuClass() {
  const element = document.getElementById('send_but');
  if (element && element.className.includes('displayNone')) {
      return true;
  }
  return false;
}

async function replaceWithnovelai() {
    if(!external_api.getSettings().scriptEnabled){
        return;
    }
    if(checkSendBuClass()){
        return;
    }
    unsafeWindow.模式=external_api.getSettings().mode; //sd  novelai  free  使用sd 或novelai 或 免费的  novelai需要获取api    sd启动器需要启用api功能。例如绘世启动器中 的高级选项  启用api选择开启。
    unsafeWindow.start=external_api.getSettings().startTag;//检测ai输出的提示词以什么开头  会被去除；可以自定义。
    unsafeWindow.end=external_api.getSettings().endTag;///检测ai输出的提示词以什么结尾，不去除，可以自定义。提示词会采用两者之间的文字。
    // 以下为novelai的设置  注意更改脚本设置 需要刷新网页。
    var ps = document.getElementsByClassName("mes_text");
    for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        var linkText = p.textContent;
        var regex = new RegExp(`${escapeRegExp(unsafeWindow.start)}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
        var matches = linkText.match(regex);
        if(matches){
            var targetText = matches[1];
            var link = extractPrompt(targetText,unsafeWindow.start,unsafeWindow.end);
            //alert(targetText)
            link=link.replaceAll("《","<").replaceAll("》",">").replaceAll("\n",",");
            const button = document.createElement('button');
            var uniqueId = "button_image" + Math.random().toString(36).substr(2, 9);
            button.id = uniqueId;
            button.classList.add('button_image');
            button.textContent = '生成图片';
            button.dataset.link = link;
            const imgSpan = document.createElement('span');
            imgSpan.id="span_" + Math.random().toString(36).substr(2, 9);
            imgSpan.dataset.name=uniqueId;
            button.name=imgSpan.id;
            let  re=new RegExp(`${unsafeWindow.start}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
            let Text=p.innerHTML.match(re)[0];
            console.log("Text",p.innerHTML.match(re));

            p.innerHTML = p.innerHTML.replace(Text, button.outerHTML);
            // alert(targetText);
            // 重新找到新创建的按钮
            var newbutton = document.getElementById(uniqueId);

            if(external_api.getSettings().dbclike=="true"){
              imgSpan.addEventListener('dblclick', (event) => {
                addSmoothShakeEffect(event.target);
                console.log("sssssssss",event.target.dataset.name);
                nai3(document.getElementById(event.target.dataset.name))// 程序触发按钮的点击事件

              });
            }
            async function nai3(button1) {
              let access_token = external_api.getSettings().novelaiApi//填写你的novelai的apikey，在官方网站的设置  Account 里 Get Persistent API Token
              button1.textContent="加载中";
              let model = "nai-diffusion-3"//使用的模型  多个选  择 "safe-diffusion"   "nai-diffusion"   "nai-diffusion-furry"  "furry-diffusion-inpainting" "nai-diffusion-2"  "nai-diffusion-3-inpainting"  "nai-diffusion-furry-3-inpainting"

              let aqt="";
              if(external_api.getSettings().AQT=!''&&external_api.getSettings().novelaimode=="nai-diffusion-4-curated-preview"){

                aqt="rating:general, best quality, very aesthetic, absurdres";

              }else{
                aqt=external_api.getSettings().AQT;
              }
              let prompt=await zhengmian(external_api.getSettings().fixedPrompt,button1.dataset.link,aqt);                    //固定正面提示词
              let  negative_prompt=await fumian(external_api.getSettings().negativePrompt,external_api.getSettings().UCP);


              let preset_data = {
                     "params_version":3,
                     "width":Number(external_api.getSettings().width),
                     "height":Number(external_api.getSettings().height),
                     "scale":Number(external_api.getSettings().nai3Scale),//提示词关联性
                     "sampler":external_api.getSettings().sampler, //"k_euler",//使用的采样器   "k_dpm_2"   "k_dpmpp_2m"    "ddim_v3"  "k_dpmpp_2s_ancestral"
                     "steps":Number(external_api.getSettings().steps),//生成的步数
                     "n_samples":1,
                     "ucPreset":3,//预设
                     "qualityToggle":true,
                     "sm":external_api.getSettings().sm === "false"? false : true,
                     "sm_dyn":external_api.getSettings().dyn === "false"||external_api.getSettings().sm === "false"? false : true,
                     "dynamic_thresholding":external_api.getSettings().nai3Deceisp === "false"? false : true,
                     "controlnet_strength":1,
                     "legacy":false,
                     "add_original_image":false,
                     "cfg_rescale":Number(external_api.getSettings().cfg_rescale),//关联性调整
                     "noise_schedule":external_api.getSettings().Schedule,
                     "skip_cfg_above_sigma": external_api.getSettings().nai3Variety === "false"? null : 19.343056794463642,
                     "legacy_v3_extend":false,
                     "seed": external_api.getSettings().seed === "0"||external_api.getSettings().seed === "" ? generateRandomSeed() : Number(external_api.getSettings().seed),//生成的种子，下面是固定的负面提示词
                     "negative_prompt":negative_prompt,
                     "reference_image_multiple":[],
                     "reference_information_extracted_multiple":[],
                     "reference_strength_multiple":[]
                    }
                    console.log("nai3cankaotupian",nai3cankaotupian);
                    console.log("external_api.getSettings().nai3VibeTransfer",external_api.getSettings().nai3VibeTransfer);


                    if(external_api.getSettings().novelaimode=="nai-diffusion-4-curated-preview"){
                      preset_data= {
                        "params_version":3,
                        "width":Number(external_api.getSettings().width),
                        "height":Number(external_api.getSettings().height),
                        "scale":Number(external_api.getSettings().nai3Scale),//提示词关联性
                        "sampler":external_api.getSettings().sampler, //"k_euler",//使用的采样器   "k_dpm_2"   "k_dpmpp_2m"    "ddim_v3"  "k_dpmpp_2s_ancestral"
                        "steps":Number(external_api.getSettings().steps),//生成的步数
                        "n_samples":1,
                        "ucPreset":3,//预设
                        "qualityToggle":true,
                        "dynamic_thresholding":external_api.getSettings().nai3Deceisp === "false"? false : true,
                        "controlnet_strength":1,
                        "legacy":false,
                        "add_original_image":false,
                        "cfg_rescale":Number(external_api.getSettings().cfg_rescale),//关联性调整
                        "noise_schedule":external_api.getSettings().Schedule,
                        "skip_cfg_above_sigma": external_api.getSettings().nai3Variety === "false"? null : 19.343056794463642,
                        "legacy_v3_extend":false,
                        "seed": external_api.getSettings().seed === "0"||external_api.getSettings().seed === "" ? generateRandomSeed() : Number(external_api.getSettings().seed),//生成的种子，下面是固定的负面提示词
                        "negative_prompt":negative_prompt,
                        "reference_image_multiple":[],
                        "reference_information_extracted_multiple":[],
                        "reference_strength_multiple":[],
                        "use_coords": false,
                        "characterPrompts": [],
                        "v4_prompt": {
                          "caption": {
                            "base_caption": prompt,
                            "char_captions": []
                          },
                          "use_coords": false,
                          "use_order": true
                        },
                        "v4_negative_prompt": {
                          "caption": {
                            "base_caption": negative_prompt,
                            "char_captions": []
                          }
                        },
                        "deliberate_euler_ancestral_bug": false,
                        "prefer_brownian": true
                      }
                    }
                    if(nai3cankaotupian!=''&&external_api.getSettings().nai3VibeTransfer=="true"){
                      preset_data.reference_image_multiple.push(nai3cankaotupian.split(',')[1]);
                      preset_data.reference_information_extracted_multiple.push(Number(external_api.getSettings().InformationExtracted));
                      preset_data.reference_strength_multiple.push(Number(external_api.getSettings().ReferenceStrength));

                    }

              const payload = preset_data;
              const urlObj = new URL("https://image.novelai.net/ai/generate-image");

              const Authorization="Bearer "+access_token;
              const data11 = {
                  "input": prompt,//+
                  "model": external_api.getSettings().novelaimode,
                  "action": "generate",
                  "parameters": preset_data
              }
              let abc=true;
             while(abc){
              if(xiancheng){
                  abc=false;
              }else{

                 await sleep(1000);
              }
              };
              console.log("data11",data11)

              try {
                  xiancheng=false;
                  const response = await new Promise((resolve, reject) => {
                      GM_xmlhttpRequest({
                          method: "POST",
                          url: urlObj,
                          data: JSON.stringify(data11),
                          responseType: "arraybuffer",
                          headers: {
                              "Content-Type": "application/json",
                              "Authorization":Authorization
                          },
                          onload: function(response) {

                              if (response.status >= 200 && response.status < 400) {
                                  resolve(response);
                                  button1.textContent="生成图片";
                              } else {
                                  button1.textContent="生成图片";
                                  if(response.status==400){
                                      alert("验证错误");
                                  }
                                  if(response.status==401){
                                      alert("api错误请检测api是否正确");
                                  }
                                  if(response.status==402){
                                      alert("需要有效订阅才能访问此端点。");
                                  }
                                  if(response.status==404){
                                      alert("发生404");
                                  }
                                  if(response.status==409){
                                      alert("发生冲突错误");
                                  }
                                  if(response.status==500){
                                      alert("未知错误");
                                  }
                                  if(response.status==429){
                                      alert("请求过多");
                                  }
                                  //alert("响应内容:", response.responseText);
                                  xiancheng=true;
                                  resolve(response);
                              }
                          },
                          
                          onerror: function(error,response) {
                               button1.textContent="生成图片";
                              alert("请求错误，请检查代理");
                              xiancheng=true;
                              reject(error);
                          }
                      });
                  });

                  const data123 = await response.response;
                  if (response.status >400) {
                  let mess=await response.responseText;
                  alert(`请求失败,状态码: ${await mess} `) 
                  console.log(mess);
                  return ;
                  }


                  let re= await unzipFile(data123);
                  let imageUrl="data:image/png;base64," + re;
                  xiancheng=true;
                 await setItemImg(button1.dataset.link,imageUrl);

                  button1.textContent="生成图片";
                  let imgSpan = document.getElementById(button1.name);
                  const img2 = document.createElement('img');
                  img2.src=imageUrl;
                  img2.alt = "Generated Image2";
                  img2.dataset.name=imgSpan.dataset.name
                  imgSpan.innerHTML = '';
                  
                  if(external_api.getSettings().dbclike=="true"){
                    button1.textContent="";
                    button1.style.width = '0';
                    button1.style.height = '0';
                    button1.style.overflow = 'hidden';
                    button1.style.padding = '0';
                    button1.style.border = 'none';
                    }
                  imgSpan.appendChild(img2);


              } catch (error) {
                  button1.textContent="生成图片";
                  xiancheng=true;
                  console.error('Error generating image:', error);
                  alert("生成图片失败"+error);
              }
              
            }
            if(!p.hasclik){
            p.hasclik=true;
            p.addEventListener('click', async function(event) {
                  if (event.target.tagName === 'BUTTON') {
                      // 获取按钮的id
                  }else{

                  return;
                  }

                 var button1=event.target;
                 if(!button1.id.includes("image")){
                  return;
                 }

                nai3(button1);

            });}
            console.log('imgSpan',imgSpan);

            newbutton.parentNode.insertBefore(imgSpan, newbutton.nextSibling);

            let loadimg=await getItemImg(link)
            console.log('loadimg',loadimg);
            if(loadimg){
                const dataURL = loadimg;
                let imgSpan = document.getElementById(button.name);
                const img = document.createElement('img');
                img.src = dataURL;
                img.alt = "Generated Image";
                img.dataset.name=imgSpan.dataset.name
                imgSpan.innerHTML = '';
                imgSpan.appendChild(img);
                if(external_api.getSettings().dbclike=="true"){
                  imgSpan.style.textAlign = 'center';
                  newbutton.textContent="";
                  newbutton.style.width = '0';
                  newbutton.style.height = '0';
                  newbutton.style.overflow = 'hidden';
                  newbutton.style.padding = '0';
                  newbutton.style.border = 'none';
                  }

            }else{
              const mesTextElements = document.getElementsByClassName('mes_text');
              const lastMesText = mesTextElements[mesTextElements.length - 1];

              if(lastMesText==p&&external_api.getSettings().zidongdianji=="true"){

                 nai3(newbutton);

              }

        }
        }
    }
}


async function replaceSpansWithImagesst() {

    if(!external_api.getSettings().scriptEnabled){
        return;
    }
    if(checkSendBuClass()){
        return;
    }
    //以下为sd的设置
    unsafeWindow.start=external_api.getSettings().startTag;
    unsafeWindow.end=external_api.getSettings().endTag;
    unsafeWindow.url = external_api.getSettings().sdUrl.replace("8188","7860").trim();//sd地址 记得要修改上面的connect 的sd域名才能访问 此处要带端口！
    unsafeWindow.prompts = external_api.getSettings().fixedPrompt; //额外固定的提示词 nsfw?    也可以固定你要的 lora 。每次都会加载提示词后面。下面是反向提示词
    unsafeWindow.negative_prompt =external_api.getSettings().negativePrompt
    unsafeWindow.cfg_scale = external_api.getSettings().sdCfgScale;//关键词关联性
    unsafeWindow.width = external_api.getSettings().width; //宽度
    unsafeWindow.height = external_api.getSettings().height;//长度
    unsafeWindow.restore_faces = external_api.getSettings().restoreFaces; //面部修复
    unsafeWindow.steps = external_api.getSettings().steps;//步数
    unsafeWindow.sampler_name=external_api.getSettings().samplerName ; //采样方式
    var ps = document.getElementsByClassName("mes_text");
    for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        var linkText = p.textContent;
        var regex = new RegExp(`${escapeRegExp(unsafeWindow.start)}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
        var matches = linkText.match(regex);
        if(matches){
            var targetText = matches[1];
            console.log("matches",matches);
            var link = extractPrompt(targetText,unsafeWindow.start,unsafeWindow.end);
            link=link.replaceAll("《","<").replaceAll("》",">").replaceAll("\n",",");//修改lora<>
            const button = document.createElement('button');
            var uniqueId = "button_image" + Math.random().toString(36).substr(2, 9);
            button.id = uniqueId;
            button.textContent = '生成图片';
            button.classList.add('button_image');
            button.classList.add('button_image');

            const imgSpan = document.createElement('span');
            imgSpan.id="span_" + Math.random().toString(36).substr(2, 9);
            imgSpan.dataset.name=uniqueId;
            button.name=imgSpan.id;
            button.dataset.link = link;
            let  re=new RegExp(`${unsafeWindow.start}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
            let Text=p.innerHTML.match(re)[0];
            console.log("Text",p.innerHTML.match(re));

            p.innerHTML = p.innerHTML.replace(Text, button.outerHTML);
            // alert(targetText);
            // 重新找到新创建的按钮
            var newbutton = document.getElementById(uniqueId);
            if(external_api.getSettings().dbclike=="true"){
              imgSpan.addEventListener('dblclick', (event) => {
                addSmoothShakeEffect(event.target);
                console.log("sssssssss",event.target.dataset.name);
                sd(document.getElementById(event.target.dataset.name))// 程序触发按钮的点击事件
              });
            }

            newbutton.spanid=imgSpan.id;

           async function sd(button1){

              if(!button1.id.includes("image")){
                return;
            }
            const url = unsafeWindow.url;
            button1.textContent="加载中";
            let prompt=await zhengmian(external_api.getSettings().fixedPrompt,button1.dataset.link,external_api.getSettings().AQT);                    //固定正面提示词
            let  negative_prompt=await fumian(external_api.getSettings().negativePrompt,external_api.getSettings().UCP);
            const payload = {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
                "steps": unsafeWindow.steps,
                "sampler_name": unsafeWindow.sampler_name,
                "width": unsafeWindow.width,
                "height": unsafeWindow.height,
                "restore_faces": unsafeWindow.restore_faces,
                "cfg_scale":unsafeWindow.cfg_scale,
                "seed":external_api.getSettings().seed === 0||external_api.getSettings().seed === "0"||external_api.getSettings().seed === "" ? -1 : external_api.getSettings().seed
            };

            console.log("payload",payload);
            //alert(payload.prompt);

           
            let abc=true;
            while(abc){
             if(xiancheng){
                 abc=false;
             }else{

                await sleep(1000);
             }
             };

            try {
                 const urlObj = new URL(url+"/sdapi/v1/txt2img");
                xiancheng=false;
                const response = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: urlObj,
                        data: JSON.stringify(payload),
                        headers: {
                            "Content-Type": "application/json",

                            "Access-Control-Allow-Origin": "*"
                        },
                        onload: function(response) {
                            if (response.status >= 200 && response.status < 400) {
                                button1.textContent="生成图片";
                                xiancheng=true;
                                resolve(response);
                            } else {
                                button1.textContent="生成图片";
                                alert("响应内容:sd返回错误可能是你输入参数有误"+response.responseText);
                                console.log("响应内容:", response.responseText);
                                xiancheng=true;
                                reject(new Error(`请求失败,状态码: ${response.status}`));

                            }
                        },
                        onerror: function(error,response) {
                             var newbutton1 = document.getElementById(uniqueId);
                             button1.textContent="生成图片";
                             xiancheng=true;  
                            alert("请求错误。请检测地址"+url+"是否正确.或sd已正确开启，sd启动器需要启用api功能。例如绘世启动器中 的高级选项  启用api选择开启。并且启动器需要重启生效"+error.status+error.statusText);
                            reject(error);
                        }
                    });
                });
                xiancheng=true;    
                const r = JSON.parse(response.responseText);

                for (let i of r['images']) {
                    const png_payload = {
                        "image": "data:image/png;base64," + i
                    };

                    const response2 = await new Promise((resolve, reject) => {
                        GM_xmlhttpRequest({
                            method: "POST",
                            url: `${url}/sdapi/v1/png-info`,
                            data: JSON.stringify(png_payload),
                            headers: {
                                "Content-Type": "application/json"
                            },
                            onload: resolve,
                            onerror: reject
                        });
                    });
                    button1.textContent="生成图片";
                    const pngInfo = JSON.parse(response2.responseText).info;
                    const dataURL = "data:image/png;base64," + i;

                    await setItemImg(button1.dataset.link,dataURL);
                    //let imgSpan = button1.nextElementSibling;
                    let imgSpan = document.getElementById(button1.name);
                    const img = document.createElement('img');

                    img.src = dataURL;
                    img.alt = "Generated Image";
                    img.dataset.parameters = pngInfo;
                    img.dataset.name=imgSpan.dataset.name
                    imgSpan.innerHTML = '';
                    
                    if(external_api.getSettings().dbclike=="true"){
                      imgSpan.style.textAlign = 'center';
                      button1.textContent="";
                      button1.style.width = '0';
                      button1.style.height = '0';
                      button1.style.overflow = 'hidden';
                      button1.style.padding = '0';
                      button1.style.border = 'none';
                      }
                    imgSpan.appendChild(img);

                }
            } catch (error) {
                console.error('Error generating image:', error);
                alert("生成图片失败"+error)
                xiancheng=true;
            }
            }

            if(!p.hasclik){
            p.hasclik=true;
            p.addEventListener('click', async function(event) {
                if (event.target.tagName === 'BUTTON') {
                    // 获取按钮的id

                }else{

                    return;
                }

                var button1=event.target;

               sd(button1);
               
            });
            }
            //   p.parentNode.replaceChild(button, span);

           
            newbutton.parentNode.insertBefore(imgSpan, newbutton.nextSibling);

            let loadimg=await getItemImg(link)
            console.log('loadimg',loadimg);
            if(loadimg){
                const dataURL = loadimg;
                let imgSpan = document.getElementById(button.name);
                const img = document.createElement('img');
                img.src = dataURL;
                img.alt = "Generated Image";
                img.dataset.name=imgSpan.dataset.name
                imgSpan.innerHTML = '';
                imgSpan.appendChild(img);
                if(external_api.getSettings().dbclike=="true"){
                  newbutton.textContent="";
                  newbutton.style.width = '0';
                  newbutton.style.height = '0';
                  newbutton.style.overflow = 'hidden';
                  newbutton.style.padding = '0';
                  newbutton.style.border = 'none';
                  }

            }else{
              const mesTextElements = document.getElementsByClassName('mes_text');
              const lastMesText = mesTextElements[mesTextElements.length - 1];

              if(lastMesText==p&&external_api.getSettings().zidongdianji=="true"){

                sd(newbutton);

              }

        }

        }
    }
}


async function replaceSpansWithImagesstcomfyui() {

  if(!external_api.getSettings().scriptEnabled){
      return;
  }
  if(checkSendBuClass()){
      return;
  }
  //以下为comfyui的设置
  unsafeWindow.start=external_api.getSettings().startTag;
  unsafeWindow.end=external_api.getSettings().endTag;
  unsafeWindow.url = external_api.getSettings().sdUrl.replace("7860","8188").trim();//sd地址 记得要修改上面的connect 的sd域名才能访问 此处要带端口！
  unsafeWindow.prompts = external_api.getSettings().fixedPrompt; //额外固定的提示词 nsfw?    也可以固定你要的 lora 。每次都会加载提示词后面。下面是反向提示词
  unsafeWindow.negative_prompt =external_api.getSettings().negativePrompt
  unsafeWindow.cfg_scale = external_api.getSettings().sdCfgScale;//关键词关联性
  unsafeWindow.width = external_api.getSettings().width; //宽度
  unsafeWindow.height = external_api.getSettings().height;//长度
  unsafeWindow.restore_faces = external_api.getSettings().restoreFaces; //面部修复
  unsafeWindow.steps = external_api.getSettings().steps;//步数
  unsafeWindow.sampler_name=external_api.getSettings().comfyuisamplerName ; //采样方式
  unsafeWindow.MODEL_NAME=external_api.getSettings().MODEL_NAME;
  var ps = document.getElementsByClassName("mes_text");
  for (var i = 0; i < ps.length; i++) {
      var p = ps[i];
      var linkText = p.textContent;
      var regex = new RegExp(`${escapeRegExp(unsafeWindow.start)}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
      var matches = linkText.match(regex);
      if(matches){
          var targetText = matches[1];
          console.log("matches",matches);
          var link = extractPrompt(targetText,unsafeWindow.start,unsafeWindow.end);
          link=link.replaceAll("《","<").replaceAll("》",">").replaceAll("\n",",");//修改lora<>
          const button = document.createElement('button');
          var uniqueId = "button_image" + Math.random().toString(36).substr(2, 9);
          button.id = uniqueId;
          button.classList.add('button_image');
          button.textContent = '生成图片';

          const imgSpan = document.createElement('span');

          imgSpan.id="span_" + Math.random().toString(36).substr(2, 9);
          imgSpan.dataset.name=uniqueId;

          button.name=imgSpan.id;
          button.dataset.link = link;
          let  re=new RegExp(`${unsafeWindow.start}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
          let Text=p.innerHTML.match(re)[0];
          console.log("Text",p.innerHTML.match(re));

          p.innerHTML = p.innerHTML.replace(Text, button.outerHTML);
          // alert(targetText);
          // 重新找到新创建的按钮
          var newbutton = document.getElementById(uniqueId);
          
          if(external_api.getSettings().dbclike=="true"){
            imgSpan.addEventListener('dblclick', (event) => {
              console.log("sssssssss",event.target.dataset.name);
              addSmoothShakeEffect(event.target);
              sd(document.getElementById(event.target.dataset.name))// 程序触发按钮的点击事件

            });
          }

          newbutton.spanid=imgSpan.id;

         async function sd(button1){

            if(!button1.id.includes("image")){
              return;
          }
          const url = unsafeWindow.url;
          button1.textContent="加载中";
          let prompt=await zhengmian(external_api.getSettings().fixedPrompt,button1.dataset.link,external_api.getSettings().AQT);                    //固定正面提示词

          function replaceLoraTags(input) {
            // 正则表达式
            const regex = /<lora:([^:]+)(?:\.safetensors)?:([^>]+)(?::1)?>/g;
            
            return input.replace(regex, (match, filename, value) => {
                if (match.includes('.safetensors')) {
                    // 已经是新格式，不需要改变
                    return match;
                }
                // 构造新的标签格式
                return `<lora:${filename}.safetensors:${value}:1>`;
            });
        }
        prompt=replaceLoraTags(prompt);  //替换lora字符串  处理字符

        console.log("prompt",prompt);
          let  negative_prompt=await fumian(external_api.getSettings().negativePrompt,external_api.getSettings().UCP);
          negative_prompt=replaceLoraTags(negative_prompt);
      prompt=prompt.replaceAll("\n",",").replaceAll("\\\\","\\").replaceAll("\\","\\\\");
      negative_prompt=negative_prompt.replaceAll("\n",",").replaceAll("\\\\","\\").replaceAll("\\","\\\\");

          let payload = {
              "prompt": prompt,
              "negative_prompt": negative_prompt,
              "steps": unsafeWindow.steps,
              "sampler_name": unsafeWindow.sampler_name,
              "width": unsafeWindow.width,
              "height": unsafeWindow.height,
              "cfg_scale":unsafeWindow.cfg_scale,
              "seed":external_api.getSettings().seed === 0||external_api.getSettings().seed === "0"||external_api.getSettings().seed === "" ? generateRandomSeed() : external_api.getSettings().seed,
              "MODEL_NAME":unsafeWindow.MODEL_NAME,
              "c_quanzhong":external_api.getSettings().c_quanzhong,
              "c_idquanzhong":external_api.getSettings().c_idquanzhong,
              "c_xijie":external_api.getSettings().c_xijie,
              "c_fenwei":external_api.getSettings().c_fenwei,
              "comfyuicankaotupian": comfyuicankaotupian,
              "ipa": external_api.getSettings().ipa
          };
          //工作流




const clientId = "533ef3a3-39c0-4e39-9ced-37d290f371f8";

  payload=await replacepro(payload,external_api.getSettings().worker);

   
    payload=`{"client_id":"${clientId}",
      "prompt":${payload}
      }`

          console.log("payload",payload);
          //alert(payload.prompt);
         
          let abc=true;
          while(abc){
           if(xiancheng){
               abc=false;
           }else{

              await sleep(1000); //排队线程
           }
           };

          try {
              const urlObj = new URL(url+"/prompt");
              xiancheng=false;
              const response = await new Promise((resolve, reject) => {
                  GM_xmlhttpRequest({
                      method: "POST",
                      url: urlObj,
                      data: `${payload}`,
                      headers: {
                          "Content-Type": "application/json",

                          "Access-Control-Allow-Origin": "*"
                      },
                      onload: function(response) {
                          if (response.status >= 200 && response.status < 400) {
                              

                              resolve(response);
                          } else {
                              button1.textContent="生成图片";
                              alert("响应内容:sd返回错误可能是你输入参数有误"+response.responseText);
                              console.log("响应内容:", response.responseText);
                              xiancheng=true;
                              reject(new Error(`请求失败,状态码: ${response.status}`));
                          }
                      },
                      onerror: function(error,response) {
                           var newbutton1 = document.getElementById(uniqueId);
                           button1.textContent="生成图片";
                           xiancheng=true;  
                          alert("请求错误。请检测地址"+urlObj+"是否正确.或comfyui已正确开启，启动器需要启用api功能。例如绘世启动器中 的高级选项  启用api选择开启。并且启动器需要重启生效"+error.status+error.statusText);
                          reject(error);
                      }
                  });
              });
              
              const r = JSON.parse(response.responseText);

              let id=r.prompt_id;
              let ii=0;
              button1.textContent="等待生成图片";


              while(true){
                try {
                  

                   
                    const response2 = await new Promise((resolve, reject) => {
                      GM_xmlhttpRequest({
                          method: "GET",
                          url: `${url}/history/${id}`,
                          headers: {
                              "Content-Type": "application/json"
                          },
                          onload: resolve,
                          onerror: reject
                      });
                  });

                console.log("response2",response2.responseText);
                let re=JSON.parse(await response2.responseText)
                if(re.hasOwnProperty(id)) {

                  xiancheng=true;
                  button1.textContent="生成图片";
                  function getFilenameFromOutputs(outputs) {
                    // 获取 outputs 对象的所有键
                    const keys = Object.keys(outputs);
                    // 如果没有键，返回 null
                    if (keys.length === 0) {
                        return null;
                    }
                    
                    // 获取第一个键
                    const firstKey = keys[0];
                    
                    // 获取该键对应的对象
                    const outputObject = outputs[firstKey];
                    
                    // 检查 images 数组是否存在且不为空
                    if (outputObject.images && outputObject.images.length > 0) {
                        // 返回第一个图像的 filename
                        return outputObject.images[0].filename;
                    }
                    
                    // 如果没有找到 filename，返回 null
                    return null;


                }
                button1.textContent="正在加载图片";

                 let filename=getFilenameFromOutputs(re[id]["outputs"]);

                  let fileurl=`${url}/view?filename=${filename}&type=output`
                  
                  const response = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: fileurl,
                        responseType: "arraybuffer",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        onload: function(response) {
                            if (response.status >= 200 && response.status < 400) {
                                resolve(response);
                                //alert("以成功返回"+response.status);
                            } else {
                               
                                alert(`响应内容: 可能是你lora或者参数错误`);
                                reject(new Error(`请求失败,状态码: ${response.status}`));
                            }
                        },
                        onerror: function(error,response) {
                            alert("请求错误，请检查代理"+error);
                            reject(error);
                        }
                    });
                });
                let re2 =await response.response;
                let blob = new Blob([re2], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);

                console.log("dataURL",imageUrl);
                await convertImageToBase64(button1.dataset.link,blob)  
                    
                    //let imgSpan = button1.nextElementSibling;
                    let imgSpan = document.getElementById(button1.name);
                    const img = document.createElement('img');

                    img.src = imageUrl;
                    img.alt = "Generated Image";
                    img.dataset.name=imgSpan.dataset.name
                    imgSpan.innerHTML = '';

                    imgSpan.appendChild(img);   
                    if(external_api.getSettings().dbclike=="true"){
                      imgSpan.style.textAlign = 'center';
                      button1.textContent="";
                      button1.style.width = '0';
                      button1.style.height = '0';
                      button1.style.overflow = 'hidden';
                      button1.style.padding = '0';
                      button1.style.border = 'none';
                      }
                    break;
                }
              await sleep(1000);
              ii=ii++;

              if(ii>30){
                  xiancheng=true;
                  button1.textContent="生成图片";
                  console.error('Error generating image:');
                  alert("comfyui服务器可能已断开连接，请检查sd是否已开启，sd启动器中 的高级选项  启用api选择开启。并且启动器需要重启生效");
                  break;
              }
            } catch (error) {
              xiancheng=true;
              button1.textContent="生成图片";
              console.error('Error generating image:');
              alert("comfyui服务器可能已断开连接"+error);
              break;
                  
            }
                  
              }

          } catch (error) {
              console.error('Error generating image:', error);
              alert(error);
              xiancheng=true;
              button1.textContent="生成图片";
          }
          }

          if(!p.hasclik){
          p.hasclik=true;
          p.addEventListener('click', async function(event) {
              if (event.target.tagName === 'BUTTON') {
                  // 获取按钮的id

              }else{

                  return;
              }

              var button1=event.target;

             sd(button1);
             
          });
          }
          //   p.parentNode.replaceChild(button, span);

         
          newbutton.parentNode.insertBefore(imgSpan, newbutton.nextSibling);

          let loadimg=await getItemImg(link)
          console.log('loadimg',loadimg);
          if(loadimg){
              const dataURL = loadimg;
              let imgSpan = document.getElementById(button.name);
              const img = document.createElement('img');
              img.src = dataURL;
              img.alt = "Generated Image";
              img.dataset.name=imgSpan.dataset.name
              imgSpan.innerHTML = '';
              imgSpan.appendChild(img);

              if(external_api.getSettings().dbclike=="true"){
                newbutton.textContent="";
                newbutton.style.width = '0';
                newbutton.style.height = '0';
                newbutton.style.overflow = 'hidden';
                newbutton.style.padding = '0';
                newbutton.style.border = 'none';
                }

          }else{
            const mesTextElements = document.getElementsByClassName('mes_text');
            const lastMesText = mesTextElements[mesTextElements.length - 1];

            if(lastMesText==p&&external_api.getSettings().zidongdianji=="true"){

              sd(newbutton);

            }

      }

      }
  }
}


async  function convertImageToBase64(link,imageBlob) {
const reader = new FileReader();
reader.onload = function(e) {
  const base64Image = e.target.result;
  setItemImg(link,base64Image);

  // Process the base64 image data here
};
reader.readAsDataURL(imageBlob);
}


async function replaceSpansWithImagesfree() {
    if(!external_api.getSettings().scriptEnabled){
        return;
    }
    if(checkSendBuClass()){
        return;
    }
    unsafeWindow.start=external_api.getSettings().startTag;
    unsafeWindow.end=external_api.getSettings().endTag;
    unsafeWindow.url = external_api.getSettings().sdUrl;//sd地址 记得要修改上面的connect 的sd域名才能访问 此处要带端口！
    unsafeWindow.prompts = external_api.getSettings().fixedPrompt; //额外固定的提示词 nsfw?    也可以固定你要的 lora 。每次都会加载提示词后面。下面是反向提示词
    unsafeWindow.negative_prompt =external_api.getSettings().negativePrompt
    unsafeWindow.cfg_scale = external_api.getSettings().sdCfgScale;//关键词关联性
    unsafeWindow.width = external_api.getSettings().width; //宽度
    unsafeWindow.freeMode=external_api.getSettings().freeMode;//模型
    unsafeWindow.height = external_api.getSettings().height;//长度
    unsafeWindow.restore_faces = external_api.getSettings().restoreFaces; //面部修复
    unsafeWindow.steps = external_api.getSettings().steps;//步数
    unsafeWindow.sampler_name=external_api.getSettings().samplerName ; //采样方式
    var ps = document.getElementsByClassName("mes_text");
    for (var i = 0; i < ps.length; i++) {
        var p = ps[i];
        var linkText = p.textContent;
        var regex = new RegExp(`${escapeRegExp(unsafeWindow.start)}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
        var matches = linkText.match(regex);
        if(matches){
            var targetText = matches[1];
            var link =  extractPrompt(targetText,unsafeWindow.start,unsafeWindow.end);
            const button = document.createElement('button');
            link=link.replaceAll("《","<").replaceAll("》",">").replaceAll("\n",",");//
            var uniqueId = "button_image" + Math.random().toString(36).substr(2, 9);
            button.id = uniqueId;
            button.classList.add('button_image');
            button.textContent = '生成图片';
             const imgSpan = document.createElement('span');
            imgSpan.id="span_" + Math.random().toString(36).substr(2, 9);
            imgSpan.dataset.name=uniqueId;
            button.name=imgSpan.id;

            button.dataset.link = link;
            let  re=new RegExp(`${unsafeWindow.start}([\\s\\S]*?)${escapeRegExp(unsafeWindow.end)}`);
            let Text=p.innerHTML.match(re)[0];
            console.log("Text",p.innerHTML.match(re));

            p.innerHTML = p.innerHTML.replace(Text, button.outerHTML);
            // alert(targetText);
            // 重新找到新创建的按钮
            var newbutton = document.getElementById(uniqueId);
            if(external_api.getSettings().dbclike=="true"){
              imgSpan.addEventListener('dblclick', (event) => {
                addSmoothShakeEffect(event.target);
                console.log("sssssssss",event.target.dataset.name);
                free(document.getElementById(event.target.dataset.name))// 程序触发按钮的点击事件

              });
            }

            async function free(button1){

              var ran = Math.floor(Math.random() * 1000000000).toString();
              //固定正面提示词

               let prompt = await zhengmian(external_api.getSettings().fixedPrompt,button1.dataset.link,external_api.getSettings().AQT);
               unsafeWindow.width = external_api.getSettings().width; //宽度
               unsafeWindow.height = external_api.getSettings().height;//长度
               prompt=prompt.replaceAll(" ","");
               prompt=prompt.replaceAll(","," ");
               console.log('prompt',prompt);
               const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)+"?width="+unsafeWindow.width+"&height="+unsafeWindow.height+"&seed="+ran+"&model="+unsafeWindow.freeMode}`;
               console.log('uel',url);
               const img = document.createElement('img');
               img.src = url;
               img.alt = "Generated Image";
               let imgSpan = document.getElementById(button1.name);
               img.dataset.name=imgSpan.dataset.name;
               imgSpan.innerHTML = '';
               imgSpan.appendChild(img);
               
               if(external_api.getSettings().dbclike=="true"){
                button1.textContent="";
                button1.style.width = '0';
                button1.style.height = '0';
                button1.style.overflow = 'hidden';
                button1.style.padding = '0';
                button1.style.border = 'none';
                }       



            }
            if(!p.hasclik){
            p.hasclik=true;
            p.addEventListener('click', async function() {
                      if (event.target.tagName === 'BUTTON') {
                      // 获取按钮的id

                  }else{

                  return;
                  }

                var button1=event.target;
                if(!button1.id.includes("image")){
                    return;
                }
                free(button1);


            });}

            newbutton.parentNode.insertBefore(imgSpan, newbutton.nextSibling);

            let loadimg=await getItemImg(link)
            console.log('loadimg',loadimg);
            if(loadimg){
                const dataURL = loadimg;
                let imgSpan = document.getElementById(button.name);
                const img = document.createElement('img');
                img.src = dataURL;
                img.alt = "Generated Image";
                imgSpan.innerHTML = '';
                img.dataset.name=imgSpan.dataset.name
                imgSpan.appendChild(img);
                imgSpan.style.textAlign = 'center';

                if(external_api.getSettings().dbclike=="true"){
                newbutton.textContent="";
                newbutton.style.width = '0';
                newbutton.style.height = '0';
                newbutton.style.overflow = 'hidden';
                newbutton.style.padding = '0';
                newbutton.style.border = 'none';
                }

            }else{
              const mesTextElements = document.getElementsByClassName('mes_text');
              const lastMesText = mesTextElements[mesTextElements.length - 1];

              if(lastMesText==p&&external_api.getSettings().zidongdianji=="true"){

                free(newbutton);

              }

        }


        }
    }
}

async function chenk(){
    if(external_api.getSettings().mode=="sd"){
    replaceSpansWithImagesst();
}else if(external_api.getSettings().mode=="novelai"){
    replaceWithnovelai();
}else if(external_api.getSettings().mode=="comfyui"){
  replaceSpansWithImagesstcomfyui();
}else{
    replaceSpansWithImagesfree();
}
}

function getActiveSettings() {
  return {
      scriptEnabled: external_api.getSettings().scriptEnabled,
      yushe: external_api.getSettings().yushe,
      yusheid: external_api.getSettings().yusheid,
      mode: external_api.getSettings().mode,
      freeMode: external_api.getSettings().freeMode,
      cache: external_api.getSettings().cache,
      sdUrl: external_api.getSettings().sdUrl,
      novelaiApi: external_api.getSettings().novelaiApi,
      startTag: external_api.getSettings().startTag,
      endTag: external_api.getSettings().endTag,
      fixedPrompt: external_api.getSettings().fixedPrompt,
      nai3Scale: external_api.getSettings().nai3Scale,
      sdCfgScale: external_api.getSettings().sdCfgScale,
      sm: external_api.getSettings().sm,
      dyn: external_api.getSettings().dyn,
      cfg_rescale: external_api.getSettings().cfg_rescale,
      UCP: external_api.getSettings().UCP,
      AQT: external_api.getSettings().AQT,
      steps: external_api.getSettings().steps,
      width: external_api.getSettings().width,
      height: external_api.getSettings().height,
      seed: external_api.getSettings().seed,
      restoreFaces: external_api.getSettings().restoreFaces,
      samplerName: external_api.getSettings().samplerName,
      comfyuisamplerName: external_api.getSettings().comfyuisamplerName,
      sampler: external_api.getSettings().sampler,
      negativePrompt: external_api.getSettings().negativePrompt,
      zidongdianji: external_api.getSettings().zidongdianji,
      nai3VibeTransfer: external_api.getSettings().nai3VibeTransfer,
      InformationExtracted: external_api.getSettings().InformationExtracted,
      ReferenceStrength: external_api.getSettings().ReferenceStrength,
      nai3Deceisp: external_api.getSettings().nai3Deceisp,
      nai3Variety: external_api.getSettings().nai3Variety,
      Schedule: external_api.getSettings().Schedule,
      MODEL_NAME: external_api.getSettings().MODEL_NAME,
      c_fenwei: external_api.getSettings().c_fenwei,
      c_xijie: external_api.getSettings().c_xijie,
      c_idquanzhong: external_api.getSettings().c_idquanzhong,
      c_quanzhong: external_api.getSettings().c_quanzhong,
      ipa: external_api.getSettings().ipa,
      dbclike: external_api.getSettings().dbclike,
      workers: external_api.getSettings().workers,
      workerid: external_api.getSettings().workerid,
      worker: external_api.getSettings().worker,
      novelaimode: external_api.getSettings().novelaimode
  };
}

// 注册事件监听器
function registerListeners() {
  // 在这里注册你的事件监听器，例如监听消息变化的监听器
    external_api.on("characterMessage", () => {
       if(external_api.getSettings().scriptEnabled){
          chenk(); // 你的消息处理逻辑
       }
    });
}

// 扩展的入口点
(async () => {
    registerListeners(); //注册事件
})();

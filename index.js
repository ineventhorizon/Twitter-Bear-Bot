var Twitter=require('twitter');
const fs = require('fs');
var config=require('./config.js');

var client = new Twitter(config);


const dir = './images';
fs.readdir(dir, (err, files) => {
    if(err) console.log(err);
    else{  

    var images=[];
    files.forEach(function(i){images.push(i)});

    setInterval(()=>{
        upload_random_bear(images)
    },3600000*2)
    }
});


function upload_random_bear(images){
    var data=fs.readFileSync("./images/"+random_from_array(images))
    client.post('media/upload',{media:data},(err,media,res)=>{
        if(err) console.log(err);
        else{
            var status={
                media_ids:media.media_id_string
            }
            client.post('statuses/update',status,(err,tweet,res)=>{
                if(err) console.log(err)
                else console.log("Tweet send!");
            })
        }
    })
}
function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}

//爱奇艺注入
function iqiyiInject(){
    api.execScript({
        frameName: 'chennel',
        script: 'function inject(){'+
        'if(!$){return false;};'+
        'setInterval(function(){'+
           'var video=document.getElementById("video");'+
           'if(video){video.muted=true};'+ //关闭静音
           'if($(".m-video-info").length>0){window.title=$(".m-video-info").find(".c-title")[0].innerText;}'+ //标题
           'if($("#player-posterimg").length>0){window.poster=$("#player-posterimg").attr("src");}'+//获取封面图
           'if($(".m-video-poster").length>0){window.poster=$(".m-video-poster img").attr("src")};'+
           //删除播放器
           'if(video){$("#video").attr("src","")};'+
           'if($(".m-video-player").length>0){$(".m-video-player").remove()};'+
           //注入播放区域
           'if($(".m-video-player-wrap").length>0){$(".m-video-player-wrap").css("padding-top","0")};'+
           'if($(".m-video-player-wrap").length>0){$(".m-video-player-wrap").html("<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>")};'+
           //点击事件
           'var func=function(){api.sendEvent({name:"play",extra:{platform:"爱奇艺",poster:window.poster,pageUrl:location.href,title:window.title}});};'+
           'if($("#myVideo")){}$("#myVideo").on("click",func);'+
        '},150);'+
        '};inject();'

    });
}

//腾讯视频注入
function txInject(progress){
  api.execScript({
      frameName: 'chennel',
      script: 'function txInject(){'+
         'if(!$){return false;};'+
         'if(!window.poster){window.poster=$(".poster_pic").attr("src");};'+  //封面
         'if(!window.poster){window.poster=$(".txp_poster")[0].style.backgroundImage.slice(5,-2);};'+
         'if(!window.title){window.title=$(".video_tit.U_color_a").text();}'+ //标题
         //删除播放器
         'if($("#vip_player").length>0){$("#vip_player").html("<img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' />")};'+
         'if($("#2016_player").length>0){$("#2016_player").html("<img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' />")};'+
         '$(".site_player:after").remove();'+
         'if($("#2016_player")){$("#2016_player").css({background:"black",color:"#fff",textAlign:"center",height:"56.25vw",lineHeight:"56.25vw",fontSize:"5vw"})};'+
         'if($("#vip_player")){$("#vip_player").css({background:"black",color:"#fff",textAlign:"center",height:"56.25vw",lineHeight:"56.25vw",fontSize:"5vw"})};'+
         //添加监听
         'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"腾讯视频"}});};'+
         'if($("#vip_player").length>0){$("#vip_player").on("click",func)};'+
         'if($("#2016_player").length>0){$("#2016_player").on("click",func)};'+
       '};txInject();'
  });
}

//芒果TV视频注入
function mangoInject(progress){
   api.execScript({
       frameName: 'chennel',
       script: ''+
           'document.getElementById("player").muted=true;'+ //关闭静音
           'document.getElementById("player").setAttribute("src","");'+
           //封面图
            'if(!window.poster && (document.querySelectorAll(".vip-no-try .bg img").length>0)){window.poster=document.querySelectorAll(".vip-no-try .bg img")[0].getAttribute("src");};'+
            //非会员的封面图
            'if(!window.poster){var metas=document.querySelectorAll("meta");for (var i = 0; i < metas.length; i++){if (metas[i].getAttribute("itemprop") == "image") {  window.poster=metas[i].getAttribute("content");break;}}};'+
            //标题
            'if(!window.title){window.title=document.querySelectorAll(".vt-txt")[0].innerText;};'+
            //删除播放器
            'document.querySelectorAll(".video-area")[0].innerHTML="<img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' />";'+
            'var func=function(){api.sendEvent({name:"play",extra:{platform:"芒果TV",poster:window.poster,pageUrl:location.href,title:window.title}});};'+
            'document.querySelectorAll(".video-area")[0].addEventListener("click",func,true);'
   });
}



//搜狐视频注入
function souhuInject(progress){
 api.execScript({
     frameName: 'chennel',
     script: 'var oldAddress=window.location.href;'+
     'setInterval(function(){'+
         'if(window.location.href!=oldAddress){window.location.reload()}'+
     '},0);'+
     //封面
     'if(!window.poster){window.poster=$("#film_temp_container>img").attr("src")};'+
     'if(!window.poster){if($(".x-poster").length>0){window.poster=$(".x-poster")[0].style.backgroundImage.slice(5,-2)}};'+
     //标题
     'if(!window.title){window.title=$(".movie-info>h2:first-child").text();};'+
     'if(!window.title){window.title=$(".t-info").text();};'+
     //播放器
      'if($("video").length>0){$("video")[0].muted=true};'+
      '$(".player-view:after").css("display","none");'+
      'if($("#top-poster").length>0){$("#top-poster").html("<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>")};'+
      'if($(".player-view").length>0){$(".player-view").html("<div id='+"myVideo"+' style='+"width:100%;height:100%;background:black;position:absolute;top:0;left:0;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>")};'+
      'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"搜狐视频"}});};'+
      '$("#top-poster").on("click",func);'+
      '$(".player-view").on("click",func);'

 });

}

//pptv注入--封面获取不到
function pptvInject(progres){
 api.execScript({
       frameName: 'chennel',
       script:''+
        //封面，播放器被pptv嵌套在iframe中
       'setInterval(function(){if(!window.poster && $("#ifr_player").length>0){window.poster=$("#ifr_player").contents().find("#pre_img").attr("src");};},0);'+
       //电视剧的标题：电视剧该标签有片名
       'if(!window.title){window.title=$(".player-info>.vod-tit-in>span:nth-child(2)").text()};'+
       //电影的标题：电影是获取简介---该获取顺序必须在获取电视剧片名之后，避免该标签对应的是电视剧的是导演
       'if(!window.title){window.title=$(".player-info>.fx>li:first-child").text().slice(2);};'+
       '$("#playerbox").html("<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>");'+
       'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"PPTV"}});};'+
       '$("#playerbox").on("click",func);'
 });
}


//咪咕视频
function miGuInject(progres){
  api.execScript({
      frameName: 'chennel',
      script: ''+
      //封面
      'if(!window.poster){if($(".poster").attr("src").length>0){window.poster="http://wapx.cmvideo.cn:8080"+$(".poster").attr("src");}};'+
      'if(!window.title){window.title=$(".proName").text();};'+
      'if($(".video").length>0){$(".video").eq(0).html("")};'+
      'if($(".video").length>0){$(".video").html("<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>")};'+
      'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"咪咕视频"}});};'+
      'if($(".video").length>0){$(".video").on("click",func)};'
  });
}

//1905vip影院
function yijiulinwuInject(){
  api.execScript({
      frameName: 'chennel',
      script:  ''+
      'if(!window.newPoster){window.newPoster=$(window.poster).find("img").attr("src");};'+
      'if(!window.title){$("#movie_info .title").eq(0).find(".rank").remove();window.title=$("#movie_info .title").eq(0).text();};'+
      '$("#player").html("<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>");'+
      'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"咪咕视频"}});};'+
      '$("#player").on("click",func);'
  });
}


//华数TV
function huaShuInject(){
  api.execScript({
      frameName: 'chennel',
      script:  ''+
      'if(!window.title){window.title=videoInfo.title};'+
      'if(!window.poster){window.poster=videoInfo.pic};'+
      '(window.getDataTimer) && (clearInterval(window.getDataTimer));'+
      'window.getDataTimer=setInterval(function(){'+
          '$("#adContainer").remove();'+  //取消广告,添加播放器
          'if(($("#player").length>0) || ($("#pop").length>0)){'+
                 'var wrap;'+
                 'if($("#player").length>0){wrap=$("#player")};'+
                 'if($("#pop").length>0){wrap=$("#pop")};'+
                 'wrap.html("<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>");'+
                 'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"华数TV"}});clearInterval(window.getDataTimer);};'+
                 'wrap.on("click",func);'+
          '};'+
      '},150);'
  });
}


//乐视视频
function leshiInject(){
  api.execScript({
      frameName: 'chennel',
      script:  'var oldAddress=window.location.href;'+
      'setInterval(function(){'+
          'if(window.location.href!=oldAddress){window.location.reload()}'+
      '},0);'+
      'if($(".hv_play_poster").length>0){window.poster=$(".hv_play_poster").css("background-image").slice(5,-2);};'+
      'if(!window.title){window.title=$("#j-introduction dl>dt:first-child").text();};'+
      'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"乐视视频"}});};'+
      '$(".playB").html("<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>");'+
      '$(".playB").click(function(event){func();return false;});'
  });
}


//优酷视频注入
function ykInject(progress){
 api.execScript({
     frameName: 'chennel',
     script: 'var isGetPlayer=true;'+
     //封面
     'if(mainData && mainData.data){'+
         'if(!window.poster){window.poster=mainData.data.extra.imgShow;}'+
         'if(!window.title){window.title=mainData.data.extra.title;}'+
     '};'+
     'var getPlayerTimer=setInterval(function(){'+
          'if(!isGetPlayer){return false;};'+
          'if(document.querySelector("#playerBox")){'+
               'isGetPlayer=false;'+
               'document.querySelector("#playerBox").innerHTML="<div id='+"myVideo"+' style='+"width:100%;height:56.25vw;background:black;position:relative;"+'><img style='+"position:absolute;width:15vw;height:15vw;top:50%;left:50%;margin-left:-7.5vw;margin-top:-7.5vw;"+' src='+"http://phmbl28h4.bkt.clouddn.com/%E6%92%AD%E6%94%BE.png"+' /></div>";'+
               'var func=function(){api.sendEvent({name:"play",extra:{poster:window.poster,pageUrl:location.href,title:window.title,platform:"优酷"}});};'+
               'document.querySelector("#playerBox").addEventListener("click",func,true);'+
          '};'+
     '},0);'

 });

}

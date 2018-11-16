/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */
(function(window){
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function(){
        var ls = window.localStorage;
        if(isAndroid){
           ls = os.localStorage();
        }
        return ls;
    };
    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof(data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof(fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url: url,
            data: data,
            fnSuc: fnSuc,
            dataType: dataType
        };
    }
    u.trim = function(str){
        if(String.prototype.trim){
            return str == null ? "" : String.prototype.trim.call(str);
        }else{
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    u.trimAll = function(str){
        return str.replace(/\s*/g,'');
    };
    u.isElement = function(obj){
        return !!(obj && obj.nodeType == 1);
    };
    u.isArray = function(obj){
        if(Array.isArray){
            return Array.isArray(obj);
        }else{
            return obj instanceof Array;
        }
    };
    u.isEmptyObject = function(obj){
        if(JSON.stringify(obj) === '{}'){
            return true;
        }
        return false;
    };
    u.addEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if(el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function(el, name, fn, useCapture){
        if(!u.isElement(el)){
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function(){
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelector){
                return document.querySelector(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelector){
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector){
        if(arguments.length === 1 && typeof arguments[0] == 'string'){
            if(document.querySelectorAll){
                return document.querySelectorAll(arguments[0]);
            }
        }else if(arguments.length === 2){
            if(el.querySelectorAll){
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function(id){
        return document.getElementById(id);
    };
    u.first = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$api.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':first-child');
        }
    };
    u.last = function(el, selector){
        if(arguments.length === 1){
            if(!u.isElement(el)){
                console.warn('$api.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if(arguments.length === 2){
            return this.dom(el, selector+':last-child');
        }
    };
    u.eq = function(el, index){
        return this.dom(el, ':nth-child('+ index +')');
    };
    u.not = function(el, selector){
        return this.domAll(el, ':not('+ selector +')');
    };
    u.prev = function(el){
        if(!u.isElement(el)){
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function(el){
        if(!u.isElement(el)){
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if(node.nodeType && node.nodeType === 3){
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function(el, selector){
        if(!u.isElement(el)){
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function(doms, el){
            var i = 0, len = doms.length;
            for(i; i<len; i++){
                if(doms[i].isSameNode(el)){
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function(el, selector){
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while(!targetDom){
                el = el.parentNode;
                if(el != null && el.nodeType == el.DOCUMENT_NODE){
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function(parent,el){
        var mark = false;
        if(el === parent){
            mark = true;
            return mark;
        }else{
            do{
                el = el.parentNode;
                if(el === parent){
                    mark = true;
                    return mark;
                }
            }while(el === document.body || el === document.documentElement);

            return mark;
        }

    };
    u.remove = function(el){
        if(el && el.parentNode){
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function(el, name, value){
        if(!u.isElement(el)){
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length == 2){
            return el.getAttribute(name);
        }else if(arguments.length == 3){
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function(el, name){
        if(!u.isElement(el)){
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            el.removeAttribute(name);
        }
    };
    u.hasCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if(el.className.indexOf(cls) > -1){
            return true;
        }else{
            return false;
        }
    };
    u.addCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.add(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls +' '+ cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if('classList' in el){
            el.classList.remove(cls);
        }else{
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function(el, cls){
        if(!u.isElement(el)){
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
       if('classList' in el){
            el.classList.toggle(cls);
        }else{
            if(u.hasCls(el, cls)){
                u.removeCls(el, cls);
            }else{
                u.addCls(el, cls);
            }
        }
        return el;
    };
    u.val = function(el, val){
        if(!u.isElement(el)){
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            switch(el.tagName){
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if(arguments.length === 2){
            switch(el.tagName){
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }

    };
    u.prepend = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function(el, html){
        if(!u.isElement(el)){
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.innerHTML;
        }else if(arguments.length === 2){
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function(el, txt){
        if(!u.isElement(el)){
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 1){
            return el.textContent;
        }else if(arguments.length === 2){
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function(el){
        if(!u.isElement(el)){
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function(el, css){
        if(!u.isElement(el)){
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if(typeof css == 'string' && css.indexOf(':') > 0){
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function(el, prop){
        if(!u.isElement(el)){
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if(arguments.length === 2){
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function(json){
        if(typeof json === 'object'){
            return JSON && JSON.stringify(json);
        }
    };
    u.strToJson = function(str){
        if(typeof str === 'string'){
            return JSON && JSON.parse(str);
        }
    };
    u.setStorage = function(key, value){
        if(arguments.length === 2){
            var v = value;
            if(typeof v == 'object'){
                v = JSON.stringify(v);
                v = 'obj-'+ v;
            }else{
                v = 'str-'+ v;
            }
            var ls = uzStorage();
            if(ls){
                ls.setItem(key, v);
            }
        }
    };
    u.getStorage = function(key){
        var ls = uzStorage();
        if(ls){
            var v = ls.getItem(key);
            if(!v){return;}
            if(v.indexOf('obj-') === 0){
                v = v.slice(4);
                return JSON.parse(v);
            }else if(v.indexOf('str-') === 0){
                return v.slice(4);
            }
        }
    };
    u.rmStorage = function(key){
        var ls = uzStorage();
        if(ls && key){
            ls.removeItem(key);
        }
    };
    u.clearStorage = function(){
        var ls = uzStorage();
        if(ls){
            ls.clear();
        }
    };
    u.fixIos7Bar = function(el){
        return u.fixStatusBar(el);
    };
    u.fixStatusBar = function(el){
        if(!u.isElement(el)){
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return 0;
        }
        el.style.paddingTop = api.safeArea.top + 'px';
        return el.offsetHeight;
    };
    u.fixTabBar = function(el){
        if(!u.isElement(el)){
            console.warn('$api.fixTabBar Function need el param, el param must be DOM Element');
            return 0;
        }
        el.style.paddingBottom = api.safeArea.bottom + 'px';
        return el.offsetHeight;
    };
    u.toast = function(title, text, time){
        var opts = {};
        var show = function(opts, time){
            api.showProgress(opts);
            setTimeout(function(){
                api.hideProgress();
            },time);
        };
        if(arguments.length === 1){
            var time = time || 500;
            if(typeof title === 'number'){
                time = title;
            }else{
                opts.title = title+'';
            }
            show(opts, time);
        }else if(arguments.length === 2){
            var time = time || 500;
            var text = text;
            if(typeof text === "number"){
                var tmp = text;
                time = tmp;
                text = null;
            }
            if(title){
                opts.title = title;
            }
            if(text){
                opts.text = text;
            }
            show(opts, time);
        }
        if(title){
            opts.title = title;
        }
        if(text){
            opts.text = text;
        }
        time = time || 500;
        show(opts, time);
    };
    u.post = function(/*url,data,fnSuc,dataType*/){
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        argsToJson.data && (json.data = argsToJson.data);
        if(argsToJson.dataType){
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text'||type == 'json') {
                json.dataType = type;
            }
        }else{
            json.dataType = 'json';
        }
        json.method = 'post';
        api.ajax(json,
            function(ret,err){
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };
    u.get = function(/*url,fnSuc,dataType*/){
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        //argsToJson.data && (json.data = argsToJson.data);
        if(argsToJson.dataType){
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text'||type == 'json') {
                json.dataType = type;
            }
        }else{
            json.dataType = 'text';
        }
        json.method = 'get';
        api.ajax(json,
            function(ret,err){
                if (ret) {
                    fnSuc && fnSuc(ret);
                }
            }
        );
    };
    //token
    u.getToken=function(){
      var token=api.getPrefs({
          key: 'aiXiToken',
          sync:true
      },);

      return  token;
    }
    u.setToken=function(token){
        api.setPrefs({
            key: 'aiXiToken',
            value: token
        });

    }
    u.getHttp=function(){
      return "http://api.agao88.com/"
    }
    u.getAjaxHeaders=function(){
      return{
         userToken:$api.getToken()
      }
    }
    //密码验证
    u.regPassword=function(password){
      var passwordReg=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
      if (!passwordReg.test(password)) {
        api.toast({
            msg: '密码必须包含字母和数字',
            duration: 2000,
            location: 'middle'
        });
        return false;
      }
      return true;
    }
    //手机校验
    u.regPhone=function(phone){
      var phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;
      if (!phone || !phoneReg.test(phone)) {
          api.toast({
              msg: '请输入有效的手机号',
              duration: 2000,
              location: 'middle'
          });
          return false;
      }
      return true;
    }
    //打开loading
    u.openLoading=function(){
      var UILoading = api.require('UILoading');
      UILoading.keyFrame({
          rect: {
              w: 80,
              h: 100
          },
          styles: {
              bg: 'rgba(0,0,0,1)',
              corner: 5,
              interval: 50,
              frame: {
                  w: 80,
                  h: 80
              }
          }
      });
    }
    u.closeLoading=function(){
      var UILoading = api.require('UILoading');
      UILoading.closeKeyFrame();
    }
    u.checkInStallWeChat=function(callback){
      var  wx = api.require('wx');
      wx.isInstalled(function(ret, err) {
          if (ret.installed) {
              callback();
          } else {
              api.toast({
                  msg: '当前设备未安装微信客户端',
                  duration: 2000,
                  location: 'middle'
              });
          }
      });
    }
    //分享
    u.openShare=function(callback){
      var MNActionButton = api.require('MNActionButton');
      var items=[
        {
          icon: 'widget://image/share/qq.png',
          title: 'QQ好友'
        },
        {
          icon: 'widget://image/share/qzone.png',
          title: 'QQ空间'
        },
        {
            icon: 'widget://image/share/wechat.png',
            title: '微信'
        },
        {
            icon: 'widget://image/share/pengyouquan.png',
            title: '朋友圈'
        },
        {
            icon: 'widget://image/share/webo.png',
            title: '微博'
        }
      ]
      MNActionButton.open({
               layout: {
                     row: 2,
                     col: 4,
                     rowSpacing: 30,
                     colSpacing: 30,
                     offset: 0
                 },
                 animation: true,
                 autoHide: true,
                 styles: {
                     maskBg: 'rgba(0,0,0,0.2)',
                     bg: '#fff',
                     cancelButton: {
                         size: 35,
                         bg: '#fff',
                         icon: 'widget://image/share/quxiao.png',
                     },
                     item: {
                         titleColor: '#888',
                         titleHighlight: 'dd2727',
                         titleSize: 12
                     },
                     indicator: {
                         color: '#c4c4c4',
                         highlight: '#9e9e9e'
                     }
                 },
                 items:items
             }, function(ret) {
                callback(items[ret.index].title);
             }
      );
    }
    u.weChatLogin=function(callback){
      var  wx = api.require('wx');
      $api.checkInStallWeChat(function(){
          wx.auth({
              apiKey:''
          }, function(ret, err) {
              if (ret.status) {
                  //获取jwt
                  api.ajax({
                      url: $api.getHttp()+'wx/login/app_auth_send?code='+ret.code,
                      method: 'get',
                  },function(jwtRet, jwtErr){
                      if (jwtRet) {
                          $api.setToken(jwtRet.data);
                          callback && callback(jwtRet.data);
                      } else {
                        api.toast({
                            msg: jwtErr.msg,
                            duration: 2000,
                            location: 'middle'
                        });
                      }
                  });

              } else {
                api.toast({
                    msg: '微信授权失败',
                    duration: 2000,
                    location: 'middle'
                });
              }
          });
      });
    }
    u.toastNetWorkErr=function(callback){
      api.toast({
          msg: '网络异常,请重试',
          duration: 2000,
          location: 'middle'
      });
      if(callback){
        setTimeout(function(){callback()},2000);
      }
    }
    //接口异常处理
    u.codeException=function(ret){
      var code=ret.code;
      if(code==1001){
         api.sendEvent({
             name: 'singOut'
         });
         $api.setToken("");
         $api.alertLogin();
         return;
      }
      if(code==1002){
        api.sendEvent({
            name: 'singOut'
        });
        $api.setToken("");
        api.toast({
            msg: '该账号已被禁用',
            duration: 2000,
            location: 'middle'
        });
        return;
      }
      if(code==1005){
        api.toast({
            msg: '服务端出错,请重试',
            duration: 2000,
            location: 'middle'
        });
        return;
      }
      api.toast({
          msg: ret.msg,
          duration: 2000,
          location: 'middle'
      });
    }
    //获取会员信息
    u.getMemberInfo=function(callback){
          $api.openLoading();
          api.ajax({
              url: $api.getHttp()+'user/getMemberInfo',
              method: 'get',
              headers:$api.getAjaxHeaders()
          },function(ret, err){
              if(ret){
                if(!ret.success){
                  $api.codeException(ret);
                  $api.closeLoading();
                  return false;
                }else{
                  callback(ret,err);
                }
              }else{
                 $api.toastNetWorkErr();
              }
              $api.closeLoading();
          });
    }
    //弹出是否登陆
    u.alertLogin=function(){
      var dialogBox = api.require('dialogBox');
      dialogBox.alert({
          texts: {
              title: '确认',
              content: '是否前往登陆',
              leftBtnTitle: '取消',
              rightBtnTitle: '确认'
          },
          styles: {
              bg: '#fff',
              w: 300,
              corner:2,
              content: {
                  color: '#000',
                  size: 14
              },
              left: {
                  marginB: 7,
                  marginL: 20,
                  w: 130,
                  h: 35,
                  corner: 2,
                  size: 15
              },
              right: {
                  marginB: 7,
                  marginL: 10,
                  w: 130,
                  h: 35,
                  corner: 2,
                  size: 15
              }
          }
      }, function(ret) {
          if (ret.eventType == 'right') {
              api.openWin({
                  name: 'login',
                  url: 'widget://html/personal/login.html',
              });
          }
          dialogBox.close({
              dialogName: 'alert'
          });
      });
    }
    //提交播放记录
    u.submitHiostory=function(videoInfo){
          api.ajax({
              url: $api.getHttp()+'history/view',
              method: 'post',
              data: {
                  values: {
                      url:videoInfo.pageUrl?videoInfo.pageUrl:"",
                      title:videoInfo.title?videoInfo.title:"",
                      platform:videoInfo.platform?videoInfo.platform:"",
                      cover:videoInfo.poster?videoInfo.poster:""
                  }
              },
              headers:$api.getAjaxHeaders()
          },function(ret, err){

          });
    }
    //打开播放器
    u.openPlayer=function(videoInfo,onlyPlayer){
      var playModule=api.require("playModule");
      playModule.init({
        background:videoInfo.poster?videoInfo.poster:"",
        FullScreenViewIsFont:false
      });
      playModule.play({
         rect:{
             x: 0,
             y : 0,
             w : api.winWidth,
             h: api.winHeight
         },
         title: videoInfo.title?videoInfo.title:"",
         url:videoInfo.url,
         enableFull : false,
         isBackBtn:true,
         isLive:false,
         enableFullAutoClose:false
        }, function(ret, err) {
            if(ret){
               if(ret.status){playModule.full(function(fullRet, fullErr){})}
            }else{
               if(onlyPlayer){
                   playModule.cleanPlayers(function(ret, err) {});
               }else{
                   api.closeWin({aniamtion:"none"})
               }
            }
        });
        playModule.addEventListener({
            name: 'backBtn'
        }, function(ret, err) {
           if(ret.status){
               if(onlyPlayer){
                   playModule.cleanPlayers(function(ret, err) {});
               }else{
                   api.closeWin({aniamtion:"none"})
               }          
           }
        });
    }
    //检测会员状况且打开播放器--非解析视频
    u.checkVipOpenOnlyPlayer=function(i){
        $api.openLoading();
        //登录状况
        if(!$api.getToken){
          $api.closeLoading();
          $api.alertLogin();
          return false;
        }
        //判断是否是会员
       $api.getMemberInfo(function(hyret,hyerr){
             $api.closeLoading();
             if(hyret.data.isMember){
               api.openWin({
                   name: 'player',
                   url: 'widget://html/videoPlayer/player.html',
                   slidBackEnabled:false,
                   animation:{
                     type:"none"
                   },
                   pageParam: {
                     poster:i.poster,
                     title:i.title,
                     url:i.url
                   }
               });
             }else{
               api.toast({
                   msg: '成为会员即可观看',
                   duration: 3000,
                   location: 'middle'
               });
             }
       });
    }
    //检测会员状况且打开播放器--解析视频
    u.checkVipOpenPlayer=function(videoInfo){
          //判断是否登陆
          if(!$api.getToken()){
            $api.alertLogin();
            return false;
          }
          //判断是否是会员
         $api.getMemberInfo(function(hyret,hyerr){
               if(hyret.data.isMember){
                     api.openWin({
                         name: 'chennelVideoPlayer',
                         url: 'widget://html/videoPlayer/chennelVideoPlayer.html',
                         slidBackEnabled:false,
                         animation:{
                           type:"none"
                         },
                         pageParam:{
                           poster:videoInfo.poster,
                           title:videoInfo.title,
                           pageUrl:videoInfo.pageUrl,
                           platform:videoInfo.platform
                         }
                     });
               }else{
                 api.toast({
                     msg: '成为会员即可观看',
                     duration: 3000,
                     location: 'middle'
                 });
               }
         });
    }


/*end*/


    window.$api = u;

})(window);

/*
 *�Ի����ࡣ
 *ʹ�þ�����
 *@example
 new PwMenu('boxID').guide();
 *
 */
/**
 * @param String
 *            id �Ի����id���������ݣ���Ĭ��Ϊpw_box
 */
PWMENU_ZINDEX=1001;

function PwMenu(id){
	this.pid	= null;
	this.obj	= null;
	this.w		= null;
	this.h		= null;
	this.t		= 0;
	this.menu	= null;
	this.mid	= id;
	this.oCall  = null;
	this.init(id);
}

PwMenu.prototype = {

	init : function(id) {
		this.menu = getPWBox(id);
		var _ = this;
		document.body.insertBefore(this.menu,document.body.firstChild);
		_.menu.style.zIndex=PWMENU_ZINDEX+10+"";
		PWMENU_ZINDEX+=10;
	},

	guide : function() {
		this.menu=this.menu||getPWBox(this.mid);
		this.menu.className = '';
		this.menu.innerHTML = '<div class="popout"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="bgcorner1"></td><td class="pobg1"></td><td class="bgcorner2"></td></tr><tr><td class="pobg4"></td><td><div class="popoutContent" style="padding:20px;"><img src="'+imgpath+'/loading.gif" align="absmiddle" alt="loading" /> ���ڼ�������...</div></td><td class="pobg2"></td></tr><tr><td class="bgcorner4"></td><td class="pobg3"></td><td class="bgcorner3"></td></tr></tbody></table></div>';
		this.menupz(this.obj);
	},

	close : function() {
		var _=this;
		read.t = setTimeout(function() {
			_.menu?0:_.menu=read.menu;
			if (_.menu) {
				_.menu.style.display = 'none';
				_.menu.className = '';
				if (_.oCall && _.oCall.close) _.oCall.close();
			}
		}, 100);
	},

	setMenu : function(element,type,border,oCall) {
		if (this.IsShow() && this.oCall && this.oCall.close) {
			this.oCall.close();
		}
		if (type) {
			this.menu=this.menu||getPWBox(this.mid);
			var thisobj = this.menu;
		} else {
			var thisobj = getPWContainer(this.mid,border);
		}
		if (typeof(element) == 'string') {
			thisobj.innerHTML = element;
		} else {
			while (thisobj.hasChildNodes()) {
				thisobj.removeChild(thisobj.firstChild);
			}
			thisobj.appendChild(element);
		}
		this.oCall = null;
		if (typeof oCall == 'object' && oCall.open) {
			this.oCall = oCall;
			oCall.open();
		}
	},

	move : function(e) {
		if(is_ie){document.body.onselectstart = function(){return false;}}
		var e  = is_ie ? window.event : e;
		var o  = this.menu||getPWBox(this.mid);
		var x  = e.clientX;
		var y  = e.clientY;
		this.w = e.clientX - parseInt(o.offsetLeft);
		this.h = e.clientY - parseInt(o.offsetTop);
		var _=this;
		_.menu=_.menu||getPWBox(_.mid);
		document.body.setCapture && _.menu.setCapture();
		document.onmousemove = function(e) {
			var e  = is_ie ? window.event : e;
			var x  = e.clientX;
			var y  = e.clientY;
			_.menu.style.left = x - _.w + 'px';
			_.menu.style.top  = y - _.h + 'px';
		};
		document.onmouseup   = function() {
			if(is_ie){document.body.onselectstart = function(){return true;}}
			document.body.releaseCapture && _.menu.releaseCapture();// IE�ͷ������
			document.onmousemove = null;
			document.onmouseup = null;
		};
	},


	open : function(idName, object, type, pz, oCall) {
		if (typeof idName == 'string') {
			idName = getObj(idName);
		}
		if (idName == null) return false;
		this.menu=this.menu||getPWBox(this.mid);
		clearTimeout(read.t);
		if (typeof type == "undefined" || !type) type = 1;
		if (typeof pz == "undefined" || !pz) pz = 0;

		this.setMenu(idName.innerHTML, 1, 1, oCall);
		this.menu.className = idName.className;
		this.menupz(object,pz);

		if (type == 3) {
			this.closeByClick();
		} else if (type != 2) {
			this.closeByMove(object);
		}
	},
	
	closeByClick : function() {
		document.onmousedown = function (e) {
			var o = is_ie ? window.event.srcElement : e.target;
			if (!issrc(o)) {
				read.close();
				document.onmousedown = '';
			}
		}
	},

	closeByMove : function(id) {
		var _=this;
		getObj(id).onmouseout = function() {_.close();getObj(id).onmouseout = '';};
		_.menu.onmouseout = function() {_.close();}
		_.menu.onmouseover = function() {clearTimeout(read.t);}
	},

	menupz : function(obj,pz) {
		this.menu=this.menu||getPWBox(this.mid);
		this.menu.onmouseout = '';
		this.menu.style.display = '';
		// this.menu.style.zIndex = 3000;
		this.menu.style.left	= '-500px';
		this.menu.style.visibility = 'visible';

		if (typeof obj == 'string') {
			obj = getObj(obj);
		}
		if (obj == null) {
			if (is_ie) {
				this.menu.style.top  = (ietruebody().offsetHeight - this.menu.offsetHeight)/3 + getTop() +($('upPanel')?$('upPanel').scrollTop:0)+ 'px';
				this.menu.style.left = (ietruebody().offsetWidth - this.menu.offsetWidth)/2 + 'px';
			} else {
				this.menu.style.top  = (document.documentElement.clientHeight - this.menu.offsetHeight)/3 + getTop() + 'px';
				this.menu.style.left = (document.documentElement.clientWidth - this.menu.offsetWidth)/2 + 'px';
			}
		} else {
			var top  = findPosY(obj);
			var left = findPosX(obj);
			var pz_h = Math.floor(pz/10);
			var pz_w = pz % 10;
			if (is_ie) {
				var offsetheight = ietruebody().offsetHeight;
				var offsethwidth = ietruebody().offsetWidth;
			} else {
				var offsetheight = ietruebody().clientHeight;
				var offsethwidth = ietruebody().clientWidth;
			}
			/*
			 * if (IsElement('upPanel') && is_ie) { var gettop = 0; } else { var
			 * gettop = ; }
			 */
			var show_top = IsElement('upPanel') ? top - getObj('upPanel').scrollTop : top;

			if (pz_h!=1 && (pz_h==2 || show_top < offsetheight/2)) {
				top += getTop() + obj.offsetHeight;
			} else {
				top += getTop() - this.menu.offsetHeight;
			}
			if (pz_w!=1 && (pz_w==2 || left > (offsethwidth)*3/5)) {
				left -= this.menu.offsetWidth - obj.offsetWidth - getLeft();
			}
			this.menu.style.top = top+ 'px';
			if (top < 0) {
				this.menu.style.top  = 0  + 'px';
			}
			this.menu.style.left = left + 'px';
			if (pz_w != 1 && left + this.menu.offsetWidth > document.body.offsetWidth+ietruebody().scrollLeft) {
				this.menu.style.left = document.body.offsetWidth+ietruebody().scrollLeft-this.menu.offsetWidth-30 + 'px';
			}
		}
	},

	InitMenu : function() {
		var _=this;
		function setopen(a,b) {
			if (getObj(a)) {
				var type = null,pz = 0,oc;
				if (typeof window[a] == 'object') {
					oc = window[a];
					oc.type ? type = oc.type : 0;
					oc.pz ? pz = oc.pz : 0;
				}
				getObj(a).onmouseover = function(){_.open(b, a, type, pz, oc);};
				// getObj(a).onmouseover=function(){_.open(b,a);callBack?callBack(b):0};
				// try{getObj(a).parentNode.onfocus =
				// function(){_.open(b,a);callBack?callBack(b):0};}catch(e){}
			}
		}
		for (var i in openmenu) {
			try{setopen(i,openmenu[i]);}catch(e){}
		}
	},

	IsShow : function() {
		this.menu=this.menu||getPWBox(this.mid);
		return (this.menu.hasChildNodes() && this.menu.style.display != 'none') ? true : false;
	}
};
var read = new PwMenu();

function closep() {
	read.menu.style.display = 'none';
	read.menu.className = '';
}
function cancelping(url) {
	ajax.send(url,'',function(){
	var in_text=ajax.request.responseText;
	TINY.box.show(in_text,1,700,630,1);
	})
}
function findPosX(obj) {
	var curleft = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curleft += obj.offsetLeft
			obj = obj.offsetParent;
		}
	} else if (obj.x) {
		curleft += obj.x;
	}
	return curleft - getLeft();
}
function findPosY(obj) {
	var curtop = 0;
	if (obj.offsetParent) {
		while (obj.offsetParent) {
			curtop += obj.offsetTop
			obj = obj.offsetParent;
		}
	} else if (obj.y) {
		curtop += obj.y;
	}
	return curtop - getTop();
}
function in_array(str,a){
	for (var i=0; i<a.length; i++) {
		if(str == a[i])	return true;
	}
	return false;
}
function loadjs(path, code, id, callBack) {
	if (typeof id == 'undefined') id = '';
	if (id != '' && IsElement(id)) {
		try{callBack?callBack():0;}catch(e){}
		return false;
	}
	var header = document.getElementsByTagName("head")[0];
	var s = document.createElement("script");
	if (id) s.id = id;
	if (path) {
		// bug fix
		if(is_webkit && path.indexOf(' ')>-1)
		{
			var reg = /src="(.+?)"/ig;
			var arr = reg.exec(path);
			if(arr){
				path = arr[1];
			}				
		}
		s.src = path;
	} else if (code) {
		s.text = code;
	}
	if (document.all) {
		s.onreadystatechange = function() {
			if (s.readyState == "loaded" || s.readyState == "complete") {
				callBack?callBack():0;
			}
		};
	} else {
		try{s.onload = callBack?callBack:null;}catch(e){callBack?callBack():0;}
	}
	header.appendChild(s);
	return true;
}
function keyCodes(e) {
	if (read.menu.style.display == '' && e.keyCode == 27) {
		read.close();
	}
}

function opencode(menu,td,id) {
	document.body.onclick = null;
	document.body.onmousedown=null;
	var id = id || 'ckcode';
	if (read.IsShow() && read.menu.firstChild.id == id) return;
	read.open(menu,td,2,11);
	getObj(id).src = 'ck.php?nowtime=' + new Date().getTime();

	document.body.onmousedown=function(e) {
		var o = is_ie ? window.event.srcElement : e.target;
        var f = is_ie ? false : true;// firefox e.type = click by lh

		if( o!=getObj(id) && o!=td )
		{
			closep();
		}
		if (o == td || (f && e.type == "click")) {
			return;
		} else if (o.id == id) {
			getObj(id).src = 'ck.php?nowtime=' + new Date().getTime();
		} else {
			closep();
			document.body.onmousedown = null;
			document.body.onmousedown=null;
		}
	};

}

function getPWBox(type){
	if (getObj(type||'pw_box')) {
		return getObj(type||'pw_box');
	}
	var pw_box	= elementBind('div',type||'pw_box','','position:absolute;left:-10000px');

	document.body.appendChild(pw_box);
	return pw_box;
}

function getPWContainer(id,border){
	if (typeof(id)=='undefined') id='';
	if (getObj(id||'pw_box')) {
		var pw_box = getObj(id||'pw_box');
	} else {
		var pw_box = getPWBox(id);
	}
	if (getObj(id+'box_container')) {
		return getObj(id+'box_container');
	}

	if (border == 1) {
		pw_box.innerHTML = '<div class="popout"><div id="'+id+'box_container"></div></div>';
	} else {
		pw_box.innerHTML = '<div class="popout"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="bgcorner1"></td><td class="pobg1"></td><td class="bgcorner2"></td></tr><tr><td class="pobg4"></td><td><div class="popoutContent" id="'+id+'box_container"></div></td><td class="pobg2"></td></tr><tr><td class="bgcorner4"></td><td class="pobg3"></td><td class="bgcorner3"></td></tr></tbody></table></div>';
	}
	var popoutContent = getObj(id+'box_container');
	return popoutContent;
}
function elementBind(type,id,stylename,csstext){
	var element = document.createElement(type);
	if (id) {
		element.id = id;
	}
	if (typeof(stylename) == 'string') {
		element.className = stylename;
	}
	if (typeof(csstext) == 'string') {
		element.style.cssText = csstext;
	}
	return element;
}

function addChild(parent,type,id,stylename,csstext){
	parent = objCheck(parent);
	var child = elementBind(type,id,stylename,csstext);
	parent.appendChild(child);
	return child;
}

function delElement(id){
	id = objCheck(id);
	id.parentNode.removeChild(id);
}

function pwForumList(isLink,isPost,fid,handle,ifblank) {
	if (isLink == true) {
		if (isPost == true){
			if(ifblank == true) {
				window.open('post.php?fid='+fid);
			} else {
				window.location.href = 'post.php?fid='+fid;
			}
			if (is_ie) {
				window.event.returnValue = false;
			}
		} else {
			return true;
		}
	} else {
		if (gIsPost != isPost || read.menu.style.display=='none' || read.menu.innerHTML == '') {
			read.menu.innerHTML = '';
			if (isPost == true) {
				if (getObj('title_forumlist') == null) {
					showDialog('error','û���ҵ�����б���Ϣ');
				}
				getObj('title_forumlist').innerHTML = 'ѡ����Ҫ�����İ��';
			} else {
				if (getObj('title_forumlist') == null) {
					showDialog('error','û���ҵ�����б���Ϣ');
				}
				getObj('title_forumlist').innerHTML = '������ת';
			}
			gIsPost = isPost;
			if (handle.id.indexOf('pwb_')==-1) {
				read.open('menu_forumlist', handle, 3);
			}
		} else {
			read.close();
		}
	}
	return false;
}
function char_cv(str){
	if (str != ''){
		str = str.replace(/</g,'&lt;');
		str = str.replace(/%3C/g,'&lt;');
		str = str.replace(/>/g,'&gt;');
		str = str.replace(/%3E/g,'&gt;');
		str = str.replace(/'/g,'&#39;');
		str = str.replace(/"/g,'&quot;');
	}
	return str;
}

/*function showDialog(type,message,autohide,callback) {
	if (!type) type = 'warning';
	var tar = '<div class="popBottom" style="text-align:right;">';
	if (type == 'confirm' && typeof(callback) == 'function') {
		temp = function () {
			closep();
			if (typeof(callback)=='function') {
				callback();
			}
		}
		var button = typeof(callback)=='function' ? '<span class="btn2"><span><button onclick="temp();" type="button">ȷ��</button></span></span>' : '<span class="btn2"><span><button type="button">ȷ��</button></span></span>';

		tar += button+'</span></span>';
	}
	if (autohide) {
		tar += '<div class="fl gray">������'+autohide+'���ر�</div>';
	}
	tar += '<span class="bt2"><span><button onclick="closep();" type="button">�ر�</button></span></span>';
	var container = '<div style="width:350px;"><div class="popTop">��ʾ</div><div class="popCont"><img src="'+imgpath+'/'+type+'_bg.gif" class="mr10" align="absmiddle" />'+message+'</div>'+tar+'</div>';
	read.setMenu(container);
	read.menupz();
	if (autohide) {
		window.setTimeout("closep()", (autohide * 1000));
	}
}*/

function checkFileType() {
	var fileName = getObj("uploadpic").value;
	if (fileName != '') {
		var regTest = /\.(jpe?g|gif|png)$/gi;
		var arrMactches = fileName.match(regTest);
		if (arrMactches == null) {
			getObj('fileTypeError').style.display = '';
			return false;
		} else {
			getObj('fileTypeError').style.display = 'none';
		}
	}
	return true;
}
var searchTxt = '������ʵ�ܼ򵥣� (^_^)';
function searchFocus(e){
	if(e.value == searchTxt){
		e.value='';
		e.className = '';
	}
	//e.parentNode.className += ' inputFocus';
}
function searchBlur(e){
	if(e.value == ''){
		e.value=searchTxt;
		e.className = 'gray';
	}
	//e.parentNode.className = 'ip';
}
function getSearchType(e){
	var n = e.srcElement;
	if(n && n.tagName!='LI') return;
	n.parentNode.parentNode.getElementsByTagName('h6')[0].innerHTML = n.innerHTML;
	var lis = n.parentNode.getElementsByTagName('li');
	for(var i = 0,j=lis.length;i < j;i++){
		lis[i].style.display = '';
	}
	n.style.display='none';
	getObj('search_type').value=n.getAttribute('type');
	n.parentNode.style.display='none';
}
function searchInput() {
	if(getObj('search_input').value==searchTxt)
		getObj('search_input').value='';
	return true;
}

(function() {
    if (window.showDlg) return;
    var win = window,doc = win.document,
        isIE = !+'\v1', // IE�����
	    isCompat = doc.compatMode == 'CSS1Compat',	// �������ǰ����ģʽ
	    IE6 = isIE && /MSIE (\d)\./.test(navigator.userAgent) && parseInt(RegExp.$1) < 7, // IE6������Ҫ��iframe������
	    useFixed = !isIE || (!IE6 && isCompat), // ����ʱ��IE7+����׼ģʽ�������������ʹ��Fixed��λ
        Typeis = function(o,type) {
		    return Object.prototype.toString.call(o)==='[object ' + type + ']';
	    }, // �ж�Ԫ������
        $ = function(o) {
            return Typeis(o,'String') ? doc.getElementById(o) : o;
        },
        $height = function(obj) {return parseInt(obj.style.height) || obj.offsetHeight}, // ��ȡԪ�ظ߶�
        $width = function(obj) {return parseInt(obj.style.width) || obj.offsetWidth}, // ��ȡԪ�ظ߶�
        getWinSize = function() {
            var rootEl = doc.body;
			return [Math.max(rootEl.scrollWidth, rootEl.clientWidth), Math.max(Math.max(doc.body.scrollHeight,rootEl.scrollHeight), Math.max(rootEl.clientHeight,doc.body.clientHeight || window.clientHeight))]
		},
		/* ��ȡscrollLeft��scrollTop */
		getScrollPos = function() {
		    var body = doc.body,docEl = doc.documentElement;
			return {
			    left:body.scrollLeft || docEl.scrollLeft, top:body.scrollTop || docEl.scrollTop
			}
		},
		getElementsByClassName = function(className, element) {
		    var children = (element || document).getElementsByTagName('*');
		    var elements = new Array();
		    for (var i = 0; i < children.length; i++) {
			    var child = children[i];
			    var classNames = child.className.split(' ');
			    for (var j = 0; j < classNames.length; j++) {
				    if (classNames[j] == className) {
					    elements.push(child);
					    break;
				    }
			    }
		    }
		    return elements;
	    },
        empty = function(){},
        defaultCfg = {   // Ĭ������
            id:         'pw_dialog',
            type:       'warning',
            message:    '',// ������ʾ������
            showObj:    null,// Ҫ��ʾ�ı���Ԫ��,��ajax��ʾ�ǳ���
            width:      350,// ������߶�
            isMask:     1,
            autoHide:   0,// �Ƿ��Զ��ر�
		    zIndex:		9999, // ���ֵ
		    onShow:		empty,// ��ʾʱִ��
		    onOk:       empty,
		    onClose:	empty, // �ر�ʱִ��
		    left:       '50%',// ����λ��
		    top:        '50%',
		    alpha:      0.2,// ���ֵ�͸����
		    backgroundColor:'#000',// ���ֵı���ɫ
		    titleText:  '��ʾ',// ��ʾ����
		    okText:      'ȷ��',// ȷ����ť����
		    cancelText:  'ȡ��',// ȡ�����֣�ȷ��ʱ��
		    closeText:  '�ر�',// �ر�����
		    button:     null// Ĭ�ϲ���ʾ��ť
        },
		icoPath = 'images/';
        
    var Dialog = function(options) {// ���캯��
        var self = this;
        this.options = options;
        if (!(self instanceof Dialog)) {
            return new Dialog(options);
        }
        this._initialize();
    }
    Dialog.prototype = {
        _initialize:function() {
            for(var i in defaultCfg) {
                if(!(i in options)){
                    options[i] = defaultCfg[i];
                }
            }
            this.show();
        },
        show:function(options) {
            var self = this,
                opt = self.options,
                box = opt.showObj;
            	closep();
                createButton = function(){// ������ť
                    var html = [],btn = opt.button;
                    if(opt.autoHide){ html.push('<div class="fl gray">������<span class="spanTime">'+ opt.autoHide +'</span>���ر�</div>');}
                    if(btn){
                        for(var i = 0,j = btn.length;i < j;i++ ) {
                            html.push('<span class="bt2"><span><button class="pw_dialoag_button" type="button">'+ btn[i][0] +'</button></span></span>');
                        }
                    }else {
                        if(opt.type === 'confirm') {
                            html.push('<span class="btn2"><span><button type="button" class="pw_dialoag_ok">'+ opt.okText +'</button></span></span>');
                        }
                        html.push('<span class="bt2"><span><button type="button" class="pw_dialoag_close">'+ opt.closeText +'</button></span></span>');
                    }
                    return html.join('');
                }
                // timeout;
            if(!opt.showObj) {
                var divStyle = 'z-index:'+ (opt.zIndex + 1) +';position:'+ (useFixed ? 'fixed' : 'absolute')+';';
                    maskStyle = (!opt.isMask ? 'display:none':'') + 'width:'+ getWinSize()[0] +'px;height:'+ getWinSize()[1] +'px;z-index:'+ opt.zIndex +';position:absolute;top:0;left:0;text-align:center;filter:alpha(opacity='+ opt.alpha*100 + ');opacity:'+ opt.alpha +';background-color:'+opt.backgroundColor;
                    if(!$(opt.id)) {
                        box = document.createElement('div');
                        box.id = opt.id;
                    }else {
                        box = $(opt.id);
                    }
                    if (!opt.type) opt.type = defaultCfg.type;
		            box.innerHTML = [
		            /* ���� */
		            '<div style="' + maskStyle + '"></div>', IE6 ? ("<iframe id='maskIframe' src='about:blank' style='" + maskStyle + "'></iframe>") : '',
		            /* ���� */
		            // IE6 ? "<iframe src='javascript:false'
					// style='width:100%;height:999px;position:absolute;top:0;left:0;z-index:-1;opacity:1;filter:alpha(opacity=100)'></iframe>":
					// '',
		            '<div style="'+ divStyle +'" class="popout">\
		            <table cellspacing="0" cellpadding="0" border="0">\
		                <tbody>\
		                <tr><td class="bgcorner1"></td><td class="pobg1"></td><td class="bgcorner2"></td></tr><tr><td class="pobg4"></td>\
		                    <td>\
		                        <div id="box_container" class="popoutContent">\
		                            <div style="width:'+ opt.width +'px;">\
		                                <div class="popTop">'+ opt.titleText +'</div>\
		                                <div class="popCont"><img align="absmiddle" class="mr10" src="'+ icoPath + opt.type +'_bg.gif">'+ opt.message +'</div>\
		                                <div style="text-align: right;" class="popBottom">\
		                                '+ createButton() + '\
		                                </div>\
		                            </div>\
		                        </div>\
		                    </td><td class="pobg2"></td></tr><tr><td class="bgcorner4"></td><td class="pobg3"></td><td class="bgcorner3"></td></tr>\
		                </tbody>\
		            </table>\
		            </div>',
		            /* ��Ӱ */
		            isIE ? "<div id='ym-shadow' style='position:absolute;z-index:10000;background:#808080;filter:alpha(opacity=80) progid:DXImageTransform.Microsoft.Blur(pixelradius=5);'></div>": ''].join('');
		        doc.body.insertBefore(box, doc.body.childNodes[0]);
		        var popout = getElementsByClassName('popout',box)[0];
                popout.style.left = Typeis(opt.left,'Number') ? opt.left + 'px' : opt.left
                popout.style.top = Typeis(opt.top,'Number') ? opt.top + 'px' : opt.top;
                var h = $height(popout),w = $width(popout);
                if(!Typeis(opt.left,'Number')) {
				    popout.style.marginLeft = useFixed ? - w / 2 + "px" : getScrollPos().left - w / 2 + "px";
				}else {
				    popout.style.left = ''+opt.left + 'px';
				}
				if(!Typeis(opt.top,'Number')) {
				    popout.style.marginTop = useFixed ? - h / 2 + "px" : getScrollPos().top - h / 2 + "px";
				}else {
				    popout.style.top = ''+opt.top + 'px';
				}
				var closeTime = function() {
					if(interval){
						clearInterval(interval);
						interval = null;
					}
                };
				if(opt.button) {
				    var customBtn = getElementsByClassName('pw_dialoag_button',box),buttons = opt.button;
				    if(customBtn.length){
                        for(var i = 0,j = customBtn.length;i < j;i++) {
                            (function(i){
                                customBtn[i].onclick = function() {
                                   buttons[i][1] && buttons[i][1](); 
                                }
                            })(i)
                            
                        }
                    }
				}else{
		            var closeBtn = getElementsByClassName('pw_dialoag_close',box),
                        okBtn = getElementsByClassName('pw_dialoag_ok',box);
                   if(closeBtn.length){
                        closeBtn[0].onclick = function() {
                            self.close();
                        }
                    }
                    if(okBtn.length) {
                        okBtn[0].onclick = function() {
                            self.options.onOk && self.options.onOk();
							//self.options.onClose && self.options.onClose();
                            self.close();
                        }
                    }
                }
                
            }else{
                var obj = $(opt.showObj);
                if(obj.nodeType !== 1) {// ����������Ĳ���Ԫ��,ֱ��return
                    return;
                }
                obj.style.display = '';
                var msgObj = getElementsByClassName('message',obj),
                    msgClose = getElementsByClassName('close',obj);
                if( !msgObj.length ) { return false; }
                msgObj[0].innerHTML = opt.message;
                if( msgClose.length ) { msgClose[0].onclick = function() {obj.style.display = 'none'; }}
            }
            opt.onShow && opt.onShow();
            if(opt.autoHide) {
                var spanTime = getElementsByClassName('spanTime',popout)[0];
		        interval = setInterval(function() {
		                var time = --opt.autoHide;
		                if(spanTime){ spanTime.innerHTML = time;}
		                if(time === 0){
		                    clearInterval(interval);
		                    self.close();
		                }
		        },1000);
		    }
        },
        close:function() {
            var opt = this.options;
            if(!opt.showObj && $(opt.id)) {
                doc.body.removeChild($(opt.id));
            }else if($(opt.showObj)) {
                $(opt.showObj).style.display = 'none';
            }
            opt.onClose && opt.onClose();
        }
    }
    win['showDlg'] = function(type,message,autohide,callback){
		var isMask = type === 'confirm' ? 0 : 1,
			onClose = type !== 'confirm' ? callback : null,
			options = arguments.length === 1 ? arguments[0] : { type:type,message:message,autoHide:autohide,onOk:callback,onClose:onClose,isMask:isMask };
        Dialog(options);
    }
	win['showDialog'] = win['showDlg'];
})();
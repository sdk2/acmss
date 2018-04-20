function pwConfirm(title,position,callback){
	if (typeof(callback) != 'function') alert('error');

	if (objCheck('oldinfo')) {
		getObj('oldinfo').parentNode.removeChild(getObj('oldinfo'));
	}
	var container 	= elementBind('div','container_del','','position: absolute;z-index:1011');
	($('upPanel')||document.body).appendChild(container);
	closefm = callback;
	var pw_box = '<div class="popout"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td class="bgcorner1"></td><td class="pobg1"></td><td class="bgcorner2"></td></tr><tr><td class="pobg4"></td><td><div id="box_container" class="popoutContent"><div class="cc" style="width: 200px;"><div class="p15">'+title+'</div><div class="popBottom"><span class="btn2"><span><button onclick="delElement(\'container_del\');closefm();" type="button">ȷ ��</button></span></span><span class="bt2"><span><button onclick="delElement(\'container_del\');" type="button">ȡ��</button></span></span></div></div></div></td><td class="pobg2"></td></tr><tr><td class="bgcorner4"></td><td class="pobg3"></td><td class="bgcorner3"></td></tr></tbody></table></div>';
	container.innerHTML = pw_box;
	if (typeof(position)!='object') {
		container.style.top  = (ietruebody().clientHeight - container.offsetHeight)/3 + getTop() + 'px';
		container.style.left = (ietruebody().clientWidth - container.offsetWidth)/2 + 'px';
	} else {
		var top  = findPosY(position);
		var left = findPosX(position);
		top = getTop() + top - container.offsetHeight;

		if (ietruebody().clientWidth <left + container.offsetWidth)
		{

			left = left - container.offsetWidth;
		}

		container.style.top  = top  + 'px';
		container.style.left = left + 'px';
	}
	container.style.display = '';
}


function dateFormat(date,format){
	var o = {
		"Y+" :  date.getFullYear(),
		"M+" :  date.getMonth()+1,  //month
		"m+" :  date.getMonth()+1,  //month
		"d+" :  date.getDate(),     //day
		"h+" :  date.getHours(),    //hour
		"i+" :  date.getMinutes(),  //minute
		"s+" :  date.getSeconds(), //second
		"q+" :  Math.floor((date.getMonth()+3)/3),  //quarter
		"S"  :  date.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
}

function postShareOtherType(type,id,ifhidden){
	var textarea	= read.menu.getElementsByTagName('textarea');
	var descrip	= textarea[0].value;
	var gdcode = getObj('gdcode').value;
	var qanswer = getObj('qanswer').value;
	var qkey = getObj('qkey').value;
	ajax.send('apps.php?q=sharelink','type='+type+'&id='+id+'&descrip='+ajax.convert(descrip)+'&gdcode='+ajax.convert(gdcode)+'&qanswer='+ajax.convert(qanswer)+'&qkey='+ajax.convert(qkey)+'&ifhidden='+ifhidden,function(){
		var rText = ajax.request.responseText;
		if (rText=='success') {
			if (ifhidden == 1) {
				showDialog('success','�ղسɹ�!',2);
			} else {
				showDialog('success','����ɹ�!',2);
			}
		} else {
			ajax.guide();
		}
	});
}


var linknum = 1;
function createLinkBox(){
	var div = getObj('linkbox');

	div.innerHTML = '<div class="popout"><table border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="bgcorner1"></td><td class="pobg1"></td><td class="bgcorner2"></td></tr><tr><td class="pobg4"></td><td><div class="popoutContent"><div style="width:400px"><div class="popTop" style="cursor:move" onmousedown="read.move(event);"><a href="javascript:;" class="adel fr" onclick="closep();">ɾ��</a>����url����</div><div style="padding:5px 0 10px"><table width="100%" cellspacing="0" cellpadding="0"><tbody id="linkmode" style="display:none;"><tr><td><input class="input" id="linkdiscrip" size="20" value="" /></td><td><input class="input" id="linkaddress" value="http://" size="35" /></td></tr></tbody><tr><td>����˵��</td><td><a href="javascript:;" class="fr s3 mr10" onclick="addlink();">[���]</a>���ӵ�ַ</td></tr><tr><td><input class="input" id="linkdiscrip1" size="20" value="" /></td><td><input class="input" id="linkaddress1" value="http://" size="35" /></td></tr><tbody id="linkbody"></tbody></table></div><div class="popBottom"><span class="btn2"><span><button type="button" onclick="return insertlink();">�� ��</button></span></span></div></div></div></td><td class="pobg2"></td></tr><tr><td class="bgcorner4"></td><td class="pobg3"></td><td class="bgcorner3"></td></tr></tbody></table></div>';

	read.open('linkbox','createlinkid','2');
}


function addlink(){
	var s = getObj('linkmode').firstChild.cloneNode(true);
	var temp_linknum = ++linknum;
	var tags = s.getElementsByTagName('input');
	for (var i=0;i<tags.length;i++) {
		if (tags[i].id == 'linkdiscrip') {
			tags[i].id = 'linkdiscrip' + linknum;
		}
		if (tags[i].id == 'linkaddress') {
			tags[i].id = 'linkaddress' + linknum;
		}
	}
	getObj('linkbody').appendChild(s);
}

function insertlink(){

	var AddTxt = '';
	var temp_linknum = linknum;

	for (var i=1;i<=linknum;i++) {
		if (getObj('linkdiscrip'+i).value.length == 0 && getObj("linkaddress"+i).value == 'http://') continue;
		if (getObj('linkdiscrip'+i).value){
			AddTxt += " [url=" + encodeURI(getObj("linkaddress"+i).value) + "]" + getObj("linkdiscrip"+i).value + "[/url]";
		} else {
			AddTxt += " [url=" + encodeURI(getObj("linkaddress"+i).value) + "]" + getObj("linkaddress"+i).value + "[/url]";
		}
	}

	document.FORM.atc_content.value += AddTxt;
	linknum = 1;
	closep();
}
function SETTOP ()
{
	read.menu.style.top="50px";
}
/**Ϊ������***/
function iPhotoForm(obj)
{
	try
	{
		var tds = obj.contentWindow.document.getElementsByTagName('span') || [];
		var tipText = '';
		
		for (var i = 0; i < tds.length; i++)
		{
			if (tds[i].className == 'f14')
			{
				tipText = tds[i].innerHTML.replace(/<.+?>/g, '');
				break;
			}
		}

		if (obj.contentWindow.document.body.innerHTML.indexOf('�������') > 0)
		{
			showDialog('success', '�ϴ��ɹ�!');
			obj.onload = null;
			SETTOP();
			getObj('uploadPhotoForm').reset();
			parent.location.href= basename;
		} else
		{
			showDialog('error', tipText);
			SETTOP();
		}
	} catch(e){}
}
function iDiaryForm (obj)
{
	var tds = obj.contentWindow.document.getElementsByTagName('span') || [];
	var tipText = '';
	for (var i = 0; i < tds.length; i++)
	{
		if (tds[i].className == 'f14')
		{
			tipText = tds[i].innerHTML.replace(/<.+?>/g, '');
			break;
		}
	}
	obj.contentWindow.document.body.innerHTML.indexOf('�������') == -1 ? (showDialog('error', tipText) & SETTOP() & (document.FORM.Submit.disabled = false)) : showDialog('success', '��־����ɹ���') & (parent.location.href = 'apps.php?q=diary') & setEditorContent() & (SETTOP()) & getObj('FORM').reset();
}
function newGdCode(obj) {
	var currentTime = new Date().getTime();
	if (is_ie) {
		obj.movie = obj.movie.replace(/[&,?]{1}nowtime=[0-9]+/, '');
		obj.movie = obj.movie.replace(/ck.php/ig, 'ck.php?nowtime='+currentTime);
		if(gdtype == 3)obj.movie = obj.movie.replace(/autoStart=false/ig, 'autoStart=true');
	} else {
		var html = obj.innerHTML;
		html.replace(/[&,?]{1}nowtime=[0-9]+/, '');
		html.replace(/ck.php/ig, 'ck.php?nowtime='+currentTime);
		if (gdtype == 3)html = html.replace(/autoStart=false/ig, 'autoStart=true');
		obj.innerHTML = html;
	}
	return false;
}

function showGdCode(isreturn) {
	var str;
	if (gdtype == 1) {
		str = '<img id="changeGdCode" src="ck.php?nowtime=1" align="top" class="cp" onclick="changeCkImage(this)" alt="�����������һ��" title="�����������һ��" align="absmiddle" /><a href="javascript:;" onclick="changeCkImage(this.previousSibling);return false;" style="margin-left:10px;" class="s4" id="changeGdCode_a">��һ��</a>';
	} else {
		//flash & voice
		str = '<object align="top" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"';
		str += gdtype == 3 ? ' width="25" height="20">' : ' width="'+ flashWidth + '" height="' + flashHeight + '">';
		str += '<param name="quality" value="high" /><param value="transparent" name="wmode" /><param name="movie" value="';
		if (gdtype == 2) {
			//flash
			str += 'ck.php" />';
			middleString = 'src="ck.php" quality="high" width="' + flashWidth + '" height="' + flashHeight + '" pluginspage="http://www.macromedia.com/go/getflashplayer"  type="application/x-shockwave-flash"></embed></object><a class="s4" href="javascript:;"';
			str += '<embed ' + middleString + ' onclick="newGdCode(this.previousSibling);return false;" id="changeGdCode"> ��һ��</a>';
		} else if (gdtype ==3) {
			//voice
			str += 'images/ck/audio/audio.swf?file=ck.php&songVolume=100&width=150&autoStart=false&repeatPlay=false&showDownload=false" />';
			middleString = 'src="images/ck/audio/audio.swf?file=ck.php&songVolume=100&width=150&autoStart=false&repeatPlay=false&showDownload=false" width="25" height="20" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed></object><span>(�������)</span><a id="changeGdCode" class="s4" href="javascript:;"';
			str += '<embed '+ middleString + ' onclick="newGdCode(this.previousSibling.previousSibling);return false;"> ��һ��</a>';
		}
	}
	if (isreturn == 1) {
		return str;
	} 
	document.write(str);
}

function showgd(id){
	var codeStr;
	var id = id || 'ckcode'
	codeStr = showGdCode(1);
	try{
		if (getObj(id).style.display != '') {
			getObj(id).innerHTML = codeStr;
		}
		getObj(id).style.display="";
	}catch(e){}
}

function changeCkImage(obj) {
	obj.src = 'ck.php?nowtime='+ new Date().getTime(); 
}
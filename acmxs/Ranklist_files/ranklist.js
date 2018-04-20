// by bLue
// https://github.com/dreamerblue

beforeProbTdNum = 5;
problemNum = 0;
balloon = [
	'FF99CC',
	'FFFF00',
	'32CD32',
	'3399FF',
	'FF8C00',
	'9900CC',
	'FF0000',
	'FFCC00',
	'CC0066',
	'FFFAFA',
	];
color = [
	'FFFFFF',
	'999999',
	'FFFFFF',
	'FFFFFF',
	'FFFFFF',
	'FFFFFF',
	'FFFFFF',
	'FFFFFF',
	'FFFFFF',
	'999999',
	];
medalNum = [
	[18, 54, 108, 164],
	[11, 32, 64, 103],
	[7, 22, 44, 61]
	];
// 164:114
// 0.5899

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]); return null;
}

function init(res) {
	// Group
	var group = 0;
	if(getUrlParam('group') == 'p') {
		group = 1;
		$("#group-p").addClass('active');
	}
	else if(getUrlParam('group') == 'n') {
		group = 2;
		$("#group-n").addClass('active');
	}
	else $("#group-all").addClass('active');
	// Name
	var nameType = 0;
	if(getUrlParam('name') == 'classname') {
		nameType = 1;
		$("#name-classname").addClass('active');
	}
	else $("#name-nickname").addClass('active');
	problemNum = res[0]['statuses'].length;
	$("thead").html('');
	$("thead").append('<tr></tr>');
	$("thead tr:last").append('<th class="single-rank">Rank</th>');
	$("thead tr:last").append('<th class="single-group">Group</th>');
	$("thead tr:last").append('<th class="single-name">Name</th>');
	$("thead tr:last").append('<th class="single-solved">Slv.</th>');
	$("thead tr:last").append('<th class="single-time">Time</th>');
	for(var i=0; i<problemNum; ++i) {
		$("thead tr:last").append('<th class="single-prob"><a style="color: #' + color[i] + '; background: no-repeat center/36px url(&#39;data:image/svg+xml;utf8,&lt;svg class=&quot;icon&quot; width=&quot;200px&quot; height=&quot;200.00px&quot; viewBox=&quot;0 0 1024 1024&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt;&lt;path fill=&quot;%23' + balloon[i] + '&quot; d=&quot;M512 935.724137C617.931034 741.517241 847.448276 556.021587 847.448276 370.758621 847.448276 185.495654 697.262966 35.310345 512 35.310345 326.737034 35.310345 176.551724 185.495654 176.551724 370.758621 176.551724 556.021587 423.724137 741.517241 512 935.724137Z&quot; /&gt;&lt;/svg&gt;&#39;);">' + String.fromCharCode(65+i) + '</a></th>');
	}
	$("tbody").html('');
	var rank = 0;
	for(var i=0; i<res.length; ++i) {
		if(group==1 && !res[i]['ispro']) continue;
		if(group==2 && res[i]['ispro']) continue;
		rank++;
		var medal = 0;
		if(group != 0) {
			for(var j=0; j<medalNum[group].length; ++j) {
				if(rank <= medalNum[group][j]) {
					medal = j+1;
					break;
				}
			}
		}
		$("tbody").append('<tr></tr>');
		$("tbody tr:last").append('<td class="single-rank medal-' + medal + '">' + rank + '</td>');
		$("tbody tr:last").append('<td class="single-group">' + (res[i]['ispro'] ? '专' : '非') + '</td>');
		$("tbody tr:last").append('<td class="single-name">' + res[i]['nickname'] + '</td>');
		$("tbody tr:last td:last").text($("tbody tr:last td:last").html().split('<br>')[nameType]);
		$("tbody tr:last").append('<td class="single-solved">' + res[i]['solved'] + '</td>');
		$("tbody tr:last").append('<td class="single-time">' + parseInt(Math.floor(res[i]['time']/60)) + '</td>');
		for(var j=0; j<res[i]['statuses'].length; ++j) {
			var content = '';
			var resultClass = '';
			if(res[i]['statuses'][j]['result']=='AC' || res[i]['statuses'][j]['result']=='FB')
				content = res[i]['statuses'][j]['attempted'] + '/' + parseInt(Math.floor(res[i]['statuses'][j]['time']/60));
			else if(res[i]['statuses'][j]['result']=='F' || res[i]['statuses'][j]['result']=='?')
				content = res[i]['statuses'][j]['attempted'];
			if(res[i]['statuses'][j]['result'] == 'AC')
				resultClass = ' accepted';
			if(res[i]['statuses'][j]['result'] == 'FB')
				resultClass = ' fb';
			if(res[i]['statuses'][j]['result'] == 'F')
				resultClass = ' failed';
			if(res[i]['statuses'][j]['result'] == '?')
				resultClass = ' pending';
			$("tbody tr:last").append('<td class="single-prob' + resultClass + '">' + content + '</td>');
		}
	}
}

$(function() {
	var res = [
    {
        "username": "TuringMac<br/>计科1604 柳祺",
        "solved": 8,
        "ispro": true,
        "time": 63451,
        "nickname": "TuringMac<br/>计科1604 柳祺",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 960
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3440
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 2087
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5531
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "FB",
                "time": 8782
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 14119
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6606
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 2726
            }
        ]
    },
    {
        "username": "那个大佬好可怕<br/>计科1605 孙振强",
        "solved": 7,
        "ispro": true,
        "time": 32650,
        "nickname": "那个大佬好可怕<br/>计科1605 孙振强",
        "statuses": [
            {
                "attempted": 1,
                "result": "FB",
                "time": 172
            },
            {
                "attempted": 1,
                "result": "FB",
                "time": 735
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1582
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 3432
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 13820
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1930
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 1379
            }
        ]
    },
    {
        "username": "敲代码好难<br/>计科1603 梁剑锋",
        "solved": 7,
        "ispro": true,
        "time": 40408,
        "nickname": "敲代码好难<br/>计科1603 梁剑锋",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 210
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 7029
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 3378
            },
            {
                "attempted": 1,
                "result": "FB",
                "time": 1254
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 13404
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3820
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5313
            }
        ]
    },
    {
        "username": "楼上是冠军<br/>通信1602 秦圣昭",
        "solved": 7,
        "ispro": false,
        "time": 43336,
        "nickname": "楼上是冠军<br/>通信1602 秦圣昭",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 305
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 3259
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 1611
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6220
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "AC",
                "time": 12039
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3574
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "FB",
                "time": 728
            }
        ]
    },
    {
        "username": "扎铁了老心<br/>计科1605 徐红博",
        "solved": 7,
        "ispro": true,
        "time": 45284,
        "nickname": "扎铁了老心<br/>计科1605 徐红博",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 462
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 8132
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3299
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 5282
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 10408
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3668
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 2033
            }
        ]
    },
    {
        "username": "沉迷输出见死不救<br/>计科1604 殷晓琛",
        "solved": 7,
        "ispro": true,
        "time": 54259,
        "nickname": "沉迷输出见死不救<br/>计科1604 殷晓琛",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 345
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 1861
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1276
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 5943
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 14020
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4062
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "AC",
                "time": 6352
            }
        ]
    },
    {
        "username": "冰之随想<br/>计科1604 王炜良",
        "solved": 7,
        "ispro": true,
        "time": 59065,
        "nickname": "冰之随想<br/>计科1604 王炜良",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1765
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 7281
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2837
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 10071
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 13836
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3502
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 2973
            }
        ]
    },
    {
        "username": "天照<br/>通信1603 周恒阳",
        "solved": 7,
        "ispro": false,
        "time": 60116,
        "nickname": "天照<br/>通信1603 周恒阳",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 317
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 5437
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 1440
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6306
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 17,
                "result": "AC",
                "time": 13403
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1765
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 2648
            }
        ]
    },
    {
        "username": "0x3f3f3f3f<br/>计科1608 李东庆",
        "solved": 6,
        "ispro": true,
        "time": 13746,
        "nickname": "0x3f3f3f3f<br/>计科1608 李东庆",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 339
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1424
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1616
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3301
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3623
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2243
            }
        ]
    },
    {
        "username": "天青色等烟雨<br/>计科1601 刘莹",
        "solved": 6,
        "ispro": true,
        "time": 21251,
        "nickname": "天青色等烟雨<br/>计科1601 刘莹",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 435
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7729
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 869
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5152
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3077
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 2789
            }
        ]
    },
    {
        "username": "木杉<br/>软件1606 甄彬",
        "solved": 6,
        "ispro": true,
        "time": 25128,
        "nickname": "木杉<br/>软件1606 甄彬",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 472
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 4317
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 905
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8884
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3737
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2013
            }
        ]
    },
    {
        "username": "震仰盂，艮覆碗<br/>计科1601 魏衍鑫",
        "solved": 6,
        "ispro": true,
        "time": 29806,
        "nickname": "震仰盂，艮覆碗<br/>计科1601 魏衍鑫",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 274
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4312
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 2180
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 11390
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3040
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2610
            }
        ]
    },
    {
        "username": "LEO<br/>计科1606 徐如意",
        "solved": 6,
        "ispro": true,
        "time": 31568,
        "nickname": "LEO<br/>计科1606 徐如意",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 362
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6107
            },
            {
                "attempted": 1,
                "result": "FB",
                "time": 848
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8183
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3931
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "AC",
                "time": 4937
            }
        ]
    },
    {
        "username": "sky<br/>计科1604 李昊",
        "solved": 6,
        "ispro": true,
        "time": 32190,
        "nickname": "sky<br/>计科1604 李昊",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 435
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 6341
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 1914
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5821
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3761
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4318
            }
        ]
    },
    {
        "username": "托马斯小火车<br/>计科1601 叶璜远",
        "solved": 6,
        "ispro": true,
        "time": 32969,
        "nickname": "托马斯小火车<br/>计科1601 叶璜远",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 340
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 1763
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2788
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 13501
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3847
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3530
            }
        ]
    },
    {
        "username": "xXx<br/>软件1606 程鑫",
        "solved": 6,
        "ispro": true,
        "time": 35075,
        "nickname": "xXx<br/>软件1606 程鑫",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 446
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5327
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 2796
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 8261
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3979
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 3466
            }
        ]
    },
    {
        "username": "一只大婉婉<br/>计科1607 杨婉清",
        "solved": 6,
        "ispro": true,
        "time": 37716,
        "nickname": "一只大婉婉<br/>计科1607 杨婉清",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 907
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 10949
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 1894
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 9727
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3944
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4295
            }
        ]
    },
    {
        "username": "Jin<br/>计科1604 尚进",
        "solved": 6,
        "ispro": true,
        "time": 45593,
        "nickname": "Jin<br/>计科1604 尚进",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1244
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 9466
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 2871
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 12474
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3128
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 5610
            }
        ]
    },
    {
        "username": "少年大大<br/>软件1601 李睿",
        "solved": 6,
        "ispro": true,
        "time": 52202,
        "nickname": "少年大大<br/>软件1601 李睿",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 280
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 10955
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 12233
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1549
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4529
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 8256
            }
        ]
    },
    {
        "username": "来给祥宇juju递女装<br/>计科1601 陶鑫灿",
        "solved": 6,
        "ispro": true,
        "time": 53285,
        "nickname": "来给祥宇juju递女装<br/>计科1601 陶鑫灿",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 364
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 9523
            },
            {
                "attempted": 14,
                "result": "AC",
                "time": 10754
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6632
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2976
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5036
            }
        ]
    },
    {
        "username": "广州有人射怪关我鸟事<br/>计科1603 谭雪瑞",
        "solved": 5,
        "ispro": true,
        "time": 9062,
        "nickname": "广州有人射怪关我鸟事<br/>计科1603 谭雪瑞",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 351
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1304
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1806
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2406
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3195
            }
        ]
    },
    {
        "username": "地信1401李玉<br/>地信1401 李玉",
        "solved": 5,
        "ispro": false,
        "time": 21266,
        "nickname": "地信1401李玉<br/>地信1401 李玉",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 847
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 8265
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3519
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2201
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1634
            }
        ]
    },
    {
        "username": "峰<br/>计科1605 高峰",
        "solved": 5,
        "ispro": true,
        "time": 21578,
        "nickname": "峰<br/>计科1605 高峰",
        "statuses": [
            {
                "attempted": 6,
                "result": "AC",
                "time": 1053
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3585
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1952
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4073
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2515
            }
        ]
    },
    {
        "username": "朕与众爱卿皆瞠目结舌<br/>计科1601 赵鑫源",
        "solved": 5,
        "ispro": true,
        "time": 24427,
        "nickname": "朕与众爱卿皆瞠目结舌<br/>计科1601 赵鑫源",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1898
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5586
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2682
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4108
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 6553
            }
        ]
    },
    {
        "username": "小垃圾<br/>计科1605 魏方月",
        "solved": 5,
        "ispro": true,
        "time": 24565,
        "nickname": "小垃圾<br/>计科1605 魏方月",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 595
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3358
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5359
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6033
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6820
            }
        ]
    },
    {
        "username": "华风<br/>软件1604 王毓华",
        "solved": 5,
        "ispro": true,
        "time": 28409,
        "nickname": "华风<br/>软件1604 王毓华",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 410
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6820
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 2189
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 3888
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3102
            }
        ]
    },
    {
        "username": "桑<br/>计科1604 桑国瑞",
        "solved": 5,
        "ispro": true,
        "time": 28875,
        "nickname": "桑<br/>计科1604 桑国瑞",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 620
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 10815
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "FB",
                "time": 9638
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2325
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 1877
            }
        ]
    },
    {
        "username": "sDream333<br/>测控1604 曹森",
        "solved": 5,
        "ispro": false,
        "time": 29123,
        "nickname": "sDream333<br/>测控1604 曹森",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 2239
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6893
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2820
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4682
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7689
            }
        ]
    },
    {
        "username": "拉塞尔威斯布鲁克<br/>计科1604 赵鉴兆",
        "solved": 5,
        "ispro": true,
        "time": 29185,
        "nickname": "拉塞尔威斯布鲁克<br/>计科1604 赵鉴兆",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 403
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 7105
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 4108
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4644
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 3325
            }
        ]
    },
    {
        "username": "JYJY<br/>计科1601 刘进一",
        "solved": 5,
        "ispro": true,
        "time": 31491,
        "nickname": "JYJY<br/>计科1601 刘进一",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 887
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 8065
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3417
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4029
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 9093
            }
        ]
    },
    {
        "username": "LAN7<br/>软件1602 李金威",
        "solved": 5,
        "ispro": true,
        "time": 32563,
        "nickname": "LAN7<br/>软件1602 李金威",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 613
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5864
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 3777
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4918
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 5391
            }
        ]
    },
    {
        "username": "Cerdore<br/>软件1605 陈现森",
        "solved": 5,
        "ispro": true,
        "time": 33307,
        "nickname": "Cerdore<br/>软件1605 陈现森",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 951
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 5236
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 11652
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2823
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 1845
            }
        ]
    },
    {
        "username": "也有那个说法<br/>软件1605 杨超群",
        "solved": 5,
        "ispro": true,
        "time": 34901,
        "nickname": "也有那个说法<br/>软件1605 杨超群",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 2650
            },
            {
                "attempted": 12,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 5050
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 13375
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5143
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1483
            }
        ]
    },
    {
        "username": "赵宁夜<br/>计科1605 任名玉",
        "solved": 5,
        "ispro": true,
        "time": 36790,
        "nickname": "赵宁夜<br/>计科1605 任名玉",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 656
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 4552
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 5585
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8068
            },
            {
                "attempted": 17,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 7129
            }
        ]
    },
    {
        "username": "Big→Bin<br/>计科1604 杨小宾",
        "solved": 5,
        "ispro": true,
        "time": 37569,
        "nickname": "Big→Bin<br/>计科1604 杨小宾",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 533
            },
            {
                "attempted": 10,
                "result": "AC",
                "time": 8446
            },
            {
                "attempted": 7,
                "result": "AC",
                "time": 2738
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3506
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3146
            }
        ]
    },
    {
        "username": "素宇<br/>计科1601 赵祥宇",
        "solved": 5,
        "ispro": true,
        "time": 38034,
        "nickname": "素宇<br/>计科1601 赵祥宇",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 317
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6185
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 7826
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4253
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 5053
            }
        ]
    },
    {
        "username": "坑王填坑坑坑有坑<br/>软件1603 赵德锋",
        "solved": 5,
        "ispro": true,
        "time": 41931,
        "nickname": "坑王填坑坑坑有坑<br/>软件1603 赵德锋",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 515
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 2100
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 12138
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5297
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 7481
            }
        ]
    },
    {
        "username": "古若易清<br/>软件1602 武志祥",
        "solved": 5,
        "ispro": true,
        "time": 44279,
        "nickname": "古若易清<br/>软件1602 武志祥",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 369
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 10308
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 7262
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2399
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 8341
            }
        ]
    },
    {
        "username": "Kenan_07<br/>软件1602 綦宗昊",
        "solved": 5,
        "ispro": true,
        "time": 44646,
        "nickname": "Kenan_07<br/>软件1602 綦宗昊",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 459
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 8349
            },
            {
                "attempted": 11,
                "result": "AC",
                "time": 11379
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3947
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4912
            }
        ]
    },
    {
        "username": "_龘_<br/>软件1505 时云龙",
        "solved": 5,
        "ispro": true,
        "time": 46118,
        "nickname": "_龘_<br/>软件1505 时云龙",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 1273
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 10219
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 7467
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 5973
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6786
            }
        ]
    },
    {
        "username": "lyf<br/>计科1605 李赫",
        "solved": 5,
        "ispro": true,
        "time": 46174,
        "nickname": "lyf<br/>计科1605 李赫",
        "statuses": [
            {
                "attempted": 7,
                "result": "AC",
                "time": 816
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7679
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4947
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3710
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 14,
                "result": "AC",
                "time": 6222
            }
        ]
    },
    {
        "username": "我的床需要我<br/>计科1608 时昉晖",
        "solved": 5,
        "ispro": true,
        "time": 48307,
        "nickname": "我的床需要我<br/>计科1608 时昉晖",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 2942
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 12746
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5468
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6344
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 11207
            }
        ]
    },
    {
        "username": "山有木兮木有枝<br/>计科1602 王佳庆",
        "solved": 5,
        "ispro": true,
        "time": 75698,
        "nickname": "山有木兮木有枝<br/>计科1602 王佳庆",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 684
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 9284
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 3723
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 18,
                "result": "AC",
                "time": 10686
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 14121
            }
        ]
    },
    {
        "username": "小渣渣<br/>计科1606 刘星海",
        "solved": 5,
        "ispro": true,
        "time": 80373,
        "nickname": "小渣渣<br/>计科1606 刘星海",
        "statuses": [
            {
                "attempted": 5,
                "result": "AC",
                "time": 884
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 7550
            },
            {
                "attempted": 33,
                "result": "AC",
                "time": 14235
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4405
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 4099
            }
        ]
    },
    {
        "username": "江可泽民亦可赛艇<br/>计科1604 赵井峰",
        "solved": 5,
        "ispro": true,
        "time": 124103,
        "nickname": "江可泽民亦可赛艇<br/>计科1604 赵井峰",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 672
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 11698
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3443
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4009
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 71,
                "result": "AC",
                "time": 14281
            }
        ]
    },
    {
        "username": "不作死的Jason<br/>计科1603 张振勇",
        "solved": 4,
        "ispro": true,
        "time": 12827,
        "nickname": "不作死的Jason<br/>计科1603 张振勇",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 630
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 1592
            },
            {
                "attempted": 18,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3765
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 3240
            }
        ]
    },
    {
        "username": "怀中自有萌萝莉<br/>计科1608 王禄祥",
        "solved": 4,
        "ispro": true,
        "time": 16034,
        "nickname": "怀中自有萌萝莉<br/>计科1608 王禄祥",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 372
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 3875
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3201
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4986
            }
        ]
    },
    {
        "username": "弗洛伊德的殇<br/>计科1602 崔辉",
        "solved": 4,
        "ispro": true,
        "time": 16343,
        "nickname": "弗洛伊德的殇<br/>计科1602 崔辉",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 778
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5170
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4107
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2688
            }
        ]
    },
    {
        "username": "yssa<br/>通信1603 史丰源",
        "solved": 4,
        "ispro": false,
        "time": 20225,
        "nickname": "yssa<br/>通信1603 史丰源",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 494
            },
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 2896
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4176
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 7859
            }
        ]
    },
    {
        "username": "呵<br/>通信1602 张正威",
        "solved": 4,
        "ispro": false,
        "time": 25445,
        "nickname": "呵<br/>通信1602 张正威",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 550
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 10133
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 3287
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7875
            }
        ]
    },
    {
        "username": "高傲的燕子<br/>软件1606 徐海音",
        "solved": 4,
        "ispro": true,
        "time": 26725,
        "nickname": "高傲的燕子<br/>软件1606 徐海音",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 243
            },
            {
                "attempted": 12,
                "result": "AC",
                "time": 7904
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 897
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4481
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 25,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "0<br/>软件1601 姜渭良",
        "solved": 4,
        "ispro": true,
        "time": 27233,
        "nickname": "0<br/>软件1601 姜渭良",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1124
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 12791
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5672
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4046
            }
        ]
    },
    {
        "username": "全程划水的清寒<br/>计科1603 庄郑涵",
        "solved": 4,
        "ispro": true,
        "time": 28436,
        "nickname": "全程划水的清寒<br/>计科1603 庄郑涵",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1457
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7146
            },
            {
                "attempted": 44,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4389
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 5844
            }
        ]
    },
    {
        "username": "山理谢耳朵<br/>通信1604 丁家伟",
        "solved": 4,
        "ispro": false,
        "time": 28660,
        "nickname": "山理谢耳朵<br/>通信1604 丁家伟",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 652
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 10263
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5403
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2742
            }
        ]
    },
    {
        "username": "14111202055<br/>信科1402 李厚峰",
        "solved": 4,
        "ispro": false,
        "time": 29937,
        "nickname": "14111202055<br/>信科1402 李厚峰",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 486
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 9009
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 4568
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1474
            }
        ]
    },
    {
        "username": "既来之，则安之<br/>计科1602 孙佳丽",
        "solved": 4,
        "ispro": true,
        "time": 32667,
        "nickname": "既来之，则安之<br/>计科1602 孙佳丽",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 3090
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 10095
            },
            {
                "attempted": 14,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 3990
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 2292
            }
        ]
    },
    {
        "username": "xyx<br/>软件1601 肖云翔",
        "solved": 4,
        "ispro": true,
        "time": 33619,
        "nickname": "xyx<br/>软件1601 肖云翔",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 1021
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 10463
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 7506
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5029
            }
        ]
    },
    {
        "username": "ALLAC<br/>计科1607 李晨阳",
        "solved": 4,
        "ispro": true,
        "time": 33772,
        "nickname": "ALLAC<br/>计科1607 李晨阳",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 644
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 11045
            },
            {
                "attempted": 23,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3953
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 8530
            }
        ]
    },
    {
        "username": "Loading<br/>计科1604 姜新宇",
        "solved": 4,
        "ispro": true,
        "time": 34336,
        "nickname": "Loading<br/>计科1604 姜新宇",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 389
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 8898
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3144
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 12305
            }
        ]
    },
    {
        "username": "虎牙TV成成<br/>通信1603 周新成",
        "solved": 4,
        "ispro": false,
        "time": 34758,
        "nickname": "虎牙TV成成<br/>通信1603 周新成",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 1963
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 9413
            },
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4027
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "AC",
                "time": 4955
            }
        ]
    },
    {
        "username": "突突突<br/>通信1601 李辉",
        "solved": 4,
        "ispro": false,
        "time": 36539,
        "nickname": "突突突<br/>通信1601 李辉",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 2589
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 10832
            },
            {
                "attempted": 18,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4475
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "AC",
                "time": 6643
            }
        ]
    },
    {
        "username": "小辣鸡与大智障<br/>计科1603 张孝良",
        "solved": 4,
        "ispro": true,
        "time": 36618,
        "nickname": "小辣鸡与大智障<br/>计科1603 张孝良",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 612
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1777
            },
            {
                "attempted": 18,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 7209
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 14,
                "result": "AC",
                "time": 6620
            }
        ]
    },
    {
        "username": "么么<br/>通信1603 刘梦雪",
        "solved": 4,
        "ispro": false,
        "time": 37945,
        "nickname": "么么<br/>通信1603 刘梦雪",
        "statuses": [
            {
                "attempted": 6,
                "result": "AC",
                "time": 4833
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 13276
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5311
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6125
            }
        ]
    },
    {
        "username": "哈喽<br/>软件1601 王大明",
        "solved": 4,
        "ispro": true,
        "time": 38543,
        "nickname": "哈喽<br/>软件1601 王大明",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 773
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 12570
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 6713
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5287
            }
        ]
    },
    {
        "username": "IceCream<br/>软件1603 高元凯",
        "solved": 4,
        "ispro": true,
        "time": 39628,
        "nickname": "IceCream<br/>软件1603 高元凯",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 635
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6207
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 12939
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 12647
            }
        ]
    },
    {
        "username": "敲代码的二哈<br/>计科1601 王庆亮",
        "solved": 4,
        "ispro": true,
        "time": 40874,
        "nickname": "敲代码的二哈<br/>计科1601 王庆亮",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 737
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 9094
            },
            {
                "attempted": 24,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 9451
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 8392
            }
        ]
    },
    {
        "username": "最丑不过侯二丑<br/>计科1605 侯文亮",
        "solved": 4,
        "ispro": true,
        "time": 41407,
        "nickname": "最丑不过侯二丑<br/>计科1605 侯文亮",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 663
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 16,
                "result": "AC",
                "time": 8674
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 4269
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5001
            }
        ]
    },
    {
        "username": "娶妻当如风晴雪<br/>计科1608 岳洋",
        "solved": 4,
        "ispro": true,
        "time": 45885,
        "nickname": "娶妻当如风晴雪<br/>计科1608 岳洋",
        "statuses": [
            {
                "attempted": 7,
                "result": "AC",
                "time": 3717
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 11682
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8580
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6306
            }
        ]
    },
    {
        "username": "风继续吹<br/>计科1606 魏泽远",
        "solved": 4,
        "ispro": true,
        "time": 53664,
        "nickname": "风继续吹<br/>计科1606 魏泽远",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 440
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 28,
                "result": "AC",
                "time": 13943
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2751
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 1730
            }
        ]
    },
    {
        "username": "一头小菜鸡<br/>计科1602 付帮康",
        "solved": 4,
        "ispro": true,
        "time": 55830,
        "nickname": "一头小菜鸡<br/>计科1602 付帮康",
        "statuses": [
            {
                "attempted": 12,
                "result": "AC",
                "time": 13855
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 11101
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4611
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 7063
            }
        ]
    },
    {
        "username": "痞子<br/>计科1605 仇公海",
        "solved": 4,
        "ispro": true,
        "time": 62186,
        "nickname": "痞子<br/>计科1605 仇公海",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 732
            },
            {
                "attempted": 12,
                "result": "AC",
                "time": 11739
            },
            {
                "attempted": 26,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 1615
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 18,
                "result": "AC",
                "time": 13300
            }
        ]
    },
    {
        "username": "当然选择原谅他<br/>软件1605 张英明",
        "solved": 4,
        "ispro": true,
        "time": 78436,
        "nickname": "当然选择原谅他<br/>软件1605 张英明",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 7031
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 10206
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 8294
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 30,
                "result": "AC",
                "time": 7305
            }
        ]
    },
    {
        "username": "Shawn<br/>计科1604 姚雪岩",
        "solved": 3,
        "ispro": true,
        "time": 6728,
        "nickname": "Shawn<br/>计科1604 姚雪岩",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 380
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "FB",
                "time": 1168
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2780
            }
        ]
    },
    {
        "username": "炮姐一生推<br/>软件1604 李志昊",
        "solved": 3,
        "ispro": true,
        "time": 8137,
        "nickname": "炮姐一生推<br/>软件1604 李志昊",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 386
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2048
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3303
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "路人乙<br/>计科1602 梁琨",
        "solved": 3,
        "ispro": true,
        "time": 10269,
        "nickname": "路人乙<br/>计科1602 梁琨",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 474
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3807
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3588
            }
        ]
    },
    {
        "username": "旋转的小陀螺<br/>计科1601 孙威",
        "solved": 3,
        "ispro": true,
        "time": 10859,
        "nickname": "旋转的小陀螺<br/>计科1601 孙威",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 906
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3638
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2715
            }
        ]
    },
    {
        "username": "阿莱克斯塔萨<br/>统计1602 林林帆",
        "solved": 3,
        "ispro": false,
        "time": 11531,
        "nickname": "阿莱克斯塔萨<br/>统计1602 林林帆",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 665
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3245
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5221
            }
        ]
    },
    {
        "username": "蓝鲸<br/>软件1603 冯帅",
        "solved": 3,
        "ispro": true,
        "time": 14602,
        "nickname": "蓝鲸<br/>软件1603 冯帅",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 800
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4922
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7680
            }
        ]
    },
    {
        "username": "careful<br/>通信1603 周新鹏",
        "solved": 3,
        "ispro": false,
        "time": 14952,
        "nickname": "careful<br/>通信1603 周新鹏",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1025
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 19,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4132
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7395
            }
        ]
    },
    {
        "username": "楼上都用挂<br/>计科1606 匡金",
        "solved": 3,
        "ispro": true,
        "time": 14988,
        "nickname": "楼上都用挂<br/>计科1606 匡金",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 757
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 4574
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6057
            }
        ]
    },
    {
        "username": "大国崛起<br/>通信1604 杨晋",
        "solved": 3,
        "ispro": false,
        "time": 14999,
        "nickname": "大国崛起<br/>通信1604 杨晋",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 1577
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3782
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6040
            }
        ]
    },
    {
        "username": "单硫酸卡那霉素<br/>软件1605 王振",
        "solved": 3,
        "ispro": true,
        "time": 16766,
        "nickname": "单硫酸卡那霉素<br/>软件1605 王振",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1156
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 22,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4099
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 6711
            }
        ]
    },
    {
        "username": "连续三年村草<br/>计科1608 郭涵霖",
        "solved": 3,
        "ispro": true,
        "time": 16943,
        "nickname": "连续三年村草<br/>计科1608 郭涵霖",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 818
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 46,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4547
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6778
            }
        ]
    },
    {
        "username": "何静<br/>通信1602 何静静",
        "solved": 3,
        "ispro": false,
        "time": 17131,
        "nickname": "何静<br/>通信1602 何静静",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1019
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4053
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 6059
            }
        ]
    },
    {
        "username": "Another<br/>软件1606 邢鹏飞",
        "solved": 3,
        "ispro": true,
        "time": 17323,
        "nickname": "Another<br/>软件1606 邢鹏飞",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 3174
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7799
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6350
            }
        ]
    },
    {
        "username": "Azure<br/>软件1605 高琳",
        "solved": 3,
        "ispro": true,
        "time": 17584,
        "nickname": "Azure<br/>软件1605 高琳",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 627
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3227
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8930
            }
        ]
    },
    {
        "username": "土木1503陈翔宇<br/>土木1503 陈翔宇",
        "solved": 3,
        "ispro": false,
        "time": 18272,
        "nickname": "土木1503陈翔宇<br/>土木1503 陈翔宇",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1351
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 12,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 4923
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 9598
            }
        ]
    },
    {
        "username": "孙小东<br/>软件1604 孙国栋",
        "solved": 3,
        "ispro": true,
        "time": 18399,
        "nickname": "孙小东<br/>软件1604 孙国栋",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 3387
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 18,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5413
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8399
            }
        ]
    },
    {
        "username": "繁多多<br/>计科1601 许必树",
        "solved": 3,
        "ispro": true,
        "time": 19573,
        "nickname": "繁多多<br/>计科1601 许必树",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1587
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 9520
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3666
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 20,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "rainy<br/>软件1605 方蕊",
        "solved": 3,
        "ispro": true,
        "time": 19983,
        "nickname": "rainy<br/>软件1605 方蕊",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 426
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8884
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 9473
            }
        ]
    },
    {
        "username": "饭饭<br/>通信1604 范存辉",
        "solved": 3,
        "ispro": false,
        "time": 20265,
        "nickname": "饭饭<br/>通信1604 范存辉",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 2274
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4467
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 9924
            }
        ]
    },
    {
        "username": "菜鸟裹裹旗下艺人。<br/>软件1601 石运娴",
        "solved": 3,
        "ispro": true,
        "time": 22141,
        "nickname": "菜鸟裹裹旗下艺人。<br/>软件1601 石运娴",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1123
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 4496
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 8122
            }
        ]
    },
    {
        "username": "ACM1703DX1603刘见宗<br/>电信1603 刘见宗",
        "solved": 3,
        "ispro": false,
        "time": 22253,
        "nickname": "ACM1703DX1603刘见宗<br/>电信1603 刘见宗",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 6817
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5400
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8836
            }
        ]
    },
    {
        "username": "大大怪<br/>软件1603 程康",
        "solved": 3,
        "ispro": true,
        "time": 23174,
        "nickname": "大大怪<br/>软件1603 程康",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 924
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 16,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4768
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "AC",
                "time": 9082
            }
        ]
    },
    {
        "username": "Utopia<br/>计科1601 王荔",
        "solved": 3,
        "ispro": true,
        "time": 23630,
        "nickname": "Utopia<br/>计科1601 王荔",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1848
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 10478
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 10104
            }
        ]
    },
    {
        "username": "风仍在刮<br/>软件1605 马洋",
        "solved": 3,
        "ispro": true,
        "time": 23754,
        "nickname": "风仍在刮<br/>软件1605 马洋",
        "statuses": [
            {
                "attempted": 5,
                "result": "AC",
                "time": 2527
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5973
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 9254
            }
        ]
    },
    {
        "username": "Just_YD<br/>计科1603 郭鹏野",
        "solved": 3,
        "ispro": true,
        "time": 24347,
        "nickname": "Just_YD<br/>计科1603 郭鹏野",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 734
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5298
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 11115
            }
        ]
    },
    {
        "username": "馒头馅的包子<br/>通信1602 孙宇",
        "solved": 3,
        "ispro": false,
        "time": 25722,
        "nickname": "馒头馅的包子<br/>通信1602 孙宇",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 639
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 14,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4151
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "AC",
                "time": 12532
            }
        ]
    },
    {
        "username": "神一样的男人<br/>软件1601 刘天霄",
        "solved": 3,
        "ispro": true,
        "time": 25964,
        "nickname": "神一样的男人<br/>软件1601 刘天霄",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 718
            },
            {
                "attempted": 24,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6570
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 7876
            }
        ]
    },
    {
        "username": "狗蛋<br/>计科1606 张庆鑫",
        "solved": 3,
        "ispro": true,
        "time": 26562,
        "nickname": "狗蛋<br/>计科1606 张庆鑫",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 468
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4729
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "AC",
                "time": 8165
            }
        ]
    },
    {
        "username": "52赫兹的鲸<br/>计科1602 陈自伟",
        "solved": 3,
        "ispro": true,
        "time": 27109,
        "nickname": "52赫兹的鲸<br/>计科1602 陈自伟",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 737
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 27,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4663
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 12109
            }
        ]
    },
    {
        "username": "诩<br/>计科1602 赵忠斌",
        "solved": 3,
        "ispro": true,
        "time": 27248,
        "nickname": "诩<br/>计科1602 赵忠斌",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 314
            },
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 4380
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 8154
            }
        ]
    },
    {
        "username": "Unspoken<br/>软件1604 于文菁",
        "solved": 3,
        "ispro": true,
        "time": 27438,
        "nickname": "Unspoken<br/>软件1604 于文菁",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 812
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7768
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 11658
            }
        ]
    },
    {
        "username": "路过的小学生<br/>车辆1402 杨伟波",
        "solved": 3,
        "ispro": false,
        "time": 27841,
        "nickname": "路过的小学生<br/>车辆1402 杨伟波",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1463
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4035
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "AC",
                "time": 11543
            }
        ]
    },
    {
        "username": "大教官举高高<br/>计科1605 陈海星",
        "solved": 3,
        "ispro": true,
        "time": 29345,
        "nickname": "大教官举高高<br/>计科1605 陈海星",
        "statuses": [
            {
                "attempted": 8,
                "result": "AC",
                "time": 1023
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 5663
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 7059
            }
        ]
    },
    {
        "username": "FXW<br/>测控1601 付幸文",
        "solved": 3,
        "ispro": false,
        "time": 29405,
        "nickname": "FXW<br/>测控1601 付幸文",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 2061
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 7605
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 13739
            }
        ]
    },
    {
        "username": "蒂洛雾都<br/>软件1604 魏晓甜",
        "solved": 3,
        "ispro": true,
        "time": 29846,
        "nickname": "蒂洛雾都<br/>软件1604 魏晓甜",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 747
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 6989
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "AC",
                "time": 10110
            }
        ]
    },
    {
        "username": "12345678名字只能这么长<br/>通信1602 王敬茹",
        "solved": 3,
        "ispro": false,
        "time": 31808,
        "nickname": "12345678名字只能这么长<br/>通信1602 王敬茹",
        "statuses": [
            {
                "attempted": 7,
                "result": "AC",
                "time": 9867
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4581
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 8960
            }
        ]
    },
    {
        "username": "ottffssent<br/>通信1602 徐秋月",
        "solved": 3,
        "ispro": false,
        "time": 33981,
        "nickname": "ottffssent<br/>通信1602 徐秋月",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 521
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5933
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 12,
                "result": "AC",
                "time": 14327
            }
        ]
    },
    {
        "username": "我就是来打酱油的<br/>化学1503 朱佰尧",
        "solved": 3,
        "ispro": false,
        "time": 34274,
        "nickname": "我就是来打酱油的<br/>化学1503 朱佰尧",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 5014
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 11614
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 12846
            }
        ]
    },
    {
        "username": "you<br/>通信1603 高传友",
        "solved": 3,
        "ispro": false,
        "time": 34520,
        "nickname": "you<br/>通信1603 高传友",
        "statuses": [
            {
                "attempted": 6,
                "result": "AC",
                "time": 2089
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4354
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 12477
            }
        ]
    },
    {
        "username": "xiaofan<br/>信科1502 孙玮璠",
        "solved": 3,
        "ispro": false,
        "time": 34726,
        "nickname": "xiaofan<br/>信科1502 孙玮璠",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 8375
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 9898
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 10453
            }
        ]
    },
    {
        "username": "胜天半子在WA<br/>计科1605 李伟航",
        "solved": 3,
        "ispro": true,
        "time": 35485,
        "nickname": "胜天半子在WA<br/>计科1605 李伟航",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 6442
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5440
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 11603
            }
        ]
    },
    {
        "username": "tx1604<br/>通信1604 徐宗新",
        "solved": 3,
        "ispro": false,
        "time": 36992,
        "nickname": "tx1604<br/>通信1604 徐宗新",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 2186
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5928
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 12,
                "result": "AC",
                "time": 13278
            }
        ]
    },
    {
        "username": "嘿嘿嘿<br/>计科1603 简旭峰",
        "solved": 3,
        "ispro": true,
        "time": 38025,
        "nickname": "嘿嘿嘿<br/>计科1603 简旭峰",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 2413
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 15,
                "result": "AC",
                "time": 11160
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 6452
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "LENGX<br/>软件1601 陈硕",
        "solved": 3,
        "ispro": true,
        "time": 38312,
        "nickname": "LENGX<br/>软件1601 陈硕",
        "statuses": [
            {
                "attempted": 9,
                "result": "AC",
                "time": 6190
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5545
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "AC",
                "time": 10977
            }
        ]
    },
    {
        "username": "陈晓雪<br/>通信1604 陈晓雪",
        "solved": 3,
        "ispro": false,
        "time": 38885,
        "nickname": "陈晓雪<br/>通信1604 陈晓雪",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 2067
            },
            {
                "attempted": 18,
                "result": "AC",
                "time": 11008
            },
            {
                "attempted": 16,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5410
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "划水的火舞<br/>计科1603 张海鹏",
        "solved": 3,
        "ispro": true,
        "time": 39950,
        "nickname": "划水的火舞<br/>计科1603 张海鹏",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1396
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3325
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 23,
                "result": "AC",
                "time": 7629
            }
        ]
    },
    {
        "username": "张大帅35<br/>通信1604 张玉晗",
        "solved": 3,
        "ispro": false,
        "time": 43099,
        "nickname": "张大帅35<br/>通信1604 张玉晗",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 6873
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 7460
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 15,
                "result": "AC",
                "time": 9566
            }
        ]
    },
    {
        "username": "哎呀你是小明啊<br/>软件1604 李新明",
        "solved": 3,
        "ispro": true,
        "time": 46432,
        "nickname": "哎呀你是小明啊<br/>软件1604 李新明",
        "statuses": [
            {
                "attempted": 9,
                "result": "AC",
                "time": 5286
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 10401
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "AC",
                "time": 9145
            }
        ]
    },
    {
        "username": "Fly<br/>计科1606 刘金涛",
        "solved": 3,
        "ispro": true,
        "time": 60419,
        "nickname": "Fly<br/>计科1606 刘金涛",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 607
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "AC",
                "time": 4810
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 35,
                "result": "AC",
                "time": 11802
            }
        ]
    },
    {
        "username": "YES爱西柚的FLORA<br/>通信1604 邓淋彬",
        "solved": 3,
        "ispro": false,
        "time": 61886,
        "nickname": "YES爱西柚的FLORA<br/>通信1604 邓淋彬",
        "statuses": [
            {
                "attempted": 10,
                "result": "AC",
                "time": 13273
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "AC",
                "time": 8570
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "AC",
                "time": 13643
            }
        ]
    },
    {
        "username": "鲁班大叔<br/>计科1604 杨国兴",
        "solved": 3,
        "ispro": true,
        "time": 125410,
        "nickname": "鲁班大叔<br/>计科1604 杨国兴",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1833
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 17,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 2407
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 89,
                "result": "AC",
                "time": 14370
            }
        ]
    },
    {
        "username": "全民Tv丶1008866<br/>软件1604 刘啸",
        "solved": 2,
        "ispro": true,
        "time": 3779,
        "nickname": "全民Tv丶1008866<br/>软件1604 刘啸",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 769
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3010
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "百步飞剑<br/>计科1604 吴桂龙",
        "solved": 2,
        "ispro": true,
        "time": 3997,
        "nickname": "百步飞剑<br/>计科1604 吴桂龙",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 687
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3310
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "爱你一万年<br/>软件1602 张淼",
        "solved": 2,
        "ispro": true,
        "time": 5272,
        "nickname": "爱你一万年<br/>软件1602 张淼",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 799
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 2073
            }
        ]
    },
    {
        "username": "灰色希望123<br/>通信1604 于兆涛",
        "solved": 2,
        "ispro": false,
        "time": 5713,
        "nickname": "灰色希望123<br/>通信1604 于兆涛",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1266
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3247
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "临行喝妈一碗酒<br/>计科1601 刘耀宗",
        "solved": 2,
        "ispro": true,
        "time": 5874,
        "nickname": "临行喝妈一碗酒<br/>计科1601 刘耀宗",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 513
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5361
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "大智障与小辣鸡<br/>计科1603 魏聪聪",
        "solved": 2,
        "ispro": true,
        "time": 6107,
        "nickname": "大智障与小辣鸡<br/>计科1603 魏聪聪",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 763
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5344
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "zzzz<br/>通信1604 赵金铭",
        "solved": 2,
        "ispro": false,
        "time": 6306,
        "nickname": "zzzz<br/>通信1604 赵金铭",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1279
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5027
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "菜狗子<br/>软件1504 王德强",
        "solved": 2,
        "ispro": true,
        "time": 6343,
        "nickname": "菜狗子<br/>软件1504 王德强",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 833
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5510
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "杨洋女票<br/>软件1604 王舒晴",
        "solved": 2,
        "ispro": true,
        "time": 6361,
        "nickname": "杨洋女票<br/>软件1604 王舒晴",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 844
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4317
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "小浩浩小小浩<br/>信科1601 黄浩",
        "solved": 2,
        "ispro": false,
        "time": 6839,
        "nickname": "小浩浩小小浩<br/>信科1601 黄浩",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 875
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4764
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "yxzqf<br/>软件1601 耿明帅",
        "solved": 2,
        "ispro": true,
        "time": 6976,
        "nickname": "yxzqf<br/>软件1601 耿明帅",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 633
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3943
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 19,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "boooo<br/>软件1602 王艺博",
        "solved": 2,
        "ispro": true,
        "time": 7354,
        "nickname": "boooo<br/>软件1602 王艺博",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 775
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4179
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "王老菊<br/>软件1606 于飞龙",
        "solved": 2,
        "ispro": true,
        "time": 7367,
        "nickname": "王老菊<br/>软件1606 于飞龙",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 2332
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 3835
            }
        ]
    },
    {
        "username": "我鲁班贼溜<br/>通信1604 董勇",
        "solved": 2,
        "ispro": false,
        "time": 7529,
        "nickname": "我鲁班贼溜<br/>通信1604 董勇",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 2030
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4299
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "我能AC<br/>通信1603 王世正",
        "solved": 2,
        "ispro": false,
        "time": 7603,
        "nickname": "我能AC<br/>通信1603 王世正",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 2602
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 3801
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 14,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "索菲亚与斐迪南<br/>计科1602 赵汉卿",
        "solved": 2,
        "ispro": true,
        "time": 8539,
        "nickname": "索菲亚与斐迪南<br/>计科1602 赵汉卿",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1886
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5453
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "代码，我选你！<br/>通信1603 温才源",
        "solved": 2,
        "ispro": false,
        "time": 8963,
        "nickname": "代码，我选你！<br/>通信1603 温才源",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 1373
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5190
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "沐沐<br/>计科1603 王姗姗",
        "solved": 2,
        "ispro": true,
        "time": 9044,
        "nickname": "沐沐<br/>计科1603 王姗姗",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 673
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7171
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "Fallen_Heaven<br/>计科1606 李荣祥",
        "solved": 2,
        "ispro": true,
        "time": 9455,
        "nickname": "Fallen_Heaven<br/>计科1606 李荣祥",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1708
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 5347
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "一条为衣服而来的咸鱼<br/>软件1605 元增宇",
        "solved": 2,
        "ispro": true,
        "time": 11611,
        "nickname": "一条为衣服而来的咸鱼<br/>软件1605 元增宇",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 2079
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8332
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "圣婷<br/>计科1604 周旋",
        "solved": 2,
        "ispro": true,
        "time": 11662,
        "nickname": "圣婷<br/>计科1604 周旋",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1577
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 10085
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "songye_ycs<br/>通信1601 易朝松",
        "solved": 2,
        "ispro": false,
        "time": 11714,
        "nickname": "songye_ycs<br/>通信1601 易朝松",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 5433
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6281
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 12,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "Forever<br/>计科1601 尹永恒",
        "solved": 2,
        "ispro": true,
        "time": 12116,
        "nickname": "Forever<br/>计科1601 尹永恒",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 2146
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8770
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "不会做123<br/>通信1603 王树强",
        "solved": 2,
        "ispro": false,
        "time": 12664,
        "nickname": "不会做123<br/>通信1603 王树强",
        "statuses": [
            {
                "attempted": 5,
                "result": "AC",
                "time": 2065
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5799
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "习惯了、最初<br/>通信1601 孙茂宝",
        "solved": 2,
        "ispro": false,
        "time": 12972,
        "nickname": "习惯了、最初<br/>通信1601 孙茂宝",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 1243
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 4529
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "酷到没朋友帅到被人砍<br/>软件1602 李同明",
        "solved": 2,
        "ispro": true,
        "time": 13510,
        "nickname": "酷到没朋友帅到被人砍<br/>软件1602 李同明",
        "statuses": [
            {
                "attempted": 6,
                "result": "AC",
                "time": 1669
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5841
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "kiven<br/>通信1601 杜炳辰",
        "solved": 2,
        "ispro": false,
        "time": 13965,
        "nickname": "kiven<br/>通信1601 杜炳辰",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 3074
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 7291
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "丁搞笑<br/>通信1603 丁瑶瑶",
        "solved": 2,
        "ispro": false,
        "time": 14271,
        "nickname": "丁搞笑<br/>通信1603 丁瑶瑶",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 1879
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 8792
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "sys<br/>信科1601 赵阳",
        "solved": 2,
        "ispro": false,
        "time": 15530,
        "nickname": "sys<br/>信科1601 赵阳",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 2247
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 12083
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "Ac666<br/>软件1601 李茂玮",
        "solved": 2,
        "ispro": true,
        "time": 16340,
        "nickname": "Ac666<br/>软件1601 李茂玮",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 7878
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 5,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6062
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "Xperia<br/>智应1602 冯志坚",
        "solved": 2,
        "ispro": false,
        "time": 16831,
        "nickname": "Xperia<br/>智应1602 冯志坚",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 7526
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6905
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "看，朕给你的天下<br/>计科1603 刘春童",
        "solved": 2,
        "ispro": true,
        "time": 17989,
        "nickname": "看，朕给你的天下<br/>计科1603 刘春童",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 687
            },
            {
                "attempted": 10,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "AC",
                "time": 6502
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "123qwe<br/>软件1605 孟庆可",
        "solved": 2,
        "ispro": true,
        "time": 18696,
        "nickname": "123qwe<br/>软件1605 孟庆可",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 8953
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 6143
            }
        ]
    },
    {
        "username": "心比长相好<br/>通信1603 鄢榕漫",
        "solved": 2,
        "ispro": false,
        "time": 18741,
        "nickname": "心比长相好<br/>通信1603 鄢榕漫",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 12655
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6086
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "LYAYM<br/>软件1606 吕岩",
        "solved": 2,
        "ispro": true,
        "time": 21562,
        "nickname": "LYAYM<br/>软件1606 吕岩",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 5865
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 10897
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "池鱼<br/>生技1602 刘英铭",
        "solved": 2,
        "ispro": false,
        "time": 21998,
        "nickname": "池鱼<br/>生技1602 刘英铭",
        "statuses": [
            {
                "attempted": 5,
                "result": "AC",
                "time": 7105
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 10093
            }
        ]
    },
    {
        "username": "胖迪<br/>通信1603 施晓迪",
        "solved": 2,
        "ispro": false,
        "time": 31752,
        "nickname": "胖迪<br/>通信1603 施晓迪",
        "statuses": [
            {
                "attempted": 11,
                "result": "AC",
                "time": 12745
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7007
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "茜茜<br/>通信1603 鹿珍珍",
        "solved": 1,
        "ispro": false,
        "time": 715,
        "nickname": "茜茜<br/>通信1603 鹿珍珍",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 715
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "wohao<br/>软件1601 田钰倩",
        "solved": 1,
        "ispro": true,
        "time": 1748,
        "nickname": "wohao<br/>软件1601 田钰倩",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 548
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "我于AC中绽放<br/>计科1602 孔令辉",
        "solved": 1,
        "ispro": true,
        "time": 1844,
        "nickname": "我于AC中绽放<br/>计科1602 孔令辉",
        "statuses": [
            {
                "attempted": 1,
                "result": "AC",
                "time": 1844
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 12,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "xiaoyan<br/>软件1602 肖燕",
        "solved": 1,
        "ispro": true,
        "time": 1859,
        "nickname": "xiaoyan<br/>软件1602 肖燕",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 659
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "琳小公举<br/>通信1604 刘晓琳",
        "solved": 1,
        "ispro": false,
        "time": 2314,
        "nickname": "琳小公举<br/>通信1604 刘晓琳",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 1114
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "Malic<br/>化学1402 刘亚文",
        "solved": 1,
        "ispro": false,
        "time": 3046,
        "nickname": "Malic<br/>化学1402 刘亚文",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 646
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 8,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "我是一个小太阳<br/>通信1604 卓越",
        "solved": 1,
        "ispro": false,
        "time": 3459,
        "nickname": "我是一个小太阳<br/>通信1604 卓越",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 1059
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 18,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "跟屁虫<br/>通信1604 杨泽坤",
        "solved": 1,
        "ispro": false,
        "time": 4308,
        "nickname": "跟屁虫<br/>通信1604 杨泽坤",
        "statuses": [
            {
                "attempted": 3,
                "result": "AC",
                "time": 1908
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "凡凡<br/>计科1603 刘文正",
        "solved": 1,
        "ispro": true,
        "time": 4313,
        "nickname": "凡凡<br/>计科1603 刘文正",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 713
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "TK東東<br/>通信1601 汤康",
        "solved": 1,
        "ispro": false,
        "time": 4585,
        "nickname": "TK東東<br/>通信1601 汤康",
        "statuses": [
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 4585
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "冬日<br/>软件1604 王通辉",
        "solved": 1,
        "ispro": true,
        "time": 5105,
        "nickname": "冬日<br/>软件1604 王通辉",
        "statuses": [
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 5105
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "zxgoon<br/>软件1605 张鑫",
        "solved": 1,
        "ispro": true,
        "time": 5347,
        "nickname": "zxgoon<br/>软件1605 张鑫",
        "statuses": [
            {
                "attempted": 2,
                "result": "AC",
                "time": 4147
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "Littlemonk<br/>信科1601 李瑞峰",
        "solved": 1,
        "ispro": false,
        "time": 6774,
        "nickname": "Littlemonk<br/>信科1601 李瑞峰",
        "statuses": [
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 6774
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "空灵<br/>信科1601 钮来乐",
        "solved": 1,
        "ispro": false,
        "time": 7879,
        "nickname": "空灵<br/>信科1601 钮来乐",
        "statuses": [
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 7879
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "easy<br/>通信1601 邵瑞",
        "solved": 1,
        "ispro": false,
        "time": 8648,
        "nickname": "easy<br/>通信1601 邵瑞",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 5048
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 11,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "一抹新绿<br/>计科1603 母浩田",
        "solved": 1,
        "ispro": true,
        "time": 9054,
        "nickname": "一抹新绿<br/>计科1603 母浩田",
        "statuses": [
            {
                "attempted": 7,
                "result": "AC",
                "time": 1854
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "Elaine<br/>地信1401 卢晶晶",
        "solved": 1,
        "ispro": false,
        "time": 10141,
        "nickname": "Elaine<br/>地信1401 卢晶晶",
        "statuses": [
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "AC",
                "time": 10141
            }
        ]
    },
    {
        "username": "信科1601张腾<br/>信科1601 张腾",
        "solved": 1,
        "ispro": false,
        "time": 10298,
        "nickname": "信科1601张腾<br/>信科1601 张腾",
        "statuses": [
            {
                "attempted": 5,
                "result": "AC",
                "time": 5498
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "ACgoogle<br/>智应1601 颜亚东",
        "solved": 1,
        "ispro": false,
        "time": 10736,
        "nickname": "ACgoogle<br/>智应1601 颜亚东",
        "statuses": [
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "AC",
                "time": 9536
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "菜鸡一日游<br/>计科1604 胡华聘",
        "solved": 1,
        "ispro": true,
        "time": 12718,
        "nickname": "菜鸡一日游<br/>计科1604 胡华聘",
        "statuses": [
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 9118
            }
        ]
    },
    {
        "username": "zy16311243072<br/>智应1603 胡安源",
        "solved": 1,
        "ispro": false,
        "time": 13678,
        "nickname": "zy16311243072<br/>智应1603 胡安源",
        "statuses": [
            {
                "attempted": 4,
                "result": "AC",
                "time": 10078
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "四海八荒最美舒<br/>信科1602 张峰",
        "solved": 1,
        "ispro": false,
        "time": 14673,
        "nickname": "四海八荒最美舒<br/>信科1602 张峰",
        "statuses": [
            {
                "attempted": 20,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 6,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "AC",
                "time": 11073
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "zy160224殷强<br/>智应1602 殷强",
        "solved": 1,
        "ispro": false,
        "time": 14692,
        "nickname": "zy160224殷强<br/>智应1602 殷强",
        "statuses": [
            {
                "attempted": 7,
                "result": "AC",
                "time": 7492
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 4,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 9,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "小羊毛<br/>智应1603 李德花",
        "solved": 0,
        "ispro": false,
        "time": 0,
        "nickname": "小羊毛<br/>智应1603 李德花",
        "statuses": [
            {
                "attempted": 17,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "我的地啊<br/>通信1604 滕凯",
        "solved": 0,
        "ispro": false,
        "time": 0,
        "nickname": "我的地啊<br/>通信1604 滕凯",
        "statuses": [
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "给了也送<br/>通信1604 田坤冬",
        "solved": 0,
        "ispro": false,
        "time": 0,
        "nickname": "给了也送<br/>通信1604 田坤冬",
        "statuses": [
            {
                "attempted": 3,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "YueZongqian<br/>信科1502 岳宗乾",
        "solved": 0,
        "ispro": false,
        "time": 0,
        "nickname": "YueZongqian<br/>信科1502 岳宗乾",
        "statuses": [
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "晨风舞影<br/>计科1608 王文豪",
        "solved": 0,
        "ispro": true,
        "time": 0,
        "nickname": "晨风舞影<br/>计科1608 王文豪",
        "statuses": [
            {
                "attempted": 13,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 70,
                "result": "F",
                "time": 0
            }
        ]
    },
    {
        "username": "宇宙无敌帅峰<br/>信科1602 徐舒",
        "solved": 0,
        "ispro": false,
        "time": 0,
        "nickname": "宇宙无敌帅峰<br/>信科1602 徐舒",
        "statuses": [
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 1,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "fengshao<br/>软件1603 冯创",
        "solved": 0,
        "ispro": true,
        "time": 0,
        "nickname": "fengshao<br/>软件1603 冯创",
        "statuses": [
            {
                "attempted": 2,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            }
        ]
    },
    {
        "username": "莹巴蛋<br/>计科1604 白涛",
        "solved": 0,
        "ispro": true,
        "time": 0,
        "nickname": "莹巴蛋<br/>计科1604 白涛",
        "statuses": [
            {
                "attempted": 12,
                "result": "F",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 0,
                "result": "-",
                "time": 0
            },
            {
                "attempted": 7,
                "result": "F",
                "time": 0
            }
        ]
    }
];
	init(res);
	$("#group a").click(function() {
		window.location.href = '?' + $(this).attr("data-url") + '&' + $("#name .active").attr("data-url");
	});
	$("#name a").click(function() {
		window.location.href = '?' + $("#group .active").attr("data-url") + '&' + $(this).attr("data-url");
	});

});

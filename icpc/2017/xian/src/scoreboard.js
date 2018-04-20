
// Scoreboard
// By: Hamid Zarrabi-Zadeh, Hamed Moghimi
// December 2014

// Edited by: Liu233w


// initialize scoreboard
function init_scoreboard() {
	var tbody = document.getElementsByTagName('tbody')[0];
	var str = '';
	
	// create rows 
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var team = row[1];
		var name = team[1];
		if(team.length >= 3){
			name = team[2] + ' ( ' + name + ' )';
		}
		str += '<tr><td>' + row[0] + '</td>' +
      '<td class="team" data="' + row[4] + '">' +
      generateSchoolLogo(team[3]) +
      '<div class="team-name-school">' + name +
      generateRemark(team[4]) +
      '<span class="muted">' + team[0] + '</span></div></td>' +
      '<td>' + row[2] + '</td><td>' + row[3] + '</td>';
	  // problems cols
		for (var j = 5; j < row.length - 1; j++){
			var prob = row[j];
			if (prob != 0) {
				var score = prob[0].split('/');
				var cls = prob[1] ? ' class="' + prob[1] + '"' : '';
				var dat = score[2] ? ' data="' + score[2] + '"' : '';
				str += '<td' + cls + dat + '>' + 
					score[0] + '<span class="muted"> ' + score[1] + '</span></td>';
			}
			else
				// space before -- is necessary
				str += '<td>0<span class="muted"> --</span></td>'; 
		}

		// att/solv col
		var att = row[j][0].split('/');
		str += '<td>' + att[0] + '<br>' + att[1] + '</td>';
	}
	tbody.innerHTML = str + tbody.innerHTML;
}

// safe encode str 
function html_entities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
		              .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateSchoolLogo(logoName){
  return '<img class="school-logo" src="' + 'src/' + logoName + '">'
}

function generateRemark(remark){
  if(remark == 'girl') {
    return '<img src="src/girl.png?" />';
  } else if(remark == 'star') {
    return '<img src="src/star.png" />';
  } else {
    return '';
  }
}

init_scoreboard();

var access_token = "267901082.29ffea3.4f4b7e2f1a6e4c25aca9017104bdd7ea";


groups = {};
default_group = "group";
group_no = 0;
var i, j, k, l;
var userids = [];

function initMap() {
	//empty function
}

function startingFunc()
{
//    console.log("startingFunc called");
	refreshGroups();
}

function clearinputsold(j, media, managed_group) {
	var radiouserid;
	if(managed_group) {
		radiouserid = "radiousermg";
	} else if(media) {
		radiouserid = "radiousermedia";
	} else {
		radiouserid = "radiouser";
	}
	var num = j;
	for(l=1;l<num;l++)
	{
	if(document.getElementById(radiouserid + l).checked==true)
		document.getElementById(radiouserid + l).checked=false;	
	}
}

function clearinput() {
document.getElementById("newgroupname").value = "";
}

function clearinput2() {
document.getElementById("newgroupnameM").value = "";

}

function clearfields() {

if(document.getElementById("radiouser").checked==true)
	document.getElementById("radiouser").checked=false;
if(document.getElementById("radiotag").checked==true)
	document.getElementById("radiotag").checked=false;
if(document.getElementById("radiolocation").checked==true)
	document.getElementById("radiolocation").checked=false;
document.getElementById("userinput").value = "";
document.getElementById("taginput").value = "";
document.getElementById("locationinput").value = "";

//clearing checkboxes on embed divs
for(l=1;l<=6;l++)
{
	if(document.getElementById("mediacheck" + l).checked==true)
		document.getElementById("mediacheck" + l).checked=false;
	if(document.getElementById("usercheck" + l).checked==true)
		document.getElementById("usercheck" + l).checked=false;
}

}

function unhideme (divid) {
	var item = document.getElementById(divid);
	if (item) {
		// console.log("unhideme: " + divid);
		item.style.display='block';
	}
}

function unhideAlerts (divclass) {
	console.log(divclass);
	$('.' + divclass).show();
}

function hideme (divid) {
	var item = document.getElementById(divid);
	if (item) {
		// console.log("hideme: " + divid);
		item.style.display='none';
	}
}

function hideAlerts (divclass) {
	// console.log(divclass);
	$('.' + divclass).hide();
}

function refreshGroups() {
//    console.log("called refreshGroups");

    // code from startingFunc()
	var groupsize = Object.keys(groups).length;
	if(groupsize == 0) {
		unhideme("GroupsWelcomeText");
		hideme("GroupResults");
	}
	else
	{
		unhideme("GroupResults");
		hideme("GroupsWelcomeText");
	}

    var groupsdiv = document.getElementById("GroupResults");
    if(!groupsdiv) {
        console.log("refreshGroups returned early");
        return;
    }
    var row = 0;
    var col = 0;
    var i =0;
    var innerHTML = '<div class="row headingrow">\n';
    for(var group_name in groups) {
        if(row%3 == 0 && row != 0) {
            innerHTML = innerHTML + '</div>\n';
            innerHTML = innerHTML + '<hr> \n\n<div class="row headingrow">\n';
        }
        row++;
        col++;
        i++;
        innerHTML = innerHTML + '<div class="col-md-4 groupdiv" id="embedg' + i + '">';
        innerHTML = innerHTML + '<div class="row">\n<div class="col-md-2">\n<div class="checkbox">\n<label><input type="checkbox" value="" id="groupcheck' + i + '"></label>\n</div>\n</div>\n<div class="col-md-8">\n<h3 class="mediacaption" id="embedgroupname' + i + '">' + group_name + '</h3>\n</div>\n<div class="col-md-2">\n<!--Empty div for formatting-->\n</div>\n</div>\n';

        // populate users from a group
        var usercount = 0;
        for(var user in groups[group_name]) {
            usercount++;
        }
//        console.log("usercount: " + usercount);
        if(usercount > 0) {
            var username = [];
            var userpic = [];
            for(var user in groups[group_name]) {
                username.push(user);
                userpic.push(groups[group_name][user]);
            }

//            for(var user_i = 0; 3*user_i + 1 <= username.length && 3*user_i + 1 <= 9; user_i++) {
            for(var user_i = 0; 3*user_i + 1 <= 9; user_i++) {
                var username1 = username[3*user_i];
                var username2 = username[3*user_i+1];
                var username3 = username[3*user_i+2];
                var userpic1 = userpic[3*user_i];
                var userpic2 = userpic[3*user_i+1];
                var userpic3 = userpic[3*user_i+2];
//                if(!username1) {
//                    username1 = " ";
//                    userpic1 = " ";
//                }
//                if(!username2) {
//                    username2 = " ";
//                    userpic2 = " ";
//                }
//                if(!username3) {
//                    username3 = " ";
//                    userpic3 = " ";
//                }

                // populate usernames
                innerHTML = innerHTML + '<div class="row mediacaption">\n';
                if(username1) {
                    innerHTML = innerHTML + '<div class="col-md-4" id="groupname' + i + '_' + (3*user_i + 1) + '">' + username1 + '\n</div>\n';
//                    console.log("username1 is " + username1);
                }
//                else {
//                    innerHTML = innerHTML + '<div class="col-md-4" id="groupname' + i + '_' + (3*user_i + 1) + '" style="height:100px;">yo\n</div>\n';
//                }
                if(username2) {
                    innerHTML = innerHTML + '<div class="col-md-4" id="groupname' + i + '_' + (3*user_i + 2) + '">' + username2 + '\n</div>\n';
                }
                if(username3) {
                    innerHTML = innerHTML + '<div class="col-md-4" id="groupname' + i + '_' + (3*user_i + 3) + '">' + username3 + '\n</div>\n';
                }
                innerHTML = innerHTML + '</div>\n';

                // populate images
                innerHTML = innerHTML + '<div class="row">\n';
                if(username1) {
                    innerHTML = innerHTML + '<div class="col-md-4">\n<img src="' + userpic1 + '" id="groupmem' + i + '_' + (3*user_i + 1) + '" class="mediamember"></div>\n';
                }
                if(username2) {
                    innerHTML = innerHTML + '<div class="col-md-4">\n<img src="' + userpic2 + '" id="groupmem' + i + '_' + (3*user_i + 2) + '" class="mediamember"></div>\n';
                }
                if(username3) {
                    innerHTML = innerHTML + '<div class="col-md-4">\n<img src="' + userpic3 + '" id="groupmem' + i + '_' + (3*user_i + 3) + '" class="mediamember"></div>\n';
                }
                innerHTML = innerHTML + '</div>\n';

                // populate delete buttons
                innerHTML = innerHTML + '<div class="row">\n';
                if(username1) {
                    innerHTML = innerHTML + '<div class="col-md-4"> <p><input type="button" class="btn btn-default btn-xs deletebutton" href="#" value="Delete" id="groupmem' + i + '_' + (3*user_i + 1) + '"  onclick="DeleteMember(\'' + group_name + '\',\'' + username1 + '\');"/></p> </div>\n';
                }
                if(username2) {
                    innerHTML = innerHTML + '<div class="col-md-4"> <p><input type="button" class="btn btn-default btn-xs deletebutton" href="#" value="Delete" id="groupmem' + i + '_' + (3*user_i + 2) + '"  onclick="DeleteMember(\'' + group_name + '\',\'' + username2 + '\');"/></p> </div>\n';
                }
                if(username3) {
                    innerHTML = innerHTML + '<div class="col-md-4"> <p><input type="button" class="btn btn-default btn-xs deletebutton" href="#" value="Delete" id="groupmem' + i + '_' + (3*user_i + 3) + '"  onclick="DeleteMember(\'' + group_name + '\',\'' + username3 + '\');"/></p> </div>\n';
                }
                innerHTML = innerHTML + '</div>\n';

            }
        }

        // view more button
        innerHTML = innerHTML + '<div class="row">\n<button type="button" class="btn btn-primary disabled viewmoremembers">View More Members</button>\n</div>\n';

        // closes group
        innerHTML = innerHTML + '</div>\n';
    }

    // closes rowheading row
    innerHTML = innerHTML + '</div>\n';

    groupsdiv.innerHTML = innerHTML;
}


function ShowGroups(media, managed_group)
{
	console.log("called ShowGroups");
	var groupsize = Object.keys(groups).length;
	if(groupsize == 0) {
		callAlertBox("No existing groups, please create a new group");
		return;
	}
	if(managed_group) {
		$('#ShowOldGroupsMG').modal('toggle');
	} else if(media) {
		$('#ShowOldGroupsMedia').modal('toggle');
	} else {
		$('#ShowOldGroups').modal('toggle');
	}
	var grouptableid;
	var radiouserid;
	var groupnameid;
	if(managed_group) {
    	table = document.getElementById("grouptablemg");
    	grouptableid = 'grouptablemg';
    	radiouserid = 'radiousermg';
    	groupnameid = 'groupnamemg';
	} else if(media) {
    	table = document.getElementById("grouptablemedia");
    	grouptableid = 'grouptablemedia';
    	radiouserid = 'radiousermedia';
    	groupnameid = 'groupnamemedia';
    } else {
    	table = document.getElementById("grouptable");
    	grouptableid = 'grouptable';
    	radiouserid = 'radiouser';
    	groupnameid = 'groupname';
    }
    var table = document.getElementById(grouptableid);
    // console.log(table);
    var j = table.rows.length - 1;

    // console.log("j value: " + j);

	for(; j > 0; j--) {
		// console.log("going to delete row no " + j);
		table.deleteRow(j);
	}

	j++;
    for(var group_name in groups) {
    	var row = table.insertRow(j);
    	var radiocell = row.insertCell(0);
		radiocell.innerHTML = '<div class="radio"><label><input type="radio" name="optradio" id="' + radiouserid + j + '" value="random"></label></div>';
		var groupnamecell = row.insertCell(1);
		groupnamecell.innerHTML = '<div id="' + groupnameid + j + '">' + group_name + '</div>';
		j++;
    }

    clearinputsold(j, media, managed_group);

	console.log("this is working too babe");
}

function createUnnamedGroup() {
	console.log(default_group + group_no);
	group_name = default_group + group_no;
	groups[default_group + group_no] = {};
	callSuccessBox("Group " + default_group + group_no + " created");
	group_no = group_no + 1;
	refreshGroups();
	return group_name;
}

function groupExists(group_name) {
	if(groups[group_name]) {
		return true;
	}
	return false;
}

function CreateManagedGroup() {

	var group_name = document.getElementById("newgroupnameM").value;
	console.log(group_name);
	if(!group_name)
		createUnnamedGroup();
	else
	{
		if(groupExists(group_name)) {
			callAlertBox("Group already exists!");
		}
		else {
			createGroup(group_name);
		}
	}

}


function createGroup(group_name) {
	if(!groups[group_name]) {
		groups[group_name] = {};
		callSuccessBox("Group created");
	    refreshGroups();
	} else {
		// already checked in previous function
	}
}

function deleteGroup(group_name) {
	delete groups[group_name];
	callSuccessBox("Group " + group_name + " deleted");
	refreshGroups();
}

function deleteGroupWithoutWarning(group_name) {
	delete groups[group_name];
	refreshGroups();
}

function CreateNewGroup(media)
{
  	hideAllAlerts();
  	var newgroupnameid;
  	if(media) {
  		newgroupnameid = 'newgroupnamemedia';
  	} else {
  		newgroupnameid = 'newgroupname';
  	}
	var group_name = document.getElementById(newgroupnameid).value; 
	if(groupExists(group_name)) {
		callAlertBox("Group already exists!");
	} else {
		if(group_name=="") {
			group_name = createUnnamedGroup();
		} else {
		createGroup(group_name);
		}
		var users_selected = addUsersInGroupUsingName(group_name, media);
		if(!users_selected) {
			deleteGroupWithoutWarning(group_name);
		}
	}
	//unhideme("CreateNewGroup");
	//unhideAlerts("modal");
	refreshGroups();
}

function deleteGroupFromModal() {
	console.log("called deleteGroupFromModal");
  	hideAllAlerts();
	var selectedGroup = getSelectedGroup(false, true);
	if(selectedGroup) {
		deleteGroup(selectedGroup);
		console.log("deleted!! : " + selectedGroup);
	} else {
		callAlertBox("Please select a group name and press save changes");
		console.log("not selected :( : " + selectedGroup);
	}
	refreshGroups();
}

function addUsersInGroup(media) {
	console.log("called addUsersInGroup");
  	hideAllAlerts();
	var selectedGroup = getSelectedGroup(media, false);
	if(selectedGroup) {
		addUsersInGroupUsingName(selectedGroup, media);
		console.log("selected!! : " + selectedGroup);
	} else {
		callAlertBox("Please select a group name and press save changes");
		console.log("not selected :( : " + selectedGroup);
	}
	refreshGroups();
}

function addUsersInGroupUsingName(group_name, media) {
	console.log("called addUsersInGroupUsingName");
	var usercheckid;
	var usernameid;
	var userpicid;
	if(media) {
		usercheckid = "mediacheck";
		usernameid = "mediausername";
		userpicid = "mediauserpic";
	} else {
		usercheckid = "usercheck";
		usernameid = "username";
		userpicid = "userpic";
	}
	user_checked = false;
	existing_users = [];
	distinct_users = {};
	for(i = 1; i < 7; i++) {
		var item = document.getElementById(usercheckid + i);
		if(item.checked) {
			user_checked = true;
			var item_username_array = document.getElementById(usernameid + i).innerHTML.split(" ");
			var item_username = item_username_array[item_username_array.length-1];
			var item_pic_link = document.getElementById(userpicid + i).src;
			if(distinct_users[item_username]) {
				continue;
			}
			distinct_users[item_username] = true;
			var already_existed = addPersonInGroup(group_name, item_username, item_pic_link);
			if(already_existed) {
				existing_users.push(item_username);
			}
			// console.log("usercheck" + i + ": checked");
			// console.log("username" + i + ": " + item_username);
			// console.log("pic_link" + i + ": " + item_pic_link);
		} else {
			// console.log("usercheck" + i + ": unchecked");
		}
	}
	if(!user_checked) {
		callAlertBox("Please select a user to add to group");
	    refreshGroups();
		return false;
	}
	if(existing_users.length > 0) {
		callInfoBox("Users: [" + existing_users + "] already exists and have not been re-added");
	}
	refreshGroups();
	return true;
}

function getSelectedGroup(media, managed_group) {
	var radiouserid;
	var groupnameid;
	if(managed_group) {
		radiouserid = 'radiousermg';
		groupnameid = 'groupnamemg';
	} else if(media) {
		radiouserid = 'radiousermedia';
		groupnameid = 'groupnamemedia';
	} else {
		radiouserid = 'radiouser';
		groupnameid = 'groupname';
	}
	for(i = 1; ; i++) {
		var item = document.getElementById(radiouserid + i);

		if(!item) {
			break;
		}
		if(!item.checked) {
			// console.log(i + ": unchecked");
			continue;
		}
		// console.log(i + ": checked");
		return document.getElementById(groupnameid + i).innerHTML;
	}
	return null;
}

function addPersonInGroup(group_name, username, user_pic_link) {
	if(groups[group_name]) {
		if(groups[group_name][username]) {
			return true;
		} else {
			groups[group_name][username] = user_pic_link;
			callSuccessBox(username + " added to " + group_name);
	        refreshGroups();
		}
	}
	return false;
}


//function deletePersonInGroup(group_name, person) {
function DeleteMember(group_name, person) {
	if(groups[group_name]) {
		if(groups[group_name][person])
		{
		delete groups[group_name][person];
		callSuccessBox(person + " deleted from " + group_name);
	    refreshGroups();
	}
	}
}


function ViewRecent(num)
{
	hideme("ShowUserResults");
	console.log("view recent for username: " + userids[num-1]);
	doAjaxRecentMedia(userids[num-1]);

}


function geoConvert(address)
{
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode( { 'address': address}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();
			console.log(latitude);
			console.log(longitude);
			doAjaxMediaSearchLocation(latitude, longitude);
		} 
	}); 
}

function callAlertBox(alerttext)
{
  	hideAllAlerts();
	var alerttextdiv;
	alerttextdiv = document.getElementById("alertdangertext");
	alerttextdiv.innerHTML = alerttext;
	alerttextdiv = document.getElementById("alertdangertextMG");
	alerttextdiv.innerHTML = alerttext;
	unhideAlerts("alert-danger");
}

function callInfoBox(alerttext)
{
  	hideAllAlerts();
	var alerttextdiv;
	alerttextdiv = document.getElementById("alertinfotext");
	alerttextdiv.innerHTML = alerttext;
	alerttextdiv = document.getElementById("alertinfotextMG");
	alerttextdiv.innerHTML = alerttext;
	unhideAlerts("alert-info");
}

function callSuccessBox(alerttext)
{
  	hideAllAlerts();
	var alerttextdiv;
	alerttextdiv = document.getElementById("alertsuccesstext");
	alerttextdiv.innerHTML = alerttext;
	alerttextdiv = document.getElementById("alertsuccesstextMG");
	alerttextdiv.innerHTML = alerttext;
	unhideAlerts("alert-success");
}

function hideAllAlerts() {
	hideAlerts("alert-info");
	hideAlerts("alert-success");
	hideAlerts("alert-danger");
}


function changeSearch()
{
	console.log(groups);
	//self
	//doAjaxSelf();
	//doAjaxUserIDinfo("267901082");
	hideme("ShowWelcomeText");
	hideme("ShowMediaResults");
	hideme("alertboxdanger");
	hideme("ShowUserResults");
  	hideAllAlerts();
	var inputtext;
	var alerttext;


	
	if (document.getElementById("radiouser").checked) {
		console.log("radio user checked");
		inputtext = document.getElementById("userinput").value;
		if(inputtext == "")
		{
			alerttext = "Please enter a valid text input";
			callAlertBox(alerttext);
		}
		else
		{
			doAjaxUsernameSearch(inputtext);
		}

	}

	else if (document.getElementById("radiotag").checked) {
		console.log("radio tag checked");
		inputtext = document.getElementById("taginput").value;
		if(inputtext == "")
		{
			alerttext = "Please enter a valid text input";
			callAlertBox(alerttext);
		}
		else
		{
			doAjaxMediaTags(inputtext);
		}
	}

	else if (document.getElementById("radiolocation").checked) {
		console.log("radio location checked");
		inputtext = document.getElementById("locationinput").value;
		if(inputtext == "")
		{
			alerttext = "Please enter a valid text input";
			callAlertBox(alerttext);
		}
		else
		{
			geoConvert(inputtext);
		}
	}

	else
	{
		alerttext = "Please select an option, input some text and try again";
		callAlertBox(alerttext);
	}
	
}


function doAjaxSelf(){
  // for testing purposes - for access key

  $.ajax({
  	type:     "GET",
  	url:      "https://api.instagram.com/v1/users/self/?access_token=" + access_token,
  	dataType: "jsonp",
  	success: function(data){
  		console.log(data);
  	}
  });

}

function doAjaxUserIDinfo(userID){
  // given a user Id, provides information about the user
  // not working with public_content

  $.ajax({
  	type:     "GET",
  	url:      "https://api.instagram.com/v1/users/" + userID + "/?access_token=" + access_token,
  	dataType: "jsonp",
  	success: function(data){
  		console.log(data);
  	}
  });

}

function doAjaxUsernameSearch(username){
  //Searches for users by username

  $.ajax({
  	type:     "GET",
  	url:      "https://api.instagram.com/v1/users/search?q=" + username + "&access_token=" + access_token ,
  	dataType: "jsonp",
  	success: function(obj){
  		console.log(obj);

  		hideAllAlerts();

  		if(obj.data == null)
  		{
  			var infoalerttext = "No Results found, please try something else";
  			callInfoBox(infoalerttext);
  			return;
  		}

  		if(obj.data[0]==null)
  		{
  			//no results found
  			var infoalerttext = "No Results found, please try something else";
  			callInfoBox(infoalerttext);
  			return;
  		}

	    for(i = 0; i < obj.data.length && i < 6; i++) {
	    	if(obj.data[i]!=null)
  			{
  				var dataobj = obj.data[i];
  				var pp = dataobj.profile_picture;
  				var userid = dataobj.id;
  				var fullname = dataobj.full_name;
  				var username = dataobj.username;
  				userids[i] = userid;
  				var bio = dataobj.bio;

  				var node1 = document.getElementById("userpic" + (i+1));
  				var node2 = document.getElementById("username" + (i+1));
  				var node3 = document.getElementById("userfullname" + (i+1));
  				var node4 = document.getElementById("userbio" + (i+1));

  				node1.src = pp;
  				node2.innerHTML = "<br>Username: " + username;
  				node3.innerHTML = "Full Name: " + fullname;
  				node4.innerHTML = "<br><i>" + bio + "</i>";

  				unhideme("ShowUserResults");
  				unhideme("embedu" + (i+1));
  				console.log(userids[i]);
  			}
	    }	
	    for(; i < 6; i++) {
	    	document.getElementById("userpic" + (i+1)).src = null;
	     	document.getElementById("username" + (i+1)).innerHTML = null;
	     	document.getElementById("userfullname" + (i+1)).innerHTML = null;
		    document.getElementById("userbio" + (i+1)).src = null;
  			hideme("embedu" + (i+1));
	    }

  	}
  });

  //you can add count in the search parameters

}

function doAjaxRecentMedia(userID){
  //given a userID it searches for recent media
  //you can add count in the search parameters
  //not working for users other than self

  $.ajax({
  	type:     "GET",
  	url:      "https://api.instagram.com/v1/users/" + userID + "/media/recent/?access_token=" + access_token,
  	dataType: "jsonp",
  	success: function(obj){
  		console.log(obj);

  		hideAllAlerts();
  		
  		if(obj.data == null)
  		{
  			var infoalerttext = "No Results found, please try something else";
  			callInfoBox(infoalerttext);
  			return;
  		}

  		if(obj.data[0]==null)
  		{
  			//no results found
  			var infoalerttext = "No Results found, please try something else";
  			callInfoBox(infoalerttext);
  			return;
  		}

  		for(i = 0; i < obj.data.length && i < 6; i++)
  		{

  			if(obj.data[i]!=null)
  			{
  				var flag = 0;
  				var dataobj = obj.data[i];
  				var text = dataobj.caption.text;
  				var src = dataobj.images.low_resolution.url;
  				var pp = dataobj.user.profile_picture;
  				var mediausername = dataobj.user.username;
  				var date = new Date(parseInt(dataobj.created_time) * 1000);
  				var postedon = "Posted On: " + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  				var tags = "";
  				var likes = dataobj.likes.count;
  				var link = dataobj.link;

  				
  				//extracting first 5 tags
  				if(dataobj.tags.length!=0)
  				{
  					console.log(dataobj.tags.length);
  					for(k=0;k<5;k++)
  					{
  						if(dataobj.tags[k]!=null)
  						{
  							tags = tags + "#" + dataobj.tags[k] + " ";
  						}
  					}
  				}


  				var node1 = document.getElementById("mediacaption" + (i+1));
  				var node2 = document.getElementById("mediapic" + (i+1));
  				var node3 = document.getElementById("mediauserpic" + (i+1));
  				var node4 = document.getElementById("mediausername" + (i+1));
  				var node5 = document.getElementById("mediatime" + (i+1));
  				var node6 = document.getElementById("mediatags" + (i+1));
  				var node7 = document.getElementById("medialikes" + (i+1));
  				var node8 = document.getElementById("medialink" + (i+1));


  				//adding values to div
  				node1.innerHTML = "<i><br>" + text + "</i>";
  				node2.src = src;
  				node3.src = pp;
  				node4.innerHTML = "<br> " + mediausername;
  				node5.innerHTML = postedon;
  				
  				//if caption already contains tags, do not print again
  				if(text.indexOf("#") > -1)
  				{
  					flag = 1;
  				}
  				if(flag==0)
  				{
  					node6.innerHTML = tags;
  				}
  				
  				node7.innerHTML = likes;
  				node8.href = link;

  				unhideme("embedm" + (i+1));
  				unhideme("ShowMediaResults");

  			}
  		}

	    for(; i < 6; i++) {
	    	document.getElementById("mediacaption" + (i+1)).innerHTML = null;
	     	document.getElementById("mediapic" + (i+1)).src = null;
	     	document.getElementById("mediauserpic" + (i+1)).src = null;
		    document.getElementById("mediausername" + (i+1)).innerHTML = null;
		    document.getElementById("mediatime" + (i+1)).innerHTML = null;
		    document.getElementById("mediatags" + (i+1)).innerHTML = null;
		    document.getElementById("medialikes" + (i+1)).innerHTML = null;
		    document.getElementById("medialink" + (i+1)).href = null;
  			hideme("embedm" + (i+1));
	    }

  	}

  });

}

function doAjaxMediaSearchLocation(latitude, longitude)
{
	//working with area code

	$.ajax({
		type:     "GET",
		url:      "https://api.instagram.com/v1/media/search?lat=" + latitude + "&lng=" + longitude + "&distance=5000&access_token=" + access_token,
		dataType: "jsonp",
		success: function(obj){
			console.log(obj);

  			hideAllAlerts();

			if(obj.data == null)
	  		{
	  			var infoalerttext = "No Results found, please try something else";
	  			callInfoBox(infoalerttext);
	  			return;
	  		}

			if(obj.data[0]==null)
			{
	  			//no results found
	  			var infoalerttext = "No Results found, please try something else";
	  			callInfoBox(infoalerttext);
	  			return;
	  		}

	  		for(i = 0; i < obj.data.length && i < 6; i++)
	  		{
	  			if(obj.data[i]!=null)
	  			{
	  				var flag = 0;
	  				var dataobj = obj.data[i];
	  				var text = dataobj.caption.text;
	  				var src = dataobj.images.low_resolution.url;
	  				var pp = dataobj.user.profile_picture;
	  				var mediausername = dataobj.user.username;
	  				var date = new Date(parseInt(dataobj.created_time) * 1000);
	  				var postedon = "Posted On: " + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	  				var tags = "";
	  				var likes = dataobj.likes.count;
	  				var link = dataobj.link;


	  				//extracting first 5 tags
	  				if(dataobj.tags.length!=0)
	  				{
	  					console.log(dataobj.tags.length);
	  					for(k=0;k<5;k++)
	  					{
	  						if(dataobj.tags[k]!=null)
	  						{
	  							tags = tags + "#" + dataobj.tags[k] + " ";
	  						}
	  					}
	  				}


	  				var node1 = document.getElementById("mediacaption" + (i+1));
	  				var node2 = document.getElementById("mediapic" + (i+1));
	  				var node3 = document.getElementById("mediauserpic" + (i+1));
	  				var node4 = document.getElementById("mediausername" + (i+1));
	  				var node5 = document.getElementById("mediatime" + (i+1));
	  				var node6 = document.getElementById("mediatags" + (i+1));
	  				var node7 = document.getElementById("medialikes" + (i+1));
	  				var node8 = document.getElementById("medialink" + (i+1));


	  				//adding values to div
	  				node1.innerHTML = "<i><br>" + text + "</i>";
	  				node2.src = src;
	  				node3.src = pp;
	  				node4.innerHTML = "<br> " + mediausername;
	  				node5.innerHTML = postedon;
	  				
	  				//if caption already contains tags, do not print again
	  				if(text.indexOf("#") > -1)
	  				{
	  					flag = 1;
	  				}
	  				if(flag==0)
	  				{
	  					node6.innerHTML = tags;
	  				}
	  				
	  				node7.innerHTML = likes;
	  				node8.href = link;

	  				unhideme("embedm" + (i+1));
	  				unhideme("ShowMediaResults");

	  			}
	  		}

		    for(; i < 6; i++) {
		    	document.getElementById("mediacaption" + (i+1)).innerHTML = null;
		     	document.getElementById("mediapic" + (i+1)).src = null;
		     	document.getElementById("mediauserpic" + (i+1)).src = null;
			    document.getElementById("mediausername" + (i+1)).innerHTML = null;
			    document.getElementById("mediatime" + (i+1)).innerHTML = null;
			    document.getElementById("mediatags" + (i+1)).innerHTML = null;
			    document.getElementById("medialikes" + (i+1)).innerHTML = null;
			    document.getElementById("medialink" + (i+1)).href = null;
	  			hideme("embedm" + (i+1));
		    }

	  	}
	});

}


function doAjaxMediaTags(tag)
{
	$.ajax({
		type:     "GET",
		url:      "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + access_token,
		dataType: "jsonp",
		success: function(obj){
			console.log(obj);

			hideAllAlerts();

			if(obj.data == null)
	  		{
	  			var infoalerttext = "No Results found, please try something else";
	  			callInfoBox(infoalerttext);
	  			return;
	  		}

			if(obj.data[0]==null)
			{
	  			//no results found
	  			var infoalerttext = "No Results found, please try something else";
	  			callInfoBox(infoalerttext);
	  			return;
	  		}

	  		for(i = 0; i < obj.data.length && i < 6; i++)
	  		{
	  			if(obj.data[i]!=null)
	  			{
	  				var flag = 0;
	  				var dataobj = obj.data[i];
	  				var text = dataobj.caption.text;
	  				var src = dataobj.images.low_resolution.url;
	  				var pp = dataobj.user.profile_picture;
	  				var mediausername = dataobj.user.username;
	  				var date = new Date(parseInt(dataobj.created_time) * 1000);
	  				var postedon = "Posted On: " + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
	  				var tags = "";
	  				var likes = dataobj.likes.count;
	  				var link = dataobj.link;


	  				//extracting first 5 tags
	  				if(dataobj.tags.length!=0)
	  				{
	  					console.log(dataobj.tags.length);
	  					for(k=0;k<5;k++)
	  					{
	  						if(dataobj.tags[k]!=null)
	  						{
	  							tags = tags + "#" + dataobj.tags[k] + " ";
	  						}
	  					}
	  				}


	  				var node1 = document.getElementById("mediacaption" + (i+1));
	  				var node2 = document.getElementById("mediapic" + (i+1));
	  				var node3 = document.getElementById("mediauserpic" + (i+1));
	  				var node4 = document.getElementById("mediausername" + (i+1));
	  				var node5 = document.getElementById("mediatime" + (i+1));
	  				var node6 = document.getElementById("mediatags" + (i+1));
	  				var node7 = document.getElementById("medialikes" + (i+1));
	  				var node8 = document.getElementById("medialink" + (i+1));


	  				//adding values to div
	  				node1.innerHTML = "<i><br>" + text + "</i>";
	  				node2.src = src;
	  				node3.src = pp;
	  				node4.innerHTML = "<br> " + mediausername;
	  				node5.innerHTML = postedon;
	  				
	  				//if caption already contains tags, do not print again
	  				if(text.indexOf("#") > -1)
	  				{
	  					flag = 1;
	  				}
	  				if(flag==0)
	  				{
	  					node6.innerHTML = tags;
	  				}
	  				
	  				node7.innerHTML = likes;
	  				node8.href = link;

	  				unhideme("embedm" + (i+1));
	  				unhideme("ShowMediaResults");

	  			}
	  		}

		    for(; i < 6; i++) {
		    	document.getElementById("mediacaption" + (i+1)).innerHTML = null;
		     	document.getElementById("mediapic" + (i+1)).src = null;
		     	document.getElementById("mediauserpic" + (i+1)).src = null;
			    document.getElementById("mediausername" + (i+1)).innerHTML = null;
			    document.getElementById("mediatime" + (i+1)).innerHTML = null;
			    document.getElementById("mediatags" + (i+1)).innerHTML = null;
			    document.getElementById("medialikes" + (i+1)).innerHTML = null;
			    document.getElementById("medialink" + (i+1)).href = null;
	  			hideme("embedm" + (i+1));
		    }

	  	}
	});
}




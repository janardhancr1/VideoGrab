/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
var globalRequest = "";
var authenticated = false;
var playLists;
var playListId;
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	globalRequest = request;
	var response = "";
	  if(authenticated)
	    {
	      console.log("Authenticated");
		  switch(request.method)
			{
				case "load":
					response = LoadPlaylist();
				break;
				case "create":
					response = CreatePlayList(request.name);					
				break;  
				case "addvideo":
					console.log(request.plId+','+request.stTime+','+request.endTime+','+request.videoId);
					response = UploadVideoToPlayList(request.plId,request.stTime,request.endTime,request.videoId);			
				break; 
			}
			
	    }
	    else
	    {
	      console.log("Not Authenticated");
	      response = handleAuthResult();
	    }
	   	
	console.log('Call back : '+response);	
	sendResponse(response);
});

function CreatePlayList(plname)
{
console.log('CreatePlayList'+plname);

    gapi.client.load('youtube', 'v3', function() {	
			var crequest = gapi.client.youtube.playlists.insert({
			part: 'snippet,status',
			resource: {
			  snippet: {
				title: plname,
				description: 'A private playlist created with the YouTube API'
			  },
			  status: {
				privacyStatus: 'private'
			  }
			}
		  });
			crequest.execute(function(response) {
			var result = response.result;
			console.log(result);
			if (result) {
			  playListId = result.id;
			 } else {     
			  playListId = 0;
			}	
		  });	
	});
	console.log('created playlist ID'+playListId);
	return playListId;
}

function LoadPlaylist()
{
    gapi.client.load('youtube', 'v3', function() {     
      var request = gapi.client.youtube.channels.list({
        mine: true,
        part: 'contentDetails'
      });

      request.execute(function(response) {
    	channelId = response.result.items[0].id;
    	var prequest = gapi.client.youtube.playlists.list({ // Use playlists.list
    			channelId: channelId, //"UCaSqXdCftq8zwhM7XdKZamw", // Return the specified channel's playlist
    			part: 'snippet',
				maxResults: 50,
    			//filter: 'items(id)' // This gets what you only need, the playlist Id
    	});
    	prequest.execute(function(response) {    	  
        playLists = response.result.items;
    	console.log(playLists);
        });
      });
    });

    return playLists;
}

function UploadVideoToPlayList(plId,startPos,endPos,videoId){
	console.log('UploadVideoToPlayList called');
	var details = {
		videoId: videoId,
		kind: 'youtube#video'
	  }
	  if (startPos != undefined) {
		details['startAt'] = startPos;
	  }
	  if (endPos != undefined) {
		details['endAt'] = endPos;
	  }	  
	  var strAt = (startPos.indexOf(".") == -1)?'PT'+startPos+'M00S' : 
	  'PT'+startPos.substring(0,startPos.indexOf("."))+'M'+startPos.substring(startPos.indexOf(".")+1,startPos.length)+'S';
	   
	  var endAt = (endPos.indexOf(".") == -1)?'PT'+endPos+'M00S' : 
	  'PT'+endPos.substring(0,endPos.indexOf("."))+'M'+endPos.substring(endPos.indexOf(".")+1,endPos.length)+'S';
	  
	  gapi.client.load('youtube', 'v3', function() {	
		   var urequest = gapi.client.youtube.playlistItems.insert({
			part: 'snippet,contentDetails',
			resource: {
			contentDetails:{
						startAt:strAt,
						endAt:endAt,
					},				
			  snippet: {
				playlistId: plId,
				resourceId: {
					videoId: videoId,
					kind: 'youtube#video',
				}
			  }
			}
		  });
		  urequest.execute(function(response) {
		  console.log(response);
			//$('#status').html('<pre>' + JSON.stringify(response.result) + '</pre>');
		  });  
	   
	   }); 

}


// The client ID is obtained from the Google Developers Console
// at https://console.developers.google.com/.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
//var OAUTH2_CLIENT_ID = '872339729949-137jrria0afggt1oevr0ofi5ub7pkn88.apps.googleusercontent.com';
var OAUTH2_CLIENT_ID ='1072936636632-73q1pt0lrdn5f0iqtfeljv1ffbean8r6.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
    "https://www.googleapis.com/auth/youtubepartner",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/userinfo.email"
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    authenticated = true;
    return authenticated;
  } else {
    console.log("not authenticated")
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: true
        }, handleAuthResult);
  }
}




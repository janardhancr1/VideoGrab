'use strict';
/*global settings, util, fermata, data, jsonToDOM, numeral, widgets*/

(function () {

    var widget = {

        name : 'Add Video to Playlist UI',

        urls : [
            /^https:\/\/www.youtube.com/
        ],

        container : '#theorem_stats_panel',

        initialize : function () {
            var video_id;

            this.show = location.pathname === '/watch';
            if (!this.show) {
                return;
            }
            
            video_id = util.get_video_id_from_location();
            this.create_box(video_id);            
        },

        start : function () {

			console.log('statUI called');
            this.show = location.pathname === '/watch';
            if (!this.show) {		
			      return;
            }			
				
            this.render();
			var soptions = util.$('#schooseplaylist');
			if(soptions){
				var option = soptions.options[0] ;
				if(!option){
					util.$('#Stat_Add_this_video_page').style.display = 'none';
					return;
				}
			}	

        },
        create_box : function (video_id) {
		    this.box = jsonToDOM(
                ['div',
                    {
                        class : 'action-panel-content yt-card yt-card-has-padding'
                                + 'yt-uix-expander yt-uix-expander-collapsed',
                        id : this.container.slice(1),
                        style : 'display:none',
                        'data-vid-id' : video_id
                    },
                    ['div', {
                                id : 'Stat_Add_this_video_page',
                                'style':"display:none;",
                            },
							
						['table', {
                                id : 'theorem_settings_body',
                                class : 'hbeat_dropdown',
								  'style':" 'overflow':'hidden'; width:594px;",
                            },
							['tbody', {class : 'hbeat_dropdown'},
                                ['tr', {class : 'hbeat_dropdown'},

                                    ['td', {class : 'hbeat_dropdown'},  
										 	['div', {'style':'float:left;'},
												['select', {                                                
													id : 'schooseplaylist',
													width : '100px',												
													class : 'hbeat_dropdown SelectPlayList_New',
													},
													/*['option',{ 
														value : '0',											
														},
														'Choose playlist' 
													],*/
												],
											],
											['div', {'style':'margin-top:10px'},
												['input', {
													type : 'text',                                                
													id : 'sstart_time',
													width : '100px',
													placeholder : 'Start Time',
													class : 'hbeat_dropdown StartTime',
												}],
											],
											['div', {'style':'margin-top:10px'},
												['input', {
													type : 'text',                                                
													id : 'send_time',
													width : '100px',
													placeholder : 'End Time',
													class : 'hbeat_dropdown StartTime',												
												}],
											],
											['div', {'style':'position:relative;top:-10px;'},
													['input', {
														type : 'button',
														id : 'sAdd_video_to_pl_btn',
														value : 'Save',
														class : 'hbeat_dropdown SaveBtnNew',
													}],											
											]		 
								    ],
								]
							]
							
						]	
						],	
                ],
                document, {}
            );
			this.listen_settings_events();            
        },

        remove : function () {
            var elem = util.$(this.container);
            if (elem) {
                elem.parentElement.removeChild(elem);
            }
        },

        exists : function () {
            return !!util.$(this.container);
        },

        render : function () {
            var temp = util.$('#watch7-content');
            this.remove();
            if (temp) {
                temp.insertBefore(this.box, util.$('#watch-header'));
            }
        },
		listen_settings_events : function () {
            util.$('#sAdd_video_to_pl_btn',this.box)
			.addEventListener('click', function(e){
				var videoId = util.get_video_id_from_location();
				var plId = util.$('#schooseplaylist').value;
				var stTime = util.$('#sstart_time').value;
				var endTime = util.$('#send_time').value;
				console.log(plId+''+stTime+''+endTime+''+videoId);
				
				var request = {"plId" : plId,"stTime" : stTime,"endTime" : endTime,"videoId" : videoId, "method": "addvideo"};
					chrome.extension.sendRequest(request, function(response)
            				{
            				util.$('#Playlist_page').style.display = 'block';
							util.$('#Add_this_video_page').style.display = 'none';		
							console.log(response);
							});
				},true);
			
			
        },
        
    };

    widgets.push(widget);

})();

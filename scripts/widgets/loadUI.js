'use strict';
/*global config, settings, util, jsonToDOM, widgets*/

(function () {

    var widget = {

        name : 'VideoGrab UI',

        urls : [
            /^https:\/\/www.youtube.com/
        ],

        container : '#theostat_settings_span',

        initialize : function () {
			this.theostat_settings = jsonToDOM(
                ['span', {id : this.container.slice(1)},
                    ['input', {
                        type : 'image',
                        src : config.assets_url + 'video_Icon.png',
                        id : 'theorem_theostat_button',
                        class : 'hbeat_dropdown'
                    }],

                    ['div', {
                        id : 'theorem_settings_div',
                        class : 'hbeat_dropdown',
                        style : 'display:none'
                    },
                        ['div', {
                                id : 'theorem_settings_header',
                                class : 'hbeat_dropdown'
                            },
							'Video Grab' ,

                            ['div', {id : 'theorem_settings_navigator'},
                                ['input', {
                                    type : 'image',
                                    id : 'theostat_move_left',
                                    class : 'hbeat_dropdown',
                                    src : config.assets_url + 'left-white.png',
                                    style : settings.theostat_position === 'appbar-onebar-upload-group'?'display:none': ''

									}],
                                ['input', {
                                    type : 'image',
                                    id : 'theostat_move_right',
                                    class : 'hbeat_dropdown',
                                    src : config.assets_url + 'right_bar.png',
                                    style :  settings.theostat_position === 'yt-masthead-account-picker'?'display:none':''

                                }]
                            ]

                        ],

						['div', {
                                id : 'theorem_settings_content'
                            },
							//'Add this video page Sample code goes here'
							//ADD this video page

						['div', {
                                id : 'Add_this_video_page',
                                'style':"display:none;",
                            },

						['table', {
                                id : 'theorem_settings_body',
                                class : 'hbeat_dropdown AddingVideo',
								  'style':"width:394px;",
                            },
							['tbody', {class : 'hbeat_dropdown'},
                                ['tr', {class : 'hbeat_dropdown'},

                                    ['td', {class : 'hbeat_dropdown'},
										 ['fieldset',{class:'fieldset'},
											['legend',{},'Adding Video To Playlist'],
											['div', {},
												['select', {
													id : 'chooseplaylist',
													width : '100px',
													class : 'hbeat_dropdown SelectPlayList',
													},
													['option',{
														value : '0',
														},
														'Choose playlist'
													],
												],
											],
											['div', {},
												['input', {
													type : 'text',
													id : 'start_time',
													width : '100px',
													placeholder : 'Start Time',
													class : 'hbeat_dropdown StartTime',
												}],
											],
											['div', {},
												['input', {
													type : 'text',
													id : 'end_time',
													width : '100px',
													placeholder : 'End Time',
													class : 'hbeat_dropdown StartTime',
												}],
											],
											['div', {'style':"float: right; width: 100%; margin-top: 20px;"},
												['div', {},
													['input', {
														type : 'button',
														id : 'cancel_video_to_pl_btn',
														value : 'Cancel',
														class : 'hbeat_dropdown SaveBtn',
													}],
												],
												['div', {},
													['input', {
														type : 'button',
														id : 'Add_video_to_pl_btn',
														value : 'Save',
														class : 'hbeat_dropdown SaveBtn',
													}],
												]
											]

										],
								    ],
								]
							]

						]
						],
						['div', {
                                id : 'Playlist_page',
                                class : 'hbeat_dropdown'
                            },

                        ['table', {
                                id : 'theorem_settings_body',
                                class : 'hbeat_dropdown'
                            },

                            ['thead', {class : 'hbeat_dropdown'},
                                ['tr', {class : 'hbeat_dropdown'},
                                    ['th', {class : 'theorem_playlist',
											'style' : "background-color: #ffffff;border-bottom: 2px solid #ff0000;     margin-bottom: 10px;     'float': 'left';     'width': '80%';     'padding': '0px';     'height': 'auto';     'line-height': '20px';     'margin': '0px';     'text-align': 'center';     'margin-left': '10px'; "},
									'Playlist'],
                                ]
                            ],

                            ['tbody', {class : 'hbeat_dropdown'},
                                ['tr', {class : 'hbeat_dropdown'},

                                    ['td', {class : 'hbeat_dropdown','style':"padding-right: 0px;"},

                                        ['div', {class : 'theorem_video_page hbeat_dropdown','style':'margin-top:10px' },
										 ['div', {id:'Playlists_container', class: 'CustomScroll', 'style':'width:100px'},
                                         ],

                                        ],

                                    ],
                                    ['td', {class : 'hbeat_dropdown'},

										['div', {},
                                            ['input', {
                                                type : 'text',
                                                id : 'playlist_name',
												width : '100px',
												placeholder : 'Create new playlist',
                                                class : 'hbeat_dropdown theorem_create_playlist_text',
												style :'float: left;   width: 250px; height: 19px;',
                                            }],

                                        ],
										['div', {},
                                            ['input', {
                                                type : 'button',
                                                id : 'create_pl_btn',
												value : 'Create',
                                                class : 'hbeat_dropdown theorem_create_playlist_btn',
												style :' margin-left: -36px;    background-color: #f2f2f2;   border: 1px solid #cccccc; height: 25px;    font-size: 12px; font-weight: bold;',
                                            }],
                                        ],
										['div', {'style':"width: 100%;     text-align: center;     margin-top: 20px;"},
                                            ['input', {
                                                type : 'button',
                                                id : 'Add_This_Video_btn',
												title : 'Navigate to Video Playing page before adding...',
												value : 'Add This Video',
                                                class : 'hbeat_dropdown theorem_container_button',
												style : 'margin-left: -36px;     background-color: #cc181e;     border: none;     height: 25px;     font-size: 12px;     font-weight: bold;     color: #ffffff;     min-width: 140px;     margin-left: 20px;',
                                            }],
                                        ],
                                    ]
                                ]
                            ]
                        ]
                    ]
					]
					]
                ],
                document, {}
            );
			this.listen_settings_events();
        },

        start : function () {
            var masthead_user = util.$('#yt-masthead-user'),
                masthead_signin = util.$('#yt-masthead-signin'),
                account_picker = util.$('#appbar-onebar-upload-group');


			//document.getElementById("Add_This_Video_btn").disabled = true;

            document.body.addEventListener('click', function (e) {
                var temp = util.$('#theorem_settings_div');
                if (!~e.target.className.indexOf('hbeat_dropdown')) {
                    if (temp) {
                        temp.style.display = 'none';
                    }
                }
				var addVideoButton = util.$('#Add_This_Video_btn');


				var doclocation = window.location.href;
				var vUrl ='';
				//console.log(doclocation);
				if(doclocation.indexOf("watch") > -1) {
					//console.log('enable button');
					addVideoButton.disabled = false;
				}
				else {
					//console.log('disable button');
					addVideoButton.disabled = true;
				}
            });

            if (masthead_user) {
                masthead_user.insertBefore(this.theostat_settings,
                    settings.theostat_position
                    ? util.$('#' + settings.theostat_position)
                    : account_picker
                );
            }
            else {
                this.theostat_settings.className = 'no_user';
                if (masthead_signin) {
                    masthead_signin.insertBefore(
                        this.theostat_settings,
                        masthead_signin.childNodes[1]
                    );
                }
            }

            this.start = null;
            this.show = true;

			util.$('#cancel_video_to_pl_btn', this.theostat_settings)
                .addEventListener('click', function(e){
				//alert('cancel_video_to_pl_btn click');
				console.log('cancel_video_to_pl_btn clicked');
				util.$('#Playlist_page').style.display = 'block';
				util.$('#Add_this_video_page').style.display = 'none';
				console.log('hide Add_this_video_page and show Playlist_page');
				}, true);

        },

		listen_settings_events : function () {
            var self = this,

                stats_box_count =
                    +settings.monetization +
                    (+settings.social_stats) +
                    (+settings.estimated_earnings) +
                    (+settings.get_a_room) +
                    (+settings.video_age),

                hide_stats_box = function () {
                    util.$('#theorem_stats_panel').style.display = stats_box_count > 0
                        ? 'block'
                        : 'none';
                },

                temp = function () {
                    util.toggle('theorem_settings_div');
                    var request = {"name" : "jana", "method": "load"};
                    chrome.extension.sendRequest(request, function(response)
            				{
            				  console.log(response);
            				  if(!response)
            				  {
            				    util.toggle('theorem_settings_div');
								//Playlists_container

            				  }
							  else{
									var samplePlaylistItems = response;
									var	imgSrc = config.assets_url + 'playlist.png'	;

									var obj = util.$('#Playlists_container');
										obj.innerHTML = '';

									var cobj = 	util.$('#chooseplaylist');
										cobj.innerHTML = "<option value='0'> Choose Playlist </option>";
									for  (var item in samplePlaylistItems) {
											console.log(samplePlaylistItems[item].id);
											var PLId = samplePlaylistItems[item].id;
											console.log(samplePlaylistItems[item].snippet.title);
											var PLTitle = samplePlaylistItems[item].snippet.title;
											//var obj = util.$('#Playlists_container');

											if(obj.innerHTML != ''){
												obj.innerHTML = obj.innerHTML +'<br>';
											}

											var data = "<input type='image' id="+PLId+" src='"+imgSrc+"' >";
											data += "<a href='https://www.youtube.com/playlist?list="+PLId+"'>";
											data += "<label id='"+PLId+"'> "+PLTitle+" </label>";
											data += "</a>";
											obj.innerHTML = obj.innerHTML +data;

											var cdata = "<option value='"+PLId+"' >"+PLTitle +"</option>";
											cobj.innerHTML = cobj.innerHTML + cdata;

										}
							  }
            				});
                },

                toggle_hover = function () {
                    util.$('#theorem_theostat_button', self.theostat_settings)
                        [(settings.clickable_settings ? 'remove' : 'add')
                            + 'EventListener']('mouseover', temp, true);
                };

            if (!settings.clickable_settings) {
                toggle_hover();
            }

            util.$('#theorem_theostat_button', this.theostat_settings)
                .addEventListener('click', temp, true);

			util.$('#Add_This_Video_btn', this.theostat_settings)
                .addEventListener('click', function(e){
				util.$('#Playlist_page').style.display = 'none';
				util.$('#Add_this_video_page').style.display = 'block';
				}, true);



            util.$('#create_pl_btn',this.theostat_settings)
            	.addEventListener('click', function(e){
					var plname = util.$('#playlist_name');
					console.log('creat playlist name'+plname.value);
            		var request = {"name" : plname.value, "method": "create"};
            		chrome.extension.sendRequest(request, function(response)
            				{
							      console.log(response);
							      console.log('Inside resulted plallist id='+response);
            				});
            	}, true);


			util.$('#Add_video_to_pl_btn',this.theostat_settings)
				.addEventListener('click', function(e){
				var doclocation = window.location.href;
				var videoId =''
				var url = doclocation.substring(0, (doclocation.indexOf("#") == -1) ? doclocation.length : doclocation.indexOf("#"));

				var clickurl = url.substring(url.indexOf("?")+1, url.length);
				videoId = (clickurl.indexOf("v=") == -1)? null : (clickurl.substring(clickurl.indexOf("v=")+2,13));


				var plId = util.$('#chooseplaylist').value;
				var stTime = util.$('#start_time').value;
				var endTime = util.$('#end_time').value;
				console.log(plId+''+stTime+''+endTime+''+videoId);

				var request = {"plId" : plId,"stTime" : stTime,"endTime" : endTime,"videoId" : videoId, "method": "addvideo"};
					chrome.extension.sendRequest(request, function(response)
            				{
            				util.$('#Playlist_page').style.display = 'block';
				            util.$('#Add_this_video_page').style.display = 'none';
							console.log(response);
							console.log('Inside upload video='+response);
            				});
				},true);


            util.$('#theostat_move_left', this.theostat_settings)
                .addEventListener('click', function (e) {
                    var a = self.theostat_settings,
                        prev = a.previousElementSibling;

                    util.$('#theostat_move_right').style.display = '';
                    a.parentElement.insertBefore(a, prev);

                    if (prev.id === 'appbar-onebar-upload-group') {
                        e.target.style.display = 'none';
                    }

                    settings.set('theostat_position', prev.id);
                });

            util.$('#theostat_move_right', this.theostat_settings)
                .addEventListener('click', function (e) {
                    var a = self.theostat_settings,
                        next = a.nextElementSibling.nextElementSibling;

                    util.$('#theostat_move_left').style.display = '';

                    a.parentElement.insertBefore(a, next);

                    if (next.id === 'yt-masthead-account-picker') {
                        e.target.style.display = 'none';
                    }

                    settings.set('theostat_position', next.id);
                });
        },

    };

    widgets.push(widget);

})();



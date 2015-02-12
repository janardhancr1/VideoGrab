'use strict';
/*global chrome, util*/

/*
    set app configs
*/

(function (root) {

  var default_to_true = function (obj, key) {
            if (typeof obj[key] === 'undefined') {
                obj[key] = true;
            }
        },

        keys = ['spm', '!spd', '!sph', 'vpm', '!vpd', '!vph', 'tags', 'videos', 'lights',
                'social_stats', 'monetization', 'favorite_comments', 'video_age',
                'light_switch', 'estimated_earnings', 'clickable_settings',
                'realtime_analytics', 'new_switch', '!hide_video_manager', 'hide_analytics',
                'hide_comments', 'open_tags', '!spam_comments', 'theostat_position'];
				/*,                'twitch_earnings', 'klout_score', 'get_a_room'];*/
  root.config = {
        twitch_client_id : 'e91j4e8skt2zjz7mwc6s99fv8tzt0h6',
        server_ip_add : 'https://www.you1tube.com',
		    //assets_url : 'https://s3.amazonaws.com/heartbeat.asset/img',
        assets_url    : 'https://www.theoremanalytics.net/slingshot2009_test/',
		    //assets_url    : 'https://sam.theoreminc.net/sam/pegbeat_img/',
        version_name : ''
    };


  root.widgets = [];
  root.widgets.all = function () {
    var len = this.length,
        fn = arguments[0];

    while (len--) {
        if (root.widgets[len][fn]) {
            root.widgets[len][fn].apply(root.widgets[len], arguments[1]);
        }
    }
  };

  chrome.storage.sync.get(null, function (settings) {

        if (!settings) {
            settings = {};

            keys.forEach(function (key) {
                key = key.replace('!', '');
                if (localStorage.getItem('theorem_' + key)) {
                    settings[key] = localStorage.getItem('theorem_' + key) !== 'false';
                    localStorage.removeItem('theorem_' + key);
                }
            });
        }

        settings.save = function () {
            chrome.storage.sync.set(JSON.parse(JSON.stringify(this)), function () {
                if (!chrome.runtime.lastError) {
                    // console.log('save successful')
                }
            });
        };

        settings.set = function (key, value) {
            this[key] = value;
            this.save();
        };

        settings.refresh = function (cb) {
           chrome.storage.sync.get(null, function (settings) {
                root.settings = util.extend(root.settings, settings);
                cb();
           });
        };

        keys.forEach(function (key) {
            if (key[0] === '!') {
                key = key.slice(1);
                if (typeof settings[key] === 'undefined') {
                    settings[key] = false;
                }
            }
            else if (key === 'theostat_position') {
                if (typeof settings[key] === 'undefined') {
                    settings[key] = 'sb-button-notify';
                }
            }
            else {
                default_to_true(settings, key);
            }
        });

        settings.save();

        root.settings = settings;
    });
  root.data = {};

})(this);
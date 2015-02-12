// get language
// loop through widgets, execute init functions

(function (root) {

    var lang = document.cookie
            .split(';')
            .concat('hl=en')
            .map(function (a) {
                var c = a.split('&')
                        .filter(function (a) {
                            return a.split('=')[0] === 'hl'
                        })
                        .map(function (a) {
                            return a.split('=')[1]
                        });
                return c[0] || c;
            })
            .filter(function (a) {
                return a.length;
            })[0],

        start = function () {
            var temp = setInterval(function () {
                if (root.settings) {
                    clearInterval(temp);
                    listen_on_settings_change();
                }
            }, 10);
        },

        listen_on_settings_change = function () {
            chrome.storage.onChanged.addListener(function (changes) {
                root.settings.refresh(function () {
                    root.widgets.all('settings_changed', [changes]);
                });
            });

            filter_widgets();
        },

        filter_widgets = function () {
            var widget_count = root.widgets.length,
                url_count,
                widget;

            while (widget_count--) {
                widget = root.widgets[widget_count];
                url_count = widget.urls.length;
                while (url_count--) {
                    if (location.href.match(widget.urls[url_count])) {
                        break;
                    }
                }
                if (!~url_count) {
                    root.widgets.splice(widget_count, 1);
                }
            }

            root.widgets.forEach(function (widget) {
                var key;
                for (key in widget) {
                    if (typeof widget[key] === 'function') {
                        widget[key] = widget[key].bind(widget);
                    }
                }
            });

            initialize_widgets();
        },

        initialize_widgets = function () {
            var temp;

            config.state = 'initialize';

            if (!root.widgets.length) {
                return;
            }

            root.widgets.all('initialize');

            temp = setInterval(function () {
                if (document.readyState === 'interactive' || document.readyState === 'complete') {
                    clearInterval(temp);
                    restart();
                    listen_href_change();
                }
            }, 100);
        },

        restart = function () {
            config.state = 'start';
            get_page_data();
            root.widgets.all('start');
        },

        get_page_data = function () {
            var profile_div,
                vars = {};

            if (location.hostname !== 'www.youtube.com') {
                return;
            }

            settings.set('page', util.retrieve_window_variables({page : 'yt.config_.PAGE_NAME'}).page);

            if (settings.page === 'watch') {
                vars = util.retrieve_window_variables({
                    video_id     : 'yt.config_.VIDEO_ID',
                    user_country : 'yt.config_.INNERTUBE_CONTEXT_GL',
                    monetizer    : 'ytplayer.config.args.ptk',
                    channel_id   : 'ytplayer.config.args.ucid',
                    author       : 'ytplayer.config.args.author',
                    user_age     : 'ytplayer.config.args.user_age',
                    keywords     : 'ytplayer.config.args.keywords',
                    views        : 'ytplayer.config.args.view_count',
                    user_gender  : 'ytplayer.config.args.user_gender',
                    user_name    : 'ytplayer.config.args.user_display_name',
                    user_img     : 'ytplayer.config.args.user_display_image'
                });

                vars.keywords = vars.keywords.split(',');
                vars.monetizer = decodeURIComponent(vars.monetizer).replace('+user', '');
                vars.username = util.$('.yt-user-photo')[0].href.split('/')[4];
            }

            if (settings.page === 'channel') {
                vars = util.retrieve_window_variables({
                    channel_id   : 'yt.config_.CHANNEL_ID',
                    user_country : 'yt.config_.INNERTUBE_CONTEXT_GL'
                });
                vars.username = util.$('.branded-page-header-title-link')[0].href.split('/')[4];
            }

            profile_div = util.$('.yt-masthead-picker-active-account');

            vars.email = profile_div.length
                 ? profile_div[0].childNodes[0].data.trim()
                 : null;

             data = util.extend(data, vars);
        },

        listen_href_change = function () {
            var href = location.href,
                again = false,
                init = true;

            setInterval(function () {
                if (href !== location.href) {
                    if (init) {
                        init = false;
                        config.state = 'initialize';
                        root.widgets.all('initialize');
                        // console.log('href changed', location.href);
                    }

                    if (~document.body.className.indexOf('page-loaded') && again) {
                        again = false;
                        restart();
                        init = true;
                        href = location.href;
                    }
                    else if (!~document.body.className.indexOf('page-loaded')) {
                        again = true;
                    }
                }
            }, 100);

            health_check();
        },

        health_check = function () {
            setInterval(function () {
                //console.log(widgets);
                widgets.forEach(function (widget) {
                    if (widget.show) {
                        if (widget.container && !util.$(widget.container)) {
                            //widget.render();
                        }
                    }

                    if (widget.integrity && !widget.integrity()) {
                        widget.initialize();
                        widget.start();
                    }
                });
            }, 3000);
        };

    start();

})(this);


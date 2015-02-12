/*
    Utilities
*/

(function (root) {

    root.util = {

        lang : 'en',
        language_json : {},

        api : fermata.json(config.server_ip_add),

        locale :  function (message) {
            return this.language_json[message]
                ? this.language_json[message]
                : '';
        },

        toggle : function (id, display) {
            var element = this.$('#' + id);
            if (element) {
                element.style.display = element.style.display === 'none'
                    ? display || 'block'
                    : 'none';
            }
        },

        simple_pluralize : function (string, number) {
            return this.lang === 'en'
                ? (number === 1
                    ? string
                    : string + 's')
                : string;
        },

        number_with_commas : function (x) {
            return x > -1
                ? (x || '0').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : 'Unknown'
        },

        decode_HTML : function (string) {
            var map = {
                gt : '>',
                lt : '<',
                quot : '"',
                apos : "'"
            };

            return string.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function ($0, $1) {
                return $1[0] === '#'
                    ? (String.fromCharCode($1[1].toLowerCase() === 'x'
                        ? parseInt($1.substr(2), 16)
                        : parseInt($1.substr(1), 10)))
                    : (map.hasOwnProperty($1)
                        ? map[$1]
                        : $0);
            });
        },

        clean_string : function (s) {
            return s.match(/\S{1,30}/g)
                ? s.match(/\S{1,30}/g).join(' ')
                : '';
        },

        $  : function (s, doc) {
            var elem = s[0] === '#'
                ? (doc || document).querySelector(s)
                : (doc || document).querySelectorAll(s);

            if (elem) {
                elem.replace = function (new_elem) {
                    while (this.firstChild) {
                        this.removeChild(this.firstChild);
                    }
                    this.appendChild(new_elem);
                }
            }

            return elem;
        },

        strip : function (html) {
            return html.replace(/<(?:.|\n)*?>/gm, '');
        },

        scroll_to_element : function (pageElement) {
            var positionX = 0,
                positionY = 0;

            while (pageElement != null) {
                positionX += pageElement.offsetLeft;
                positionY += pageElement.offsetTop;
                pageElement = pageElement.offsetParent;
                window.scrollTo(positionX, positionY);
            }
        },

        retrieve_window_variables : function (variables) {
            var scriptContent = '',
                variable,
                script,
                temp,
                i;

            for (i in variables) {
                variable = variables[i];
                scriptContent += '\
                if (typeof ' + variable + ' !== "undefined"){\n\
                    document.body.setAttribute("tmp_' + variable + '", ' + variable + ');\n\
                }\n';
            }

            script = document.createElement('script');
            script.id = 'temp_script';
            script.appendChild(document.createTextNode(scriptContent));
            (document.body || document.head || document.documentElement).appendChild(script);

            for (i in variables) {
                variable = variables[i];
                variables[i] = document.body.getAttribute('tmp_' + variable);
                document.body.removeAttribute('tmp_' + variable);
            }

            temp = this.$('#temp_script');
            temp.parentElement.removeChild(temp);

            return variables;
        },

        extend : function (obj, source) {
            var prop;

            for (prop in source) {
                if (source.hasOwnProperty(prop)) {
                   obj[prop] = source[prop];
                }
            }

            return obj;
        },

        stringify : function (obj) {
            var ret = [],
                key;

            for (key in obj) {
                ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }

            return ret.join('&');
        },

        get_video_id_from_location : function () {
            return location.search
                .slice(1)
                .split('&')
                .filter(function (a) {
                    a = a.split('=');
                    return a[0] === 'v';
                })[0]
                .split('=')[1];
        },

        light_switch_text : function () {
            return settings.lights
                ? util.locale('dark_mode')
                : util.locale('light_mode');
        },

        analytics_text : function () {
            return settings.realtime_analytics
                ? 'Realtime analytics'
                : 'Analytics';
        },

        comments_text : function () {
            return settings.spam_comments
                ? 'Likely spam comments'
                : util.locale('all_comments');
        }
    };

})(this);

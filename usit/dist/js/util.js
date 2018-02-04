

var gDevice;

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

$.fn.extend({
    cookieList: function (cookieName) {

        var cookie = $.cookie(cookieName);

        var items = [];
        try {
            //console.log('a');  
            items = cookie ? $.secureEvalJSON(cookie) : [];
        }
        catch (err) {
            items = [];
        }
        return {
            add: function (val) {
                var index = items.indexOf(val.toString());
                // Note: Add only unique values.
                if (index == -1) {
                    items.push(val.toString());
                    $.cookie(cookieName, $.toJSON(items), { expires: 1 / 24, path: '/' });
                }
            },
            remove: function (val) {
                var index = items.indexOf(val.toString());

                if (index != -1) {
                    items.splice(index, 1);
                    $.cookie(cookieName, $.toJSON(items), { expires: -1, path: '/' });
                }
            },
            indexes: function (idx) {
                if (items != null) {
                    return items[idx];
                }
                else {
                    return -9;
                }
            },
            indexOf: function (val) {
                if (val == undefined) {
                    return -9;
                }
                else if (items != null) {
                    //	return items.indexOf(val);
                    return items.indexOf(val.toString());
                }
                else {
                    return -9;
                }
            },
            clear: function () {
                items = null;
                $.cookie(cookieName, null, { expires: -1, path: '/' });
            },
            items: function () {
                return items;
            },
            length: function () {
                if (items != null) {
                    return items.length;
                }
                else {
                    return "-1";
                }
            },
            join: function (separator) {
                return items.join(separator);
            }
        };
    }
});


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], function ($) {
            return factory($);
        });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        // Node-like environment
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        device_status = factory(window.jQuery);
        device_status_desc = device_status.desktop + device_status.name + device_status.platform + device_status.version;
        device_status_desc = device_status_desc.replace(/\./g, '-');


        /*if (device_status.name == "msie" && _ver2 < 11) {
            swal("Oops!!", "Please upgrade Internet Explorer to 11. Not supported in the following versions: Internet Explorer 6 standards, Internet Explorer 7 standards, Internet Explorer 8 standards, Internet Explorer 9 standards, Internet Explorer 10 standards.", 'error');
        }
        else {
            rep_list = new Map();
        }

        if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
            swal("Oops!!", "Please upgrade Windows Version. Not supported in the Windows 7", 'error');
        }*/

        gDevice = {
            desktop: device_status.desktop,
            name: device_status.name,
            platform: device_status.platform,
            version: device_status.version,
            mac: device_status.mac,
            getOSType: function () {
                //os name chrome, opr, opera, msie, webkit, safari
                return this.name;
            },

            getDeviceType: function () {

                if (this.mac == undefined) {
                    return 'mac';
                }
                else {
                    return 'windows';
                }
            },
            getDeviceSize: function () {

                if (this.desktop == undefined || this.desktop == false) {
                    return 'mobile';
                }
                else {
                    return 'pc';
                }
            },
            setWarningConsole: function () {
                if (this.name == "chrome" || this.name == "safari") {
                    console.log('%c Stop! ', 'font-size: 100px;color:red');
                    console.log('%c This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Use-Its feature or "hack" someone is account, it is a scam and will give them access to your account. ', 'color: black;font-size:large');
                }
                else {
                    console.log("Hey! Like what you see and enjoy looking under the hood? That's cool. We love curious people. You should join us and help us build great stuff. info@use-it.com")
                }
            }


        }



    }
}(function (jQuery) {
    "use strict";

    function uaMatch(ua) {
        // If an UA is not provided, default to the current browser UA.
        if (ua === undefined) {
            ua = window.navigator.userAgent;
        }
        ua = ua.toLowerCase();

        var match = /(edge)\/([\w.]+)/.exec(ua) ||
            /(opr)[\/]([\w.]+)/.exec(ua) ||
            /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        var platform_match = /(ipad)/.exec(ua) ||
            /(ipod)/.exec(ua) ||
            /(iphone)/.exec(ua) ||
            /(kindle)/.exec(ua) ||
            /(silk)/.exec(ua) ||
            /(android)/.exec(ua) ||
            /(windows phone)/.exec(ua) ||
            /(win)/.exec(ua) ||
            /(mac)/.exec(ua) ||
            /(linux)/.exec(ua) ||
            /(cros)/.exec(ua) ||
            /(playbook)/.exec(ua) ||
            /(bb)/.exec(ua) ||
            /(blackberry)/.exec(ua) ||
            [];

        var browser = {},
            matched = {
                browser: match[5] || match[3] || match[1] || "",
                version: match[2] || match[4] || "0",
                versionNumber: match[4] || match[2] || "0",
                platform: platform_match[0] || ""
            };

        if (matched.browser) {
            browser[matched.browser] = true;
            browser.version = matched.version;
            browser.versionNumber = parseInt(matched.versionNumber, 10);
        }

        if (matched.platform) {
            browser[matched.platform] = true;
        }

        // These are all considered mobile platforms, meaning they run a mobile browser
        if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
            browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"]) {
            browser.mobile = true;
        }

        // These are all considered desktop platforms, meaning they run a desktop browser
        if (browser.cros || browser.mac || browser.linux || browser.win) {
            browser.desktop = true;
        }

        // Chrome, Opera 15+ and Safari are webkit based browsers
        if (browser.chrome || browser.opr || browser.safari) {
            browser.webkit = true;
        }

        // IE11 has a new token so we will assign it msie to avoid breaking changes
        // IE12 disguises itself as Chrome, but adds a new Edge token.
        if (browser.rv || browser.edge) {
            var ie = "msie";

            matched.browser = ie;
            browser[ie] = true;
        }

        // Blackberry browsers are marked as Safari on BlackBerry
        if (browser.safari && browser.blackberry) {
            var blackberry = "blackberry";

            matched.browser = blackberry;
            browser[blackberry] = true;
        }

        // Playbook browsers are marked as Safari on Playbook
        if (browser.safari && browser.playbook) {
            var playbook = "playbook";

            matched.browser = playbook;
            browser[playbook] = true;
        }

        // BB10 is a newer OS version of BlackBerry
        if (browser.bb) {
            var bb = "blackberry";

            matched.browser = bb;
            browser[bb] = true;
        }

        // Opera 15+ are identified as opr
        if (browser.opr) {
            var opera = "opera";

            matched.browser = opera;
            browser[opera] = true;
        }

        // Stock Android browsers are marked as Safari on Android.
        if (browser.safari && browser.android) {
            var android = "android";

            matched.browser = android;
            browser[android] = true;
        }

        // Kindle browsers are marked as Safari on Kindle
        if (browser.safari && browser.kindle) {
            var kindle = "kindle";

            matched.browser = kindle;
            browser[kindle] = true;
        }

        // Kindle Silk browsers are marked as Safari on Kindle
        if (browser.safari && browser.silk) {
            var silk = "silk";

            matched.browser = silk;
            browser[silk] = true;
        }

        // Assign the name and platform variable
        browser.name = matched.browser;
        browser.platform = matched.platform;
        return browser;
    }

    // Run the matching process, also assign the function to the returned object
    // for manual, jQuery-free use if desired
    window.jQBrowser = uaMatch(window.navigator.userAgent);
    window.jQBrowser.uaMatch = uaMatch;

    // Only assign to jQuery.browser if jQuery is loaded
    if (jQuery) {
        jQuery.browser = window.jQBrowser;
    }

    return window.jQBrowser;
}));


function getCurrentTime() {
    var t = "";

    var t1 = new Date();

    var yyyy = t1.getFullYear().toString();
    var mm = (t1.getMonth() + 1).toString();
    var dd = t1.getDate().toString();
    var hh = t1.getHours() < 10 ? "0" + t1.getHours() : t1.getHours();
    var min = t1.getMinutes() < 10 ? "0" + t1.getMinutes() : t1.getMinutes();
    var ss = t1.getSeconds() < 10 ? "0" + t1.getSeconds() : t1.getSeconds();


    t = yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + (dd[1] ? dd : "0" + dd[0]) + ' ' + hh + ':' + min + ":" + ss;

    return t;
}

function getCurrentHour() {
    var t = "";

    var t1 = new Date();

    var yyyy = t1.getFullYear().toString();
    var mm = (t1.getMonth() + 1).toString();
    var dd = t1.getDate().toString();
    var hh = t1.getHours() < 10 ? "0" + t1.getHours() : t1.getHours();
    var min = t1.getMinutes() < 10 ? "0" + t1.getMinutes() : t1.getMinutes();
    var ss = t1.getSeconds() < 10 ? "0" + t1.getSeconds() : t1.getSeconds();


    t = yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + (dd[1] ? dd : "0" + dd[0]) + ' ' + hh + ':' + min + ":00";

    return t;
}


function getCurrentDay() {
    var t = "";
    var t1 = new Date();

    var yyyy = t1.getFullYear().toString();
    var mm = (t1.getMonth() + 1).toString();
    var dd = t1.getDate().toString();


    t = yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);

    return t;
}

function getRealLength(_val) {
    var _len = 0;
    for (var i = 0; i < _val.length; i++) {
        _len += _val.charCodeAt(i) < 128 ? 1 : 2;
    }
    return _len;

}

function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}



function getElapsedTime(str_basetime) {

    var comment = "";
    var date1 = new Date(str_basetime);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());

    var diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    var diffHours = Math.ceil(timeDiff / (1000 * 60 * 60));
    var diffMinutes = Math.ceil(timeDiff / (1000 * 60));
    var diffSeconds = Math.ceil(timeDiff / (1000));

    var c_1 = "at";
    var c_2 = "";
    var c_3 = "Yesterday";
    var c_4 = "hours ago";
    var c_5 = "minutes ago";
    var c_6 = "seconds ago";

    if (date1.getHours() > 12) { c_2 = "pm"; }
    else { c_2 = "am"; }



    var temp_hour = date1.getHours();
    var temp_hours = "";

    var temp_min = date1.getMinutes();
    var temp_mins = "";


    if (temp_hour < 10) {
        temp_hours = temp_hour;
    }
    else if (temp_hour > 12) {
        temp_hours = temp_hour - 12;
    }
    else {
        temp_hours = temp_hour;
    }

    if (temp_min < 10) {
        temp_mins = '0' + temp_min;
    }
    else {
        temp_mins = temp_min;
    }


    if (diffSeconds < 60) {
        // Seconds
        comment = diffSeconds + " " + c_6;
    }
    else if (diffSeconds < 60 * 60) {
        // Minutes
        comment = diffMinutes + " " + c_5;
    }
    else if (diffSeconds < 60 * 60 * 24) {
        // Hours
        comment = diffHours + " " + c_4;
    }
    else if (diffSeconds < 60 * 60 * 24 * 2) {
        // Yesterday
        comment = c_3 + " " + c_1 + " " + temp_hours + ":" + temp_mins + " " + c_2;
    }
    else if (date1.getFullYear() != date2.getFullYear()) {

        comment = (parseInt(date1.getMonth()) + 1) + "/" +
            date1.getDate() + "/" + date1.getFullYear();

    }
    else {
        comment = (parseInt(date1.getMonth()) + 1) + "/" +
            date1.getDate() + " " + c_1 + " " +
            temp_hours + ":" +
            temp_mins + " " + c_2;

    }


    return comment;

}



function running() {
    $("#loading").removeClass("notshowable");
    $("#bdMain").addClass("notshowable");
}

function stopping() {
    $("#loading").addClass("notshowable");
    $("#bdMain").removeClass("notshowable");
}

function showMsg(_msg) {
    $("#txtMsg").html(_msg);
    $(".opb-message-modal").modal('toggle');
}



function round(value, ndec) {
    var n = 10;
    for (var i = 1; i < ndec; i++) {
        n *= 10;
    }

    if (!ndec || ndec <= 0)
        return Math.round(value);
    else
        return Math.round(value * n) / n;
}


function checkEmail(val) {
    if (!val.match(/\S+@\S+\.\S+/)) { // Jaymon's / Squirtle's solution
        // Do something
        return false;
    }
    if (val.indexOf(' ') != -1 || val.indexOf('..') != -1) {
        // Do something
        return false;
    }
    return true;
}


function checkFile(input, _exception) {
    var items = input;
    var lg = input.length; // get length
    var _type = items.type;
    var _size = items.size;
    var _itemsize = Math.round(items.size / 1024 / 1024);

    _type = _type.toLowerCase();


    if (_type.match('image') && _exception) {
        if (_size > 500000) {
            //show an alert to the user
            showMsg("파일 사이즈를 초과 했습니다.(최대 500 KB), 현재 파일 사이즈는 [" + _itemsize + " MB] 입니다");

            return false;
        }
        else {
            return true;
        }
    }
    else {

        if (_size > 50000000) {
            //show an alert to the user
            showMsg("파일 사이즈를 초과 했습니다.(최대 50MB), 현재 파일 사이즈는 [" + _itemsize + " MB] 입니다");
            return false;
        }
        else {
            return true;
        }
    }
}


function showLength(obj, obj2, _limit) {
    var _length = $(obj).val().length;

    $(obj2).text(_length + "/" + _limit);

}


function find(_obj, _val) {
    _found = false;

    for (var idx = 0; idx < _obj.length; idx++) {

        if (_obj[idx].toLowerCase() == _val.toLowerCase()) {
            _found = true;
            idx = _obj.length;
        }
    }

    return _found;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    var encryptedAES = CryptoJS.AES.encrypt(cvalue, "66TADWD9Z86T65WDHZ85T65WECZ7ATAAW98Z7ETAEWDEZ77");

    document.cookie = cname + "=" + encryptedAES + "; path=/;" + expires;
    //console.log(document.cookie);
}



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    if (ca != undefined) {
        // console.log(ca);
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                //  console.log(name);
                //  console.log(c);
                var decrypted = CryptoJS.AES.decrypt(c.substring(name.length, c.length), "66TADWD9Z86T65WDHZ85T65WECZ7ATAAW98Z7ETAEWDEZ77");

                return decrypted.toString(CryptoJS.enc.Utf8);

            }
        }
    }
    return "";
}


function eraseCookie(cname) {
    setCookie(cname, "", -1);
}



function getUrlVars(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
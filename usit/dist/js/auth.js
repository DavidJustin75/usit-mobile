// Use the otherApp variable to retrieve the other app's services
var gStoreStorage;
var gStoreDatabase;
var gDomain = "https://www.usit.co.kr";



// window.fbAsyncInit = function () {
//     FB.init({
//         appId: '927668104076710',
//         xfbml: true,
//         version: 'v2.11'
//     });
//     FB.AppEvents.logPageView();
// };

// (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) { return; }
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDmINsTg5vI5N9aqdGdHTQJJX_B8Ul3-1I",
    authDomain: "usit-5b36b.firebaseapp.com",
    databaseURL: "https://usit-5b36b.firebaseio.com",
    projectId: "usit-5b36b",
    storageBucket: "usit-5b36b.appspot.com",
    messagingSenderId: "550831932751"
};

firebase.initializeApp(config);


// Use the shorthand notation to retrieve the default app's services
gStoreStorage = firebase.storage();
gStoreDatabase = firebase.database();



$(document).ready(function ($) {

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            //This function should be used by other module.
            onAuth();
        } else {
            //This function should be used by other module.
            //onUnAuth();
        }

    });


});





function signUser(email, password) {

    firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
        onInvokeLogin();
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode == 'auth/invalid-email') {
            showMsg("잘못된 메일 형식 입니다.");
        }
        else if (errorCode == 'auth/wrong-password') {
            showMsg("패스 워드 혹은 이메일 정보를 다시 확인 부탁 드립니다.");
        }
        else if (errorCode == 'auth/user-not-found') {
            showMsg("등록되지 않은 사용자 입니다.");
        }
        else {
            showMsg("[" + errorCode + ":" + error.message + "]");
        }
    });
}

function createUser(displayname, email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {

        // $('.opb-register-modal').modal('toggle');

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        //  swal("Oops!!", error.message, 'error');
        showMsg(error.message);

    });
}



$(".btnGoogle").click(function () {

    var user = firebase.auth().currentUser;

    running();
    if (user) {

        //
    } else {

        // No user is signed in.
        // console.log("not logged in");

        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch(function (error) {
            stopping();
            console.log("error");
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            showMsg(errorMessage);
        });
    }
});



$(".btnfacebook").click(function () {

    var user = firebase.auth().currentUser;

    running();
    if (user) {

        //
    } else {

        // Sign in using a redirect.

        // Start a sign in process for an unauthenticated user.
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Facebook Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
        }).catch(function (error) {
            stopping();
            console.log("error");
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;

            showMsg(errorMessage);
        });
    }
});



$(".btnLogOut").click(function () {

    firebase.auth().signOut().then(function () {
        console.log("log out");
    }, function (error) {
        console.log("log out fail");
        // An error happened.
    });

});


function onSignIn(obj)
{
    $this = $(obj);

    if ($this.hasClass('_register_'))
    {

    }
}

function onChangeType(obj)
{
    $this = $(obj);
    if ($this.hasClass('_login_'))
    {
        $("._register_").removeClass("notshowable");
        $("._login_").addClass("notshowable");
    }
    else if ($this.hasClass('_register_'))
    {
        $("._login_").removeClass("notshowable");
        $("._register_").addClass("notshowable");
    }
}


function onCheckPassword(obj)
{
    checkPassword(obj,document.getElementById('txtresponse'));

}


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAxbdJjXl2JYcuVTiRKd7lIcZc5I2HeBK8",
    authDomain: "portfolio-f0afb.firebaseapp.com",
    databaseURL: "https://portfolio-f0afb.firebaseio.com",
    projectId: "portfolio-f0afb",
    storageBucket: "portfolio-f0afb.appspot.com",
    messagingSenderId: "548137266756",
    appId: "1:548137266756:web:6050a446fb37217d3cd611",
    measurementId: "G-SX0ZBPEEL1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


$( document ).ready(function() {
    firebase.database().ref('/user/').once('value').then(function(snapshot) {
        setUserProfile(snapshot.val())
    });
    // firebase.database().ref('/social-media/').once('value').then(function(snapshot) {
    //     setSocialProfile(snapshot.val())
    // });


    //grab a form
    const form = document.querySelector('#contact-me-form');

    //push on form submit
    if (form) {
        //grab an input
        const contactMeName = form.querySelector('#contact-me-name');
        const contactMeEmail = form.querySelector('#contact-me-email');
        const contactMeSubject = form.querySelector('#contact-me-subject');
        const contactMeMessage= form.querySelector('#contact-me-message');

        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            firebasePush(contactMeName,contactMeEmail,contactMeSubject,contactMeMessage);

            //shows alert if everything went well.
            bootstrap_alert_contactme()
            form.reset();
        })
    }


    //grab a form
    const alertBarform = document.querySelector('#alertbar-form');

    //push on form submit
    if (alertBarform) {
        alertBarform.addEventListener('submit', function (evt) {
            evt.preventDefault();
            const alertBarEmail = alertBarform.querySelector('#alertbar-email');
            firebasePushAlertEmail(alertBarEmail);
            //shows alert if everything went well.
            bootstrap_alert_Subscribe();
            alertBarform.reset();
        })
    }


});

function setUserProfile(user) {

    if ($('#user-name')){
        $('#user-name').html(user["name_with_caps"])
    }

    if ( $('#user-title')){$('#user-title').html(user["title"])
       }

    if ($('#user-description')){
        $('#user-description').html(user["description"])
    }
}


function bootstrap_alert_contactme () {
    $('#contact-me-alert_placeholder').append(`<div class="alert alert-success alert-dismissible">
                  <button type="button" class="close" data-dismiss="alert">&times;</button>
                  <strong>Success!</strong> Thanks for contacting me. I will get back to you shortly.
                </div>`);
    alertTimeout(3000); //Called here
}

function bootstrap_alert_Subscribe () {
    $('#contact-me-alert_placeholder').append(`<div class="alert alert-success alert-dismissible" style="margin-top: 10px">
                  <button type="button" class="close" data-dismiss="alert">&times;</button>
                  <strong>Success!</strong> Thanks for subscribing to our newsletter.
                </div>`);
    alertTimeout(2000); //Called here
}

function alertTimeout(wait){
    setTimeout(function(){
        $('#contact-me-alert_placeholder').children('.alert:first-child').fadeOut("slow",function() {
            // After animation completed:
            $( this ).remove();
        })
    }, wait);
}

//create a functions to push
function firebasePush(contactMeName,contactMeEmail,contactMeSubject,contactMeMessage) {
    //prevents from braking
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    //push itself
    var mailsRef = firebase.database().ref('Contact Me Emails').push().set(
        {
            name: contactMeName.value,
            email: contactMeEmail.value,
            subject: contactMeSubject.value,
            message: contactMeMessage.value,
            date: (new Date()).toLocaleString()
        }
    );

}

//create a functions to push
function firebasePushAlertEmail(contactMeEmail) {
    //prevents from braking
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    //push itself
    var mailsRef = firebase.database().ref('Subscribe Me Emails').push().set(
        {
            email: contactMeEmail.value,
            date: (new Date()).toLocaleString()
        }
    );

}





// function setSocialProfile(user) {
//
//     $('#user-github').attr('href', (user["github"]));
//     $('#user-linkedin').attr('href', (user["linkedin"]));
//     $('#user-stack-overflow').attr('href', user["stack-overflow"]);
//     $('#user-twitter').attr('href', user["twitter"]);
// }
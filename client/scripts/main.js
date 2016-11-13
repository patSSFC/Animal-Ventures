console.log("ehy!");
$(document).ready(function(){
    if(typeof(owlCarousel) !== 'undefined') {
        $(".owl-carousel").owlCarousel({
            // loop: true,
            center: true,
            items: 1,
            closeOnEscape: true,
            dots: true
        });
    }

    mixpanel.identify();
    mixpanel.track("Page Load");
    // $("#header_confirm").hide();
    // $("#main-cta-confirm").hide();
    const regEx =
    $(".subscribe-btn").on('click', function(ev) {
        let user_email = $(".email-input").val().trim();
        // const $email_input = $(".email-input");
        if (!user_email || user_email === "") {
            console.log($("#header-wrap .subscribe-wrap .email-input"));
            $('#header-wrap .subscribe-wrap #error-wrap-head').addClass("show");
        } else {
            $('#error-wrap-head').removeClass("show");
            mixpanel.track("Header Email Collection", {"$email": user_email});
            mixpanel.alias(user_email);
            mixpanel.people.set({"$email" : user_email});
            mixpanel.reset();
            $("#header_confirm").dialog({
                modal: true,
                open: function(event, ui) {
                    $('body').addClass('stop-scrolling');
                },
                close: function(even, ui) {
                    $('body').removeClass('stop-scrolling');
                }
            });
            $(".email-input").val('');
        }
    });
    $("#join-cta").on('click', function() {
        $("#main_cta_confirm").dialog({
            modal: true,
            open: function(event, ui) {
                $('body').addClass('stop-scrolling');
            },
            close: function(even, ui) {
                $('body').removeClass('stop-scrolling');
            }
        });
        $(".subscribe-btn-modal").on("click", function() {
            const user_email = $(".email-input").val().trim();
            let $email_input = $(".subscribe-wrap.subscribe-btn");
            if(!user_email || user_email === "" || $email_input.is(":invalid")) {
                $("#error-wrap-cta").addClass("show");
            } else {
                $("#error-wrap-cta").removeClass("show");
            }
        });
        // $('body').addClass('stop-scrolling');
    });
});

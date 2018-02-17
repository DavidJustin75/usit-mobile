/** 


- ---------------------------------------------------------------------
--
-- This Code for Product Detail
--
-- Copyright 2018, Team Tuesday all rights reserved.
--
-- Author:
--  David Justin.
--
-- This javascript may not be copied, installed, or used except for the
-- express purpose of supporting applications supplied by Team Tuesday
-- or its designated agents.
--
-- ---------------------------------------------------------------------


*/
$(document).ready(function ($) {
    
        console.log('::PRODUCTDETAIL::');
    
});



function onShare() {
    $("#usit-sns-modal").modal('toggle');
}

function onShowShareMsg(obj) {
    $("#usit-sns-modal").modal('toggle');

    $this = $(obj);
    if ($this.hasClass('instagram')) {
        $("#usit-share-insta-modal").modal('toggle');
    }
    else if ($this.hasClass('facebook')) {
        $("#usit-share-facebook-modal").modal('toggle');
    }
    else if ($this.hasClass('kakaotalk')) {
        $("#usit-share-kakaotalk-modal").modal('toggle');
    }
    else if ($this.hasClass('kakaostory')) {
        $("#usit-share-kakaostory-modal").modal('toggle');
    }
    else if ($this.hasClass('url')) {
        $("#usit-share-url-modal").modal('toggle');
    }
}
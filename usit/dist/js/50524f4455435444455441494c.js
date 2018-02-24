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
    loadProductDetail();

});

function loadProductDetail() {

    //parse parameter
    var cu = window.location.href;
    var _tmp = getUrlVars2(cu)["_detail"];
    var v_pid = getUrlVars2(_tmp)["_pid"];

    if (v_pid == undefined || v_pid == "") {
        //show Invalid page
        gotonotfound();
    }
    else {

        var v_user = getUrlVars2(_tmp)["_uid"];

        //get data using ajax







        //set global parameter (influencer id)
        //set global parameter (product id)

        //make sentense

    }
}

function purchaseProduct() {

    //check firebase user.Auth()

    //Is it OK. then 
    //1. Insert History
    //2. loadPurchaseHTML()..
    //Check Leave Page event.. when purchase html....


    //If not login, invoke gotologin function


    //!! Just change html contents from load file. 
    //!! Do not call new page.
    //!! This way is more safety...

}

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

function onCofirmInstagramUrl()
{
    $("#usit-share-insta-modal").modal('toggle');
    $("#usit-share-insta-confirm-modal").modal('toggle');
    
}
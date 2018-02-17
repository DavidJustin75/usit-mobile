/** 


- ---------------------------------------------------------------------
--
-- This Code for Main List
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
    
        console.log('::PRODUCTLIST::');
    
});

function onFavorite(obj) {
    $this = $(obj);
    if ($this.hasClass('_unselect_')) {
        $this.html('<i class="material-icons">favorite</i>');
        $this.removeClass('_unselect_');
        $this.addClass('btn-rose');
    }
    else {
        $this.addClass('_unselect_');
        $this.removeClass('btn-rose');
        $this.html('<i class="material-icons">favorite_border</i>');
    }
}

function onClickItem(obj) {
    $this = $(obj);
    $this.children().click();
}

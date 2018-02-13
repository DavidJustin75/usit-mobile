


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
    else if ($this.hasClass('naver')) {
        $("#usit-share-naver-modal").modal('toggle');
    }
    else if ($this.hasClass('url')) {
        $("#usit-share-url-modal").modal('toggle');
    }
}
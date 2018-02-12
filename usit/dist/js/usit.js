


function onFavorite(obj)
{
    $this = $(obj);
    if($this.hasClass('_unselect_'))
    {
        $this.html('<i class="material-icons">favorite</i>');
        $this.removeClass('_unselect_');
        $this.addClass('btn-rose');
    }
    else
    {
        $this.addClass('_unselect_');
        $this.removeClass('btn-rose');
        $this.html('<i class="material-icons">favorite_border</i>');
    }
}
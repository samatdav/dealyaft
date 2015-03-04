$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').focus()
  })


$('#main-retailers').on('hide.bs.dropdown', function (e) {
    var target = $(e.target);
    if(target.hasClass("keepopen") || target.parents(".keepopen").length){
        return false; // returning false should stop the dropdown from hiding.
    }else{
        return true;
    }
});
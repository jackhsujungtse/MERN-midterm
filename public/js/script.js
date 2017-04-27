var html = new EJS({url: 'views/form.ejs'}).render({ID: 1});
$("#ejs-injection").html(html);

$(document).ready(function(){
    $('#usernew').on('click','.btn-post',createUser);
    $('#userinfo').on('click','.read',readUser);
    $('#userinfo').on('click','.update',updateUser);
    $('#userupdate').on('click','.btn-update',submitUser);
    $('#userinfo').on('click','.delete',deleteUser);
});

function createUser(event){
    var errorCount = 0;
    $('#usernew input').each(function(index, val){
        if($(this).val() === ''){errorCount++;}
    });

    if (errorCount === 0 ){
        var newUser = {
            'ArtistName': $('input#ArtistName').val(),
            'ArtistEmail': $('input#ArtistEmail').val(),
            'ArtistPhone': $('input#ArtistPhone').val(),
            'PieceDescription': $('input#PieceDescription').val()
        };
        $.ajax({
            type:'POST',
            data: newUser,
            url:'/person',
            dataType: 'JSON'
        }).done(function(res){
            var html = new EJS ({url : 'views/persons.ejs'}).render(res);
            $("#userinfo").html(html);
            $("input").val('');
        });
    }
    else {
        alert('Please fill in all fields');
        return false;
    }
};

function readUser(event) {
    event.preventDefault();
    // Use AJAX to post the object to our getuser service
    $.ajax({
      type: 'GET',
      url: '/person/' + $(this).attr('rel')
    }).done(function( res ) {
      var html = new EJS({url: 'views/read.ejs'}).render(res);
      $("#userupdate").html(html);
    });
};

// Update User
function updateUser(event) {
    event.preventDefault();
    // Use AJAX to post the object to our getuser service
    $.ajax({
      type: 'GET',
      url: '/person/' + $(this).attr('rel')
    }).done(function( res ) {
      var html = new EJS({url: 'views/update.ejs'}).render(res);
      $("#userupdate").html(html);
    });
};

// Update User Submit
function submitUser(event) {
  var newUser = {
    'ArtistName': $('#ArtistName0').val(),
    'ArtistEmail': $('#ArtistEmail0').val(),
    'ArtistPhone': $('#ArtistPhone0').val(),
    'PieceDescription': $('#PieceDescription0').val()
  };

  // Use AJAX to put the object to our updateuser service
  $.ajax({
    type: 'PUT',
    data: newUser,
    url: '/person/' + $(this).attr('name'),
    dataType: 'JSON'
  }).done(function( res ) {
    $("#userupdate").html("");
    var html = new EJS({url: 'views/persons.ejs'}).render(res);
    $("#userinfo").html(html);
  });
};

// Delete User
function deleteUser(event) {
    event.preventDefault();
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/person/' + $(this).attr('rel')
        }).done(function( res ) {
          var html = new EJS({url: 'views/persons.ejs'}).render(res);
          $("#userinfo").html(html);
        });

    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
};
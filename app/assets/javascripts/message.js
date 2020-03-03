$(function(){

  var buildHTML = function(message) {
    if ( message.body && message.image ) {
      var html = `<div class="chat-main-messages" data-message-id=${ message.id }>
                    <div class="messages-box">
                      <div class="post-contents">
                        <div class="poster">
                          ${ message.user_name }
                        </div>
                        <div class="date">
                          ${ message.created_at }
                        </div>
                      </div>
                      <div class="main-messages">
                        <p class="message-text">
                          ${ message.body }
                        </p>
                      </div>
                      <img src=${ message.image } >
                    </div>
                  </div>`
    } else if ( message.body ) {
      var html = `<div class="chat-main-messages" data-message-id=${ message.id }>
                    <div class="messages-box">
                      <div class="post-contents">
                        <div class="poster">
                          ${ message.user_name }
                        </div>
                        <div class="date">
                          ${ message.created_at }
                        </div>
                      </div>
                      <div class="main-messages">
                        <p class="message-text">
                          ${ message.body }
                        </p>
                      </div>
                    </div>
                  </div>`
    } else if ( message.image ) {
      var html = `<div class="chat-main-messages" data-message-id=${ message.id }>
                    <div class="messages-box">
                      <div class="post-contents">
                        <div class="poster">
                          ${ message.user_name }
                        </div>
                        <div class="date">
                          ${ message.created_at }
                        </div>
                      </div>
                    <div class="main-messages">
                      <img src=${ message.image } >
                    </div>
                  </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()

    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.chat-main-messages:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })

    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
    };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});
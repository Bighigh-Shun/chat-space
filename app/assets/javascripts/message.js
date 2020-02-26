$(function(){

  function buildHTML(message){

    if ( message.image ) {
      var html = `<div class="chat-main-messages">
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
      return html;
    } else {
      var html = `<div class="chat-main-messages">
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
      return html;
    };
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
});
$('form').on('submit', function() {
  var regmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  var regphone = /^1[34578]\d{9}$/;
  var name = $('input[name="name"]');
  var mail = $('input[name="mail"]');
  var phone = $('input[name="phone"]');
  var message = $('textarea[name="message"]');
  if (!name.val()) {
    $('.error').text('姓名不能为空！');
    name.focus().parent().addClass('err');
    return false;
  } else {
    name.parent().removeClass('err');
  }
  if (!mail.val()) {
    $('.error').text('电子邮箱不能为空！');
    mail.focus().parent().addClass('err');
    return false;
  } else {
    mail.parent().removeClass('err');
  }
  if (!(regmail.test(mail.val()))) {
    $('.error').text('请输入有效的电子邮箱！');
    mail.focus().parent().addClass('err');
    return false;
  } else {
    mail.parent().removeClass('err');
  }
  if (!phone.val()) {
    $('.error').text('手机号码不能为空！');
    phone.focus().parent().addClass('err');
    return false;
  } else {
    phone.parent().removeClass('err');
  }
  if (!(regphone.test(phone.val()))) {
    $('.error').text('请输入有效的手机号码！');
    phone.focus().parent().addClass('err');
    return false;
  } else {
    phone.parent().removeClass('err');
  }
  if (!message.val()) {
    $('.error').text('留言不能为空！');
    message.focus().parent().addClass('err');
    return false;
  } else {
    message.parent().removeClass('err');
  }
  $.ajax({
    url: 'http://www.weknet.cn/action.php',
    type: 'POST',
    dataType: 'json',
    data: {
      action: 'feedback',
      lang: 'cn',
      linkman: name.val(),
      email: mail.val(),
      mobile: phone.val(),
      message: message.val()
    }
  }).done(function() {
    $('.wk-contact-form .input').val('');
    $('.error').addClass('success').text('留言成功，我们的工作人员会在近期与您联系，请留意！');
    setTimeout('$(".error").removeClass("success").text("")', 3000);
  }).fail(function() {
    console.log('error');
  }).always(function() {
    // console.log('complete');
  });
  return false;
});

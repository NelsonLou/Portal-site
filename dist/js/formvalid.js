$("form").on("submit",function(){var e=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,r=/^1[34578]\d{9}$/,a=$('input[name="name"]'),t=$('input[name="mail"]'),s=$('input[name="phone"]'),n=$('textarea[name="message"]');return a.val()?(a.parent().removeClass("err"),t.val()?(t.parent().removeClass("err"),e.test(t.val())?(t.parent().removeClass("err"),s.val()?(s.parent().removeClass("err"),r.test(s.val())?(s.parent().removeClass("err"),n.val()?(n.parent().removeClass("err"),$.ajax({url:"http://www.weknet.cn/action.php",type:"POST",dataType:"json",data:{action:"feedback",lang:"cn",linkman:a.val(),email:t.val(),mobile:s.val(),message:n.val()}}).done(function(){$(".wk-contact-form .input").val(""),$(".error").addClass("success").text("留言成功，我们的工作人员会在近期与您联系，请留意！"),setTimeout('$(".error").removeClass("success").text("")',3e3)}).fail(function(){console.log("error")}).always(function(){}),!1):($(".error").text("留言不能为空！"),n.focus().parent().addClass("err"),!1)):($(".error").text("请输入有效的手机号码！"),s.focus().parent().addClass("err"),!1)):($(".error").text("手机号码不能为空！"),s.focus().parent().addClass("err"),!1)):($(".error").text("请输入有效的电子邮箱！"),t.focus().parent().addClass("err"),!1)):($(".error").text("电子邮箱不能为空！"),t.focus().parent().addClass("err"),!1)):($(".error").text("姓名不能为空！"),a.focus().parent().addClass("err"),!1)});
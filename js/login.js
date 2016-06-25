//是否记住密码自动登录
var isRememberPass = false;
//点击显示密码之后，显示密码
$('.passToggler').on('touchstart',function(){
	//改变选择框的对号显示隐藏
	$("#tgPassCheckbox").toggleClass("unchecked");

	//改变输入框的样式
	var _passType = $("input.password").attr("type")=="text"?"password":"text";
	$("input.password").attr({"type":_passType});
});

//当点击记住密码切换的时候
$(".rememberToggler").on('touchstart',function(){
	$("#rmbPassCheckbox").toggleClass("unchecked");

	//改变记住密码全局变量
	isRememberPass = isRememberPass?false:true;
})

//验证用户名和密码是否为空
function isEmpty(_this){
    if($(_this).val().length == 0){
        $('span.formTip').addClass('error');
        return true;
    }
    $('span.formTip').removeClass('error');
    return false;
}

//当某个input框失去焦点的时候就验证触发事件验证文本框是否为空
$('input').on('blur',function(){
    isEmpty(this);
});

//当点击登录按钮之后的事件
$('span.login-btn').on('touchstart',function(){
	var _countEmpty = 0;
	$('input').each(function(){
		_countEmpty += isEmpty(this);
	})
	!_countEmpty && sendLoginInfo($('.username').val(),$('.password').val());
})

//发送登录信息
function sendLoginInfo(_userId,_password){
	$.ajax({
        type: 'post',
        url: "http://datainfo.duapp.com/shopdata/userinfo.php",
        data: {
            status: 'login',
            userID: _userId,
            password: _password
        },
        dataType: 'JSON',
        success: function (data) {
            if(data != '0' && data != '2'){
                 console.log(JSON.parse(data));
            }else{
                console.log('登录失败');
            }
        }
    })
}
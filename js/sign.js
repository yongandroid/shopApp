//全局变量，用户名是否存在,两次密码是否相同
var isUnameExist = false;
var isSamePass = false;

//验证用户名信息
$('input.username').on('blur', function () {
    if(!isEmpty(this)){
        checkHasUname($(this).val());
    }
})

//验证密码
$('input.password').on('blur', function () {
    if(!isEmpty(this)){
        if($(this).attr('data-name')=='确认密码'){
            //如果当前失去焦点的是确认密码，那么就进行密码相同验证
            !checkSamePass() && $(this).next('span').text('两次密码不相同').addClass('errorSec') || $(this).next('span').removeClass('errorSec');
        }
    }
})

//检查两次密码是否相同
function checkSamePass(){
    if($('input.password').eq(0).val()==$('input.password').eq(1).val()){
        isSamePass = !0;
        return !0;
    }
    isSamePass = !1;
    return !1;
}

//检查表单是否为空
//如果不需要返回值，可以直接改为$('input').on('blur')为该function
function isEmpty(_this){
    if($(_this).val().length == 0){
        $(_this).next('span').text($(_this).attr('data-name')+'不能为空').addClass('error');
        return true;
    }
    $(_this).next('span').removeClass('error');
    return false;
}

//检查用户名是否已经存在
function checkHasUname(userStr) {
    $.ajax({
        type: 'post',
        url: "http://datainfo.duapp.com/shopdata/userinfo.php",
        data: {
            status: 'login',
            userID: userStr,
            password: ''
        },
        dataType: 'JSON',
        success: function (data) {
            if (data!="0") {
                //如果用户名已经存在
                isUnameExist = !0;
                $('input.username').next('span').text('用户名已经存在！').addClass('errorSec');
            }else{
                //再次验证，如果用户名不存在
                isUnameExist = !1;
                $('input.username').next('span').removeClass('errorSec');
            }
        }
    })
}

//按下注册按钮之后，进行最后的判断
//当按下注册按钮之后，我们还要对为空与否进行判断，但是会出现一个问题：
//再次验证是否为空，如果不为空——就会将不为空但是用户名重复、密码不相同的提示信息隐藏
//暂时使用的解决方式是：他们使用不同的css名，removeCss一个之后，另一个，依然存在，依然有效并显示

$('#signBtn').on('touchstart',function(){
//    检查两次密码是否相同，因为有时候最后一个表单失去焦点的同时也是按下按钮的时候
    checkSamePass();
    
    //查看空的表单的数量，必须为0
    var _emptyCount = 0;
    for(var i=0;i<$('.form-group input').length;i++){
        _emptyCount += isEmpty($('.form-group input').eq(i));
    }
    if(!_emptyCount && !isUnameExist && isSamePass){
        //展示正在注册的提示框
        $('.signing-wrap').show();
        signIn($('input.username').val(),$('input.password').val());
    }else{
        //不可以注册
    }
});

//提交数据，进行注册
function signIn(userStr,passStr){
    $.ajax({
        type: 'post',
        url: "http://datainfo.duapp.com/shopdata/userinfo.php",
        data: {
            status: 'register',
            userID: userStr,
            password: passStr
        },
        dataType: 'JSON',
        success: function (data) {
            if(data == '1'){
                $(".process").hide();
                $(".signSucc").show();
//                提示注册成功
                setTimeout(function(){
                    location.href = "login.html";
                },1000);
            }
        }
    })
}
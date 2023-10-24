//region define, setter
let idFlag = false;
let pwFlag = false;
let authFlag = false;

let properties = {
    keyboard: [{id:"id"}, {id:"pswd1", secureMode:true}],
    modeProperties: {
        mode: 4
    }
};
let desk = new sofa.Koop(properties);

$(document).ready(function() {
    defaultScript();
    modeOccupancy();
    $("#join_toggle").prop("checked",false);
});

    function defaultScript() {

    $("#join_toggle").change(function() {
        if($("#join_toggle").is(":checked")) {
            nclk(this,'BTN.ONrealNm','','','');
            modeIdentity();
        } else {
            nclk(this,'BTN.OFFrealNm','','','');
            modeOccupancy();
        }
    });

    $("#id").blur(function() {
    idFlag = false;
    checkId();
});

    $("#pswd1").blur(function() {
    pwFlag = false;
    checkPswd1();
    setTimeout('checkPswd1()',1200);
});

    $("#email").blur(function() {
    checkEmail();
});

    $("#name").blur(function() {
    checkName();
});

    $("#birthdayInput").blur(function() {
    checkBirthday();
});

    $("#phoneNo").blur(function() {
    checkPhoneNo();
});

    $("#phoneNo").focusin(function() {
    let obj = $("#btn_telecom");
    obj.attr("aria-expanded", "false");
    obj.parents(".form_item.telecom").removeClass("focus");
});

    // 인증 정보가 수정되면 인증 상태를 취소 - begin
    $("#name").change(function() {
    let joinMode = $("#joinMode").val();
    if(joinMode == "joinIdentity") {
    cancelAuthFlag();
}
});

    $("#birthdayInput").change(function() {
    let joinMode = $("#joinMode").val();
    if(joinMode == "joinIdentity") {
    cancelAuthFlag();
}
});

    $("input[name='identityGender']:radio").change(function () {
    cancelAuthFlag();
});

    $("input[name='foreigner']:radio").change(function () {
    cancelAuthFlag();
});

    $("#phoneNo").change(function() {
    cancelAuthFlag();
});

    $("#nationNo").change(function() {
    cancelAuthFlag();
});
    // 인증 정보가 수정되면 인증 상태를 취소 - end

    $("#btnSend").click(function() {

    checkAndSendSMS();
});

    $("#authNo6").blur(function() {
    checkAuthNo6();
});

    $("#authNo4").blur(function() {
    checkAuthNo4();
});

    $("#btnJoin").click(function() {
    submitClose();
    if(idFlag && pwFlag && authFlag) {
    mainSubmit();
} else {
    setTimeout(function() {
    mainSubmit();
}, 900);
}
});

    $("#btnJuniver").click(function() {
    mainSubmit();
    return false;
});

    $("#agree_all").click(function() {
    setTerms();
})
    $("#agree_01").click(function() {
    viewTerms();
})
    $("#agree_02").click(function() {
    viewTerms();
})
    $("#agree_03").click(function() {
    viewTerms();
})
    $("#agree_04").click(function() {
    viewTerms();
})
    $("#agree_05").click(function() {
    viewTerms();
})

    $("#btnTelecom1").click(function() {
    setTelecom("SKT");
})
    $("#btnTelecom2").click(function() {
    setTelecom("SKR");
})
    $("#btnTelecom3").click(function() {
    setTelecom("KTF");
})
    $("#btnTelecom4").click(function() {
    setTelecom("KTR");
})
    $("#btnTelecom5").click(function() {
    setTelecom("LGT");
})
    $("#btnTelecom6").click(function() {
    setTelecom("LGR");
})

    $("#identityGender1").click(function() {
    checkGenderIdentity();
})
    $("#identityGender2").click(function() {
    checkGenderIdentity();
})
    $("#foreigner1").click(function() {
    checkForeigner();
})
    $("#foreigner2").click(function() {
    checkForeigner();
})

    $("#gender1").click(function() {
    checkGenderOccupancy();
})
    $("#gender2").click(function() {
    checkGenderOccupancy();
})
    $("#gender3").click(function() {
    checkGenderOccupancy();
})

    $("#resendIdentity").click(function() {
    checkAndSendSMS();
})
    $("#resendOccupancy").click(function() {
    checkAndSendSMS();
})

    $("#btnClose").click(function() {
    $("#divPopup").hide();
})
    $("#btnLogin").click(function() {
    location.replace("https://nid.naver.com/nidlogin.login");
})

    $(".form_item .input").focus(function() {
    if ($(this).prop("readonly")) return;
    $(this).parents(".form_item").addClass("focus");
}).blur(function() {
    $(this).parents(".form_item").removeClass("focus");
})

    $(".form_item .input").on("propertychange change keyup paste input", function() {
    if ($(this).val().length === 0 ) {
    $(this).parents(".form_item").removeClass("on");
} else {
    $(this).parents(".form_item").addClass("on");
}
})

    $(".btn_show").click(function() {
    if ($(this).hasClass("hide")) {
    $(this).removeClass("hide");
    $(this).children(".blind").text("비밀번호 숨기기");
    $(this).parents(".form_item").children(".input").attr("type", "text");
} else {
    $(this).addClass("hide");
    $(this).children(".blind").text("비밀번호 보기");
    $(this).parents(".form_item").children(".input").attr("type", "password");
}
})

    $(".btn_telecom").click(function(e) {
    e.stopPropagation();
    if ($(this).attr("aria-expanded") === "true") {
    $(this).attr("aria-expanded", "false");
    $(this).parents(".form_item.telecom").removeClass("focus");
} else {
    $(this).attr("aria-expanded", "true");
    $(this).parents(".form_item.telecom").addClass("focus");
}
})

    $(".telecom_menu .button").click(function() {
    let selectedText = `<span class="blind">통신사 선택</span>` + $(this).children(".text").text();
    $(this).parents(".form_item.telecom").addClass("on");
    $(this).parents(".form_item.telecom").children(".btn_telecom").html(selectedText);
    $(this).parents(".form_item.telecom").children(".btn_telecom").attr("aria-expanded", "false");
    $(this).parents(".form_item.telecom").children(".btn_telecom").parents(".form_item.telecom").removeClass("focus");
})

    $(".check_box .btn_expand").click(function() {
    if ($(this).attr("aria-expanded") == "true") {
    $(this).attr("aria-expanded", "false");
    $(this).parents(".check_box").children(".check_list").removeClass("on");
} else {
    $(this).attr("aria-expanded", "true");
    $(this).parents(".check_box").children(".check_list").addClass("on");
}
})

}

    function checkAndSendSMS() {
    let joinMode = $("#joinMode").val();

    if(joinMode == "joinIdentity") {
    nclk(this,'input.sendRN','','','');
    if (!checkIdentityInput()) {
    return false;
}
    sendSmsButtonIdentity();
} else if(joinMode == "joinOccupancy") {
    nclk(this,'input.send','','','');
    if (!checkOccupancyInput()) {
    return false;
}
    sendSmsButtonOccupancy();
} else {
    return false;
}

    $("#divBtnAuth").hide();
    $("#divBtnJoin").show();
    return false;
}

    function hideAllErrorMessage() {
    $("#nameMsg").hide();
    $("#birthdayMsg").hide();
    $("#telecomMsg").hide();
    $("#genderMsg").hide();
    $("#foreignerMsg").hide();
    $("#phoneNoMsg").hide();
    $("#termAgreeMsg").hide();
    $("#authNoMsg").hide();
}

    function hideJuniverErrorMessage() {
    $("#telecomMsg").hide();
    $("#foreignerMsg").hide();
    $("#phoneNoMsg").hide();
    $("#termAgreeMsg").hide();
    $("#authNoMsg").hide();
}

    function modeIdentity() {
    $("#divTelecom").show();
    $("#divIdentityGender").show();
    $("#divTerm").show();

    $("#divGender").hide();
    $("#divGender").css("border-radius", "");

    $("#divNationNo").hide();

    $("#divPhoneNo").show();

    $("#divAuthNo6").hide();
    $("#divAuthNo4").hide();

    $("#divBtnAuth").show();
    $("#divBtnJoin").hide();
    $("#divBtnJuniver").hide();

    hideAllErrorMessage();
    $("#divToggle").show();

    $("#joinMode").val("joinIdentity");
    authFlag = false;
}

    function modeOccupancy() {
    $("#divTelecom").hide();
    $("#divIdentityGender").hide();
    $("#divTerm").hide();

    $("#divGender").show();
    $("#divGender").css("border-radius", "");

    $("#divNationNo").show();
    $("#divPhoneNo").show();

    $("#divAuthNo6").hide();
    $("#divAuthNo4").hide();

    $("#divBtnAuth").show();
    $("#divBtnJoin").hide();
    $("#divBtnJuniver").hide();

    hideAllErrorMessage();
    $("#divToggle").show();

    $("#joinMode").val("joinOccupancy");
    authFlag = false;
}

    function modeJuniver() {
    $("#divTelecom").hide();
    $("#divIdentityGender").hide();
    $("#divTerm").hide();

    $("#divGender").show();
    $("#divGender").css("border-radius", "0 0 6px 6px");

    $("#divNationNo").hide();
    $("#divPhoneNo").hide();

    $("#divAuthNo6").hide();
    $("#divAuthNo4").hide();

    $("#divBtnAuth").hide();
    $("#divBtnJoin").hide();
    $("#divBtnJuniver").show();

    hideJuniverErrorMessage();
    $("#divToggle").hide();

    $("#joinMode").val("joinJuniver");
    authFlag = false;
}

    function cancelAuthFlag() {
    authFlag = false;
    $("#divToggle").show();
    $("#divAuthNo6").hide();
    $("#divAuthNo4").hide();
    $("#authNoMsg").hide();

    $("#divBtnJoin").hide();
    $("#divBtnAuth").show();
}

    function submitClose() {
    $("#btnJoin").attr("disabled",true);
}

    function submitOpen() {
    $("#btnJoin").attr("disabled",false);
}

    function mainSubmit() {
    let joinMode = $("#joinMode").val();

    if(joinMode == "joinIdentity") {
    nclk(this,'BTN.signupRN','','','');
    if (!checkIdentityInput()
    || !checkAuthNo6()
    ) {
    submitOpen();
    return false;
}
} else if(joinMode == "joinOccupancy") {
    nclk(this,'BTN.signup','','','');
    if (!checkOccupancyInput()
    || !checkAuthNo4()
    ) {
    submitOpen();
    return false;
}
} else {
    nclk(this,'BTN.prntsAgr','','','');
    if (!checkJuniverInput()) {
    submitOpen();
    return false;
}
    $("#join_form").attr("action", "/user2/join/prtsBegin");

    if(idFlag && pwFlag) {
    submitClose();
    try {
    desk.f(function(a) {
    $("#nid_kb2").val(a);
    $("#join_form").submit();
});
} catch (e) {
    $("#nid_kb2").val("join v2 error: " + e.name + ", " + e.message);
    $("#join_form").submit();
}
} else {
    submitOpen();
    return false;
}
}

    if(idFlag && pwFlag && authFlag) {
    try {
    desk.f(function(a) {
    $("#nid_kb2").val(a);
    $("#join_form").submit();
});
} catch (e) {
    $("#nid_kb2").val("join v2 error: " + e.name + ", " + e.message);
    $("#join_form").submit();
}
    submitClose();
} else {
    submitOpen();
    return false;
}
}

    function checkIdentityInput() {
    if (checkId()
    & checkPswd1()
    & checkEmail()
    & checkName()
    & checkBirthday()
    & checkTelecom()
    & checkForeigner()
    & checkGenderIdentity()
    & checkPhoneNo()
    & checkAgree()
    ) {
    return true;
} else {
    return false;
}
}

    function checkOccupancyInput() {
    if (checkId()
    & checkPswd1()
    & checkEmail()
    & checkName()
    & checkBirthday()
    & checkGenderOccupancy()
    & checkPhoneNo()
    ) {
    return true;
} else {
    return false;
}
}

    function checkJuniverInput() {
    if (checkId()
    & checkPswd1()
    & checkEmail()
    & checkName()
    & checkBirthday()
    & checkGenderOccupancy()
    ) {
    return true;
} else {
    return false;
}
}

    function checkAgree() {
    var oMsg = $("#termAgreeMsg");
    let oDiv = $("#itemAgree");
    if (!$("#agree_all").is(":checked")) {
    showClearErrorMsg(oMsg, "필수 약관에 모두 동의해 주세요.");
    oDiv.addClass("error");
    cancelAuthFlag();
    return false;
}
    hideMsg(oMsg);
    oDiv.removeClass("error");
    return true;
}

    function setTerms() {
    if ($("#agree_all").is(":checked")) {
    $("#agree_01").prop("checked",true);
    $("#agree_02").prop("checked",true);
    $("#agree_03").prop("checked",true);
    $("#agree_04").prop("checked",true);
    $("#agree_05").prop("checked",true);
} else {
    $("#agree_01").prop("checked",false);
    $("#agree_02").prop("checked",false);
    $("#agree_03").prop("checked",false);
    $("#agree_04").prop("checked",false);
    $("#agree_05").prop("checked",false);
}
    checkAgree();
    return true;
}

    function viewTerms() {
    if( !$("#agree_01").is(":checked")
    || !$("#agree_02").is(":checked")
    || !$("#agree_03").is(":checked")
    || !$("#agree_04").is(":checked")
    || !$("#agree_05").is(":checked")) {
    $("#agree_all").prop("checked",false);
}
    if( $("#agree_01").is(":checked")
    && $("#agree_02").is(":checked")
    && $("#agree_03").is(":checked")
    && $("#agree_04").is(":checked")
    && $("#agree_05").is(":checked")) {
    $("#agree_all").prop("checked",true);
}
    checkAgree();
    return true;
}

    function showErrorMsg(obj, msg) {
    obj.attr("class", "error_text item_style");
    obj.html(msg);
    obj.show();
}

    function showSuccessMsg(obj, msg) {
    obj.attr("class", "notice_text item_style");
    obj.html(msg);
    obj.show();
}

    function showClearErrorMsg(obj, msg) {
    obj.attr("class", "error_text");
    obj.html(msg);
    obj.show();
}

    function showClearSuccessMsg(obj, msg) {
    obj.attr("class", "notice_text");
    obj.html(msg);
    obj.show();
}

    function hideMsg(obj) {
    obj.hide();
}

    function checkId() {
    let id = $("#id").val();
    let oMsg = $("#idMsg");
    let oDiv = $("#divId");

    if(idFlag) {
    oMsg.hide();
    return true;
}

    if ( id == "") {
    showErrorMsg(oMsg,"아이디: 필수 정보입니다.");
    oDiv.addClass("error");
    return false;
}

    let isID = /^[a-z0-9][a-z0-9_\-]{4,19}$/;
    if (!isID.test(id)) {
    showErrorMsg(oMsg,"아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
    oDiv.addClass("error");
    return false;
}

    idFlag = false;
    let key = $("#token_sjoin").val();

    $.ajax({
    type:"GET",
    url: "/user2/joinAjax?m=checkId&id=" + id + "&key=" + key,
    success : function(data) {
    let result = data.substr(4);

    if (result == "Y") {
    idFlag = true;
    oMsg.hide();
    oDiv.removeClass("error");
} else {
    showErrorMsg(oMsg, "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요.");
    oDiv.addClass("error");
}
}
});
    return true;
}

    function checkPswd1() {
    let id = $("#id").val();
    let pw = $("#pswd1").val();
    let oMsg = $("#pswd1Msg");
    let oDiv = $("#divPasswd");
    let oLevel = $("#secureLevel");

    if(pwFlag) {
    oMsg.hide();
    oDiv.removeClass("error");
    return true;
}

    if (pw == "") {
    showErrorMsg(oMsg,"비밀번호: 필수 정보입니다.");
    oDiv.addClass("error");
    oLevel.attr("class", "how_secure");
    oLevel.html("")
    return false;
}
    if (isValidPasswd(pw) != true) {
    showErrorMsg(oMsg,"비밀번호: 8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.");
    oDiv.addClass("error");
    oLevel.attr("class", "how_secure on dangerous");
    oLevel.html("사용불가")
    return false;
}

    pwFlag = false;
    $.ajax({
    type:"GET",
    url: "/user2/joinAjax?m=checkPswd&id=" + escape(encodeURIComponent(id)) + "&pw=" + escape(encodeURIComponent(pw)) ,
    success : function(data) {
    let result = data.substr(4);
    if (result == 4) {
    oLevel.attr("class", "how_secure on safe");
    oLevel.html("안전")
} else if (result == 3) {
    oLevel.attr("class", "how_secure on");
    oLevel.html("보통")
} else if (result == 2) {
    oLevel.attr("class", "how_secure on dangerous");
    oLevel.html("위험")
} else {    // 1 or else
    oLevel.attr("class", "how_secure on dangerous");
    oLevel.html("사용불가")
    return false;
}
    oMsg.hide();
    oDiv.removeClass("error");
    pwFlag = true;
    createRsaKey();
}
});
    return true;
}

    function checkSpace(str) {
    if (str.search(/\s/) != -1) {
    return true;
} else {
    return false;
}
}

    function getLenChar(texts) {
    texts = texts + '';
    return String.fromCharCode(texts.length);
}

    function createRsaKey() {
    let rsa = new RSAKey();
    let sessionKey = "jaqIa8RH8GSs9BI3";
    let keyName = "100019027";
    let eValue = "8bbcd2724600943766898dbdbeb2638ae1fbe14012b9bfcd4c7506d8fc261f0eadee5756878fb284c9fd60e7df913669e7ff729e7c0a3c52e5fdca26dd6b484e643d88d35ae99b78e9e48132f311c6cf2ab05aeddb3b3bff59fdc85b4d5677f527c4fd3b18fc571fc52d9d602c4961b803c77ec4ad75db3809e1ecdcc362eb43";
    let nValue = "010001";

    let id = $("#id").val();
    let pw = $("#pswd1").val();
    rsa.setPublic(eValue, nValue);

    let comVal = getLenChar(sessionKey) + sessionKey + getLenChar(id) + id;
    $("#encPswd").val(rsa.encrypt(comVal + getLenChar(pw) + pw));
    $("#encKey").val(keyName);
}

    function isValidPasswd(str) {
    let cnt = 0;
    if (str == "") {
    return false;
}

    /* check whether input value is included space or not */
    let retVal = checkSpace(str);
    if (retVal) {
    return false;
}
    if (str.length < 8) {
    return false;
}
    for (let i = 0; i < str.length; ++i) {
    if (str.charAt(0) == str.substring(i, i + 1))
    ++cnt;
}
    if (cnt == str.length) {
    return false;
}

    let isPW = /^[A-Za-z0-9`\-=\\\[\];',\./~!@#\$%\^&\*\(\)_\+|\{\}:"<>\?]{8,16}$/;
    if (!isPW.test(str)) {
    return false;
}

    return true;
}

    function checkEmail() {
    let id = $("#id").val();
    let email = $("#email").val();
    let oMsg = $("#emailMsg");
    let oDiv = $("#divEmail");

    if (email == "") {
    hideMsg(oMsg);
    oDiv.removeClass("error");
    return true;
}

    let isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isHan = /[ㄱ-ㅎ가-힣]/g;
    if (!isEmail.test(email) || isHan.test(email)) {
    showErrorMsg(oMsg,"이메일: 이메일 주소가 정확한지 확인해 주세요.");
    oDiv.addClass("error");
    return false;
}
    if (email == id + "@naver.com") {
    showErrorMsg(oMsg,"이메일: 가입중인 아이디는 사용하실 수 없습니다.");
    oDiv.addClass("error");
    return false;
}

    hideMsg(oMsg);
    oDiv.removeClass("error");
    return true;
}

    function checkName() {
    let oMsg = $("#nameMsg");
    let nonchar;

    nonchar = /[^가-힣a-zA-Z0-9]/gi;

    let name = $("#name").val();
    let oDiv = $("#divName");
    if (name == "") {
    showErrorMsg(oMsg,"이름: 필수 정보입니다.");
    oDiv.addClass("error");
    return false;
}
    if (name != "" && nonchar.test(name)) {
    showErrorMsg(oMsg,"이름: 한글, 영문 대/소문자를 사용해 주세요. (특수기호, 공백 사용 불가)");
    oDiv.addClass("error");
    return false;
}

    hideMsg(oMsg);
    oDiv.removeClass("error");
    return true;
}

    function YMDFormatter(num){
    if(!num) return "";
    let formatNum = '';

    try{
    if(num.length == 8) {
    formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3');
}
} catch(e) {
    formatNum = num;
}
    return formatNum;
}

    function checkBirthday() {
    let joinMode = $("#joinMode").val();
    let birthday = $("#birthdayInput").val();
    let oMsg = $("#birthdayMsg");
    let oDiv = $("#divBirthday");

    if (birthday == "") {
    showErrorMsg(oMsg,"생년월일: 필수 정보입니다.");
    oDiv.addClass("error");
    return false;
}

    birthday = birthday.replace(/ /gi, "").replace(/\./gi, "");
    if (birthday.length != 8) {
    showErrorMsg(oMsg,"생년월일: 생년월일은 8자리 숫자로 입력해 주세요.");
    oDiv.addClass("error");
    return false;
}
    if (!isValidDate(birthday)) {
    showErrorMsg(oMsg,"생년월일: 생년월일이 정확한지 확인해 주세요.");
    oDiv.addClass("error");
    return false;
}
    $("#birthdayInput").val(YMDFormatter(birthday));
    $("#birthday").val(birthday);

    let age = calcAge(birthday);
    if (age < 0) {
    showErrorMsg(oMsg,"생년월일: 생년월일이 정확한지 확인해 주세요.");
    oDiv.addClass("error");
    return false;
} else if (age >= 110) {
    showErrorMsg(oMsg,"생년월일: 생년월일이 정확한지 확인해 주세요.");
    oDiv.addClass("error");
    return false;
} else if (age < 14) {


    modeJuniver();
    showSuccessMsg(oMsg,"생년월일: 만 14세 미만의 어린이는 보호자의 동의가 필요합니다.");
    oDiv.removeClass("error");
    $("#authNoMsg").hide();
    return true;

} else {
    hideMsg(oMsg);
    oDiv.removeClass("error");
    $("#authNoMsg").hide();

    if(joinMode == "joinJuniver") {
    modeOccupancy();
}
    return true;
}
}

    function setTelecom(code) {
    let oldTelecom = $("#telecom").val();
    if(oldTelecom != code) {
    cancelAuthFlag();
}

    $("#telecom").val(code);
    checkTelecom();
}

    function checkTelecom() {
    let telecom = $("#telecom").val();
    let oMsg = $("#telecomMsg");
    let oDiv = $("#divTelecom");

    if (telecom == "") {
    showErrorMsg(oMsg,"통신사: 이용하는 통신사를 선택해 주세요.");
    oDiv.addClass("error");
    return false;
}

    hideMsg(oMsg);
    oDiv.removeClass("error");
    return true;
}

    function checkGenderIdentity() {
    let oMsg = $("#genderMsg");
    let oDiv = $("#divIdentityGender");
    let oList = $("#listIdentityGender");

    if( !$("#identityGender1").is(":checked")
    && !$("#identityGender2").is(":checked")
    ) {
    showErrorMsg(oMsg,"성별: 성별을 선택해 주세요.");
    oDiv.addClass("error");
    oList.addClass("error");
    return false;
}

    hideMsg(oMsg);
    oDiv.removeClass("error");
    oList.removeClass("error");
    return true;
}

    function checkForeigner() {
    let oMsg = $("#foreignerMsg");
    let oDiv = $("#divIdentityGender");
    let oList = $("#listForeigner");

    if( !$("#foreigner1").is(":checked")
    && !$("#foreigner2").is(":checked")
    ) {
    showErrorMsg(oMsg,"내/외국인: 내/외국인 중 선택해 주세요.");
    oDiv.addClass("error");
    oList.addClass("error");
    return false;
}

    hideMsg(oMsg);
    oDiv.removeClass("error");
    oList.removeClass("error");
    return true;
}

    function checkGenderOccupancy() {
    let oMsg = $("#genderMsg");
    let oDiv = $("#divGender");
    let oList = $("#listGender");

    if( !$("#gender1").is(":checked")
    && !$("#gender2").is(":checked")
    && !$("#gender3").is(":checked")
    ) {
    showErrorMsg(oMsg,"성별: 성별을 선택해 주세요.");
    oDiv.addClass("error");
    oList.addClass("error");
    return false;
}

    hideMsg(oMsg);
    oDiv.removeClass("error");
    oList.removeClass("error");
    return true;
}

    function PhoneNoFormatter(num){
    if(!num) return "";
    let formatNum = '';

    try{
    if(num.length == 10) {
    formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
} else if(num.length == 11) {
    formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
} else {
    formatNum = num;
}
} catch(e) {
    formatNum = num;
}
    return formatNum;
}

    function checkPhoneNo() {
    let nationNo = $("#nationNo").val();
    let phoneNo = $("#phoneNo").val();
    let oMsg = $("#phoneNoMsg");
    let oDiv = $("#divPhoneNo");

    if (phoneNo == "") {
    showErrorMsg(oMsg,"휴대전화번호: 필수 정보입니다.");
    oDiv.addClass("error");
    return false;
}

    phoneNo = phoneNo.replace(/ /gi, "").replace(/-/gi, "");
    if(nationNo == "82" && !isCellPhone(phoneNo)) {
    showErrorMsg(oMsg,"휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.");
    oDiv.addClass("error");
    return false;
}

    if(nationNo == "82") {
    $("#phoneNo").val(PhoneNoFormatter(phoneNo));
} else {
    $("#phoneNo").val(phoneNo);
}
    hideMsg(oMsg);
    oDiv.removeClass("error");
    return true;
}

    function sendSmsButtonIdentity() {
    let name = $("#name").val();
    let foreign;
    if( $("input[name='foreigner']:checked").val() == "K") {
    foreign = "N";
} else {
    foreign = "Y";
}
    let identityGender;
    if( $("input[name='identityGender']:checked").val() == "M") {
    identityGender = "M";
} else {
    identityGender = "F";
}
    let birthday = $("#birthday").val();
    let telecom = $("#telecom").val();
    let phoneNo = $("#phoneNo").val();
    let key = $("#token_sjoin").val();
    let oMsg = $("#authNoMsg");
    phoneNo = phoneNo.replace(/ /gi, "").replace(/-/gi, "");

    authFlag = false;
    $.ajax({
    type:"GET",
    url: "/user2/joinAjax?m=sendIdentityAuthno&sex=" + identityGender + "&foreign=" + foreign
    + "&birthday=" + birthday + "&telecom=" + telecom
    + "&mobno=" + phoneNo
    + "&key=" + key + "&nm=" + escape(encodeURIComponent(name)) ,
    success : function() {
    showClearSuccessMsg(oMsg,"인증번호를 발송했습니다.<br>인증 문자가 오지 않으면 이름/생년월일/통신사/전화번호 등이 정확한지 또는 <a href='https://help.naver.com/alias/membership/p.membership/p.membership_170.naver' class='link' target='_blank'>가입 인증 문자 도움말</a>을 확인해 보세요.");
    $("#divAuthNo6").show();
    $("#divToggle").hide();
    $("#authNo6").val("");
}
});
    return false;
}

    function sendSmsButtonOccupancy() {
    let nationNo = $("#nationNo").val();
    let phoneNo = $("#phoneNo").val();
    let key = $("#token_sjoin").val();
    let oMsg = $("#authNoMsg");
    let lang = "ko_KR";
    let id = $("#id").val();
    phoneNo = phoneNo.replace(/ /gi, "").replace(/-/gi, "");

    authFlag = false;
    $.ajax({
    type:"GET",
    url: "/user2/joinAjax?m=sendAuthno&nationNo=" + nationNo + "&mobno=" + phoneNo + "&lang=" + lang + "&key=" + key + "&id=" + id,
    success : function(data) {
    let result = data.substr(4);
    if (result == "S") {
    showClearSuccessMsg(oMsg,"인증번호를 발송했습니다.<br>인증 문자가 오지 않으면 입력 정보가 정확한지 또는 <a href='https://help.naver.com/alias/membership/p.membership/p.membership_170.naver' class='link' target='_blank'>가입 인증 문자 도움말</a>을 확인해 보세요.");
} else {
    showClearErrorMsg(oMsg,"휴대전화번호: 휴대전화번호가 정확한지 확인해 주세요.");
}
    $("#divAuthNo4").show();
    $("#divToggle").hide();
    $("#authNo4").val("");
}
});
    return true;
}

    function checkAuthNo6() {
    let authNo6 = $("#authNo6").val();
    let oMsg = $("#authNoMsg");
    let oDiv = $("#divAuthNo6");

    if (authNo6 == "") {
    showClearErrorMsg(oMsg,"인증이 필요합니다.");
    oDiv.addClass("error");
    return false;
}

    if(authFlag) {
    showClearSuccessMsg(oMsg,"인증이 성공했습니다.");
    oDiv.removeClass("error");
    return true;
} else {
    checkAuthnoByAjax6();
}
    return true;
}

    function checkAuthNo4() {
    let authNo = $("#authNo4").val();
    let oMsg = $("#authNoMsg");
    let oDiv = $("#divAuthNo4");

    if (authNo == "") {
    showClearErrorMsg(oMsg,"인증이 필요합니다.");
    oDiv.addClass("error");
    return false;
}

    if(authFlag) {
    showSuccessMsg(oMsg,"인증이 성공했습니다.");
    oDiv.removeClass("error");
    return true;
} else {
    checkAuthnoByAjax4();
}
    return true;
}

    function checkAuthnoByAjax6() {
    let name = $("#name").val();
    let foreign;
    if( $("input[name='foreigner']:checked").val() == "K") {
    foreign = "N";
} else {
    foreign = "Y";
}
    let identityGender;
    if( $("input[name='identityGender']:checked").val() == "M") {
    identityGender = "M";
} else {
    identityGender = "F";
}
    let birthday = $("#birthday").val();
    let telecom = $("#telecom").val();
    let phoneNo = $("#phoneNo").val();
    let key = $("#token_sjoin").val();
    let oMsg = $("#authNoMsg");
    let oDiv = $("#divAuthNo6");
    let authNo = $("#authNo6").val();
    phoneNo = phoneNo.replace(/ /gi, "").replace(/-/gi, "");

    $("#authNoMsg").hide();
    $.ajax({
    type:"GET",
    url: "/user2/joinAjax?m=checkIdentityAuthno&sex=" + identityGender + "&foreign=" + foreign
    + "&birthday=" + birthday + "&telecom=" + telecom
    + "&mobno=" + phoneNo
    + "&authno=" + authNo
    + "&key=" + key + "&nm=" + escape(encodeURIComponent(name)) ,
    success : function(data) {
    const result = data.substr(4);
    const words = result.split(',');
    const rtnCode = words[0];
    if (rtnCode == "S") {
    if(words.length == 1) {
    showClearSuccessMsg(oMsg,"인증이 성공했습니다.");
    $("#phoneNoMsg").hide();
    oDiv.removeClass("error");
    authFlag = true;
    submitOpen();
} else {
    oMsg.hide();
    $("#phoneNoMsg").hide();

    let oPopup = $("#divPopup");
    let oList = $("#listPopup");
    let html = "";
    for(let i=1; i< words.length; i++) {
    html = html + '<li class="id_item">'+words[i]+"</li>";
}
    oPopup.show();
    oList.html(html);
}
} else if (rtnCode == "Cnt") {
    showClearErrorMsg(oMsg,"인증을 다시 진행해주세요.");
    oDiv.addClass("error");
} else {
    showClearErrorMsg(oMsg,"인증번호를 정확하게 다시 입력해 주세요.");
    oDiv.addClass("error");
}
}
});
    return true;
}

    function checkAuthnoByAjax4() {
    let authNo = $("#authNo4").val();
    let key = $("#token_sjoin").val();
    let oMsg = $("#authNoMsg");
    let oDiv = $("#divAuthNo4");

    $.ajax({
    type:"GET",
    url: "/user2/joinAjax?m=checkAuthno&authno=" + authNo + "&key=" + key ,
    success : function(data) {
    let result = data.substr(4);
    if (result == "S") {
    showClearSuccessMsg(oMsg,"인증이 성공했습니다.");
    $("#phoneNoMsg").hide();
    oDiv.removeClass("error");
    authFlag = true;
    submitOpen();
} else if (result == "Cnt") {
    showClearErrorMsg(oMsg,"인증을 다시 진행해주세요.");
    oDiv.addClass("error");
} else {
    showClearErrorMsg(oMsg,"인증번호를 정확하게 다시 입력해 주세요.");
    oDiv.addClass("error");
}
}
});
    return true;
}

    function calcAge(birth) {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    if (month < 10)
    month = '0' + month;
    if (day < 10)
    day = '0' + day;
    let monthDay = month + '' + day;

    birth = birth.replace('-', '').replace('-', '');
    let birthdayy = birth.substr(0, 4);
    let birthdaymd = birth.substr(4, 4);

    let age = monthDay < birthdaymd ? year - birthdayy - 1 : year - birthdayy;
    return age;
}

    function isValidDate(param) {
    try {
    param = param.replace(/-/g, '');

    // 자리수가 맞지않을때
    if (isNaN(param) || param.length != 8) {
    return false;
}

    let year = Number(param.substring(0, 4));
    let month = Number(param.substring(4, 6));
    let day = Number(param.substring(6, 8));

    if (month < 1 || month > 12) {
    return false;
}

    let maxDaysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    let maxDay = maxDaysInMonth[month - 1];

    // 윤년 체크
    if (month == 2 && (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)) {
    maxDay = 29;
}

    if (day <= 0 || day > maxDay) {
    return false;
}
    return true;

} catch (err) {
    return false;
}
    ;
}

    function isCellPhone(p) {
    let regPhone = /^((01[1|6|7|8|9])[1-9][0-9]{6,7})$|(010[1-9][0-9]{7})$/;
    return regPhone.test(p);
}
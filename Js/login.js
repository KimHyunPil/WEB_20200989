addJavascript('/Js/security.js'); // 암복호화 함수
addJavascript('/Js/session.js'); // 세션 함수
addJavascript('/Js/cookie.js'); // 쿠키 함수

function login_check(id, password) {
    // 정규 표현식을 사용하여 공백이 있는지 확인
    var re = /\s/g;

    // 아이디 또는 비밀번호에 공백이 있는 경우
    if (re.test(id) || re.test(password)) {
        alert("아이디와 비밀번호에는 공백을 포함할 수 없습니다.");
        return false;
    }
    return true;
}

function login_count() {
    var login_cnt = getCookie("login_cnt");

    if (login_cnt === undefined) {
        // login_cnt 쿠키가 없으면, 첫 로그인이므로 쿠키를 생성하고 값을 1로 설정합니다.
        setCookie("login_cnt", 1, 7); // 7일 동안 유지되는 쿠키를 설정합니다.
    } else {
        // 이미 login_cnt 쿠키가 있다면, 이 값을 증가시킵니다.
        setCookie("login_cnt", Number(login_cnt) + 1, 7); // 쿠키의 유효기간을 7일로 유지합니다.
    }
}

function logout_count() {
    var logout_cnt = getCookie("logout_cnt");

    if (logout_cnt === undefined) {
        // logout_cnt 쿠키가 없으면, 첫 로그아웃이므로 쿠키를 생성하고 값을 1로 설정합니다.
        setCookie("logout_cnt", 1, 7); // 7일 동안 유지되는 쿠키를 설정합니다.
    } else {
        // 이미 logout_cnt 쿠키가 있다면, 이 값을 증가시킵니다.
        setCookie("logout_cnt", Number(logout_cnt) + 1, 7); // 쿠키의 유효기간을 7일로 유지합니다.
    }
}


function login(){
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");

	 if (!login_check(id.value, password.value)) {
        return;
    }
	
    if(check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.");
        setCookie("id", id.value, 1); // 1일 저장
        alert("쿠키 값 :" + id.value);
    } 
    else { // 아이디 체크 x
        setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }
    
    form.action = "/index_login.html";
    form.method = "get";
    
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }else{
        session_set();
        login_count();  // 로그인 횟수 증가 함수 호출
        form.submit();
    }
	
	if(check.checked == true) { // 아이디 체크 o
            alert("쿠키를 저장합니다.");
            setCookie("id", id.value, 1); // 1일 저장
            alert("쿠키 값 :" + id.value);
        } 
    else { // 아이디 체크 x
            setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }
}
	
    


	
	
function logout() {
    session_del(); // 세션 삭제
    logout_count();  // 로그아웃 횟수 증가 함수 호출
    location.href='/index.html';
}

function get_id(){
	if(true){
        decrypt_text();
    }
    else{

    var getParameters = function(paramName){ // 변수 = 함수(이름)
    var returnValue; // 리턴값을 위한 변수 선언
    var url = location.href; // 현재 접속 중인 주소 정보 저장
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for(var i = 0; i < parameters.length; i++) { 
		    var varName = parameters[i].split('=')[0];
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
		    }
	    } // 2중 for문 끝
}; // 함수 끝
alert(getParameters('id') + '님 방갑습니다!'); // 메시지 창 출력
}}


function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
	session_check();
}

//<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script> 
	function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
};


function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b); 
}
	
	
function addJavascript(jsname){// 자바스크립트 외부 연동
	         var th = document.getElementsByTagName('head')[0];
             var s = document.createElement('script');
	         s.setAttribute('type','text/javascript');
	         s.setAttribute('src',jsname);
	         th.appendChild(s);
} 
	
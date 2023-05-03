document.getElementById("search_btn").addEventListener('click', search_message);

let search_array = [];

function search_message(){
	alert("검색을 수행한다!");
	let search_str = document.querySelector("#search_txt");
	if(search_str.value.length === 0){ // 문자 길이, 엄격한 비교
       alert("검색어가 비었습니다. 입력해주세요"); 
    }
	
	else if(no_str(search_str.value))
		{
			alert("뗵");
		}
    else{
       alert("검색을 수행합니다!");
		if(search_array.length >= 10){
		  search_array.shift();	
		}
		search_array.push(search_str.value);
       let text = document.getElementById("search_message").innerHTML = search_array.toString();
       document.querySelector("#form_main").submit();
    }
}


function no_str(input)
{
	let tlqkf = ["시발", "혐", "좆"];
	
	for(let whw of tlqkf){
	if(input == whw)
		{
			return true;
		}

	}
	return false;
}
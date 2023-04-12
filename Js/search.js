document.getElementById("search_btn").addEventListener('click', search_message);

function search_message(){
	alert("검색을 수행한다!");
	let search_str = document.querySelector("#search_txt");
	document.getElementById("search_message").innerHTML = search_str.value;
	console.log(search_str.value);
}


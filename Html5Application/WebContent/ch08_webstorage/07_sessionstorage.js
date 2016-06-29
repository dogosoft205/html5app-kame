var storage = sessionStorage;
var product = document.getElementById("product");
var price = document.getElementById("price");
var quantity = document.getElementById("quantity");
var dataArea = document.getElementById("dataArea");
var wishList = document.getElementById("keylist");
document.getElementById("addB").addEventListener("click", function() {
	var productObj = {
		product : product.value,
		price : price.value,
		quantity : quantity.value
	};
	var productStr = JSON.stringify(productObj);
	storage.setItem(product.value, productStr);
	dataArea.innerHTML = "저장 완료 : " + productStr;
	updateWishList();
});

function updateWishList() {
	var data = "";
	for (var i = 0; i < storage.length; i++) {
		data += "<option>" + storage.key(i);
	}
	wishList.innerHTML = data;
}

updateWishList();

document.getElementById("selectOneB").addEventListener("click", function() {
	var productStr = storage.getItem(wishList.value);
	if (productStr) {
		var productObj = JSON.parse(productStr);
		product.value = productObj.product;
		price.value = productObj.price;
		quantity.value = productObj.quantity;
		dataArea.innerHTML = "조회 성공";
	} else {
		dataArea.innerHTML = "저장 실패 : " + selected;
	}
});

document.getElementById("deleteOneB").addEventListener("click", function() {
	storage.removeItem(wishList.value);
	updateWishList();
	dataArea.innerHTML = "삭제 성공";
});

document.getElementById("selectAllB").addEventListener("click", function() {
	var data = "";
	for (var i = 0; i < storage.length; i++) {
		var key = storage.key(i);
		var value = storage.getItem(key);
		data += key + " : " + value + "<br>"
	}
	dataArea.innerHTML = data;
});

document.getElementById("deleteAllB").addEventListener("click", function() {
	storage.clear();
	dataArea.innerHTML = "전체 삭제 완료";
});
var Credential = new Credential();

function Credential(){

	var storageKey = "cred_data";
	var userIDKey = "cred_currentID";

	var data = "[{\"username\":\"exairie\",\"password\":\"admin\",\"name\":\"Ridwan Achadi Nugroho\",\"join_date\":\"10 Sep 2016\"}, {\"username\":\"miftah\",\"password\":\"admin\",\"name\":\"Miftahul Zannah\",\"join_date\":\"12 Sep 2016\"}, {\"username\":\"putri\",\"password\":\"admin\",\"name\":\"Putri Pratiwi\",\"join_date\":\"15 Okt 2016\"}, {\"username\":\"kevin\",\"password\":\"admin\",\"name\":\"Kevin Ramadhan Karidjan\",\"join_date\":\"20 Sep 2016\"}, {\"username\":\"alghi\",\"password\":\"admin\",\"name\":\"Alghi Fari Herlambang\",\"join_date\":\"10 Okt 2016\"}]";

	if(localStorage.getItem(storageKey) == null){
		localStorage.setItem(storageKey,data);
	}

	this.getUserData  = function(){
		var d = localStorage.getItem(storageKey);

		if(d == null){
			return [];
		}

		return JSON.parse(d);
	};
	this.getCurrentUserDetail = function(){
		return this.getUserDetail(localStorage.getItem(userIDKey));
	};
	this.getUserDetail = function(id){
		return this.getUserData()[id];
	};
	this.parseLogin = function(username, password){
		var data = this.getUserData();

		for(var i = 0; i < data.length;i++){
			if(data[i].username == username && data[i].password == password){
				this.setCredential(i);
				return true;
			}
		}

		return false;
	};
	this.isLoggedIn = function(){
		return localStorage.getItem(userIDKey) != null;
	}
	this.setCredential = function(id){
		localStorage.setItem(userIDKey, id);
	};

	this.removeCredential = function(){
		localStorage.removeItem(userIDKey);
	};
}
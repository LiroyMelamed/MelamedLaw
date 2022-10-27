import * as bootstrap from 'bootstrap'; 


class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			if (error == 0) {
				localStorage.setItem("auth", 1);
				this.form.submit();
			}
		});
	}

	validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText} cannot be blank`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} must be at least 8 characters`,
						"error"
					);
					return false;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
	}
}



import { initializeApp } from "firebase/app";
import { getDatabase,ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDQN1UFuJ4-16ZzEGC3SnJeUNoJ9VlK_tQ",
    authDomain: "melamedlaw-271c4.firebaseapp.com",
    databaseURL: "https://melamedlaw-271c4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "melamedlaw-271c4",
    storageBucket: "melamedlaw-271c4.appspot.com",
    messagingSenderId: "542851002989",
    appId: "1:542851002989:web:0bb430f5b140e84fde0564",
    measurementId: "G-CFHEXVKK0P"
  };
  
  const app = initializeApp(firebaseConfig);

document.getElementById("login-btn").onclick = function(){
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	const auth = getAuth();
	signInWithEmailAndPassword(auth, username, password)
		.then((userCredential) => {
			const user = userCredential.user;
			window.location.href = "dashboard.html"
		})
		.catch((error) => {
			alert('error: Wrong email or password were entered');
		});
}
document.getElementById("search-btn").onclick = function() {
	let temp = document.getElementById("case").value;
	let casenum = {case_num:`${temp}`};
	var myArr = [casenum];
	localStorage.setItem('myitem', JSON.stringify(myArr[0]));
	console.log(myArr[0].case_num);
	window.location.href="client_dashboard.html";
}

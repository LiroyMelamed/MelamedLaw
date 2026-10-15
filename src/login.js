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



import * as bootstrap from 'bootstrap'; 
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, remove} from "firebase/database";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";


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
  export const auth = getAuth(app);

  function GenerateRecaptch(){
	window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
	  'size': 'invisible',
	  'callback': (response) => {
  
	  }
	}, auth);
  }

document.getElementById("search-btn").onclick = function() {
	let temp = document.getElementById("case").value;
	const dbRef = ref(getDatabase());
	get(child(dbRef, `cases/${temp}`)).then((snapshot) => {
        if (snapshot.exists()) {
			input = `+972${snapshot.child("phone_num").val()}`;
			console.log(input)
			GenerateRecaptch();
			console.log(input)
			const appVerifier = window.recaptchaVerifier;
			console.log(input)
			signInWithPhoneNumber(auth, input, appVerifier).then((confirmationResult) => {
			  // SMS sent. Prompt user to type the code from the message, then sign the
			  // user in with confirmationResult.confirm(code).
			  window.confirmationResult = confirmationResult;
			  Verify();
			  // ...
			}).catch((error) => {
			  // Error; SMS not sent
			  // ...
			  alert("אנא נסה שנית")
			});
			let casenum = {case_num:`${temp}`};
			var myArr = [casenum];
			localStorage.setItem('myitem', JSON.stringify(myArr[0]));
			console.log(myArr[0].case_num);
		} else {
			alert("תיק לא נמצא")
		  }
		}).catch((error) => {
		  console.error(error);
		});
}

function Verify(){
	var myModal = new bootstrap.Modal(document.getElementById("Verify"), {});
	myModal.show();
	document.getElementById('OkVerify').addEventListener('click', (event)=>{
	  const code = document.getElementById('VerifyCode').value;
	  const confirmationResult = window.confirmationResult;
	  confirmationResult.confirm(code).then((result) => {
		// User signed in successfully.
		const user = result.user;
		myModal.hide();
		window.location.href="client_dashboard.html";
  
	  }).catch((error) => {
		alert("קוד שגוי נסה שנית");
	  });
	})
  }


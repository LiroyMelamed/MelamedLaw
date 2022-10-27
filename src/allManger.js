import * as bootstrap from 'bootstrap'; 

import { initializeApp } from "firebase/app";
import { getDatabase,ref, set } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase,ref, set, child, get} from "firebase/database";


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
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  //should be 
  document.getElementById("save").onclick = function(){ 
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        var table = document.getElementById("table");
        let count = 1; 
        snapshot.forEach(snapshot => {
          var row = table.insertRow();
          console.log(snapshot.val());
          var cell = row.insertCell();
          cell.innerHTML = count;
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("first_name").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("last_name").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("email").val();
          var cell = row.insertCell();
          var delbtn = document.createElement("button");
          delbtn.type = "button";
          delbtn.textContent = "מחיקה";
          delbtn.classList.add("btn-delete");
          delbtn.id="del" + count++;
          delbtn.style.marginRight = "10px";
          delbtn.addEventListener("click", function(){
            alert(delbtn.id);

          });
          cell.appendChild(delbtn);
        }
        
        )
        
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  
  }
  
  
    
 


  // document.getElementById("save").onclick = function(){  
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `cases`)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       let count = 0; 
  //       // console.log(snapshot.val());
  //       snapshot.forEach(snapshot => {
  //         count++;
  //         console.log(count);
  //         console.log(snapshot.val());
  //         console.log(snapshot.child("name").val());
          
  //       });
        
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }
import * as bootstrap from 'bootstrap'; 
import { initializeApp } from "firebase/app";
import { getDatabase,ref, set, child, get} from "firebase/database";
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
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  document.getElementById("body").onload = function(){
    var val = JSON.parse(localStorage.getItem('myitem'));
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases/${val.case_num}`)).then((snapshot) => {
        if (snapshot.exists()) {
            document.getElementById("title").innerHTML = "תיק מספר: " + snapshot.child("case_number").val();;
            document.getElementById("stats").innerHTML = "סטטוס תיק - " + snapshot.child("case_type").val();;
            let curr_level = snapshot.child("curr_Level").val();
            if(snapshot.child("levels").val() == '1') {
              document.getElementsByName('01c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
            }
            if(snapshot.child("levels").val() == '2') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
            }
            if(snapshot.child("levels").val() == '3') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
            }
            if(snapshot.child("levels").val() == '4') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
            }
            if(snapshot.child("levels").val() == '5') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
            }
            if(snapshot.child("levels").val() == '6') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
            }
            if(snapshot.child("levels").val() == '7') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
            }
            if(snapshot.child("levels").val() == '8') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('r08')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              document.getElementsByName('08c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                console.log(index)
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
              document.getElementById('discreption08').innerHTML = snapshot.child("discreption08").val();
            }
            if(snapshot.child("levels").val() == '9') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('r08')[0].hidden = false;
              document.getElementsByName('r09')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              document.getElementsByName('08c')[0].hidden = false;
              document.getElementsByName('09c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
              document.getElementById('discreption08').innerHTML = snapshot.child("discreption08").val();
              document.getElementById('discreption09').innerHTML = snapshot.child("discreption09").val();
            }
            if(snapshot.child("levels").val() == '10') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('r08')[0].hidden = false;
              document.getElementsByName('r09')[0].hidden = false;
              document.getElementsByName('r10')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              document.getElementsByName('08c')[0].hidden = false;
              document.getElementsByName('09c')[0].hidden = false;
              document.getElementsByName('10c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
              document.getElementById('discreption08').innerHTML = snapshot.child("discreption08").val();
              document.getElementById('discreption09').innerHTML = snapshot.child("discreption09").val();
              document.getElementById('discreption10').innerHTML = snapshot.child("discreption10").val();
            }
            if(snapshot.child("levels").val() == '11') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('r08')[0].hidden = false;
              document.getElementsByName('r09')[0].hidden = false;
              document.getElementsByName('r10')[0].hidden = false;
              document.getElementsByName('r11')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              document.getElementsByName('08c')[0].hidden = false;
              document.getElementsByName('09c')[0].hidden = false;
              document.getElementsByName('10c')[0].hidden = false;
              document.getElementsByName('11c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
              document.getElementById('discreption08').innerHTML = snapshot.child("discreption08").val();
              document.getElementById('discreption09').innerHTML = snapshot.child("discreption09").val();
              document.getElementById('discreption10').innerHTML = snapshot.child("discreption10").val();
              document.getElementById('discreption11').innerHTML = snapshot.child("discreption11").val();
              
            }
            if(snapshot.child("levels").val() == '12') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('r08')[0].hidden = false;
              document.getElementsByName('r09')[0].hidden = false;
              document.getElementsByName('r10')[0].hidden = false;
              document.getElementsByName('r11')[0].hidden = false;
              document.getElementsByName('r12')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              document.getElementsByName('08c')[0].hidden = false;
              document.getElementsByName('09c')[0].hidden = false;
              document.getElementsByName('10c')[0].hidden = false;
              document.getElementsByName('11c')[0].hidden = false;
              document.getElementsByName('12c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
              document.getElementById('discreption08').innerHTML = snapshot.child("discreption08").val();
              document.getElementById('discreption09').innerHTML = snapshot.child("discreption09").val();
              document.getElementById('discreption10').innerHTML = snapshot.child("discreption10").val();
              document.getElementById('discreption11').innerHTML = snapshot.child("discreption11").val();
              document.getElementById('discreption12').innerHTML = snapshot.child("discreption12").val();
            }
            if(snapshot.child("levels").val() == '13') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('r08')[0].hidden = false;
              document.getElementsByName('r09')[0].hidden = false;
              document.getElementsByName('r10')[0].hidden = false;
              document.getElementsByName('r11')[0].hidden = false;
              document.getElementsByName('r12')[0].hidden = false;
              document.getElementsByName('r13')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              document.getElementsByName('08c')[0].hidden = false;
              document.getElementsByName('09c')[0].hidden = false;
              document.getElementsByName('10c')[0].hidden = false;
              document.getElementsByName('11c')[0].hidden = false;
              document.getElementsByName('12c')[0].hidden = false;
              document.getElementsByName('13c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
              document.getElementById('discreption08').innerHTML = snapshot.child("discreption08").val();
              document.getElementById('discreption09').innerHTML = snapshot.child("discreption09").val();
              document.getElementById('discreption10').innerHTML = snapshot.child("discreption10").val();
              document.getElementById('discreption11').innerHTML = snapshot.child("discreption11").val();
              document.getElementById('discreption12').innerHTML = snapshot.child("discreption12").val();
              document.getElementById('discreption13').innerHTML = snapshot.child("discreption13").val();
            }
            if(snapshot.child("levels").val() == '14') {
              document.getElementsByName('r02')[0].hidden = false;
              document.getElementsByName('r03')[0].hidden = false;
              document.getElementsByName('r04')[0].hidden = false;
              document.getElementsByName('r05')[0].hidden = false;
              document.getElementsByName('r06')[0].hidden = false;
              document.getElementsByName('r07')[0].hidden = false;
              document.getElementsByName('r08')[0].hidden = false;
              document.getElementsByName('r09')[0].hidden = false;
              document.getElementsByName('r10')[0].hidden = false;
              document.getElementsByName('r11')[0].hidden = false;
              document.getElementsByName('r12')[0].hidden = false;
              document.getElementsByName('r13')[0].hidden = false;
              document.getElementsByName('r14')[0].hidden = false;
              document.getElementsByName('01c')[0].hidden = false;
              document.getElementsByName('02c')[0].hidden = false;
              document.getElementsByName('03c')[0].hidden = false;
              document.getElementsByName('04c')[0].hidden = false;
              document.getElementsByName('05c')[0].hidden = false;
              document.getElementsByName('06c')[0].hidden = false;
              document.getElementsByName('07c')[0].hidden = false;
              document.getElementsByName('08c')[0].hidden = false;
              document.getElementsByName('09c')[0].hidden = false;
              document.getElementsByName('10c')[0].hidden = false;
              document.getElementsByName('11c')[0].hidden = false;
              document.getElementsByName('12c')[0].hidden = false;
              document.getElementsByName('13c')[0].hidden = false;
              document.getElementsByName('14c')[0].hidden = false;
              for (let index = 1; index < parseInt(curr_level)+1 ; index++) {
                document.getElementsByName(`0${index}s`)[0].hidden = false;
                document.getElementsByName(`0${index}c`)[0].hidden = true;
                if (index == parseInt(curr_level) && parseInt(curr_level) != parseInt(snapshot.child("levels").val())) {
                  document.getElementsByName(`0${index+1}c`)[0].hidden = true;
                  document.getElementsByName(`0${index+1}p`)[0].hidden = false;
                }
              }
              document.getElementById('discreption01').innerHTML = snapshot.child("discreption01").val();
              document.getElementById('discreption02').innerHTML = snapshot.child("discreption02").val();
              document.getElementById('discreption03').innerHTML = snapshot.child("discreption03").val();
              document.getElementById('discreption04').innerHTML = snapshot.child("discreption04").val();
              document.getElementById('discreption05').innerHTML = snapshot.child("discreption05").val();
              document.getElementById('discreption06').innerHTML = snapshot.child("discreption06").val();
              document.getElementById('discreption07').innerHTML = snapshot.child("discreption07").val();
              document.getElementById('discreption08').innerHTML = snapshot.child("discreption08").val();
              document.getElementById('discreption09').innerHTML = snapshot.child("discreption09").val();
              document.getElementById('discreption10').innerHTML = snapshot.child("discreption10").val();
              document.getElementById('discreption11').innerHTML = snapshot.child("discreption11").val();
              document.getElementById('discreption12').innerHTML = snapshot.child("discreption12").val();
              document.getElementById('discreption13').innerHTML = snapshot.child("discreption13").val();
              document.getElementById('discreption14').innerHTML = snapshot.child("discreption14").val();
            }
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        })
  }
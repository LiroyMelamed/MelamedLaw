import * as bootstrap from 'bootstrap'; 
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, remove} from "firebase/database";
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

  // valid func for new case
  function validateFields(array) {
    for (let index = 0; index < array.length; index++) {
      if(array[0]=="בחר סוג תיק"){
        alert( `אנא בחר סוג תיק`)
        return false;
      }
      if(array[1]==""){
        alert( `אנא כתוב מס' תיק`)
        return false;
      }
      if(array[2]==""){
        alert( `אנא כתוב את שם הלקוח`)
        return false;
      }
      if(array[3]==""){
        alert( `אנא כתוב מס' פלאפון`)
        return false;
      }
      if(array[3].length != 10){
        alert( `מס' פלאפון לא תקין`)
        return false;
      }
      if(array[index].value==""){
        alert( `תיאור מס' ${index-3} לא יכול להיות ריק`)
        return false;
      }
    }
    return true;
  }

  //On reload 
  
  document.getElementsByName("liroy")[0].hidden = false;
  document.getElementsByName("roi")[0].hidden = true;
  document.getElementsByName("allcasestype")[0].hidden = true;
  document.getElementsByName("allmangers")[0].hidden = true;

  const dbRef = ref(getDatabase());
    get(child(dbRef, `cases`)).then((snapshot) => {
      if (snapshot.exists()) {
        var table = document.getElementById("table9");
        let count = 1; 
        let row_count = 0;
        snapshot.forEach(snapshot => {
          var tag = snapshot.child("tag").val();
          if(tag=="true"){
            var row = table.insertRow();
            row_count++;
            row.id=count;
            var cell = row.insertCell();
            cell.innerHTML = count;
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("case_number").val();
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("case_type").val();
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("curr_Level").val();
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("name").val();
            var cell = row.insertCell();
            if(snapshot.child("company_name").val()== "" ||snapshot.child("company_name").val()== null){
              cell.innerHTML = "אין חברה";
            }
            else{
              cell.innerHTML = snapshot.child("company_name").val();
            }
            cell.id = "cell";
            var cell = row.insertCell();
  
            var editBt = document.createElement("button");
            editBt.type = "button";
            editBt.className ="btn btn-warning"
            editBt.textContent = "עריכה";
            editBt.classList.add("btn-edit");
            editBt.id="edit-"+count;
            editBt.style.marginRight = "10px";
            editBt.addEventListener("click", function(){
              var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
              myModal.show();
              alert("modal 4");
              let text = this.id;
              const myArray = text.split("-");
              let case_num = document.getElementById('table9').rows[myArray[1]].cells[1].innerHTML
              const db = getDatabase();
              const dbRef1 = ref(db, "/cases/" + case_num);
              get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log("editbt:"+snapshot.child("case_number").val());
              document.getElementById('case1').value = snapshot.child("case_number").val();
              document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
              document.getElementById('client_name1').value = snapshot.child("name").val();
              document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
              document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
              document.getElementById('company_name1').value = snapshot.child("company_name").val();
          
              
            document.getElementsByName('b02')[0].hidden = true;
            document.getElementsByName('b03')[0].hidden = true;
            document.getElementsByName('b04')[0].hidden = true;
            document.getElementsByName('b05')[0].hidden = true;
            document.getElementsByName('b06')[0].hidden = true;
            document.getElementsByName('b07')[0].hidden = true;
            document.getElementsByName('b08')[0].hidden = true;
            document.getElementsByName('b09')[0].hidden = true;
            document.getElementsByName('b10')[0].hidden = true;
            document.getElementsByName('b11')[0].hidden = true;
            document.getElementsByName('b12')[0].hidden = true;
            document.getElementsByName('b13')[0].hidden = true;
            document.getElementsByName('b14')[0].hidden = true;
  
              if(snapshot.child("levels").val() == '1') {
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
              }
              if(snapshot.child("levels").val() == '2') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
              }
              if(snapshot.child("levels").val() == '3') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
              }
              if(snapshot.child("levels").val() == '4') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
              }
              if(snapshot.child("levels").val() == '5') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
              }
              if(snapshot.child("levels").val() == '6') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
              }
              if(snapshot.child("levels").val() == '7') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
              }
              if(snapshot.child("levels").val() == '8') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
              }
              if(snapshot.child("levels").val() == '9') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
              }
              if(snapshot.child("levels").val() == '10') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
              }
              if(snapshot.child("levels").val() == '11') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                
              }
              if(snapshot.child("levels").val() == '12') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementsByName('b12')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                document.getElementById('discre12').value = snapshot.child("discreption12").val();
              }
              if(snapshot.child("levels").val() == '13') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementsByName('b12')[0].hidden = false;
                document.getElementsByName('b13')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                document.getElementById('discre12').value = snapshot.child("discreption12").val();
                document.getElementById('discre13').value = snapshot.child("discreption13").val();
              }
              if(snapshot.child("levels").val() == '14') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementsByName('b12')[0].hidden = false;
                document.getElementsByName('b13')[0].hidden = false;
                document.getElementsByName('b14')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                document.getElementById('discre12').value = snapshot.child("discreption12").val();
                document.getElementById('discre13').value = snapshot.child("discreption13").val();
                document.getElementById('discre14').value = snapshot.child("discreption14").val();
              }
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              })            
            });
            cell.appendChild(editBt);
            var delbtn = document.createElement("button");
            delbtn.type = "button";
            delbtn.className ="btn btn-danger"
            delbtn.textContent = "ביטול צימוד";
            delbtn.classList.add("btn-delete");
            delbtn.id="del-" + count++;
            delbtn.style.marginRight = "10px";
            delbtn.addEventListener("click", function(){
              let text = this.id;
              const myArray = text.split("-");
              let case_num = document.getElementById('table9').rows[myArray[1]].cells[1].innerHTML;
              //del from db
              get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  let casenum = snapshot.child("case_number").val();
                  let kind = snapshot.child("case_type").val();
                  let cname = snapshot.child("name").val();
                  let company_name = snapshot.child("company_name").val();
                  let phone = snapshot.child("phone_num").val();
                  let curr_level = snapshot.child("curr_Level").val();
                  let disc01 = snapshot.child("discreption01").val();
                  let tag = "false";
                  get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                          let levels = snapshot.child("case_level").val();
                          if (levels == "1") {
                            writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                          }
                          if (levels == "2") {
                            let disc02 = snapshot.child("discreption02").val();
                            writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                          }
                          if (levels == "3") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();;
                            writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                          }
                          if (levels == "4") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();
                            let disc04 = snapshot.child("discreption04").val();
                            writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                          }
                          if (levels == "5") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();
                            let disc04 = snapshot.child("discreption04").val();
                            let disc05 = snapshot.child("discreption05").val();
                            writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                          }
                          if (levels == "6") {
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                          }
                          if (levels == "7") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();
                            let disc04 = snapshot.child("discreption04").val();
                            let disc05 = snapshot.child("discreption05").val();
                            let disc06 = snapshot.child("discreption06").val();
                            let disc07 = snapshot.child("discreption07").val();
                            writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                          }
                          if (levels == "8") {
          
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                          }
                          if (levels == "9") {
                            
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                          }
                          if (levels == "10") {
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "11") {
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "12") {
                            
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              let disc12 = snapshot.child("discreption012").val();
                              writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "13") {
                          
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              let disc12 = snapshot.child("discreption012").val();
                              let disc13 = snapshot.child("discreption013").val();
                              writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "14") {
                          
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              let disc12 = snapshot.child("discreption012").val();
                              let disc13 = snapshot.child("discreption013").val();
                              let disc14 = snapshot.child("discreption014").val();
                              writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                            
                          }
                        } else {
                          console.log("No data available");
                        }
                      }).catch((error) => {
                        console.error(error);
                      })


                
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              }) 



              // const db = getDatabase();
              // const dbRef1 = ref(db, "/cases/" + case_num);
              // remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
              //end del from db
  
              // del from table and update table
              console.log(row_count);
              table.deleteRow(myArray[1]);
              for (let i = myArray[1]; i < table.rows.length; i++) {
                document.getElementById('table9').rows[i].cells[0].innerHTML= i;
                let temp=i;
                temp++;
                var del = document.getElementById("del-"+temp);
                var edit= document.getElementById("edit-"+temp);
                del.id = "del-"+i;
                edit.id = "edit-"+i;
              }
            });
            cell.appendChild(delbtn);
          }
        })
        
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })






  //////

  // writing new case to database
  function writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
    // location.reload();
  }
  function writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      discreption12: disc12,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      discreption12: disc12,
      discreption13: disc13,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  function writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      discreption12: disc12,
      discreption13: disc13,
      discreption14: disc14,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("התיק נשמר בהצלחה");
  }
  //writing new case to data base
  document.getElementById("save").onclick = function() {
    alert("save");
    let kind = document.getElementById('kind').value;
    let casenum = document.getElementById('casenum').value;
    let cname = document.getElementById('cname').value;
    let phone = document.getElementById('phone').value;
    let disc01 = document.getElementById('disc01').value;
    let company_name = document.getElementById('company_name-s').value;
    let curr_level = 0;
    let tag = "false";
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (document.getElementsByName("roi")[0].hidden == false) {
          var table = document.getElementById("table");
          console.log("num of rows"+table.rows.length);
          var row = table.insertRow();
          row.id=table.rows.length;
          var cell = row.insertCell();
          cell.innerHTML = table.rows.length-1;
          var cell = row.insertCell();
          cell.innerHTML = casenum;
          var cell = row.insertCell();
          cell.innerHTML = cname;
          var cell = row.insertCell();
          if(company_name== "" ||company_name== null){
            cell.innerHTML = "אין חברה";
          }
          else{
            cell.innerHTML =company_name;
          }
          var cell = row.insertCell();
          cell.innerHTML = kind;
          var cell = row.insertCell();
          cell.innerHTML = curr_level;
          cell.id = "cell";
          var cell = row.insertCell();
          
          var nextBt = document.createElement("button");
          nextBt.type = "button";
          nextBt.className ="btn btn-success"
          nextBt.textContent = "קידום שלב";
          nextBt.classList.add("btn-next");
          var count = table.rows.length - 1;
          nextBt.id="next_lev-"+count;
          nextBt.addEventListener("click",function(){
            let text = this.id;
            console.log(text);
            const myArray = text.split("-");
            var currlev = parseInt(document.getElementById('table').rows[myArray[1]].cells[5].innerHTML);
            var case_nm = document.getElementById('table').rows[myArray[1]].cells[1].innerHTML;
            
            const dbRef = ref(getDatabase());
            get(child(dbRef, `cases/${case_nm}`)).then((snapshot) => {
              if (snapshot.exists()) {
                let levels = snapshot.child("levels").val();
                if(levels==currlev){
                  alert("לא ניתן לקדם שלב הגעת אל השלב המקסימלי עבור תיק זה")
                }
                else{
                  currlev++;
                  document.getElementById('table').rows[myArray[1]].cells[5].innerHTML = currlev;
                // end change
      
                // update the database
  
  
                let casenum = snapshot.child("case_number").val();
                let kind = snapshot.child("case_type").val();
                let cname = snapshot.child("name").val();
                let company_name = snapshot.child("company_name").val();
                let phone = snapshot.child("phone_num").val();
                let curr_level = currlev;
                let disc01 = snapshot.child("discreption01").val();
                let tag = snapshot.child("tag").val();
                const dbRef = ref(getDatabase());
                get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                  if (snapshot.exists()) {
                    let levels = snapshot.child("case_level").val();
                    if (levels == "1") {
                      writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                    }
                    if (levels == "2") {
                      let disc02 = snapshot.child("discreption02").val();
                      writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                    }
                    if (levels == "3") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();;
                      writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                    }
                    if (levels == "4") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                    }
                    if (levels == "5") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                    }
                    if (levels == "6") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                    }
                    if (levels == "7") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      let disc06 = snapshot.child("discreption06").val();
                      let disc07 = snapshot.child("discreption07").val();
                      writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                    }
                    if (levels == "8") {
    
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                    }
                    if (levels == "9") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                    }
                    if (levels == "10") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, discrp10, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "11") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "12") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "13") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "14") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        let disc14 = snapshot.child("discreption014").val();
                        writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                      
                    }
                    
                  } else {
                    console.log("No data available");
                  }
                }).catch((error) => {
                  console.error(error);
                })
    
      
                }
  
  
  
  
              }else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            })
              
  
          });
          cell.appendChild(nextBt);
  
          var editBt = document.createElement("button");
          editBt.type = "button";
          editBt.className ="btn btn-warning"
          editBt.textContent = "עריכה";
          editBt.classList.add("btn-edit");
          editBt.id="edit-"+count;
          editBt.style.marginRight = "10px";
          editBt.addEventListener("click", function(){
            var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
            myModal.show();
            alert("modal 4");
            let text = this.id;
            const myArray = text.split("-");
            let case_num = document.getElementById('table').rows[myArray[1]].cells[1].innerHTML
            const db = getDatabase();
            const dbRef1 = ref(db, "/cases/" + case_num);
            get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
              if (snapshot.exists()) {
                console.log("editbt:"+snapshot.child("case_number").val());
            document.getElementById('case1').value = snapshot.child("case_number").val();
            document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
            document.getElementById('client_name1').value = snapshot.child("name").val();
            document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
            document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
            document.getElementById('company_name1').value = snapshot.child("company_name").val();
          
  
            document.getElementsByName('b02')[0].hidden = true;
            document.getElementsByName('b03')[0].hidden = true;
            document.getElementsByName('b04')[0].hidden = true;
            document.getElementsByName('b05')[0].hidden = true;
            document.getElementsByName('b06')[0].hidden = true;
            document.getElementsByName('b07')[0].hidden = true;
            document.getElementsByName('b08')[0].hidden = true;
            document.getElementsByName('b09')[0].hidden = true;
            document.getElementsByName('b10')[0].hidden = true;
            document.getElementsByName('b11')[0].hidden = true;
            document.getElementsByName('b12')[0].hidden = true;
            document.getElementsByName('b13')[0].hidden = true;
            document.getElementsByName('b14')[0].hidden = true;
  
  
            if(snapshot.child("levels").val() == '1') {
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
            }
            if(snapshot.child("levels").val() == '2') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
            }
            if(snapshot.child("levels").val() == '3') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
            }
            if(snapshot.child("levels").val() == '4') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
            }
            if(snapshot.child("levels").val() == '5') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
            }
            if(snapshot.child("levels").val() == '6') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
            }
            if(snapshot.child("levels").val() == '7') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
            }
            if(snapshot.child("levels").val() == '8') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
            }
            if(snapshot.child("levels").val() == '9') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
            }
            if(snapshot.child("levels").val() == '10') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
            }
            if(snapshot.child("levels").val() == '11') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              
            }
            if(snapshot.child("levels").val() == '12') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
            }
            if(snapshot.child("levels").val() == '13') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementsByName('b13')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
              document.getElementById('discre13').value = snapshot.child("discreption13").val();
            }
            if(snapshot.child("levels").val() == '14') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementsByName('b13')[0].hidden = false;
              document.getElementsByName('b14')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
              document.getElementById('discre13').value = snapshot.child("discreption13").val();
              document.getElementById('discre14').value = snapshot.child("discreption14").val();
            }
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            })
  
  
          });
          cell.appendChild(editBt);
  
  
          var delbtn = document.createElement("button");
          delbtn.type = "button";
          delbtn.className ="btn btn-danger"
          delbtn.textContent = "מחיקה";
          delbtn.classList.add("btn-delete");
          delbtn.id="del-" + count++;
          delbtn.style.marginRight = "10px";
          delbtn.addEventListener("click", function(){
            console.log("מחיקה");
            let text = this.id;
            const myArray = text.split("-");
            let case_num = document.getElementById('table').rows[myArray[1]].cells[1].innerHTML
            //del from db
            const db = getDatabase();
            const dbRef1 = ref(db, "/cases/" + case_num);
            remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
            //end del from db
  
            // del from table and update table
            // console.log(row_count);
            table.deleteRow(myArray[1]);
            console.log(table.rows.length-1);
            for (let i = myArray[1]; i < table.rows.length; i++) {
              document.getElementById('table').rows[i].cells[0].innerHTML= i;
              let temp=i;
              temp++;
              var del = document.getElementById("del-"+temp);
              var edit= document.getElementById("edit-"+temp);
              var next = document.getElementById("next_lev-"+temp);
              del.id = "del-"+i;
              edit.id = "edit-"+i;
              next.id = "next_lev-"+i;
            }
            
          });
          cell.appendChild(delbtn);


        }

        ////////////////////////////////////////////////////////////////
        //save the new case to the DB

        let levels = snapshot.child("case_level").val();
        if (levels == "1") {
          if (validateFields([kind, casenum, cname, phone, disc01 ,levels, curr_level])){
            writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
          } 
        }
        if (levels == "2") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "3") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "4") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "5") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "6") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "7") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "8") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            let disc08 = document.getElementById('disc08').value;
            writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "9") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            let disc08 = document.getElementById('disc08').value;
            let disc09 = document.getElementById('disc09').value;
            writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "10") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            let disc08 = document.getElementById('disc08').value;
            let disc09 = document.getElementById('disc09').value;
            let disc10 = document.getElementById('disc10').value;
            writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "11") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            let disc08 = document.getElementById('disc08').value;
            let disc09 = document.getElementById('disc09').value;
            let disc10 = document.getElementById('disc10').value;
            let disc11 = document.getElementById('disc11').value;
            writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "12") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            let disc08 = document.getElementById('disc08').value;
            let disc09 = document.getElementById('disc09').value;
            let disc10 = document.getElementById('disc10').value;
            let disc11 = document.getElementById('disc11').value;
            let disc12 = document.getElementById('disc12').value;
            writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "13") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            let disc08 = document.getElementById('disc08').value;
            let disc09 = document.getElementById('disc09').value;
            let disc10 = document.getElementById('disc10').value;
            let disc11 = document.getElementById('disc11').value;
            let disc12 = document.getElementById('disc12').value;
            let disc13 = document.getElementById('disc13').value;
            writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
          }
        }
        if (levels == "14") {
          if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level])){
            let disc02 = document.getElementById('disc02').value;
            let disc03 = document.getElementById('disc03').value;
            let disc04 = document.getElementById('disc04').value;
            let disc05 = document.getElementById('disc05').value;
            let disc06 = document.getElementById('disc06').value;
            let disc07 = document.getElementById('disc07').value;
            let disc08 = document.getElementById('disc08').value;
            let disc09 = document.getElementById('disc09').value;
            let disc10 = document.getElementById('disc10').value;
            let disc11 = document.getElementById('disc11').value;
            let disc12 = document.getElementById('disc12').value;
            let disc13 = document.getElementById('disc13').value;
            let disc14 = document.getElementById('disc14').value;
            writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
          }
        }

        document.getElementById("exit_newcase").click();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  //valid func for new case type
  function validateFieldsType(array){
    for (let index = 0; index < array.length; index++) {
      if (array[0] == "") {
        alert( `אנא כתוב את סוג תיק`)
        return false;
      }
      if (array[1] == "") {
        alert( `אנא בחר כמות שלבים`)
        return false;
      }
      if (array[2] == "") {
        alert( `אנא מלא את תיאור מס' 1`)
        return false;
      }
      if(array[index].value == ""){
        alert(`אנא מלא את תיאור מס' ${index-1}`)
        return false;
      }   
    }
    return true;
  }

  // writing cases type
  function writeUserDataCase(case_type, levels, discreption01) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase02(case_type, levels, discreption01, discreption02) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase03(case_type, levels, discreption01, discreption02, discreption03) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase04(case_type, levels, discreption01, discreption02, discreption03, discreption04) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04
    });

    alert("התיק נשמר בהצלחה")
  }
  
  function writeUserDataCase05(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase06(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase07(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase08(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07,
      discreption08: discreption08
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase09(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07,
      discreption08: discreption08,
      discreption09: discreption09
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase10(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07,
      discreption08: discreption08,
      discreption09: discreption09,
      discreption10: discreption10
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase11(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07,
      discreption08: discreption08,
      discreption09: discreption09,
      discreption10: discreption10,
      discreption11: discreption11
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase12(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07,
      discreption08: discreption08,
      discreption09: discreption09,
      discreption10: discreption10,
      discreption11: discreption11,
      discreption12: discreption12
    });

    alert("התיק נשמר בהצלחה")
  }
  
  function writeUserDataCase13(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07,
      discreption08: discreption08,
      discreption09: discreption09,
      discreption10: discreption10,
      discreption11: discreption11,
      discreption12: discreption12,
      discreption13: discreption13
    });

    alert("התיק נשמר בהצלחה")
  }

  function writeUserDataCase14(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13, discreption14) {
    const db = getDatabase();
    const reference = ref(db,'cases_type/'+ case_type);

    set(reference, {
      case_type: case_type,
      case_level: levels,
      discreption01: discreption01,
      discreption02: discreption02,
      discreption03: discreption03,
      discreption04: discreption04,
      discreption05: discreption05,
      discreption06: discreption06,
      discreption07: discreption07,
      discreption08: discreption08,
      discreption09: discreption09,
      discreption10: discreption10,
      discreption11: discreption11,
      discreption12: discreption12,
      discreption13: discreption13,
      discreption14: discreption14


    });

    alert("התיק נשמר בהצלחה")
  }

  //writing new case type to data base
  document.getElementById("save_type").onclick = function() {
    let case_type = document.getElementById('case_type').value;
    let levels = document.getElementById('levels').value;
    let discreption01 = document.getElementById('discreption01').value;
    
    if (levels == "1") {
      if (validateFieldsType([case_type, levels, discreption01])){
        writeUserDataCase(case_type, levels, discreption01);
      }
    }
    if (levels == "2") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02])){
        let discreption02 = document.getElementById('discreption02').value;
        writeUserDataCase02(case_type, levels, discreption01, discreption02);
      }
    }
    if (levels == "3") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        writeUserDataCase03(case_type, levels, discreption01, discreption02, discreption03);
      }
    }
    if (levels == "4") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        writeUserDataCase04(case_type, levels, discreption01, discreption02, discreption03, discreption04);
      }
    }
    if (levels == "5") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        writeUserDataCase05(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05);
      }
    }
    if (levels == "6") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        writeUserDataCase06(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06);
      }
    }
    if (levels == "7") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        writeUserDataCase07(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07);
      }
    }
    if (levels == "8") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        let discreption08 = document.getElementById('discreption08').value;
        writeUserDataCase08(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08);
      }
    }
    if (levels == "9") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        let discreption08 = document.getElementById('discreption08').value;
        let discreption09 = document.getElementById('discreption09').value;
        writeUserDataCase09(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09);
      }
    }
    if (levels == "10") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        let discreption08 = document.getElementById('discreption08').value;
        let discreption09 = document.getElementById('discreption09').value;
        let discreption10 = document.getElementById('discreption10').value;
        writeUserDataCase10(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10);
      }
    }
    if (levels == "11") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        let discreption08 = document.getElementById('discreption08').value;
        let discreption09 = document.getElementById('discreption09').value;
        let discreption10 = document.getElementById('discreption10').value;
        let discreption11 = document.getElementById('discreption11').value;
        writeUserDataCase11(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11);
      }
    }
    if (levels == "12") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        let discreption08 = document.getElementById('discreption08').value;
        let discreption09 = document.getElementById('discreption09').value;
        let discreption10 = document.getElementById('discreption10').value;
        let discreption11 = document.getElementById('discreption11').value;
        let discreption12 = document.getElementById('discreption12').value;
        writeUserDataCase12(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12);
      }
    }
    if (levels == "13") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        let discreption08 = document.getElementById('discreption08').value;
        let discreption09 = document.getElementById('discreption09').value;
        let discreption10 = document.getElementById('discreption10').value;
        let discreption11 = document.getElementById('discreption11').value;
        let discreption12 = document.getElementById('discreption12').value;
        let discreption13 = document.getElementById('discreption13').value;
        writeUserDataCase13(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13);
      }
    }
    if (levels == "14") {
      if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13, discreption14])){
        let discreption02 = document.getElementById('discreption02').value;
        let discreption03 = document.getElementById('discreption03').value;
        let discreption04 = document.getElementById('discreption04').value;
        let discreption05 = document.getElementById('discreption05').value;
        let discreption06 = document.getElementById('discreption06').value;
        let discreption07 = document.getElementById('discreption07').value;
        let discreption08 = document.getElementById('discreption08').value;
        let discreption09 = document.getElementById('discreption09').value;
        let discreption10 = document.getElementById('discreption10').value;
        let discreption11 = document.getElementById('discreption11').value;
        let discreption12 = document.getElementById('discreption12').value;
        let discreption13 = document.getElementById('discreption13').value;
        let discreption14 = document.getElementById('discreption14').value;
        writeUserDataCase14(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13, discreption14);
      }
    }
    document.getElementById("exit_add_case").click();


    var y = document.getElementById("allcasestype");
    if (window.getComputedStyle(y).display != "none") {
      var table = document.getElementById("table1");
      var row = table.insertRow();
      row.id=table.rows.length;
      var cell = row.insertCell();
      cell.innerHTML = table.rows.length-1;
      var cell = row.insertCell();
      cell.innerHTML = case_type;
      var cell = row.insertCell();
      cell.innerHTML = levels;
      var cell = row.insertCell();

      var editBt = document.createElement("button");
      editBt.type = "button";
      editBt.textContent = "עריכה";
      editBt.className ="btn btn-warning"
      editBt.classList.add("btn-edit");
      var count = table.rows.length-1;
      editBt.id="edit-"+count;
      editBt.addEventListener("click", function(){
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal5"), {});
        myModal.show();
        console.log(editBt.id);
        let text = this.id;
        const myArray = text.split("-");
        let case_type = document.getElementById('table1').rows[myArray[1]].cells[1].innerHTML;
        

        const dbRef = ref(getDatabase());
        get(child(dbRef, `cases_type/${case_type}`)).then((snapshot) => {
          if (snapshot.exists()) {
            document.getElementById('case_type1').value = snapshot.child("case_type").val();
            document.getElementById('levels1').value = snapshot.child("case_level").val();
            if(snapshot.child("case_level").val() == '1') {
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
            }
            if(snapshot.child("case_level").val() == '2') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
            }
            if(snapshot.child("case_level").val() == '3') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
            }
            if(snapshot.child("case_level").val() == '4') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
            }
            if(snapshot.child("case_level").val() == '5') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
            }
            if(snapshot.child("case_level").val() == '6') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
            }
            if(snapshot.child("case_level").val() == '7') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
            }
            if(snapshot.child("case_level").val() == '8') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              document.getElementById('discrep08').value = snapshot.child("discreption08").val();
            }
            if(snapshot.child("case_level").val() == '9') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              document.getElementById('discrep09').value = snapshot.child("discreption09").val();
            }
            if(snapshot.child("case_level").val() == '10') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              document.getElementById('discrep09').value = snapshot.child("discreption09").val();
              document.getElementById('discrep10').value = snapshot.child("discreption10").val();
            }
            if(snapshot.child("case_level").val() == '11') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              document.getElementById('discrep09').value = snapshot.child("discreption09").val();
              document.getElementById('discrep10').value = snapshot.child("discreption10").val();
              document.getElementById('discrep11').value = snapshot.child("discreption11").val();
              
            }
            if(snapshot.child("case_level").val() == '12') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementsByName('e12')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              document.getElementById('discrep09').value = snapshot.child("discreption09").val();
              document.getElementById('discrep10').value = snapshot.child("discreption10").val();
              document.getElementById('discrep11').value = snapshot.child("discreption11").val();
              document.getElementById('discrep12').value = snapshot.child("discreption12").val();
            }
            if(snapshot.child("case_level").val() == '13') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementsByName('e12')[0].hidden = false;
              document.getElementsByName('e13')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              document.getElementById('discrep09').value = snapshot.child("discreption09").val();
              document.getElementById('discrep10').value = snapshot.child("discreption10").val();
              document.getElementById('discrep11').value = snapshot.child("discreption11").val();
              document.getElementById('discrep12').value = snapshot.child("discreption12").val();
              document.getElementById('discrep13').value = snapshot.child("discreption13").val();
            }
            if(snapshot.child("case_level").val() == '14') {
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementsByName('e12')[0].hidden = false;
              document.getElementsByName('e13')[0].hidden = false;
              document.getElementsByName('e14')[0].hidden = false;
              document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              document.getElementById('discrep09').value = snapshot.child("discreption09").val();
              document.getElementById('discrep10').value = snapshot.child("discreption10").val();
              document.getElementById('discrep11').value = snapshot.child("discreption11").val();
              document.getElementById('discrep12').value = snapshot.child("discreption12").val();
              document.getElementById('discrep13').value = snapshot.child("discreption13").val();
              document.getElementById('discrep14').value = snapshot.child("discreption14").val();
            }  


          }
         else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
          



        
      });
      cell.appendChild(editBt);
      var delbtn = document.createElement("button");
      delbtn.type = "button";
      delbtn.textContent = "מחיקה";
      delbtn.className ="btn btn-danger"
      delbtn.classList.add("btn-delete");
      delbtn.id="del-" + count++;
      delbtn.style.marginRight = "10px";
      delbtn.addEventListener("click", function(){

        let text = this.id;
        const myArray = text.split("-");
        let case_type = document.getElementById('table1').rows[myArray[1]].cells[1].innerHTML;
        //del from db
        const db = getDatabase();
        const dbRef1 = ref(db, "/cases_type/" + case_type);
        remove(dbRef1).then(() => alert(`סוג התיק '${case_type}' נמחק בהצלחה`));
        //end del from db

        // del from table and update table
        
        table.deleteRow(myArray[1]);
        for (let i = myArray[1]; i < table.rows.length-1; i++) {
          document.getElementById('table1').rows[i].cells[0].innerHTML= i;
          let temp=i;
          temp++;
          var del = document.getElementById("del-"+temp);
          del.id = "del-"+i;
        }
      });
      cell.appendChild(delbtn);


    }


  }

  //listener to level choose
  const selectLevel = document.getElementById("levels");
  selectLevel.addEventListener("click", (event) => {
    if (selectLevel.value == '1') {
      document.getElementsByName('02')[0].hidden = true;
      document.getElementsByName('03')[0].hidden = true;
      document.getElementsByName('04')[0].hidden = true;
      document.getElementsByName('05')[0].hidden = true;
      document.getElementsByName('06')[0].hidden = true;
      document.getElementsByName('07')[0].hidden = true;
      document.getElementsByName('08')[0].hidden = true;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }

    if (selectLevel.value == '2') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = true;
      document.getElementsByName('04')[0].hidden = true;
      document.getElementsByName('05')[0].hidden = true;
      document.getElementsByName('06')[0].hidden = true;
      document.getElementsByName('07')[0].hidden = true;
      document.getElementsByName('08')[0].hidden = true;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;

    }
    if (selectLevel.value == '3') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = true;
      document.getElementsByName('05')[0].hidden = true;
      document.getElementsByName('06')[0].hidden = true;
      document.getElementsByName('07')[0].hidden = true;
      document.getElementsByName('08')[0].hidden = true;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '4') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = true;
      document.getElementsByName('06')[0].hidden = true;
      document.getElementsByName('07')[0].hidden = true;
      document.getElementsByName('08')[0].hidden = true;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '5') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = true;
      document.getElementsByName('07')[0].hidden = true;
      document.getElementsByName('08')[0].hidden = true;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '6') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = true;
      document.getElementsByName('08')[0].hidden = true;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '7') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = true;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '8') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = false;
      document.getElementsByName('09')[0].hidden = true;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '9') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = false;
      document.getElementsByName('09')[0].hidden = false;
      document.getElementsByName('10')[0].hidden = true;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '10') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = false;
      document.getElementsByName('09')[0].hidden = false;
      document.getElementsByName('10')[0].hidden = false;
      document.getElementsByName('11')[0].hidden = true;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '11') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = false;
      document.getElementsByName('09')[0].hidden = false;
      document.getElementsByName('10')[0].hidden = false;
      document.getElementsByName('11')[0].hidden = false;
      document.getElementsByName('12')[0].hidden = true;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '12') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = false;
      document.getElementsByName('09')[0].hidden = false;
      document.getElementsByName('10')[0].hidden = false;
      document.getElementsByName('11')[0].hidden = false;
      document.getElementsByName('12')[0].hidden = false;
      document.getElementsByName('13')[0].hidden = true;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '13') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = false;
      document.getElementsByName('09')[0].hidden = false;
      document.getElementsByName('10')[0].hidden = false;
      document.getElementsByName('11')[0].hidden = false;
      document.getElementsByName('12')[0].hidden = false;
      document.getElementsByName('13')[0].hidden = false;
      document.getElementsByName('14')[0].hidden = true;
    }
    if (selectLevel.value == '14') {
      document.getElementsByName('02')[0].hidden = false;
      document.getElementsByName('03')[0].hidden = false;
      document.getElementsByName('04')[0].hidden = false;
      document.getElementsByName('05')[0].hidden = false;
      document.getElementsByName('06')[0].hidden = false;
      document.getElementsByName('07')[0].hidden = false;
      document.getElementsByName('08')[0].hidden = false;
      document.getElementsByName('09')[0].hidden = false;
      document.getElementsByName('10')[0].hidden = false;
      document.getElementsByName('11')[0].hidden = false;
      document.getElementsByName('12')[0].hidden = false;
      document.getElementsByName('13')[0].hidden = false;
      document.getElementsByName('14')[0].hidden = false;
    }
  })

  //listenr to case type choose
  const selectKind = document.getElementById("kind");
  selectKind.addEventListener("click", (event) =>{
    let kind = document.getElementById('kind').value;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
      if (snapshot.exists()) {
        if(snapshot.child("case_level").val() == '1') {
          document.getElementsByName('r02')[0].hidden = true;
          document.getElementsByName('r03')[0].hidden = true;
          document.getElementsByName('r04')[0].hidden = true;
          document.getElementsByName('r05')[0].hidden = true;
          document.getElementsByName('r06')[0].hidden = true;
          document.getElementsByName('r07')[0].hidden = true;
          document.getElementsByName('r08')[0].hidden = true;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
        }
        if(snapshot.child("case_level").val() == '2') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = true;
          document.getElementsByName('r04')[0].hidden = true;
          document.getElementsByName('r05')[0].hidden = true;
          document.getElementsByName('r06')[0].hidden = true;
          document.getElementsByName('r07')[0].hidden = true;
          document.getElementsByName('r08')[0].hidden = true;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
        }
        if(snapshot.child("case_level").val() == '3') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = true;
          document.getElementsByName('r05')[0].hidden = true;
          document.getElementsByName('r06')[0].hidden = true;
          document.getElementsByName('r07')[0].hidden = true;
          document.getElementsByName('r08')[0].hidden = true;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
        }
        if(snapshot.child("case_level").val() == '4') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = false;
          document.getElementsByName('r05')[0].hidden = true;
          document.getElementsByName('r06')[0].hidden = true;
          document.getElementsByName('r07')[0].hidden = true;
          document.getElementsByName('r08')[0].hidden = true;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
        }
        if(snapshot.child("case_level").val() == '5') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = false;
          document.getElementsByName('r05')[0].hidden = false;
          document.getElementsByName('r06')[0].hidden = true;
          document.getElementsByName('r07')[0].hidden = true;
          document.getElementsByName('r08')[0].hidden = true;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
        }
        if(snapshot.child("case_level").val() == '6') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = false;
          document.getElementsByName('r05')[0].hidden = false;
          document.getElementsByName('r06')[0].hidden = false;
          document.getElementsByName('r07')[0].hidden = true;
          document.getElementsByName('r08')[0].hidden = true;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
        }
        if(snapshot.child("case_level").val() == '7') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = false;
          document.getElementsByName('r05')[0].hidden = false;
          document.getElementsByName('r06')[0].hidden = false;
          document.getElementsByName('r07')[0].hidden = false;
          document.getElementsByName('r08')[0].hidden = true;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
        }
        if(snapshot.child("case_level").val() == '8') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = false;
          document.getElementsByName('r05')[0].hidden = false;
          document.getElementsByName('r06')[0].hidden = false;
          document.getElementsByName('r07')[0].hidden = false;
          document.getElementsByName('r08')[0].hidden = false;
          document.getElementsByName('r09')[0].hidden = true;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
          document.getElementById('disc08').value = snapshot.child("discreption08").val();
        }
        if(snapshot.child("case_level").val() == '9') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = false;
          document.getElementsByName('r05')[0].hidden = false;
          document.getElementsByName('r06')[0].hidden = false;
          document.getElementsByName('r07')[0].hidden = false;
          document.getElementsByName('r08')[0].hidden = false;
          document.getElementsByName('r09')[0].hidden = false;
          document.getElementsByName('r10')[0].hidden = true;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
          document.getElementById('disc08').value = snapshot.child("discreption08").val();
          document.getElementById('disc09').value = snapshot.child("discreption09").val();
        }
        if(snapshot.child("case_level").val() == '10') {
          document.getElementsByName('r02')[0].hidden = false;
          document.getElementsByName('r03')[0].hidden = false;
          document.getElementsByName('r04')[0].hidden = false;
          document.getElementsByName('r05')[0].hidden = false;
          document.getElementsByName('r06')[0].hidden = false;
          document.getElementsByName('r07')[0].hidden = false;
          document.getElementsByName('r08')[0].hidden = false;
          document.getElementsByName('r09')[0].hidden = false;
          document.getElementsByName('r10')[0].hidden = false;
          document.getElementsByName('r11')[0].hidden = true;
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
          document.getElementById('disc08').value = snapshot.child("discreption08").val();
          document.getElementById('disc09').value = snapshot.child("discreption09").val();
          document.getElementById('disc10').value = snapshot.child("discreption10").val();
        }
        if(snapshot.child("case_level").val() == '11') {
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
          document.getElementsByName('r12')[0].hidden = true;
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
          document.getElementById('disc08').value = snapshot.child("discreption08").val();
          document.getElementById('disc09').value = snapshot.child("discreption09").val();
          document.getElementById('disc10').value = snapshot.child("discreption10").val();
          document.getElementById('disc11').value = snapshot.child("discreption11").val();
          
        }
        if(snapshot.child("case_level").val() == '12') {
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
          document.getElementsByName('r13')[0].hidden = true;
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
          document.getElementById('disc08').value = snapshot.child("discreption08").val();
          document.getElementById('disc09').value = snapshot.child("discreption09").val();
          document.getElementById('disc10').value = snapshot.child("discreption10").val();
          document.getElementById('disc11').value = snapshot.child("discreption11").val();
          document.getElementById('disc12').value = snapshot.child("discreption12").val();
        }
        if(snapshot.child("case_level").val() == '13') {
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
          document.getElementsByName('r14')[0].hidden = true;
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
          document.getElementById('disc08').value = snapshot.child("discreption08").val();
          document.getElementById('disc09').value = snapshot.child("discreption09").val();
          document.getElementById('disc10').value = snapshot.child("discreption10").val();
          document.getElementById('disc11').value = snapshot.child("discreption11").val();
          document.getElementById('disc12').value = snapshot.child("discreption12").val();
          document.getElementById('disc13').value = snapshot.child("discreption13").val();
        }
        if(snapshot.child("case_level").val() == '14') {
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
          document.getElementById('disc01').value = snapshot.child("discreption01").val();
          document.getElementById('disc02').value = snapshot.child("discreption02").val();
          document.getElementById('disc03').value = snapshot.child("discreption03").val();
          document.getElementById('disc04').value = snapshot.child("discreption04").val();
          document.getElementById('disc05').value = snapshot.child("discreption05").val();
          document.getElementById('disc06').value = snapshot.child("discreption06").val();
          document.getElementById('disc07').value = snapshot.child("discreption07").val();
          document.getElementById('disc08').value = snapshot.child("discreption08").val();
          document.getElementById('disc09').value = snapshot.child("discreption09").val();
          document.getElementById('disc10').value = snapshot.child("discreption10").val();
          document.getElementById('disc11').value = snapshot.child("discreption11").val();
          document.getElementById('disc12').value = snapshot.child("discreption12").val();
          document.getElementById('disc13').value = snapshot.child("discreption13").val();
          document.getElementById('disc14').value = snapshot.child("discreption14").val();
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  })

  //listener to addBtn
  // const addBtn = document.getElementById("addbtn");
  // addBtn.addEventListener("click", (event) =>{
  //   console.log("i am here");
  //   // let count = 0;
  //   // const dbRef = ref(getDatabase());

  //   // get(child(dbRef, `cases_type`)).then((snapshot) => {
  //   //   if (snapshot.exists()) {
  //   //     snapshot.forEach(snapshot => {
  //   //       count++;
  //   //       document.getElementById(`choice${count}`).value = snapshot.child("case_type").val();
  //   //       document.getElementById(`choice${count}`).innerHTML = snapshot.child("case_type").val();
  //   //       document.getElementsByName(`choice${count}`)[0].hidden = false;

  //   //     });
  //   //   } else {
  //   //     console.log("No data available");
  //   //   }
  //   // }).catch((error) => {
  //   //   console.error(error);
  //   // });
  // })

  //listener to add_Btn
  const add_Btn = document.getElementById("add_btn");
  add_Btn.addEventListener("click", (event) =>{

    document.getElementsByName('r02')[0].hidden = true;
    document.getElementsByName('r03')[0].hidden = true;
    document.getElementsByName('r04')[0].hidden = true;
    document.getElementsByName('r05')[0].hidden = true;
    document.getElementsByName('r06')[0].hidden = true;
    document.getElementsByName('r07')[0].hidden = true;
    document.getElementsByName('r08')[0].hidden = true;
    document.getElementsByName('r09')[0].hidden = true;
    document.getElementsByName('r10')[0].hidden = true;
    document.getElementsByName('r11')[0].hidden = true;
    document.getElementsByName('r12')[0].hidden = true;
    document.getElementsByName('r13')[0].hidden = true;
    document.getElementsByName('r14')[0].hidden = true;


    let count = 0;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `cases_type`)).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach(snapshot => {
          count++;
          document.getElementById(`choice${count}`).value = snapshot.child("case_type").val();
          document.getElementById(`choice${count}`).innerHTML = snapshot.child("case_type").val();
          document.getElementsByName(`choice${count}`)[0].hidden = false;

        });
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  })

  //listener to casenumber
  const case_num_check = document.getElementById("case_num_check");
  case_num_check.addEventListener("click", (event) =>{
    let case_num = document.getElementById("case3").value;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
      if (snapshot.exists()) {
        document.getElementById('case_type_update3').value = snapshot.child("case_type").val();
        document.getElementById('client_name3').value = snapshot.child("name").val();
        document.getElementById('phone_number3').value = snapshot.child("phone_num").val();
        document.getElementById('curr_level3').value = snapshot.child("curr_Level").val();
        document.getElementById('cmpname3').value = snapshot.child("company_name").val();

        document.getElementsByName('a02')[0].hidden = true;
        document.getElementsByName('a03')[0].hidden = true;
        document.getElementsByName('a04')[0].hidden = true;
        document.getElementsByName('a05')[0].hidden = true;
        document.getElementsByName('a06')[0].hidden = true;
        document.getElementsByName('a07')[0].hidden = true;
        document.getElementsByName('a08')[0].hidden = true;
        document.getElementsByName('a09')[0].hidden = true;
        document.getElementsByName('a10')[0].hidden = true;
        document.getElementsByName('a11')[0].hidden = true;
        document.getElementsByName('a12')[0].hidden = true;
        document.getElementsByName('a13')[0].hidden = true;
        document.getElementsByName('a14')[0].hidden = true;



        if(snapshot.child("levels").val() == '1') {
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
        }
        if(snapshot.child("levels").val() == '2') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
        }
        if(snapshot.child("levels").val() == '3') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
        }
        if(snapshot.child("levels").val() == '4') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
        }
        if(snapshot.child("levels").val() == '5') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
        }
        if(snapshot.child("levels").val() == '6') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
        }
        if(snapshot.child("levels").val() == '7') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
        }
        if(snapshot.child("levels").val() == '8') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementsByName('a08')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
          document.getElementById('discrp08').value = snapshot.child("discreption08").val();
        }
        if(snapshot.child("levels").val() == '9') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementsByName('a08')[0].hidden = false;
          document.getElementsByName('a09')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
          document.getElementById('discrp08').value = snapshot.child("discreption08").val();
          document.getElementById('discrp09').value = snapshot.child("discreption09").val();
        }
        if(snapshot.child("levels").val() == '10') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementsByName('a08')[0].hidden = false;
          document.getElementsByName('a09')[0].hidden = false;
          document.getElementsByName('a10')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
          document.getElementById('discrp08').value = snapshot.child("discreption08").val();
          document.getElementById('discrp09').value = snapshot.child("discreption09").val();
          document.getElementById('discrp10').value = snapshot.child("discreption10").val();
        }
        if(snapshot.child("levels").val() == '11') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementsByName('a08')[0].hidden = false;
          document.getElementsByName('a09')[0].hidden = false;
          document.getElementsByName('a10')[0].hidden = false;
          document.getElementsByName('a11')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
          document.getElementById('discrp08').value = snapshot.child("discreption08").val();
          document.getElementById('discrp09').value = snapshot.child("discreption09").val();
          document.getElementById('discrp10').value = snapshot.child("discreption10").val();
          document.getElementById('discrp11').value = snapshot.child("discreption11").val();
          
        }
        if(snapshot.child("levels").val() == '12') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementsByName('a08')[0].hidden = false;
          document.getElementsByName('a09')[0].hidden = false;
          document.getElementsByName('a10')[0].hidden = false;
          document.getElementsByName('a11')[0].hidden = false;
          document.getElementsByName('a12')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
          document.getElementById('discrp08').value = snapshot.child("discreption08").val();
          document.getElementById('discrp09').value = snapshot.child("discreption09").val();
          document.getElementById('discrp10').value = snapshot.child("discreption10").val();
          document.getElementById('discrp11').value = snapshot.child("discreption11").val();
          document.getElementById('discrp12').value = snapshot.child("discreption12").val();
        }
        if(snapshot.child("levels").val() == '13') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementsByName('a08')[0].hidden = false;
          document.getElementsByName('a09')[0].hidden = false;
          document.getElementsByName('a10')[0].hidden = false;
          document.getElementsByName('a11')[0].hidden = false;
          document.getElementsByName('a12')[0].hidden = false;
          document.getElementsByName('a13')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
          document.getElementById('discrp08').value = snapshot.child("discreption08").val();
          document.getElementById('discrp09').value = snapshot.child("discreption09").val();
          document.getElementById('discrp10').value = snapshot.child("discreption10").val();
          document.getElementById('discrp11').value = snapshot.child("discreption11").val();
          document.getElementById('discrp12').value = snapshot.child("discreption12").val();
          document.getElementById('discrp13').value = snapshot.child("discreption13").val();
        }
        if(snapshot.child("levels").val() == '14') {
          document.getElementsByName('a02')[0].hidden = false;
          document.getElementsByName('a03')[0].hidden = false;
          document.getElementsByName('a04')[0].hidden = false;
          document.getElementsByName('a05')[0].hidden = false;
          document.getElementsByName('a06')[0].hidden = false;
          document.getElementsByName('a07')[0].hidden = false;
          document.getElementsByName('a08')[0].hidden = false;
          document.getElementsByName('a09')[0].hidden = false;
          document.getElementsByName('a10')[0].hidden = false;
          document.getElementsByName('a11')[0].hidden = false;
          document.getElementsByName('a12')[0].hidden = false;
          document.getElementsByName('a13')[0].hidden = false;
          document.getElementsByName('a14')[0].hidden = false;
          document.getElementById('discrp01').value = snapshot.child("discreption01").val();
          document.getElementById('discrp02').value = snapshot.child("discreption02").val();
          document.getElementById('discrp03').value = snapshot.child("discreption03").val();
          document.getElementById('discrp04').value = snapshot.child("discreption04").val();
          document.getElementById('discrp05').value = snapshot.child("discreption05").val();
          document.getElementById('discrp06').value = snapshot.child("discreption06").val();
          document.getElementById('discrp07').value = snapshot.child("discreption07").val();
          document.getElementById('discrp08').value = snapshot.child("discreption08").val();
          document.getElementById('discrp09').value = snapshot.child("discreption09").val();
          document.getElementById('discrp10').value = snapshot.child("discreption10").val();
          document.getElementById('discrp11').value = snapshot.child("discreption11").val();
          document.getElementById('discrp12').value = snapshot.child("discreption12").val();
          document.getElementById('discrp13').value = snapshot.child("discreption13").val();
          document.getElementById('discrp14').value = snapshot.child("discreption14").val();
        }
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })
  })

   //update level
   function writelevelData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
    location.reload();
  }
  function writelevelData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      discreption12: disc12,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      discreption12: disc12,
      discreption13: disc13,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }
  function writelevelData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag) {
    const db = getDatabase();
    const reference = ref(db,'cases/'+ casenum);
    set(reference, {
      case_number: casenum,
      case_type: kind,
      name: cname,
      phone_num: phone,
      discreption01: disc01,
      discreption02: disc02,
      discreption03: disc03,
      discreption04: disc04,
      discreption05: disc05,
      discreption06: disc06,
      discreption07: disc07,
      discreption08: disc08,
      discreption09: disc09,
      discreption10: disc10,
      discreption11: disc11,
      discreption12: disc12,
      discreption13: disc13,
      discreption14: disc14,
      levels: levels,
      curr_Level: curr_level,
      company_name:company_name,
      tag: tag
    });
    alert("השלב עודכן בהצלחה")
  }

  //listener to next level
  const next = document.getElementById("next_level");
  next.addEventListener("click", (event) =>{

    var check = parseInt(document.getElementById("curr_level3").value);
    var type = document.getElementById('case_type_update3').value;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases_type/${type}`)).then((snapshot) => {
      if (snapshot.exists()) {
        var levels_limit = parseInt(snapshot.child("case_level").val());
        if(check < levels_limit){
          console.log("regular next");
          var x = document.getElementById("roi");
          if (window.getComputedStyle(x).display != "none") {
            var table = document.getElementById("table");
            let casenum = document.getElementById('case3').value;
            console.log("table rows:"+ (table.rows.length));
            for(let i =1; i< table.rows.length;i++){
              if(casenum == table.rows[i].cells[1].innerHTML){
                console.log(i+" row number mc");
                table.rows[i].cells[5].innerHTML  = parseInt(table.rows[i].cells[5].innerHTML)+1;
              }
      
            }

          }


          var y = document.getElementById("liroy");
          if (window.getComputedStyle(y).display != "none") {
            var table1 = document.getElementById("table9");
            let casenum = document.getElementById("case3").value;
            for(let i =1; i< table1.rows.length;i++){
              if(casenum == table1.rows[i].cells[1].innerHTML){
                table1.rows[i].cells[3].innerHTML  = parseInt(table1.rows[i].cells[3].innerHTML)+1;
              }
      
            }

          }
          
          casenum=document.getElementById('case3').value;
          
          let kind = document.getElementById('case_type_update3').value;
          let cname = document.getElementById('client_name3').value;
          let phone = document.getElementById('phone_number3').value;
          let company_name = document.getElementById('cmpname3').value;
          let curr_level = parseInt(document.getElementById('curr_level3').value) +1;
          document.getElementById('curr_level3').value = curr_level;
          let disc01 = document.getElementById('discrp01').value;
          let tag="";

          get(child(dbRef, `cases/${casenum}`)).then((snapshot) => {
            if (snapshot.exists()) {
              tag = snapshot.child("tag").val();
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          })


          get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
            if (snapshot.exists()) {
              let levels = snapshot.child("case_level").val();
              if (levels == "1") {
                if (validateFields([kind, casenum, cname, phone, disc01 ,levels, curr_level])){
                  writelevelData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                } 
              }
              if (levels == "2") {
                let disc02 = document.getElementById('discrp02').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, levels, curr_level])){
                  writelevelData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "3") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level])){
                  writelevelData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "4") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level])){
                  writelevelData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "5") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level])){
                  writelevelData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "6") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level])){
                  writelevelData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "7") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level])){
                  writelevelData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "8") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                let disc08 = document.getElementById('discrp08').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level])){
                  writelevelData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "9") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                let disc08 = document.getElementById('discrp08').value;
                let disc09 = document.getElementById('discrp09').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level])){
                  writelevelData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "10") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                let disc08 = document.getElementById('discrp08').value;
                let disc09 = document.getElementById('discrp09').value;
                let disc10 = document.getElementById('discrp10').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level])){
                  writelevelData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "11") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                let disc08 = document.getElementById('discrp08').value;
                let disc09 = document.getElementById('discrp09').value;
                let disc10 = document.getElementById('discrp10').value;
                let disc11 = document.getElementById('discrp11').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level])){
                  writelevelData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "12") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                let disc08 = document.getElementById('discrp08').value;
                let disc09 = document.getElementById('discrp09').value;
                let disc10 = document.getElementById('discrp10').value;
                let disc11 = document.getElementById('discrp11').value;
                let disc12 = document.getElementById('discrp12').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level])){
                  writelevelData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "13") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                let disc08 = document.getElementById('discrp08').value;
                let disc09 = document.getElementById('discrp09').value;
                let disc10 = document.getElementById('discrp10').value;
                let disc11 = document.getElementById('discrp11').value;
                let disc12 = document.getElementById('discrp12').value;
                let disc13 = document.getElementById('discrp13').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level])){
                  writelevelData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "14") {
                let disc02 = document.getElementById('discrp02').value;
                let disc03 = document.getElementById('discrp03').value;
                let disc04 = document.getElementById('discrp04').value;
                let disc05 = document.getElementById('discrp05').value;
                let disc06 = document.getElementById('discrp06').value;
                let disc07 = document.getElementById('discrp07').value;
                let disc08 = document.getElementById('discrp08').value;
                let disc09 = document.getElementById('discrp09').value;
                let disc10 = document.getElementById('discrp10').value;
                let disc11 = document.getElementById('discrp11').value;
                let disc12 = document.getElementById('discrp12').value;
                let disc13 = document.getElementById('discrp13').value;
                let disc14 = document.getElementById('discrp14').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level])){
                  writelevelData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                }
              }    
            } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            })


        }
        else if(check==levels_limit){
          alert("הגעת לשלב המקסימלי עבור תיק זה!");
        }
      }
       else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    

  })

 //listener to next level
 


  //add manger
  document.getElementById("save_manger").onclick = async function(){

  // isAdmin check
      let email_admin = document.getElementById("email-admin").value;
      let password_admin = document.getElementById("password-admin").value;
  
      const auth = getAuth();
    signInWithEmailAndPassword(auth, email_admin, password_admin)
      .then((userCredential) => {
        const user = userCredential.user;
          // verify passwords
    
          let new_password  = document.getElementById("new_password").value;
          let verify_password  = document.getElementById("match_password").value;
          let firstname = document.getElementById("firstname-admin").value;
          let lastname = document.getElementById("lastname-admin").value;
          let email = document.getElementById("new_email").value;
       
          if(firstname == "" || lastname == ""){
            alert("אנא מלא שם פרטי ושם משפחה של המנהל החדש")
          }
      
          else if(new_password != verify_password){
              alert("differnt passwords");
          }
          else{
                // add manger to db
                let new_email = document.getElementById("new_email").value;
                createUserWithEmailAndPassword(auth, new_email, new_password)
                .then((userCredential)  => {
                  const user = userCredential.user;
                  const db = getDatabase();
                  const reference = ref(db,'users/'+ firstname);
                  set(reference, {
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                  });
                  
                  alert("manger was added");
                  })
                  .catch((error) => {
                    alert("something go wrong cannot add this manger");
                  
          });
      
        // end add manger to db
            }
            // end verify passwords
        })
        .catch((error) => {
          alert('error: Wrong email or password were entered');
                return false;
        });
    
        // isAdmin check finish
      document.getElementById("exit_manger").click();
  }

  document.getElementById("4321").onclick = function(){
    if (document.getElementsByName("roi")[0].hidden != false) {

      var x = document.getElementById("allcasestype");
      if (window.getComputedStyle(x).display != "none") {
        var table = document.getElementById("table1");
        for(let i =table.rows.length-1; i>=1;i--){
          table.deleteRow(i);
        }
      }


      var y = document.getElementById("allmangers");  
      if (window.getComputedStyle(y).display != "none") {
        var table1 = document.getElementById("table3");
        for(let i =table1.rows.length-1; i>=1;i--){
          table1.deleteRow(i);
        }
      }

      var z = document.getElementById("liroy");  
      if (window.getComputedStyle(z).display != "none") {
        var table9 = document.getElementById("table9");
        for(let i =table9.rows.length-1; i>=1;i--){
          table9.deleteRow(i);
        }
      }


    document.getElementsByName("liroy")[0].hidden = true;
    document.getElementsByName("roi")[0].hidden = false;
    document.getElementsByName("allcasestype")[0].hidden = true;
    document.getElementsByName("allmangers")[0].hidden = true;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases`)).then((snapshot) => {
      if (snapshot.exists()) {
        var table = document.getElementById("table");
        let count = 1; 
        let row_count = 0;
        snapshot.forEach(snapshot => {
          var row = table.insertRow();
          row_count++;
          row.id=count;
          var cell = row.insertCell();
          cell.innerHTML = count;
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("case_number").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("name").val();
          var cell = row.insertCell();
          if(snapshot.child("company_name").val()== "" ||snapshot.child("company_name").val()== null){
            cell.innerHTML = "אין חברה";
          }
          else{
            cell.innerHTML = snapshot.child("company_name").val();
          }
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("case_type").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("curr_Level").val();
          cell.id = "cell";
          var cell = row.insertCell();


          var nextBt = document.createElement("button");
          nextBt.type = "button";
          nextBt.className ="btn btn-success"
          nextBt.textContent = "קידום שלב";
          nextBt.classList.add("btn-next");
          nextBt.id="next_lev-"+count;
          nextBt.addEventListener("click",function(){
            //change curr level in the table
            let text = this.id;
            console.log(text);
            const myArray = text.split("-");
            var currlev = parseInt(document.getElementById('table').rows[myArray[1]].cells[5].innerHTML);
            let levels = snapshot.child("levels").val();
            if(levels==currlev){
              alert("לא ניתן לקדם שלב הגעת אל השלב המקסימלי עבור תיק זה")
            }
            else{
              currlev++;
              document.getElementById('table').rows[myArray[1]].cells[5].innerHTML = currlev;
            // end change

            // update the database

            let casenum = snapshot.child("case_number").val();
            let kind = snapshot.child("case_type").val();
            let cname = snapshot.child("name").val();
            let company_name = snapshot.child("company_name").val();
            let phone = snapshot.child("phone_num").val();
            let curr_level = currlev;
            let disc01 = snapshot.child("discreption01").val();
            let tag = snapshot.child("tag").val();
            
            const dbRef = ref(getDatabase());
            get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
              if (snapshot.exists()) {
                let levels = snapshot.child("case_level").val();
                if (levels == "1") {
                  writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                }
                if (levels == "2") {
                  let disc02 = snapshot.child("discreption02").val();
                  writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                }
                if (levels == "3") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();;
                  writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                }
                if (levels == "4") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();
                  let disc04 = snapshot.child("discreption04").val();
                  writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                }
                if (levels == "5") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();
                  let disc04 = snapshot.child("discreption04").val();
                  let disc05 = snapshot.child("discreption05").val();
                  writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                }
                if (levels == "6") {
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                }
                if (levels == "7") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();
                  let disc04 = snapshot.child("discreption04").val();
                  let disc05 = snapshot.child("discreption05").val();
                  let disc06 = snapshot.child("discreption06").val();
                  let disc07 = snapshot.child("discreption07").val();
                  writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                }
                if (levels == "8") {

                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                }
                if (levels == "9") {
                  
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                }
                if (levels == "10") {
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, discrp10, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "11") {
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "12") {
                  
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    let disc12 = snapshot.child("discreption012").val();
                    writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "13") {
                 
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    let disc12 = snapshot.child("discreption012").val();
                    let disc13 = snapshot.child("discreption013").val();
                    writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "14") {
                 
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    let disc12 = snapshot.child("discreption012").val();
                    let disc13 = snapshot.child("discreption013").val();
                    let disc14 = snapshot.child("discreption014").val();
                    writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                  
                }
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            })

            }
            
        
            
            

          });
          cell.appendChild(nextBt);

          var editBt = document.createElement("button");
          editBt.type = "button";
          editBt.className ="btn btn-warning"
          editBt.textContent = "עריכה";
          editBt.classList.add("btn-edit");
          editBt.id="edit-"+count;
          editBt.style.marginRight = "10px";
          editBt.addEventListener("click", function(){
            var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
            myModal.show();
            alert("modal 4");
            let text = this.id;
            const myArray = text.split("-");
            let case_num = document.getElementById('table').rows[myArray[1]].cells[1].innerHTML;
            const db = getDatabase();
            const dbRef1 = ref(db, "/cases/" + case_num);
            get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
              if (snapshot.exists()) {
                console.log("editbt:"+snapshot.child("case_number").val());
            document.getElementById('case1').value = snapshot.child("case_number").val();
            document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
            document.getElementById('client_name1').value = snapshot.child("name").val();
            document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
            document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
            document.getElementById('company_name1').value = snapshot.child("company_name").val();
         
            
          document.getElementsByName('b02')[0].hidden = true;
          document.getElementsByName('b03')[0].hidden = true;
          document.getElementsByName('b04')[0].hidden = true;
          document.getElementsByName('b05')[0].hidden = true;
          document.getElementsByName('b06')[0].hidden = true;
          document.getElementsByName('b07')[0].hidden = true;
          document.getElementsByName('b08')[0].hidden = true;
          document.getElementsByName('b09')[0].hidden = true;
          document.getElementsByName('b10')[0].hidden = true;
          document.getElementsByName('b11')[0].hidden = true;
          document.getElementsByName('b12')[0].hidden = true;
          document.getElementsByName('b13')[0].hidden = true;
          document.getElementsByName('b14')[0].hidden = true;

            if(snapshot.child("levels").val() == '1') {
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
            }
            if(snapshot.child("levels").val() == '2') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
            }
            if(snapshot.child("levels").val() == '3') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
            }
            if(snapshot.child("levels").val() == '4') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
            }
            if(snapshot.child("levels").val() == '5') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
            }
            if(snapshot.child("levels").val() == '6') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
            }
            if(snapshot.child("levels").val() == '7') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
            }
            if(snapshot.child("levels").val() == '8') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
            }
            if(snapshot.child("levels").val() == '9') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
            }
            if(snapshot.child("levels").val() == '10') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
            }
            if(snapshot.child("levels").val() == '11') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              
            }
            if(snapshot.child("levels").val() == '12') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
            }
            if(snapshot.child("levels").val() == '13') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementsByName('b13')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
              document.getElementById('discre13').value = snapshot.child("discreption13").val();
            }
            if(snapshot.child("levels").val() == '14') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementsByName('b13')[0].hidden = false;
              document.getElementsByName('b14')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
              document.getElementById('discre13').value = snapshot.child("discreption13").val();
              document.getElementById('discre14').value = snapshot.child("discreption14").val();
            }

          
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            })



            
          });
          cell.appendChild(editBt);
          var delbtn = document.createElement("button");
          delbtn.type = "button";
          delbtn.className ="btn btn-danger"
          delbtn.textContent = "מחיקה";
          delbtn.classList.add("btn-delete");
          delbtn.id="del-" + count++;
          delbtn.style.marginRight = "10px";
          delbtn.addEventListener("click", function(){
            let text = this.id;
            const myArray = text.split("-");
            let case_num = document.getElementById('table').rows[myArray[1]].cells[1].innerHTML
            //del from db
            const db = getDatabase();
            const dbRef1 = ref(db, "/cases/" + case_num);
            remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
            //end del from db

            // del from table and update table
            console.log(row_count);
            table.deleteRow(myArray[1]);
            for (let i = myArray[1]; i < table.rows.length; i++) {
              document.getElementById('table').rows[i].cells[0].innerHTML= i;
              let temp=i;
              temp++;
              var del = document.getElementById("del-"+temp);
              var edit= document.getElementById("edit-"+temp);
              var next = document.getElementById("next_lev-"+temp);
              del.id = "del-"+i;
              edit.id = "edit-"+i;
              next.id = "next_lev-"+i;
            }
          });
          cell.appendChild(delbtn);
        }
        )
        
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })};
  }

  document.getElementById("logo").onclick = function(){
    // location.reload();
    

    if (document.getElementsByName("liroy")[0].hidden != false) {


      var x = document.getElementById("allcasestype");
      if (window.getComputedStyle(x).display != "none") {
        var table = document.getElementById("table1");
        for(let i =table.rows.length-1; i>=1;i--){
          table.deleteRow(i);
        }
      }


      var y = document.getElementById("allmangers");  
      if (window.getComputedStyle(y).display != "none") {
        var table1 = document.getElementById("table3");
        for(let i =table1.rows.length-1; i>=1;i--){
          table1.deleteRow(i);
        }
      }

      var z = document.getElementById("roi");
      if (window.getComputedStyle(z).display != "none") {
        var table2 = document.getElementById("table");
        for(let i =table2.rows.length-1; i>=1;i--){
          console.log("table regular delete");
          table2.deleteRow(i);
        }
      }




      document.getElementsByName("liroy")[0].hidden = false;
      document.getElementsByName("roi")[0].hidden = true;
      document.getElementsByName("allcasestype")[0].hidden = true;
      document.getElementsByName("allmangers")[0].hidden = true;

  
      const dbRef = ref(getDatabase());
        get(child(dbRef, `cases`)).then((snapshot) => {
          if (snapshot.exists()) {
  
            var table = document.getElementById("table9");
            let count = 1; 
            let row_count = 0;
            snapshot.forEach(snapshot => {
              var tag = snapshot.child("tag").val();
              if(tag=="true"){
                var row = table.insertRow();
                row_count++;
                row.id=count;
                var cell = row.insertCell();
                cell.innerHTML = count;
                var cell = row.insertCell();
                cell.innerHTML = snapshot.child("case_number").val();
                var cell = row.insertCell();
                cell.innerHTML = snapshot.child("case_type").val();
                var cell = row.insertCell();
                cell.innerHTML = snapshot.child("curr_Level").val();
                var cell = row.insertCell();
                cell.innerHTML = snapshot.child("name").val();
                var cell = row.insertCell();
                if(snapshot.child("company_name").val()== "" ||snapshot.child("company_name").val()== null){
                  cell.innerHTML = "אין חברה";
                }
                else{
                  cell.innerHTML = snapshot.child("company_name").val();
                }
                cell.id = "cell";
                var cell = row.insertCell();
      
      
                
      
                var editBt = document.createElement("button");
                editBt.type = "button";
                editBt.className ="btn btn-warning"
                editBt.textContent = "עריכה";
                editBt.classList.add("btn-edit");
                editBt.id="edit-"+count;
                editBt.style.marginRight = "10px";
                editBt.addEventListener("click", function(){
                  var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
                  myModal.show();
                  alert("modal 4");
                  let text = this.id;
                  const myArray = text.split("-");
                  let case_num = document.getElementById('table9').rows[myArray[1]].cells[1].innerHTML
                  const db = getDatabase();
                  const dbRef1 = ref(db, "/cases/" + case_num);
                  get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      console.log("editbt:"+snapshot.child("case_number").val());
                  document.getElementById('case1').value = snapshot.child("case_number").val();
                  document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
                  document.getElementById('client_name1').value = snapshot.child("name").val();
                  document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
                  document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
                  document.getElementById('company_name1').value = snapshot.child("company_name").val();
              
                  
                document.getElementsByName('b02')[0].hidden = true;
                document.getElementsByName('b03')[0].hidden = true;
                document.getElementsByName('b04')[0].hidden = true;
                document.getElementsByName('b05')[0].hidden = true;
                document.getElementsByName('b06')[0].hidden = true;
                document.getElementsByName('b07')[0].hidden = true;
                document.getElementsByName('b08')[0].hidden = true;
                document.getElementsByName('b09')[0].hidden = true;
                document.getElementsByName('b10')[0].hidden = true;
                document.getElementsByName('b11')[0].hidden = true;
                document.getElementsByName('b12')[0].hidden = true;
                document.getElementsByName('b13')[0].hidden = true;
                document.getElementsByName('b14')[0].hidden = true;
      
                  if(snapshot.child("levels").val() == '1') {
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  }
                  if(snapshot.child("levels").val() == '2') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  }
                  if(snapshot.child("levels").val() == '3') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  }
                  if(snapshot.child("levels").val() == '4') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  }
                  if(snapshot.child("levels").val() == '5') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  }
                  if(snapshot.child("levels").val() == '6') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  }
                  if(snapshot.child("levels").val() == '7') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  }
                  if(snapshot.child("levels").val() == '8') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementsByName('b08')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                    document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  }
                  if(snapshot.child("levels").val() == '9') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementsByName('b08')[0].hidden = false;
                    document.getElementsByName('b09')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                    document.getElementById('discre08').value = snapshot.child("discreption08").val();
                    document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  }
                  if(snapshot.child("levels").val() == '10') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementsByName('b08')[0].hidden = false;
                    document.getElementsByName('b09')[0].hidden = false;
                    document.getElementsByName('b10')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                    document.getElementById('discre08').value = snapshot.child("discreption08").val();
                    document.getElementById('discre09').value = snapshot.child("discreption09").val();
                    document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  }
                  if(snapshot.child("levels").val() == '11') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementsByName('b08')[0].hidden = false;
                    document.getElementsByName('b09')[0].hidden = false;
                    document.getElementsByName('b10')[0].hidden = false;
                    document.getElementsByName('b11')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                    document.getElementById('discre08').value = snapshot.child("discreption08").val();
                    document.getElementById('discre09').value = snapshot.child("discreption09").val();
                    document.getElementById('discre10').value = snapshot.child("discreption10").val();
                    document.getElementById('discre11').value = snapshot.child("discreption11").val();
                    
                  }
                  if(snapshot.child("levels").val() == '12') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementsByName('b08')[0].hidden = false;
                    document.getElementsByName('b09')[0].hidden = false;
                    document.getElementsByName('b10')[0].hidden = false;
                    document.getElementsByName('b11')[0].hidden = false;
                    document.getElementsByName('b12')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                    document.getElementById('discre08').value = snapshot.child("discreption08").val();
                    document.getElementById('discre09').value = snapshot.child("discreption09").val();
                    document.getElementById('discre10').value = snapshot.child("discreption10").val();
                    document.getElementById('discre11').value = snapshot.child("discreption11").val();
                    document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  }
                  if(snapshot.child("levels").val() == '13') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementsByName('b08')[0].hidden = false;
                    document.getElementsByName('b09')[0].hidden = false;
                    document.getElementsByName('b10')[0].hidden = false;
                    document.getElementsByName('b11')[0].hidden = false;
                    document.getElementsByName('b12')[0].hidden = false;
                    document.getElementsByName('b13')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                    document.getElementById('discre08').value = snapshot.child("discreption08").val();
                    document.getElementById('discre09').value = snapshot.child("discreption09").val();
                    document.getElementById('discre10').value = snapshot.child("discreption10").val();
                    document.getElementById('discre11').value = snapshot.child("discreption11").val();
                    document.getElementById('discre12').value = snapshot.child("discreption12").val();
                    document.getElementById('discre13').value = snapshot.child("discreption13").val();
                  }
                  if(snapshot.child("levels").val() == '14') {
                    document.getElementsByName('b02')[0].hidden = false;
                    document.getElementsByName('b03')[0].hidden = false;
                    document.getElementsByName('b04')[0].hidden = false;
                    document.getElementsByName('b05')[0].hidden = false;
                    document.getElementsByName('b06')[0].hidden = false;
                    document.getElementsByName('b07')[0].hidden = false;
                    document.getElementsByName('b08')[0].hidden = false;
                    document.getElementsByName('b09')[0].hidden = false;
                    document.getElementsByName('b10')[0].hidden = false;
                    document.getElementsByName('b11')[0].hidden = false;
                    document.getElementsByName('b12')[0].hidden = false;
                    document.getElementsByName('b13')[0].hidden = false;
                    document.getElementsByName('b14')[0].hidden = false;
                    document.getElementById('discre01').value = snapshot.child("discreption01").val();
                    document.getElementById('discre02').value = snapshot.child("discreption02").val();
                    document.getElementById('discre03').value = snapshot.child("discreption03").val();
                    document.getElementById('discre04').value = snapshot.child("discreption04").val();
                    document.getElementById('discre05').value = snapshot.child("discreption05").val();
                    document.getElementById('discre06').value = snapshot.child("discreption06").val();
                    document.getElementById('discre07').value = snapshot.child("discreption07").val();
                    document.getElementById('discre08').value = snapshot.child("discreption08").val();
                    document.getElementById('discre09').value = snapshot.child("discreption09").val();
                    document.getElementById('discre10').value = snapshot.child("discreption10").val();
                    document.getElementById('discre11').value = snapshot.child("discreption11").val();
                    document.getElementById('discre12').value = snapshot.child("discreption12").val();
                    document.getElementById('discre13').value = snapshot.child("discreption13").val();
                    document.getElementById('discre14').value = snapshot.child("discreption14").val();
                  }
                    } else {
                      console.log("No data available");
                    }
                  }).catch((error) => {
                    console.error(error);
                  })            
                });
                cell.appendChild(editBt);
                var delbtn = document.createElement("button");
                delbtn.type = "button";
                delbtn.className ="btn btn-danger"
                delbtn.textContent = "ביטול צימוד";
                delbtn.classList.add("btn-delete");
                delbtn.id="del-" + count++;
                delbtn.style.marginRight = "10px";
                delbtn.addEventListener("click", function(){
                  let text = this.id;
                  const myArray = text.split("-");
                  let case_num = document.getElementById('table9').rows[myArray[1]].cells[1].innerHTML;
                  //del from db
                  get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                      let casenum = snapshot.child("case_number").val();
                      let kind = snapshot.child("case_type").val();
                      let cname = snapshot.child("name").val();
                      let company_name = snapshot.child("company_name").val();
                      let phone = snapshot.child("phone_num").val();
                      let curr_level = snapshot.child("curr_Level").val();
                      let disc01 = snapshot.child("discreption01").val();
                      let tag = "false";
                      get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                            if (snapshot.exists()) {
                              let levels = snapshot.child("case_level").val();
                              if (levels == "1") {
                                writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                              }
                              if (levels == "2") {
                                let disc02 = snapshot.child("discreption02").val();
                                writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                              }
                              if (levels == "3") {
                                let disc02 = snapshot.child("discreption02").val();
                                let disc03 = snapshot.child("discreption03").val();;
                                writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                              }
                              if (levels == "4") {
                                let disc02 = snapshot.child("discreption02").val();
                                let disc03 = snapshot.child("discreption03").val();
                                let disc04 = snapshot.child("discreption04").val();
                                writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                              }
                              if (levels == "5") {
                                let disc02 = snapshot.child("discreption02").val();
                                let disc03 = snapshot.child("discreption03").val();
                                let disc04 = snapshot.child("discreption04").val();
                                let disc05 = snapshot.child("discreption05").val();
                                writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                              }
                              if (levels == "6") {
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                              }
                              if (levels == "7") {
                                let disc02 = snapshot.child("discreption02").val();
                                let disc03 = snapshot.child("discreption03").val();
                                let disc04 = snapshot.child("discreption04").val();
                                let disc05 = snapshot.child("discreption05").val();
                                let disc06 = snapshot.child("discreption06").val();
                                let disc07 = snapshot.child("discreption07").val();
                                writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                              }
                              if (levels == "8") {
              
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  let disc07 = snapshot.child("discreption07").val();
                                  let disc08 = snapshot.child("discreption08").val();
                                  writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                              }
                              if (levels == "9") {
                                
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  let disc07 = snapshot.child("discreption07").val();
                                  let disc08 = snapshot.child("discreption08").val();
                                  let disc09 = snapshot.child("discreption09").val();
                                  writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                              }
                              if (levels == "10") {
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  let disc07 = snapshot.child("discreption07").val();
                                  let disc08 = snapshot.child("discreption08").val();
                                  let disc09 = snapshot.child("discreption09").val();
                                  let disc10 = snapshot.child("discreption010").val();
                                  writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
                                
                              }
                              if (levels == "11") {
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  let disc07 = snapshot.child("discreption07").val();
                                  let disc08 = snapshot.child("discreption08").val();
                                  let disc09 = snapshot.child("discreption09").val();
                                  let disc10 = snapshot.child("discreption010").val();
                                  let disc11 = snapshot.child("discreption011").val();
                                  writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                                
                              }
                              if (levels == "12") {
                                
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  let disc07 = snapshot.child("discreption07").val();
                                  let disc08 = snapshot.child("discreption08").val();
                                  let disc09 = snapshot.child("discreption09").val();
                                  let disc10 = snapshot.child("discreption010").val();
                                  let disc11 = snapshot.child("discreption011").val();
                                  let disc12 = snapshot.child("discreption012").val();
                                  writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                                
                              }
                              if (levels == "13") {
                              
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  let disc07 = snapshot.child("discreption07").val();
                                  let disc08 = snapshot.child("discreption08").val();
                                  let disc09 = snapshot.child("discreption09").val();
                                  let disc10 = snapshot.child("discreption010").val();
                                  let disc11 = snapshot.child("discreption011").val();
                                  let disc12 = snapshot.child("discreption012").val();
                                  let disc13 = snapshot.child("discreption013").val();
                                  writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                                
                              }
                              if (levels == "14") {
                              
                                  let disc02 = snapshot.child("discreption02").val();
                                  let disc03 = snapshot.child("discreption03").val();
                                  let disc04 = snapshot.child("discreption04").val();
                                  let disc05 = snapshot.child("discreption05").val();
                                  let disc06 = snapshot.child("discreption06").val();
                                  let disc07 = snapshot.child("discreption07").val();
                                  let disc08 = snapshot.child("discreption08").val();
                                  let disc09 = snapshot.child("discreption09").val();
                                  let disc10 = snapshot.child("discreption010").val();
                                  let disc11 = snapshot.child("discreption011").val();
                                  let disc12 = snapshot.child("discreption012").val();
                                  let disc13 = snapshot.child("discreption013").val();
                                  let disc14 = snapshot.child("discreption014").val();
                                  writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                                
                              }
                            } else {
                              console.log("No data available");
                            }
                          }).catch((error) => {
                            console.error(error);
                          })
    
    
                    
                    } else {
                      console.log("No data available");
                    }
                  }).catch((error) => {
                    console.error(error);
                  }) 
    
    
    
                  // const db = getDatabase();
                  // const dbRef1 = ref(db, "/cases/" + case_num);
                  // remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
                  //end del from db
      
                  // del from table and update table
                  console.log(row_count);
                  table.deleteRow(myArray[1]);
                  for (let i = myArray[1]; i < table.rows.length; i++) {
                    document.getElementById('table9').rows[i].cells[0].innerHTML= i;
                    let temp=i;
                    temp++;
                    var del = document.getElementById("del-"+temp);
                    var edit= document.getElementById("edit-"+temp);
                    del.id = "del-"+i;
                    edit.id = "edit-"+i;
                  }
                });
                cell.appendChild(delbtn);
              }
            })
            
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
  

    }
   







  }

  document.getElementById("casestypebtn").onclick = function(){
    if (document.getElementsByName("allcasestype")[0].hidden != false) {


      var x = document.getElementById("roi");
      if (window.getComputedStyle(x).display != "none") {
        var table = document.getElementById("table");
        for(let i =table.rows.length-1; i>=1;i--){
          table.deleteRow(i);
        }
      }


      var y = document.getElementById("allmangers");  
      if (window.getComputedStyle(y).display != "none") {
        var table1 = document.getElementById("table3");
        for(let i =table1.rows.length-1; i>=1;i--){
          table1.deleteRow(i);
        }
      }

      var z = document.getElementById("liroy");  
      if (window.getComputedStyle(z).display != "none") {
        var table9 = document.getElementById("table9");
        for(let i =table9.rows.length-1; i>=1;i--){
          table9.deleteRow(i);
        }
      }


      document.getElementsByName("liroy")[0].hidden = true;
      document.getElementsByName("roi")[0].hidden = true;
      document.getElementsByName("allmangers")[0].hidden = true;
      document.getElementsByName("allcasestype")[0].hidden = false;
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases_type`)).then((snapshot) => {
        if (snapshot.exists()) {
          var table = document.getElementById("table1");
          let count = 1; 
          let row_count = 0;
          snapshot.forEach(snapshot => {
            var row = table.insertRow();
            var cell = row.insertCell();
            row_count++;
            cell.innerHTML = count;
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("case_type").val();
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("case_level").val();
            var cell = row.insertCell();
            var editBt = document.createElement("button");
            editBt.type = "button";
            editBt.textContent = "עריכה";
            editBt.className ="btn btn-warning"
            editBt.classList.add("btn-edit");
            editBt.id="edit"+count;
            editBt.addEventListener("click", function(){
              var myModal = new bootstrap.Modal(document.getElementById("exampleModal5"), {});
              myModal.show();
              document.getElementById('case_type1').value = snapshot.child("case_type").val();
              document.getElementById('levels1').value = snapshot.child("case_level").val();
              if(snapshot.child("case_level").val() == '1') {
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              }
              if(snapshot.child("case_level").val() == '2') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              }
              if(snapshot.child("case_level").val() == '3') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              }
              if(snapshot.child("case_level").val() == '4') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              }
              if(snapshot.child("case_level").val() == '5') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              }
              if(snapshot.child("case_level").val() == '6') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              }
              if(snapshot.child("case_level").val() == '7') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              }
              if(snapshot.child("case_level").val() == '8') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              }
              if(snapshot.child("case_level").val() == '9') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
              }
              if(snapshot.child("case_level").val() == '10') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
              }
              if(snapshot.child("case_level").val() == '11') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                
              }
              if(snapshot.child("case_level").val() == '12') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementsByName('e12')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                document.getElementById('discrep12').value = snapshot.child("discreption12").val();
              }
              if(snapshot.child("case_level").val() == '13') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementsByName('e12')[0].hidden = false;
                document.getElementsByName('e13')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                document.getElementById('discrep12').value = snapshot.child("discreption12").val();
                document.getElementById('discrep13').value = snapshot.child("discreption13").val();
              }
              if(snapshot.child("case_level").val() == '14') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementsByName('e12')[0].hidden = false;
                document.getElementsByName('e13')[0].hidden = false;
                document.getElementsByName('e14')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                document.getElementById('discrep12').value = snapshot.child("discreption12").val();
                document.getElementById('discrep13').value = snapshot.child("discreption13").val();
                document.getElementById('discrep14').value = snapshot.child("discreption14").val();
              }  
            });
            // editRow(cell);
            cell.appendChild(editBt);
            var delbtn = document.createElement("button");
            delbtn.type = "button";
            delbtn.textContent = "מחיקה";
            delbtn.className ="btn btn-danger"
            delbtn.classList.add("btn-delete");
            delbtn.id="del-" + count++;
            delbtn.style.marginRight = "10px";
            delbtn.addEventListener("click", function(){

              let text = this.id;
              const myArray = text.split("-");
              let case_type = document.getElementById('table1').rows[myArray[1]].cells[1].innerHTML
              //del from db
              const db = getDatabase();
              const dbRef1 = ref(db, "/cases_type/" + case_type);
              remove(dbRef1).then(() => alert(`סוג התיק '${case_type}' נמחק בהצלחה`));
              //end del from db
  
              // del from table and update table
              console.log(row_count);
              table.deleteRow(myArray[1]);
              for (let i = myArray[1]; i < row_count; i++) {
                document.getElementById('table1').rows[i].cells[0].innerHTML= i;
                let temp=i;
                temp++;
                var del = document.getElementById("del-"+temp);
                del.id = "del-"+i;
              }
              row_count--;
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
  }

  document.getElementById("mangers").onclick = function(){
    if (document.getElementsByName("allmangers")[0].hidden != false) {

      var x = document.getElementById("roi");
      if (window.getComputedStyle(x).display != "none") {
        var table = document.getElementById("table");
        console.log(table.rows.length);
        for(let i =table.rows.length-1; i>=1;i--){
          console.log(table.rows[i].cells[2].innerHTML);
          table.deleteRow(i);
          console.log(i);
        }
      }



      var y = document.getElementById("allcasestype");
      if (window.getComputedStyle(y).display != "none") {
        var table1 = document.getElementById("table1");
        for(let i =table1.rows.length-1; i>=1;i--){
          table1.deleteRow(i);
        }
      }

      var z = document.getElementById("liroy");  
      if (window.getComputedStyle(z).display != "none") {
        var table9 = document.getElementById("table9");
        for(let i =table9.rows.length-1; i>=1;i--){
          table9.deleteRow(i);
        }
      }



      document.getElementsByName("liroy")[0].hidden = true;
      document.getElementsByName("roi")[0].hidden = true;
      document.getElementsByName("allcasestype")[0].hidden = true;
      document.getElementsByName("allmangers")[0].hidden = false;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        var table = document.getElementById("table3");
        let count = 1; 
        snapshot.forEach(snapshot => {
          var row = table.insertRow();
          var cell = row.insertCell();
          cell.innerHTML = count++;
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("first_name").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("last_name").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("email").val();
        })} else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })}
  }
  
  document.getElementById("4321phone").onclick = function(){
    if (document.getElementsByName("allcasesphone")[0].hidden != false) {

    document.getElementsByName("lastcasesphone")[0].hidden = true;
    document.getElementsByName("allcasesphone")[0].hidden = false;
    document.getElementsByName("allcasestypephone")[0].hidden = true;
    document.getElementsByName("allmangersphone")[0].hidden = true;
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases`)).then((snapshot) => {
      if (snapshot.exists()) {
        var table = document.getElementById("table4");
        let count = 1; 
        snapshot.forEach(snapshot => {
          var row = table.insertRow();
          var cell = row.insertCell();
          cell.innerHTML = count;
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("case_number").val();
          let case_num = snapshot.child("case_number").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("case_type").val();
          var cell = row.insertCell();
          cell.innerHTML = snapshot.child("curr_Level").val();
          var cell = row.insertCell();
          var editBt = document.createElement("button");
          editBt.type = "button";
          editBt.className ="btn btn-warning"
          editBt.textContent = "עריכה";
          editBt.classList.add("btn-edit");
          editBt.id="edit"+count;
          editBt.addEventListener("click", function(){
            var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
            myModal.show();
            document.getElementById('case1').value = snapshot.child("case_number").val();
            document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
            document.getElementById('client_name1').value = snapshot.child("name").val();
            document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
            document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
            if(snapshot.child("levels").val() == '1') {
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
            }
            if(snapshot.child("levels").val() == '2') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
            }
            if(snapshot.child("levels").val() == '3') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
            }
            if(snapshot.child("levels").val() == '4') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
            }
            if(snapshot.child("levels").val() == '5') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
            }
            if(snapshot.child("levels").val() == '6') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
            }
            if(snapshot.child("levels").val() == '7') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
            }
            if(snapshot.child("levels").val() == '8') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
            }
            if(snapshot.child("levels").val() == '9') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
            }
            if(snapshot.child("levels").val() == '10') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
            }
            if(snapshot.child("levels").val() == '11') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              
            }
            if(snapshot.child("levels").val() == '12') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
            }
            if(snapshot.child("levels").val() == '13') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementsByName('b13')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
              document.getElementById('discre13').value = snapshot.child("discreption13").val();
            }
            if(snapshot.child("levels").val() == '14') {
              document.getElementsByName('b02')[0].hidden = false;
              document.getElementsByName('b03')[0].hidden = false;
              document.getElementsByName('b04')[0].hidden = false;
              document.getElementsByName('b05')[0].hidden = false;
              document.getElementsByName('b06')[0].hidden = false;
              document.getElementsByName('b07')[0].hidden = false;
              document.getElementsByName('b08')[0].hidden = false;
              document.getElementsByName('b09')[0].hidden = false;
              document.getElementsByName('b10')[0].hidden = false;
              document.getElementsByName('b11')[0].hidden = false;
              document.getElementsByName('b12')[0].hidden = false;
              document.getElementsByName('b13')[0].hidden = false;
              document.getElementsByName('b14')[0].hidden = false;
              document.getElementById('discre01').value = snapshot.child("discreption01").val();
              document.getElementById('discre02').value = snapshot.child("discreption02").val();
              document.getElementById('discre03').value = snapshot.child("discreption03").val();
              document.getElementById('discre04').value = snapshot.child("discreption04").val();
              document.getElementById('discre05').value = snapshot.child("discreption05").val();
              document.getElementById('discre06').value = snapshot.child("discreption06").val();
              document.getElementById('discre07').value = snapshot.child("discreption07").val();
              document.getElementById('discre08').value = snapshot.child("discreption08").val();
              document.getElementById('discre09').value = snapshot.child("discreption09").val();
              document.getElementById('discre10').value = snapshot.child("discreption10").val();
              document.getElementById('discre11').value = snapshot.child("discreption11").val();
              document.getElementById('discre12').value = snapshot.child("discreption12").val();
              document.getElementById('discre13').value = snapshot.child("discreption13").val();
              document.getElementById('discre14').value = snapshot.child("discreption14").val();
            }
          });
          cell.appendChild(editBt);
          var delbtn = document.createElement("button");
          delbtn.type = "button";
          delbtn.className ="btn btn-danger"
          delbtn.textContent = "מחיקה";
          delbtn.classList.add("btn-delete");
          delbtn.id="del" + count++;
          delbtn.style.marginRight = "10px";
          delbtn.addEventListener("click", async function(){
            const db = getDatabase();
            const dbRef1 = ref(db, "/cases/" + case_num);
            remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
          });
          cell.appendChild(delbtn);
        }
        )
        
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })};
  }

  document.getElementById("logophone").onclick = function(){
    location.reload();
    document.getElementsByName("lastcasesphone")[0].hidden = false;
    document.getElementsByName("allcasesphone")[0].hidden = true;
    document.getElementsByName("allcasestypephone")[0].hidden = true;
    document.getElementsByName("allmangersphone")[0].hidden = true;

  }

  document.getElementById("casestypebtnphone").onclick = function(){
    if (document.getElementsByName("allcasestype")[0].hidden != false) {
      document.getElementsByName("lastcasesphone")[0].hidden = true;
      document.getElementsByName("allcasesphone")[0].hidden = true;
      document.getElementsByName("allmangersphone")[0].hidden = true;
      document.getElementsByName("allcasestypephone")[0].hidden = false;
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases_type`)).then((snapshot) => {
        if (snapshot.exists()) {
          var table = document.getElementById("table5");
          let count = 1; 
          snapshot.forEach(snapshot => {
            var row = table.insertRow();
            var cell = row.insertCell();
            cell.innerHTML = count;
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("case_type").val();
            var cell = row.insertCell();
            cell.innerHTML = snapshot.child("case_level").val();
            var cell = row.insertCell();
            var editBt = document.createElement("button");
            editBt.type = "button";
            editBt.textContent = "עריכה";
            editBt.className ="btn btn-warning"
            editBt.classList.add("btn-edit");
            editBt.id="edit"+count;
            editBt.addEventListener("click", function(){
              var myModal = new bootstrap.Modal(document.getElementById("exampleModal5"), {});
              myModal.show();
              document.getElementById('case_type1').value = snapshot.child("case_type").val();
              document.getElementById('levels1').value = snapshot.child("case_level").val();
              if(snapshot.child("case_level").val() == '1') {
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
              }
              if(snapshot.child("case_level").val() == '2') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
              }
              if(snapshot.child("case_level").val() == '3') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
              }
              if(snapshot.child("case_level").val() == '4') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
              }
              if(snapshot.child("case_level").val() == '5') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
              }
              if(snapshot.child("case_level").val() == '6') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
              }
              if(snapshot.child("case_level").val() == '7') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
              }
              if(snapshot.child("case_level").val() == '8') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
              }
              if(snapshot.child("case_level").val() == '9') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
              }
              if(snapshot.child("case_level").val() == '10') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
              }
              if(snapshot.child("case_level").val() == '11') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                
              }
              if(snapshot.child("case_level").val() == '12') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementsByName('e12')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                document.getElementById('discrep12').value = snapshot.child("discreption12").val();
              }
              if(snapshot.child("case_level").val() == '13') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementsByName('e12')[0].hidden = false;
                document.getElementsByName('e13')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                document.getElementById('discrep12').value = snapshot.child("discreption12").val();
                document.getElementById('discrep13').value = snapshot.child("discreption13").val();
              }
              if(snapshot.child("case_level").val() == '14') {
                document.getElementsByName('e02')[0].hidden = false;
                document.getElementsByName('e03')[0].hidden = false;
                document.getElementsByName('e04')[0].hidden = false;
                document.getElementsByName('e05')[0].hidden = false;
                document.getElementsByName('e06')[0].hidden = false;
                document.getElementsByName('e07')[0].hidden = false;
                document.getElementsByName('e08')[0].hidden = false;
                document.getElementsByName('e09')[0].hidden = false;
                document.getElementsByName('e10')[0].hidden = false;
                document.getElementsByName('e11')[0].hidden = false;
                document.getElementsByName('e12')[0].hidden = false;
                document.getElementsByName('e13')[0].hidden = false;
                document.getElementsByName('e14')[0].hidden = false;
                document.getElementById('discrep01').value = snapshot.child("discreption01").val();
                document.getElementById('discrep02').value = snapshot.child("discreption02").val();
                document.getElementById('discrep03').value = snapshot.child("discreption03").val();
                document.getElementById('discrep04').value = snapshot.child("discreption04").val();
                document.getElementById('discrep05').value = snapshot.child("discreption05").val();
                document.getElementById('discrep06').value = snapshot.child("discreption06").val();
                document.getElementById('discrep07').value = snapshot.child("discreption07").val();
                document.getElementById('discrep08').value = snapshot.child("discreption08").val();
                document.getElementById('discrep09').value = snapshot.child("discreption09").val();
                document.getElementById('discrep10').value = snapshot.child("discreption10").val();
                document.getElementById('discrep11').value = snapshot.child("discreption11").val();
                document.getElementById('discrep12').value = snapshot.child("discreption12").val();
                document.getElementById('discrep13').value = snapshot.child("discreption13").val();
                document.getElementById('discrep14').value = snapshot.child("discreption14").val();
              }  
            });
            // editRow(cell);
            cell.appendChild(editBt);
            var delbtn = document.createElement("button");
            delbtn.type = "button";
            delbtn.textContent = "מחיקה";
            delbtn.className ="btn btn-danger"
            delbtn.classList.add("btn-delete");
            delbtn.id="del" + count++;
            delbtn.style.marginRight = "10px";
            delbtn.addEventListener("click", function(){

              const db = getDatabase();
              const dbRef1 = ref(db, "/cases_type/" + case_num);
              remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));

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
  }

  document.getElementById("mangersphone").onclick = function(){
    if (document.getElementsByName("allmangersphone")[0].hidden != false) {
      document.getElementsByName("lastcasesphone")[0].hidden = true;
      document.getElementsByName("allcasesphone")[0].hidden = true;
      document.getElementsByName("allcasestypephone")[0].hidden = true;
      document.getElementsByName("allmangersphone")[0].hidden = false;

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        var table = document.getElementById("table6");
        let count = 1; 
        snapshot.forEach(snapshot => {
          var row = table.insertRow();
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
          delbtn.className ="btn btn-danger"
          delbtn.classList.add("btn-delete");
          delbtn.id="del" + count++;
          delbtn.style.marginRight = "10px";
          delbtn.addEventListener("click", function(){
            alert(delbtn.id);

          });
          cell.appendChild(delbtn);
        })} else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    })}
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
 }

 document.getElementById("search").addEventListener("keydown" , (event) => {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search').value;
  ul = document.getElementById("myUL");
  let list = [];
  let count = 0; 
  
  if (event.key == "Enter") {
    if(isNaN(input)){
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases`)).then((snapshot) => {

        var table = document.getElementById("table7");
        if(table.rows.length>1){
          for(var i = table.rows.length-1;i>=1;i--){
            table.deleteRow(i);
  
          }
        }
        

        var myModal = new bootstrap.Modal(document.getElementById("exampleModal6"), {});
        myModal.show();
        if (snapshot.exists()) {
          snapshot.forEach(snapshot => {
            if ( input == snapshot.child("company_name").val() || input == snapshot.child("name").val() ) {
              count++;
              
              var row = table.insertRow();
              var cell = row.insertCell();
              cell.innerHTML = count;
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_number").val();
              let case_num = snapshot.child("case_number").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_type").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("curr_Level").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("name").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("company_name").val();
              var cell = row.insertCell();

              
              var nextBt = document.createElement("button");
              nextBt.type = "button";
              nextBt.className ="btn btn-success"
              nextBt.textContent = "קידום שלב";
              nextBt.classList.add("btn-next");
              nextBt.id="next_lev-"+count;
              nextBt.addEventListener("click",function(){
                //change curr level in the table
                let text = this.id;
                console.log(text);
                const myArray = text.split("-");
                var currlev = parseInt(document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML);
                let levels = snapshot.child("levels").val();
                if(levels==currlev){
                  alert("לא ניתן לקדם שלב הגעת אל השלב המקסימלי עבור תיק זה")
                }
                else{
                  currlev++;
                  document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML = currlev;
                // end change
    
                // update the database
    
                let casenum = snapshot.child("case_number").val();
                let kind = snapshot.child("case_type").val();
                let cname = snapshot.child("name").val();
                let company_name = snapshot.child("company_name").val();
                let phone = snapshot.child("phone_num").val();
                let curr_level = currlev;
                let disc01 = snapshot.child("discreption01").val();
                let tag = snapshot.child("tag").val();
                
                const dbRef = ref(getDatabase());
                get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                  if (snapshot.exists()) {
                    let levels = snapshot.child("case_level").val();
                    if (levels == "1") {
                      writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                    }
                    if (levels == "2") {
                      let disc02 = snapshot.child("discreption02").val();
                      writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                    }
                    if (levels == "3") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();;
                      writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                    }
                    if (levels == "4") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                    }
                    if (levels == "5") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                    }
                    if (levels == "6") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                    }
                    if (levels == "7") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      let disc06 = snapshot.child("discreption06").val();
                      let disc07 = snapshot.child("discreption07").val();
                      writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                    }
                    if (levels == "8") {
    
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                    }
                    if (levels == "9") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                    }
                    if (levels == "10") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, discrp10, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "11") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "12") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "13") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "14") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        let disc14 = snapshot.child("discreption014").val();
                        writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                      
                    }
                  } else {
                    console.log("No data available");
                  }
                }).catch((error) => {
                  console.error(error);
                })
    
                }
                
            
                
                
    
              });
              cell.appendChild(nextBt);



              var editBt = document.createElement("button");
              editBt.type = "button";
              editBt.className ="btn btn-warning"
              editBt.textContent = "עריכה";
              editBt.classList.add("btn-edit");
              editBt.id="edit"+count;
              editBt.style.marginRight = "10px";
              editBt.addEventListener("click", function(){
                var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
                myModal.show();
                document.getElementById('case1').value = snapshot.child("case_number").val();
                document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
                document.getElementById('client_name1').value = snapshot.child("name").val();
                document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
                document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
                document.getElementById('company_name1').value = snapshot.child("company_name").val();
                if(snapshot.child("levels").val() == '1') {
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                }
                if(snapshot.child("levels").val() == '2') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                }
                if(snapshot.child("levels").val() == '3') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                }
                if(snapshot.child("levels").val() == '4') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                }
                if(snapshot.child("levels").val() == '5') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                }
                if(snapshot.child("levels").val() == '6') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                }
                if(snapshot.child("levels").val() == '7') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                }
                if(snapshot.child("levels").val() == '8') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                }
                if(snapshot.child("levels").val() == '9') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                }
                if(snapshot.child("levels").val() == '10') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                }
                if(snapshot.child("levels").val() == '11') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  
                }
                if(snapshot.child("levels").val() == '12') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                }
                if(snapshot.child("levels").val() == '13') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                }
                if(snapshot.child("levels").val() == '14') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementsByName('b14')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                  document.getElementById('discre14').value = snapshot.child("discreption14").val();
                }
              });
              cell.appendChild(editBt);
              var delbtn = document.createElement("button");
              delbtn.type = "button";
              delbtn.className ="btn btn-danger"
              delbtn.textContent = "מחיקה";
              delbtn.classList.add("btn-delete");
              delbtn.id="del" + count;
              delbtn.style.marginRight = "10px";
              delbtn.addEventListener("click", async function(){
                const db = getDatabase();
                const dbRef1 = ref(db, "/cases/" + case_num);
                remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
              });
              cell.appendChild(delbtn);
            }
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }
    else{
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases/${input}`)).then((snapshot) => {
        if (snapshot.exists()) {    
          var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
          myModal.show();

          document.getElementsByName('b02')[0].hidden = true;
          document.getElementsByName('b03')[0].hidden = true;
          document.getElementsByName('b04')[0].hidden = true;
          document.getElementsByName('b05')[0].hidden = true;
          document.getElementsByName('b06')[0].hidden = true;
          document.getElementsByName('b07')[0].hidden = true;
          document.getElementsByName('b08')[0].hidden = true;
          document.getElementsByName('b09')[0].hidden = true;
          document.getElementsByName('b10')[0].hidden = true;
          document.getElementsByName('b11')[0].hidden = true;
          document.getElementsByName('b12')[0].hidden = true;
          document.getElementsByName('b13')[0].hidden = true;
          document.getElementsByName('b14')[0].hidden = true;
          
 
          document.getElementById('case1').value = snapshot.child("case_number").val();
          document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
          document.getElementById('client_name1').value = snapshot.child("name").val();
          document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
          document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
          document.getElementById('company_name1').value = snapshot.child("company_name").val();
          if(snapshot.child("levels").val() == '1') {
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
          }
          if(snapshot.child("levels").val() == '2') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
          }
          if(snapshot.child("levels").val() == '3') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
          }
          if(snapshot.child("levels").val() == '4') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
          }
          if(snapshot.child("levels").val() == '5') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
          }
          if(snapshot.child("levels").val() == '6') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
          }
          if(snapshot.child("levels").val() == '7') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
          }
          if(snapshot.child("levels").val() == '8') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
          }
          if(snapshot.child("levels").val() == '9') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
          }
          if(snapshot.child("levels").val() == '10') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
          }
          if(snapshot.child("levels").val() == '11') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            
          }
          if(snapshot.child("levels").val() == '12') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
          }
          if(snapshot.child("levels").val() == '13') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
          }
          if(snapshot.child("levels").val() == '14') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementsByName('b14')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
            document.getElementById('discre14').value = snapshot.child("discreption14").val();
          }



        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }

  }

 })

 document.getElementById("search1").addEventListener("keydown" , (event) => {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search1').value;
  ul = document.getElementById("myUL");
  let count = 0; 
  
  if (event.key == "Enter") {
    if(isNaN(input)){
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases`)).then((snapshot) => {


        var table = document.getElementById("table7");
        if(table.rows.length>1){
          for(var i = table.rows.length-1;i>=1;i--){
            table.deleteRow(i);
  
          }
        }
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal6"), {});
        myModal.show();
        if (snapshot.exists()) {
          snapshot.forEach(snapshot => {
            if ( input == snapshot.child("company_name").val() || input == snapshot.child("name").val() ) {
              count++;
              var row = table.insertRow();
              var cell = row.insertCell();
              cell.innerHTML = count;
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_number").val();
              let case_num = snapshot.child("case_number").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_type").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("curr_Level").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("name").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("company_name").val();
              var cell = row.insertCell();

                  
              var nextBt = document.createElement("button");
              nextBt.type = "button";
              nextBt.className ="btn btn-success"
              nextBt.textContent = "קידום שלב";
              nextBt.classList.add("btn-next");
              nextBt.id="next_lev-"+count;
              nextBt.addEventListener("click",function(){
                //change curr level in the table
                let text = this.id;
                console.log(text);
                const myArray = text.split("-");
                var currlev = parseInt(document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML);
                let levels = snapshot.child("levels").val();
                if(levels==currlev){
                  alert("לא ניתן לקדם שלב הגעת אל השלב המקסימלי עבור תיק זה")
                }
                else{
                  currlev++;
                  document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML = currlev;
                // end change
    
                // update the database
    
                let casenum = snapshot.child("case_number").val();
                let kind = snapshot.child("case_type").val();
                let cname = snapshot.child("name").val();
                let company_name = snapshot.child("company_name").val();
                let phone = snapshot.child("phone_num").val();
                let curr_level = currlev;
                let disc01 = snapshot.child("discreption01").val();
                let tag = snapshot.child("tag").val();
                
                const dbRef = ref(getDatabase());
                get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                  if (snapshot.exists()) {
                    let levels = snapshot.child("case_level").val();
                    if (levels == "1") {
                      writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                    }
                    if (levels == "2") {
                      let disc02 = snapshot.child("discreption02").val();
                      writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                    }
                    if (levels == "3") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();;
                      writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                    }
                    if (levels == "4") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                    }
                    if (levels == "5") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                    }
                    if (levels == "6") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                    }
                    if (levels == "7") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      let disc06 = snapshot.child("discreption06").val();
                      let disc07 = snapshot.child("discreption07").val();
                      writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                    }
                    if (levels == "8") {
    
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                    }
                    if (levels == "9") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                    }
                    if (levels == "10") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, discrp10, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "11") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "12") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "13") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "14") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        let disc14 = snapshot.child("discreption014").val();
                        writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                      
                    }
                  } else {
                    console.log("No data available");
                  }
                }).catch((error) => {
                  console.error(error);
                })
    
                }
                
            
                
                
    
              });
              cell.appendChild(nextBt);




              var editBt = document.createElement("button");
              editBt.type = "button";
              editBt.className ="btn btn-warning"
              editBt.textContent = "עריכה";
              editBt.classList.add("btn-edit");
              editBt.id="edit"+count;
              editBt.style.marginRight = "10px";
              editBt.addEventListener("click", function(){
                var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
                myModal.show();
                document.getElementById('case1').value = snapshot.child("case_number").val();
                document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
                document.getElementById('client_name1').value = snapshot.child("name").val();
                document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
                document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
                if(snapshot.child("levels").val() == '1') {
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                }
                if(snapshot.child("levels").val() == '2') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                }
                if(snapshot.child("levels").val() == '3') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                }
                if(snapshot.child("levels").val() == '4') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                }
                if(snapshot.child("levels").val() == '5') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                }
                if(snapshot.child("levels").val() == '6') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                }
                if(snapshot.child("levels").val() == '7') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                }
                if(snapshot.child("levels").val() == '8') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                }
                if(snapshot.child("levels").val() == '9') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                }
                if(snapshot.child("levels").val() == '10') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                }
                if(snapshot.child("levels").val() == '11') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  
                }
                if(snapshot.child("levels").val() == '12') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                }
                if(snapshot.child("levels").val() == '13') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                }
                if(snapshot.child("levels").val() == '14') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementsByName('b14')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                  document.getElementById('discre14').value = snapshot.child("discreption14").val();
                }
              });
              cell.appendChild(editBt);
              var delbtn = document.createElement("button");
              delbtn.type = "button";
              delbtn.className ="btn btn-danger"
              delbtn.textContent = "מחיקה";
              delbtn.classList.add("btn-delete");
              delbtn.id="del" + count;
              delbtn.style.marginRight = "10px";
              delbtn.addEventListener("click", async function(){
                const db = getDatabase();
                const dbRef1 = ref(db, "/cases/" + case_num);
                remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
              });
              cell.appendChild(delbtn);
            }
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }
    else{
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases/${input}`)).then((snapshot) => {
        if (snapshot.exists()) {    
          var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
          myModal.show();
          document.getElementById('case1').value = snapshot.child("case_number").val();
          document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
          document.getElementById('client_name1').value = snapshot.child("name").val();
          document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
          document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
          document.getElementById('company_name1').value = snapshot.child("company_name").val();


          document.getElementsByName('b02')[0].hidden = true;
          document.getElementsByName('b03')[0].hidden = true;
          document.getElementsByName('b04')[0].hidden = true;
          document.getElementsByName('b05')[0].hidden = true;
          document.getElementsByName('b06')[0].hidden = true;
          document.getElementsByName('b07')[0].hidden = true;
          document.getElementsByName('b08')[0].hidden = true;
          document.getElementsByName('b09')[0].hidden = true;
          document.getElementsByName('b10')[0].hidden = true;
          document.getElementsByName('b11')[0].hidden = true;
          document.getElementsByName('b12')[0].hidden = true;
          document.getElementsByName('b13')[0].hidden = true;
          document.getElementsByName('b14')[0].hidden = true;




          if(snapshot.child("levels").val() == '1') {
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
          }
          if(snapshot.child("levels").val() == '2') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
          }
          if(snapshot.child("levels").val() == '3') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
          }
          if(snapshot.child("levels").val() == '4') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
          }
          if(snapshot.child("levels").val() == '5') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
          }
          if(snapshot.child("levels").val() == '6') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
          }
          if(snapshot.child("levels").val() == '7') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
          }
          if(snapshot.child("levels").val() == '8') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
          }
          if(snapshot.child("levels").val() == '9') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
          }
          if(snapshot.child("levels").val() == '10') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
          }
          if(snapshot.child("levels").val() == '11') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            
          }
          if(snapshot.child("levels").val() == '12') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
          }
          if(snapshot.child("levels").val() == '13') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
          }
          if(snapshot.child("levels").val() == '14') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementsByName('b14')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
            document.getElementById('discre14').value = snapshot.child("discreption14").val();
          }
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }

  }

 })

 document.getElementById("search2").addEventListener("keydown" , (event) => {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search2').value;
  ul = document.getElementById("myUL");
  let count = 0; 
  
  if (event.key == "Enter") {
    if(isNaN(input)){
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases`)).then((snapshot) => {

        var table = document.getElementById("table7");
        if(table.rows.length>1){
          for(var i = table.rows.length-1;i>=1;i--){
            table.deleteRow(i);
  
          }
        }

        var myModal = new bootstrap.Modal(document.getElementById("exampleModal6"), {});
        myModal.show();
        if (snapshot.exists()) {
          snapshot.forEach(snapshot => {
            if ( input == snapshot.child("company_name").val() || input == snapshot.child("name").val() ) {
              count++;
              var row = table.insertRow();
              var cell = row.insertCell();
              cell.innerHTML = count;
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_number").val();
              let case_num = snapshot.child("case_number").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_type").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("curr_Level").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("name").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("company_name").val();
              var cell = row.insertCell();


              var nextBt = document.createElement("button");
              nextBt.type = "button";
              nextBt.className ="btn btn-success"
              nextBt.textContent = "קידום שלב";
              nextBt.classList.add("btn-next");
              nextBt.id="next_lev-"+count;
              nextBt.addEventListener("click",function(){
                //change curr level in the table
                let text = this.id;
                console.log(text);
                const myArray = text.split("-");
                var currlev = parseInt(document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML);
                let levels = snapshot.child("levels").val();
                if(levels==currlev){
                  alert("לא ניתן לקדם שלב הגעת אל השלב המקסימלי עבור תיק זה")
                }
                else{
                  currlev++;
                  document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML = currlev;
                // end change
    
                // update the database
    
                let casenum = snapshot.child("case_number").val();
                let kind = snapshot.child("case_type").val();
                let cname = snapshot.child("name").val();
                let company_name = snapshot.child("company_name").val();
                let phone = snapshot.child("phone_num").val();
                let curr_level = currlev;
                let disc01 = snapshot.child("discreption01").val();
                let tag = snapshot.child("tag").val();
                
                const dbRef = ref(getDatabase());
                get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                  if (snapshot.exists()) {
                    let levels = snapshot.child("case_level").val();
                    if (levels == "1") {
                      writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                    }
                    if (levels == "2") {
                      let disc02 = snapshot.child("discreption02").val();
                      writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                    }
                    if (levels == "3") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();;
                      writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                    }
                    if (levels == "4") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                    }
                    if (levels == "5") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                    }
                    if (levels == "6") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                    }
                    if (levels == "7") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      let disc06 = snapshot.child("discreption06").val();
                      let disc07 = snapshot.child("discreption07").val();
                      writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                    }
                    if (levels == "8") {
    
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                    }
                    if (levels == "9") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                    }
                    if (levels == "10") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, discrp10, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "11") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "12") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "13") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "14") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        let disc14 = snapshot.child("discreption014").val();
                        writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                      
                    }
                  } else {
                    console.log("No data available");
                  }
                }).catch((error) => {
                  console.error(error);
                })
    
                }
                
            
                
                
    
              });
              cell.appendChild(nextBt);

              var editBt = document.createElement("button");
              editBt.type = "button";
              editBt.className ="btn btn-warning"
              editBt.textContent = "עריכה";
              editBt.classList.add("btn-edit");
              editBt.id="edit"+count;
              editBt.style.marginRight = "10px";
              editBt.addEventListener("click", function(){
                var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
                myModal.show();
                document.getElementById('case1').value = snapshot.child("case_number").val();
                document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
                document.getElementById('client_name1').value = snapshot.child("name").val();
                document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
                document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
                if(snapshot.child("levels").val() == '1') {
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                }
                if(snapshot.child("levels").val() == '2') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                }
                if(snapshot.child("levels").val() == '3') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                }
                if(snapshot.child("levels").val() == '4') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                }
                if(snapshot.child("levels").val() == '5') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                }
                if(snapshot.child("levels").val() == '6') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                }
                if(snapshot.child("levels").val() == '7') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                }
                if(snapshot.child("levels").val() == '8') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                }
                if(snapshot.child("levels").val() == '9') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                }
                if(snapshot.child("levels").val() == '10') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                }
                if(snapshot.child("levels").val() == '11') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  
                }
                if(snapshot.child("levels").val() == '12') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                }
                if(snapshot.child("levels").val() == '13') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                }
                if(snapshot.child("levels").val() == '14') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementsByName('b14')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                  document.getElementById('discre14').value = snapshot.child("discreption14").val();
                }
              });
              cell.appendChild(editBt);
              var delbtn = document.createElement("button");
              delbtn.type = "button";
              delbtn.className ="btn btn-danger"
              delbtn.textContent = "מחיקה";
              delbtn.classList.add("btn-delete");
              delbtn.id="del" + count;
              delbtn.style.marginRight = "10px";
              delbtn.addEventListener("click", async function(){
                const db = getDatabase();
                const dbRef1 = ref(db, "/cases/" + case_num);
                remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
              });
              cell.appendChild(delbtn);
            }
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }
    else{
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases/${input}`)).then((snapshot) => {
        if (snapshot.exists()) {    
          var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
          myModal.show();
          document.getElementById('case1').value = snapshot.child("case_number").val();
          document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
          document.getElementById('client_name1').value = snapshot.child("name").val();
          document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
          document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
          document.getElementById('company_name1').value = snapshot.child("company_name").val();


          document.getElementsByName('b02')[0].hidden = true;
          document.getElementsByName('b03')[0].hidden = true;
          document.getElementsByName('b04')[0].hidden = true;
          document.getElementsByName('b05')[0].hidden = true;
          document.getElementsByName('b06')[0].hidden = true;
          document.getElementsByName('b07')[0].hidden = true;
          document.getElementsByName('b08')[0].hidden = true;
          document.getElementsByName('b09')[0].hidden = true;
          document.getElementsByName('b10')[0].hidden = true;
          document.getElementsByName('b11')[0].hidden = true;
          document.getElementsByName('b12')[0].hidden = true;
          document.getElementsByName('b13')[0].hidden = true;
          document.getElementsByName('b14')[0].hidden = true;


          if(snapshot.child("levels").val() == '1') {
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
          }
          if(snapshot.child("levels").val() == '2') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
          }
          if(snapshot.child("levels").val() == '3') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
          }
          if(snapshot.child("levels").val() == '4') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
          }
          if(snapshot.child("levels").val() == '5') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
          }
          if(snapshot.child("levels").val() == '6') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
          }
          if(snapshot.child("levels").val() == '7') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
          }
          if(snapshot.child("levels").val() == '8') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
          }
          if(snapshot.child("levels").val() == '9') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
          }
          if(snapshot.child("levels").val() == '10') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
          }
          if(snapshot.child("levels").val() == '11') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            
          }
          if(snapshot.child("levels").val() == '12') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
          }
          if(snapshot.child("levels").val() == '13') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
          }
          if(snapshot.child("levels").val() == '14') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementsByName('b14')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
            document.getElementById('discre14').value = snapshot.child("discreption14").val();
          }
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }

  }

 })

 document.getElementById("search3").addEventListener("keydown" , (event) => {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search3').value;
  ul = document.getElementById("myUL");
  let count = 0; 
  
  if (event.key == "Enter") {
    if(isNaN(input)){
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases`)).then((snapshot) => {

        var table = document.getElementById("table7");
        if(table.rows.length>1){
          for(var i = table.rows.length-1;i>=1;i--){
            table.deleteRow(i);
  
          }
        }
        var myModal = new bootstrap.Modal(document.getElementById("exampleModal6"), {});
        myModal.show();
        if (snapshot.exists()) {
          snapshot.forEach(snapshot => {
            if ( input == snapshot.child("company_name").val() || input == snapshot.child("name").val() ) {
              count++;
              var row = table.insertRow();
              var cell = row.insertCell();
              cell.innerHTML = count;
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_number").val();
              let case_num = snapshot.child("case_number").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("case_type").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("curr_Level").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("name").val();
              var cell = row.insertCell();
              cell.innerHTML = snapshot.child("company_name").val();
              var cell = row.insertCell();

              var nextBt = document.createElement("button");
              nextBt.type = "button";
              nextBt.className ="btn btn-success"
              nextBt.textContent = "קידום שלב";
              nextBt.classList.add("btn-next");
              nextBt.id="next_lev-"+count;
              nextBt.addEventListener("click",function(){
                //change curr level in the table
                let text = this.id;
                console.log(text);
                const myArray = text.split("-");
                var currlev = parseInt(document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML);
                let levels = snapshot.child("levels").val();
                if(levels==currlev){
                  alert("לא ניתן לקדם שלב הגעת אל השלב המקסימלי עבור תיק זה")
                }
                else{
                  currlev++;
                  document.getElementById('table7').rows[myArray[1]].cells[3].innerHTML = currlev;
                // end change
    
                // update the database
    
                let casenum = snapshot.child("case_number").val();
                let kind = snapshot.child("case_type").val();
                let cname = snapshot.child("name").val();
                let company_name = snapshot.child("company_name").val();
                let phone = snapshot.child("phone_num").val();
                let curr_level = currlev;
                let disc01 = snapshot.child("discreption01").val();
                let tag = snapshot.child("tag").val();
                
                const dbRef = ref(getDatabase());
                get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                  if (snapshot.exists()) {
                    let levels = snapshot.child("case_level").val();
                    if (levels == "1") {
                      writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                    }
                    if (levels == "2") {
                      let disc02 = snapshot.child("discreption02").val();
                      writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                    }
                    if (levels == "3") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();;
                      writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                    }
                    if (levels == "4") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                    }
                    if (levels == "5") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                    }
                    if (levels == "6") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                    }
                    if (levels == "7") {
                      let disc02 = snapshot.child("discreption02").val();
                      let disc03 = snapshot.child("discreption03").val();
                      let disc04 = snapshot.child("discreption04").val();
                      let disc05 = snapshot.child("discreption05").val();
                      let disc06 = snapshot.child("discreption06").val();
                      let disc07 = snapshot.child("discreption07").val();
                      writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                    }
                    if (levels == "8") {
    
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                    }
                    if (levels == "9") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                    }
                    if (levels == "10") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, discrp10, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "11") {
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "12") {
                      
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "13") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                      
                    }
                    if (levels == "14") {
                     
                        let disc02 = snapshot.child("discreption02").val();
                        let disc03 = snapshot.child("discreption03").val();
                        let disc04 = snapshot.child("discreption04").val();
                        let disc05 = snapshot.child("discreption05").val();
                        let disc06 = snapshot.child("discreption06").val();
                        let disc07 = snapshot.child("discreption07").val();
                        let disc08 = snapshot.child("discreption08").val();
                        let disc09 = snapshot.child("discreption09").val();
                        let disc10 = snapshot.child("discreption010").val();
                        let disc11 = snapshot.child("discreption011").val();
                        let disc12 = snapshot.child("discreption012").val();
                        let disc13 = snapshot.child("discreption013").val();
                        let disc14 = snapshot.child("discreption014").val();
                        writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                      
                    }
                  } else {
                    console.log("No data available");
                  }
                }).catch((error) => {
                  console.error(error);
                })
    
                }
                
            
                
                
    
              });
              cell.appendChild(nextBt);

              var editBt = document.createElement("button");
              editBt.type = "button";
              editBt.className ="btn btn-warning"
              editBt.textContent = "עריכה";
              editBt.classList.add("btn-edit");
              editBt.id="edit"+count;
              editBt.style.marginRight = "10px";
              editBt.addEventListener("click", function(){
                var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
                myModal.show();
                document.getElementById('case1').value = snapshot.child("case_number").val();
                document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
                document.getElementById('client_name1').value = snapshot.child("name").val();
                document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
                document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();

                document.getElementsByName('b02')[0].hidden = true;
                document.getElementsByName('b03')[0].hidden = true;
                document.getElementsByName('b04')[0].hidden = true;
                document.getElementsByName('b05')[0].hidden = true;
                document.getElementsByName('b06')[0].hidden = true;
                document.getElementsByName('b07')[0].hidden = true;
                document.getElementsByName('b08')[0].hidden = true;
                document.getElementsByName('b09')[0].hidden = true;
                document.getElementsByName('b10')[0].hidden = true;
                document.getElementsByName('b11')[0].hidden = true;
                document.getElementsByName('b12')[0].hidden = true;
                document.getElementsByName('b13')[0].hidden = true;
                document.getElementsByName('b14')[0].hidden = true;


                if(snapshot.child("levels").val() == '1') {
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                }
                if(snapshot.child("levels").val() == '2') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                }
                if(snapshot.child("levels").val() == '3') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                }
                if(snapshot.child("levels").val() == '4') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                }
                if(snapshot.child("levels").val() == '5') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                }
                if(snapshot.child("levels").val() == '6') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                }
                if(snapshot.child("levels").val() == '7') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                }
                if(snapshot.child("levels").val() == '8') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                }
                if(snapshot.child("levels").val() == '9') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                }
                if(snapshot.child("levels").val() == '10') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                }
                if(snapshot.child("levels").val() == '11') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  
                }
                if(snapshot.child("levels").val() == '12') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                }
                if(snapshot.child("levels").val() == '13') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                }
                if(snapshot.child("levels").val() == '14') {
                  document.getElementsByName('b02')[0].hidden = false;
                  document.getElementsByName('b03')[0].hidden = false;
                  document.getElementsByName('b04')[0].hidden = false;
                  document.getElementsByName('b05')[0].hidden = false;
                  document.getElementsByName('b06')[0].hidden = false;
                  document.getElementsByName('b07')[0].hidden = false;
                  document.getElementsByName('b08')[0].hidden = false;
                  document.getElementsByName('b09')[0].hidden = false;
                  document.getElementsByName('b10')[0].hidden = false;
                  document.getElementsByName('b11')[0].hidden = false;
                  document.getElementsByName('b12')[0].hidden = false;
                  document.getElementsByName('b13')[0].hidden = false;
                  document.getElementsByName('b14')[0].hidden = false;
                  document.getElementById('discre01').value = snapshot.child("discreption01").val();
                  document.getElementById('discre02').value = snapshot.child("discreption02").val();
                  document.getElementById('discre03').value = snapshot.child("discreption03").val();
                  document.getElementById('discre04').value = snapshot.child("discreption04").val();
                  document.getElementById('discre05').value = snapshot.child("discreption05").val();
                  document.getElementById('discre06').value = snapshot.child("discreption06").val();
                  document.getElementById('discre07').value = snapshot.child("discreption07").val();
                  document.getElementById('discre08').value = snapshot.child("discreption08").val();
                  document.getElementById('discre09').value = snapshot.child("discreption09").val();
                  document.getElementById('discre10').value = snapshot.child("discreption10").val();
                  document.getElementById('discre11').value = snapshot.child("discreption11").val();
                  document.getElementById('discre12').value = snapshot.child("discreption12").val();
                  document.getElementById('discre13').value = snapshot.child("discreption13").val();
                  document.getElementById('discre14').value = snapshot.child("discreption14").val();
                }
              });
              cell.appendChild(editBt);
              var delbtn = document.createElement("button");
              delbtn.type = "button";
              delbtn.className ="btn btn-danger"
              delbtn.textContent = "מחיקה";
              delbtn.classList.add("btn-delete");
              delbtn.id="del" + count;
              delbtn.style.marginRight = "10px";
              delbtn.addEventListener("click", async function(){
                const db = getDatabase();
                const dbRef1 = ref(db, "/cases/" + case_num);
                remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
              });
              cell.appendChild(delbtn);
            }
          });
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }
    else{
      const dbRef = ref(getDatabase());
      get(child(dbRef, `cases/${input}`)).then((snapshot) => {
        if (snapshot.exists()) {    
          var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
          myModal.show();
          document.getElementById('case1').value = snapshot.child("case_number").val();
          document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
          document.getElementById('client_name1').value = snapshot.child("name").val();
          document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
          document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
          document.getElementById('company_name1').value = snapshot.child("company_name").val();
          if(snapshot.child("levels").val() == '1') {
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
          }
          if(snapshot.child("levels").val() == '2') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
          }
          if(snapshot.child("levels").val() == '3') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
          }
          if(snapshot.child("levels").val() == '4') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
          }
          if(snapshot.child("levels").val() == '5') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
          }
          if(snapshot.child("levels").val() == '6') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
          }
          if(snapshot.child("levels").val() == '7') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
          }
          if(snapshot.child("levels").val() == '8') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
          }
          if(snapshot.child("levels").val() == '9') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
          }
          if(snapshot.child("levels").val() == '10') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
          }
          if(snapshot.child("levels").val() == '11') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            
          }
          if(snapshot.child("levels").val() == '12') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
          }
          if(snapshot.child("levels").val() == '13') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
          }
          if(snapshot.child("levels").val() == '14') {
            document.getElementsByName('b02')[0].hidden = false;
            document.getElementsByName('b03')[0].hidden = false;
            document.getElementsByName('b04')[0].hidden = false;
            document.getElementsByName('b05')[0].hidden = false;
            document.getElementsByName('b06')[0].hidden = false;
            document.getElementsByName('b07')[0].hidden = false;
            document.getElementsByName('b08')[0].hidden = false;
            document.getElementsByName('b09')[0].hidden = false;
            document.getElementsByName('b10')[0].hidden = false;
            document.getElementsByName('b11')[0].hidden = false;
            document.getElementsByName('b12')[0].hidden = false;
            document.getElementsByName('b13')[0].hidden = false;
            document.getElementsByName('b14')[0].hidden = false;
            document.getElementById('discre01').value = snapshot.child("discreption01").val();
            document.getElementById('discre02').value = snapshot.child("discreption02").val();
            document.getElementById('discre03').value = snapshot.child("discreption03").val();
            document.getElementById('discre04').value = snapshot.child("discreption04").val();
            document.getElementById('discre05').value = snapshot.child("discreption05").val();
            document.getElementById('discre06').value = snapshot.child("discreption06").val();
            document.getElementById('discre07').value = snapshot.child("discreption07").val();
            document.getElementById('discre08').value = snapshot.child("discreption08").val();
            document.getElementById('discre09').value = snapshot.child("discreption09").val();
            document.getElementById('discre10').value = snapshot.child("discreption10").val();
            document.getElementById('discre11').value = snapshot.child("discreption11").val();
            document.getElementById('discre12').value = snapshot.child("discreption12").val();
            document.getElementById('discre13').value = snapshot.child("discreption13").val();
            document.getElementById('discre14').value = snapshot.child("discreption14").val();
          }
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    }

  }

 })


  document.getElementById("update").onclick = function(){
    alert("update");
    let casenum = document.getElementById("case3").value;
    let kind = document.getElementById("case_type_update3").value;
    let cname = document.getElementById("client_name3").value;
    let company_name = document.getElementById("cmpname3").value;
    let phone = document.getElementById("phone_number3").value;
    let curr_level = document.getElementById("curr_level3").value;
    let disc01 = document.getElementById('discrp01').value;
    let tag = "false";
    
    const dbRef = ref(getDatabase());
    get(child(dbRef, `cases/${casenum}`)).then((snapshot) => {
      if (snapshot.exists()) {
         tag = snapshot.child("tag").val();
        
      } else {
      console.log("No data available");
      alert("לא נמצא תיק עם המספר שהזנת. ");
     }
    }).catch((error) => {
    console.error(error);
    })
    
    
    var x = document.getElementById("roi");
    if (window.getComputedStyle(x).display != "none") {
      var table = document.getElementById("table");
      for(let i =1; i< table.rows.length;i++){
        if(casenum == table.rows[i].cells[1].innerHTML){
          table.rows[i].cells[3].innerHTML  = company_name;
          table.rows[i].cells[2].innerHTML  = cname;
        }
      }
    }
    
      get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let levels = snapshot.child("case_level").val();
          if (levels == "1") {
            if (validateFields([kind, casenum, cname, phone, discrp01 ,levels, curr_level])){
              writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
            } 
          }
          if (levels == "2") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "3") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "4") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "5") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "6") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "7") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06, discrp07, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "8") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06 , discrp07, discrp08, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              let disc08 = document.getElementById('discrp08').value;
              writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "9") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06, discrp07, discrp08, discrp09, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              let disc08 = document.getElementById('discrp08').value;
              let disc09 = document.getElementById('discrp09').value;
              writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "10") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06, discrp07, discrp08, discrp09, discrp10, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              let disc08 = document.getElementById('discrp08').value;
              let disc09 = document.getElementById('discrp09').value;
              let disc10 = document.getElementById('discrp10').value;
              writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "11") {
            if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              let disc08 = document.getElementById('discrp08').value;
              let disc09 = document.getElementById('discrp09').value;
              let disc10 = document.getElementById('discrp10').value;
              let disc11 = document.getElementById('discrp11').value;
              writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "12") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06, discrp07, discrp08, discrp09, discrp10, discrp11, discrp12, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              let disc08 = document.getElementById('discrp08').value;
              let disc09 = document.getElementById('discrp09').value;
              let disc10 = document.getElementById('discrp10').value;
              let disc11 = document.getElementById('discrp11').value;
              let disc12 = document.getElementById('discrp12').value;
              writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "13") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06, discrp07, discrp08, discrp09, discrp10, discrp11, discrp12, discrp13, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              let disc08 = document.getElementById('discrp08').value;
              let disc09 = document.getElementById('discrp09').value;
              let disc10 = document.getElementById('discrp10').value;
              let disc11 = document.getElementById('discrp11').value;
              let disc12 = document.getElementById('discrp12').value;
              let disc13 = document.getElementById('discrp13').value;
              writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
            }
          }
          if (levels == "14") {
            if (validateFields([kind, casenum, cname, phone, discrp01, discrp02, discrp03, discrp04, discrp05, discrp06, discrp07, discrp08, discrp09, discrp10, discrp11, discrp12, discrp13, discrp14, levels, curr_level])){
              let disc02 = document.getElementById('discrp02').value;
              let disc03 = document.getElementById('discrp03').value;
              let disc04 = document.getElementById('discrp04').value;
              let disc05 = document.getElementById('discrp05').value;
              let disc06 = document.getElementById('discrp06').value;
              let disc07 = document.getElementById('discrp07').value;
              let disc08 = document.getElementById('discrp08').value;
              let disc09 = document.getElementById('discrp09').value;
              let disc10 = document.getElementById('discrp10').value;
              let disc11 = document.getElementById('discrp11').value;
              let disc12 = document.getElementById('discrp12').value;
              let disc13 = document.getElementById('discrp13').value;
              let disc14 = document.getElementById('discrp14').value;
              writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
            }
          }
          document.getElementById("exitbt").click();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
      // location.reload();

       // if liroy is opened
       var x = document.getElementById("liroy");
       if (window.getComputedStyle(x).display != "none") {
         var table = document.getElementById("table9");
         for(let i =1; i< table.rows.length;i++){
           if(casenum == table.rows[i].cells[1].innerHTML){
             table.rows[i].cells[5].innerHTML  = company_name;
             table.rows[i].cells[4].innerHTML  = cname;
           }
         }
       }

       var y = document.getElementById("roi");
       if (window.getComputedStyle(y).display != "none") {
         var table1 = document.getElementById("table");
         for(let i =1; i< table1.rows.length;i++){
           if(casenum == table1.rows[i].cells[1].innerHTML){
             table1.rows[i].cells[3].innerHTML  = company_name;
             table1.rows[i].cells[2].innerHTML  = cname;
           }
         }
       }





    }

   //press enter in 'new case modal'
   var myModal = document.getElementById('exampleModal');
   myModal.addEventListener('shown.bs.modal', function () {
     myModal.addEventListener("keydown",function(event){
       var code = event.key;
       if(code == "Enter"){
         document.getElementById("save").click();
       }
     });
   });
 
   //press enter in 'add manger modal'
   var myModal2 = document.getElementById('exampleModal2');
   myModal2.addEventListener('shown.bs.modal', function () {
     myModal2.addEventListener("keydown",function(event){
       var code = event.key;
       if(code == "Enter"){
         document.getElementById("save_manger").click();
       }
     });
   });
 
 
    //press enter in 'add case type modal'
    var myModal1 = document.getElementById('exampleModal1');
    myModal1.addEventListener('shown.bs.modal', function () {
      myModal1.addEventListener("keydown",function(event){
        var code = event.key;
        const element = document.activeElement.name;
        if(code == "Enter" && element != "discreption"){
          document.getElementById("save_type").click();
        }
      });
    });
 
     //press enter in 'add case type modal'
     var myModal3 = document.getElementById('exampleModal3');
     myModal3.addEventListener('shown.bs.modal', function () {


      document.getElementsByName('a02')[0].hidden = true;
      document.getElementsByName('a03')[0].hidden = true;
      document.getElementsByName('a04')[0].hidden = true;
      document.getElementsByName('a05')[0].hidden = true;
      document.getElementsByName('a06')[0].hidden = true;
      document.getElementsByName('a07')[0].hidden = true;
      document.getElementsByName('a08')[0].hidden = true;
      document.getElementsByName('a09')[0].hidden = true;
      document.getElementsByName('a10')[0].hidden = true;
      document.getElementsByName('a11')[0].hidden = true;
      document.getElementsByName('a12')[0].hidden = true;
      document.getElementsByName('a13')[0].hidden = true;
      document.getElementsByName('a14')[0].hidden = true;


         myModal3.addEventListener("keydown",function(event){
           case_input = document.getElementById('case3');
           var code = event.key;
           if(document.activeElement==case_input && code == "Enter"){
             document.getElementById("case_num_check").click();
           }
           if(document.activeElement!=case_input && code == "Enter"){
             document.getElementById("update").click();
           }
         });
 
 
       });

        //press enter in 'add case type modal'
     var myModal4 = document.getElementById('exampleModal4');
     myModal4.addEventListener('shown.bs.modal', function () {
        
         myModal4.addEventListener("keydown",function(event){
          const element = document.activeElement.name;
          
          var code = event.key;
          if(code == "Enter" && element != "discreption"){
            document.getElementById("update1").click();
          }
         });
 
       });


       var next11 = document.getElementById("next_level1");
       next11.addEventListener("click", (event) =>{
        const dbRef = ref(getDatabase());
        var check = parseInt(document.getElementById("curr_level1").value);
        var type = document.getElementById('case_type_update1').value;
        get(child(dbRef, `cases_type/${type}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let levels_limit = snapshot.child("case_level").val();
            if(check == levels_limit){
              alert("הגעת לשלב המקסימלי עבור תיק זה!");
            }
            else{
              //checking if it is not last level
              console.log("i am in next level 11");
              var x = document.getElementById("roi");
              if (window.getComputedStyle(x).display != "none") {
                var table = document.getElementById("table");
                let casenum = document.getElementById('case1').value;
                console.log("table rows:"+ (table.rows.length));
                for(let i =1; i< table.rows.length;i++){
                  if(casenum == table.rows[i].cells[1].innerHTML){
                    console.log(i+" row number mc");
                    table.rows[i].cells[5].innerHTML  = parseInt(table.rows[i].cells[5].innerHTML)+1;
                  }
          
                }
    
              }

              var y = document.getElementById("liroy");
              if (window.getComputedStyle(y).display != "none") {
                var table1 = document.getElementById("table9");
                let casenum = document.getElementById("case1").value;
                for(let i =1; i< table1.rows.length;i++){
                  if(casenum == table1.rows[i].cells[1].innerHTML){
                    table1.rows[i].cells[3].innerHTML  = parseInt(table1.rows[i].cells[3].innerHTML)+1;
                  }
          
                }
    
              }
              

              let casenum = document.getElementById('case1').value;
              let kind = document.getElementById('case_type_update1').value;
              let cname = document.getElementById('client_name1').value;
              let phone = document.getElementById('phone_number1').value;
              let company_name = document.getElementById('company_name1').value;
              let curr_level = parseInt(document.getElementById('curr_level1').value) +1;
              document.getElementById('curr_level1').value = curr_level;
              let disc01 = document.getElementById('discre01').value;
              let tag="";

              get(child(dbRef, `cases/${casenum}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  tag = snapshot.child("tag").val();
                  
                } else {
                console.log("No data available");
                alert("לא נמצא תיק עם המספר שהזנת. ");
              }
              }).catch((error) => {
              console.error(error);
              })



              get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  let levels = snapshot.child("case_level").val();
                  if (levels == "1") {
                    if (validateFields([kind, casenum, cname, phone, disc01 ,levels, curr_level])){
                      writelevelData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                    } 
                  }
                  if (levels == "2") {
                    let disc02 = document.getElementById('discre02').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, levels, curr_level])){
                      writelevelData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "3") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level])){
                      writelevelData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "4") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level])){
                      writelevelData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "5") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level])){
                      writelevelData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "6") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level])){
                      writelevelData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "7") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level])){
                      writelevelData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "8") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    let disc08 = document.getElementById('discre08').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level])){
                      writelevelData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "9") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    let disc08 = document.getElementById('discre08').value;
                    let disc09 = document.getElementById('discre09').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level])){
                      writelevelData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "10") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    let disc08 = document.getElementById('discre08').value;
                    let disc09 = document.getElementById('discre09').value;
                    let disc10 = document.getElementById('discre10').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level])){
                      writelevelData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "11") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    let disc08 = document.getElementById('discre08').value;
                    let disc09 = document.getElementById('discre09').value;
                    let disc10 = document.getElementById('discre10').value;
                    let disc11 = document.getElementById('discre11').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level])){
                      writelevelData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "12") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    let disc08 = document.getElementById('discre08').value;
                    let disc09 = document.getElementById('discre09').value;
                    let disc10 = document.getElementById('discre10').value;
                    let disc11 = document.getElementById('discre11').value;
                    let disc12 = document.getElementById('discre12').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level])){
                      writelevelData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "13") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    let disc08 = document.getElementById('discre08').value;
                    let disc09 = document.getElementById('discre09').value;
                    let disc10 = document.getElementById('discre10').value;
                    let disc11 = document.getElementById('discre11').value;
                    let disc12 = document.getElementById('discre12').value;
                    let disc13 = document.getElementById('discre13').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level])){
                      writelevelData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                    }
                  }
                  if (levels == "14") {
                    let disc02 = document.getElementById('discre02').value;
                    let disc03 = document.getElementById('discre03').value;
                    let disc04 = document.getElementById('discre04').value;
                    let disc05 = document.getElementById('discre05').value;
                    let disc06 = document.getElementById('discre06').value;
                    let disc07 = document.getElementById('discre07').value;
                    let disc08 = document.getElementById('discre08').value;
                    let disc09 = document.getElementById('discre09').value;
                    let disc10 = document.getElementById('discre10').value;
                    let disc11 = document.getElementById('discre11').value;
                    let disc12 = document.getElementById('discre12').value;
                    let disc13 = document.getElementById('discre13').value;
                    let disc14 = document.getElementById('discre14').value;
                    if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level])){
                      writelevelData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                    }
                  }    
                } else {
                    console.log("No data available");
                  }
                }).catch((error) => {
                  console.error(error);
                })


            }



          }
         else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })

      })

      var update1 = document.getElementById("update1");
      update1.onclick = function(){
        alert("update");
        let casenum = document.getElementById("case1").value;
        let kind = document.getElementById("case_type_update1").value;
        let cname = document.getElementById("client_name1").value;
        let company_name = document.getElementById("company_name1").value;
        let phone = document.getElementById("phone_number1").value;
        let curr_level = document.getElementById("curr_level1").value;
        let disc01 = document.getElementById('discre01').value;
        let tag ="";

        const dbRef = ref(getDatabase());

        get(child(dbRef, `cases/${casenum}`)).then((snapshot) => {
          if (snapshot.exists()) {
            tag = snapshot.child("tag").val();
            
          } else {
          console.log("No data available");
          alert("לא נמצא תיק עם המספר שהזנת. ");
        }
        }).catch((error) => {
        console.error(error);
        })
        
        
        
          get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
            if (snapshot.exists()) {
              let levels = snapshot.child("case_level").val();
              if (levels == "1") {
                if (validateFields([kind, casenum, cname, phone, disc01 ,levels, curr_level])){
                  writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                } 
              }
              if (levels == "2") {
                let disc02 = document.getElementById('discre02').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, levels, curr_level])){
                  writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "3") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level])){
                  writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "4") {
                  let disc02 = document.getElementById('discre02').value;
                  let disc03 = document.getElementById('discre03').value;
                  let disc04 = document.getElementById('discre04').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level])){
                  writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "5") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level])){
                  writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "6") {
                  let disc02 = document.getElementById('discre02').value;
                  let disc03 = document.getElementById('discre03').value;
                  let disc04 = document.getElementById('discre04').value;
                  let disc05 = document.getElementById('discre05').value;
                  let disc06 = document.getElementById('discre06').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level])){
                  writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "7") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level])){
                  writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "8") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                let disc08 = document.getElementById('discre08').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level])){
                  writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "9") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                let disc08 = document.getElementById('discre08').value;
                let disc09 = document.getElementById('discre09').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level])){
                  writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "10") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                let disc08 = document.getElementById('discre08').value;
                let disc09 = document.getElementById('discre09').value;
                let disc10 = document.getElementById('discre10').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level])){
                  writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "11") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                let disc08 = document.getElementById('discre08').value;
                let disc09 = document.getElementById('discre09').value;
                let disc10 = document.getElementById('discre10').value;
                let disc11 = document.getElementById('discre11').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level])){
                  writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "12") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                let disc08 = document.getElementById('discre08').value;
                let disc09 = document.getElementById('discre09').value;
                let disc10 = document.getElementById('discre10').value;
                let disc11 = document.getElementById('discre11').value;
                let disc12 = document.getElementById('discre12').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level])){
                  writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "13") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                let disc08 = document.getElementById('discre08').value;
                let disc09 = document.getElementById('discre09').value;
                let disc10 = document.getElementById('discre10').value;
                let disc11 = document.getElementById('discre11').value;
                let disc12 = document.getElementById('discre12').value;
                let disc13 = document.getElementById('discre13').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level])){
                  writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                }
              }
              if (levels == "14") {
                let disc02 = document.getElementById('discre02').value;
                let disc03 = document.getElementById('discre03').value;
                let disc04 = document.getElementById('discre04').value;
                let disc05 = document.getElementById('discre05').value;
                let disc06 = document.getElementById('discre06').value;
                let disc07 = document.getElementById('discre07').value;
                let disc08 = document.getElementById('discre08').value;
                let disc09 = document.getElementById('discre09').value;
                let disc10 = document.getElementById('discre10').value;
                let disc11 = document.getElementById('discre11').value;
                let disc12 = document.getElementById('discre12').value;
                let disc13 = document.getElementById('discre13').value;
                let disc14 = document.getElementById('discre14').value;
                if (validateFields([kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level])){
                  writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                }
              }
              document.getElementById("exit_update1").click();
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          })

          // if liroy is opened
          var x = document.getElementById("liroy");
          if (window.getComputedStyle(x).display != "none") {
            var table = document.getElementById("table9");
            for(let i =1; i< table.rows.length;i++){
              if(casenum == table.rows[i].cells[1].innerHTML){
                table.rows[i].cells[5].innerHTML  = company_name;
                table.rows[i].cells[4].innerHTML  = cname;
              }
            }
          }

          var y = document.getElementById("roi");
          if (window.getComputedStyle(y).display != "none") {
            var table1 = document.getElementById("table");
            for(let i =1; i< table1.rows.length;i++){
              if(casenum == table1.rows[i].cells[1].innerHTML){
                table1.rows[i].cells[3].innerHTML  = company_name;
                table1.rows[i].cells[2].innerHTML  = cname;
              }
            }
          }





      }
    

      

      var exit_new_case = document.getElementById("exit_newcase");
      exit_new_case.addEventListener("click",function(){
        alert("exit1");
        var kind = document.getElementById('kind').value;
        document.getElementById("casenum").value ="";
        document.getElementById("cname").value ="";
        document.getElementById("phone").value ="";
        document.getElementById("company_name-s").value ="";
        const $select = document.querySelector('#kind');
        const $option = $select.querySelector('#default-select');
        $select.value = $option.value;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let levels = snapshot.child("case_level").val();
            if (levels == "1") {
              document.getElementById('disc01').value="";
                
            }
            if (levels == "2") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
            }
            if (levels == "3") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
            }
            if (levels == "4") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
            }
            if (levels == "5") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              
            }
            if (levels == "6") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              
            }
            if (levels == "7") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              
            }
            if (levels == "8") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              document.getElementById('disc08').value="";
  
            }
            if (levels == "9") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              document.getElementById('disc08').value="";
              document.getElementById('disc09').value="";
            
            }
            if (levels == "10") {
              
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              document.getElementById('disc08').value="";
              document.getElementById('disc09').value="";
              document.getElementById('disc10').value="";
              
            }
            if (levels == "11") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              document.getElementById('disc08').value="";
              document.getElementById('disc09').value="";
              document.getElementById('disc10').value="";
              document.getElementById('disc11').value="";
              
            }
            if (levels == "12") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              document.getElementById('disc08').value="";
              document.getElementById('disc09').value="";
              document.getElementById('disc10').value="";
              document.getElementById('disc11').value="";
              document.getElementById('disc12').value="";
            }
            if (levels == "13") {
              
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              document.getElementById('disc08').value="";
              document.getElementById('disc09').value="";
              document.getElementById('disc10').value="";
              document.getElementById('disc11').value="";
              document.getElementById('disc12').value="";
              document.getElementById('disc13').value="";
              
            }
            if (levels == "14") {
              document.getElementById('disc01').value="";
              document.getElementById('disc02').value="";
              document.getElementById('disc03').value="";
              document.getElementById('disc04').value="";
              document.getElementById('disc05').value="";
              document.getElementById('disc06').value="";
              document.getElementById('disc07').value="";
              document.getElementById('disc08').value="";
              document.getElementById('disc09').value="";
              document.getElementById('disc10').value="";
              document.getElementById('disc11').value="";
              document.getElementById('disc12').value="";
              document.getElementById('disc13').value="";
              document.getElementById('disc14').value="";
              
              
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
          
        


      });


      var exit_update1 = document.getElementById("exit_update1");
      exit_update1.addEventListener("click",function(){
        alert("exit_update1");
        var kind = document.getElementById('case_type_update1').value;
        document.getElementById("case1").value ="";
        document.getElementById("client_name1").value ="";
        document.getElementById("phone_number1").value ="";
        document.getElementById("company_name1").value ="";
        document.getElementById("curr_level1").value ="";
        document.getElementById("case_type_update1").value ="";
        const dbRef = ref(getDatabase());
        get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let levels = snapshot.child("case_level").val();
            console.log(levels);
            if (levels == "1") {
              document.getElementById('discre01').value="";
                
            }
            if (levels == "2") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
            }
            if (levels == "3") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
            }
            if (levels == "4") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
            }
            if (levels == "5") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              
            }
            if (levels == "6") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              
            }
            if (levels == "7") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              
            }
            if (levels == "8") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              document.getElementById('discre08').value="";
  
            }
            if (levels == "9") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              document.getElementById('discre08').value="";
              document.getElementById('discre09').value="";
            
            }
            if (levels == "10") {
              
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              document.getElementById('discre08').value="";
              document.getElementById('discre09').value="";
              document.getElementById('discre10').value="";
              
            }
            if (levels == "11") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              document.getElementById('discre08').value="";
              document.getElementById('discre09').value="";
              document.getElementById('discre10').value="";
              document.getElementById('discre11').value="";
              
            }
            if (levels == "12") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              document.getElementById('discre08').value="";
              document.getElementById('discre09').value="";
              document.getElementById('discre10').value="";
              document.getElementById('discre11').value="";
              document.getElementById('discre12').value="";
            }
            if (levels == "13") {
              
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              document.getElementById('discre08').value="";
              document.getElementById('discre09').value="";
              document.getElementById('discre10').value="";
              document.getElementById('discre11').value="";
              document.getElementById('discre12').value="";
              document.getElementById('discre13').value="";
              
            }
            if (levels == "14") {
              document.getElementById('discre01').value="";
              document.getElementById('discre02').value="";
              document.getElementById('discre03').value="";
              document.getElementById('discre04').value="";
              document.getElementById('discre05').value="";
              document.getElementById('discre06').value="";
              document.getElementById('discre07').value="";
              document.getElementById('discre08').value="";
              document.getElementById('discre09').value="";
              document.getElementById('discre10').value="";
              document.getElementById('discre11').value="";
              document.getElementById('discre12').value="";
              document.getElementById('discre13').value="";
              document.getElementById('discre14').value="";
              
              
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })

      });

      var exit_edit_case = document.getElementById("exitbt");
      exit_edit_case.addEventListener("click",function(){
        alert("exit2");
        var kind = document.getElementById('case_type_update3').value;
        document.getElementById("case3").value ="";
        document.getElementById("client_name3").value ="";
        document.getElementById("phone_number3").value ="";
        document.getElementById("cmpname3").value ="";
        document.getElementById("curr_level3").value ="";
        document.getElementById("case_type_update3").value ="";
        const dbRef = ref(getDatabase());
        get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let levels = snapshot.child("case_level").val();
            console.log(levels);
            if (levels == "1") {
              document.getElementById('discrp01').value="";
                
            }
            if (levels == "2") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
            }
            if (levels == "3") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
            }
            if (levels == "4") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
            }
            if (levels == "5") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              
            }
            if (levels == "6") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              
            }
            if (levels == "7") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              
            }
            if (levels == "8") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              document.getElementById('discrp08').value="";
  
            }
            if (levels == "9") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              document.getElementById('discrp08').value="";
              document.getElementById('discrp09').value="";
            
            }
            if (levels == "10") {
              
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              document.getElementById('discrp08').value="";
              document.getElementById('discrp09').value="";
              document.getElementById('discrp10').value="";
              
            }
            if (levels == "11") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              document.getElementById('discrp08').value="";
              document.getElementById('discrp09').value="";
              document.getElementById('discrp10').value="";
              document.getElementById('discrp11').value="";
              
            }
            if (levels == "12") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              document.getElementById('discrp08').value="";
              document.getElementById('discrp09').value="";
              document.getElementById('discrp10').value="";
              document.getElementById('discrp11').value="";
              document.getElementById('discrp12').value="";
            }
            if (levels == "13") {
              
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              document.getElementById('discrp08').value="";
              document.getElementById('discrp09').value="";
              document.getElementById('discrp10').value="";
              document.getElementById('discrp11').value="";
              document.getElementById('discrp12').value="";
              document.getElementById('discrp13').value="";
              
            }
            if (levels == "14") {
              document.getElementById('discrp01').value="";
              document.getElementById('discrp02').value="";
              document.getElementById('discrp03').value="";
              document.getElementById('discrp04').value="";
              document.getElementById('discrp05').value="";
              document.getElementById('discrp06').value="";
              document.getElementById('discrp07').value="";
              document.getElementById('discrp08').value="";
              document.getElementById('discrp09').value="";
              document.getElementById('discrp10').value="";
              document.getElementById('discrp11').value="";
              document.getElementById('discrp12').value="";
              document.getElementById('discrp13').value="";
              document.getElementById('discrp14').value="";
              
              
            }
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        })
      }); 

      var exit_manger = document.getElementById("exit_manger");
      exit_manger.addEventListener("click",function(){
        alert("exit3");
        document.getElementById("email-admin").value ="";
        document.getElementById("password-admin").value ="";
        document.getElementById("firstname-admin").value ="";
        document.getElementById("lastname-admin").value ="";
        document.getElementById("new_email").value ="";
        document.getElementById("new_password").value ="";
        document.getElementById("match_password").value ="";

      }); 


      var exit_add_case = document.getElementById("exit_add_case");
      exit_add_case.addEventListener("click",function(){
        alert("exit4");
        // var levels = document.getElementById("levels").value();
        console.log(levels);
        const $select = document.querySelector('#levels');
        const $option = $select.querySelector('#default-select1');
        $select.value = $option.value;
        document.getElementById("case_type").value ="";
        document.getElementById('discreption01').value="";
        document.getElementById('discreption02').value="";
        document.getElementById('discreption03').value="";
        document.getElementById('discreption04').value="";
        document.getElementById('discreption05').value="";
        document.getElementById('discreption06').value="";
        document.getElementById('discreption07').value="";
        document.getElementById('discreption08').value="";
        document.getElementById('discreption09').value="";
        document.getElementById('discreption10').value="";
        document.getElementById('discreption11').value="";
        document.getElementById('discreption12').value="";
        document.getElementById('discreption13').value="";
        document.getElementById('discreption14').value=""; 


      });

      document.getElementById("add_new_case").onclick = function(){
        document.getElementsByName('02')[0].hidden = true;
        document.getElementsByName('03')[0].hidden = true;
        document.getElementsByName('04')[0].hidden = true;
        document.getElementsByName('05')[0].hidden = true;
        document.getElementsByName('06')[0].hidden = true;
        document.getElementsByName('07')[0].hidden = true;
        document.getElementsByName('08')[0].hidden = true;
        document.getElementsByName('09')[0].hidden = true;
        document.getElementsByName('10')[0].hidden = true;
        document.getElementsByName('11')[0].hidden = true;
        document.getElementsByName('12')[0].hidden = true;
        document.getElementsByName('13')[0].hidden = true;
        document.getElementsByName('14')[0].hidden = true;
      };


      var myModal5 = document.getElementById('exampleModal5');
      myModal5.addEventListener('shown.bs.modal', function () {
          var myselect = document.getElementById("levels1");
          myselect.onchange = function(){
            var levels = document.getElementById("levels1").value;
            console.log(levels);
          
            if(levels==1){
              document.getElementsByName('e02')[0].hidden = true;
              document.getElementsByName('e03')[0].hidden = true;
              document.getElementsByName('e04')[0].hidden = true;
              document.getElementsByName('e05')[0].hidden = true;
              document.getElementsByName('e06')[0].hidden = true;
              document.getElementsByName('e07')[0].hidden = true;
              document.getElementsByName('e08')[0].hidden = true;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==2){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = true;
              document.getElementsByName('e04')[0].hidden = true;
              document.getElementsByName('e05')[0].hidden = true;
              document.getElementsByName('e06')[0].hidden = true;
              document.getElementsByName('e07')[0].hidden = true;
              document.getElementsByName('e08')[0].hidden = true;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==3){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = true;
              document.getElementsByName('e05')[0].hidden = true;
              document.getElementsByName('e06')[0].hidden = true;
              document.getElementsByName('e07')[0].hidden = true;
              document.getElementsByName('e08')[0].hidden = true;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==4){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = true;
              document.getElementsByName('e06')[0].hidden = true;
              document.getElementsByName('e07')[0].hidden = true;
              document.getElementsByName('e08')[0].hidden = true;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==5){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = true;
              document.getElementsByName('e07')[0].hidden = true;
              document.getElementsByName('e08')[0].hidden = true;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==6){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = true;
              document.getElementsByName('e08')[0].hidden = true;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==7){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = true;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==8){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = true;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==9){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = true;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
            if(levels==10){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = true;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
 
            if(levels==11){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementsByName('e12')[0].hidden = true;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }
             
            if(levels==12){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementsByName('e12')[0].hidden = false;
              document.getElementsByName('e13')[0].hidden = true;
              document.getElementsByName('e14')[0].hidden = true;
            }


            if(levels==13){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementsByName('e12')[0].hidden = false;
              document.getElementsByName('e13')[0].hidden = false;
              document.getElementsByName('e14')[0].hidden = true;
            }

            if(levels==14){
              document.getElementsByName('e02')[0].hidden = false;
              document.getElementsByName('e03')[0].hidden = false;
              document.getElementsByName('e04')[0].hidden = false;
              document.getElementsByName('e05')[0].hidden = false;
              document.getElementsByName('e06')[0].hidden = false;
              document.getElementsByName('e07')[0].hidden = false;
              document.getElementsByName('e08')[0].hidden = false;
              document.getElementsByName('e09')[0].hidden = false;
              document.getElementsByName('e10')[0].hidden = false;
              document.getElementsByName('e11')[0].hidden = false;
              document.getElementsByName('e12')[0].hidden = false;
              document.getElementsByName('e13')[0].hidden = false;
              document.getElementsByName('e14')[0].hidden = false;
            }



          };

        
        });


      document.getElementById("save_type5").onclick= function(){
        let case_type = document.getElementById('case_type1').value;
        let levels = document.getElementById('levels1').value;
        console.log(levels);
        let discreption01 = document.getElementById('discrep01').value;
        
        if (levels == "1") {
          if (validateFieldsType([case_type, levels, discreption01])){
            writeUserDataCase(case_type, levels, discreption01);
          }
        }
        if (levels == "2") {
          let discreption02 = document.getElementById('discrep02').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02])){
            writeUserDataCase02(case_type, levels, discreption01, discreption02);
          }
        }
        if (levels == "3") {
            let discreption02 = document.getElementById('discrep02').value;
            let discreption03 = document.getElementById('discrep03').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03])){
            writeUserDataCase03(case_type, levels, discreption01, discreption02, discreption03);
          }
        }
        if (levels == "4") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04])){
            writeUserDataCase04(case_type, levels, discreption01, discreption02, discreption03, discreption04);
          }
        }
        if (levels == "5") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05])){
            writeUserDataCase05(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05);
          }
        }
        if (levels == "6") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06])){  
            writeUserDataCase06(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06);
          }
        }
        if (levels == "7") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07])){ 
            writeUserDataCase07(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07);
          }
        }
        if (levels == "8") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          let discreption08 = document.getElementById('discrep08').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08])){
            writeUserDataCase08(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08);
          }
        }
        if (levels == "9") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          let discreption08 = document.getElementById('discrep08').value;
          let discreption09 = document.getElementById('discrep09').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09])){
            writeUserDataCase09(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09);
          }
        }
        if (levels == "10") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          let discreption08 = document.getElementById('discrep08').value;
          let discreption09 = document.getElementById('discrep09').value;
          let discreption10 = document.getElementById('discrep10').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10])){
            writeUserDataCase10(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10);
          }
        }
        if (levels == "11") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          let discreption08 = document.getElementById('discrep08').value;
          let discreption09 = document.getElementById('discrep09').value;
          let discreption10 = document.getElementById('discrep10').value;
          let discreption11 = document.getElementById('discrep11').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11])){
            writeUserDataCase11(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11);
          }
        }
        if (levels == "12") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          let discreption08 = document.getElementById('discrep08').value;
          let discreption09 = document.getElementById('discrep09').value;
          let discreption10 = document.getElementById('discrep10').value;
          let discreption11 = document.getElementById('discrep11').value;
          let discreption12 = document.getElementById('discrep12').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12])){
            writeUserDataCase12(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12);
          }
        }
        if (levels == "13") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          let discreption08 = document.getElementById('discrep08').value;
          let discreption09 = document.getElementById('discrep09').value;
          let discreption10 = document.getElementById('discrep10').value;
          let discreption11 = document.getElementById('discrep11').value;
          let discreption12 = document.getElementById('discrep12').value;
          let discreption13 = document.getElementById('discrep13').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13])){
            writeUserDataCase13(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13);
          }
        }
        if (levels == "14") {
          let discreption02 = document.getElementById('discrep02').value;
          let discreption03 = document.getElementById('discrep03').value;
          let discreption04 = document.getElementById('discrep04').value;
          let discreption05 = document.getElementById('discrep05').value;
          let discreption06 = document.getElementById('discrep06').value;
          let discreption07 = document.getElementById('discrep07').value;
          let discreption08 = document.getElementById('discrep08').value;
          let discreption09 = document.getElementById('discrep09').value;
          let discreption10 = document.getElementById('discrep10').value;
          let discreption11 = document.getElementById('discrep11').value;
          let discreption12 = document.getElementById('discrep12').value;
          let discreption13 = document.getElementById('discrep13').value;
          let discreption14 = document.getElementById('discrep14').value;
          if (validateFieldsType([case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13, discreption14])){
            writeUserDataCase14(case_type, levels, discreption01, discreption02, discreption03, discreption04, discreption05, discreption06, discreption07, discreption08, discreption09, discreption10, discreption11, discreption12, discreption13, discreption14);
          }
        }
        document.getElementById("exit_type5").click();


      };


      document.getElementById("pincase").onclick = function(){
        var casenum = document.getElementById("casenun_pin").value;
        
        //checking if there is a casenum in DB:

        const dbRef = ref(getDatabase());
        get(child(dbRef, `cases/${casenum}`)).then((snapshot) => {
          if (snapshot.exists()) {
            let kind = snapshot.child("case_type").val();
            let cname = snapshot.child("name").val();
            let company_name = snapshot.child("company_name").val();
            let phone = snapshot.child("phone_num").val();
            let curr_level = snapshot.child("curr_Level").val();
            let disc01 = snapshot.child("discreption01").val();
            let tag = "true";

            // add to table9 new row with the new case

            var table = document.getElementById("table9");
            var row = table.insertRow();
            row.id=table.rows.length;
            var cell = row.insertCell();
            cell.innerHTML = table.rows.length-1;
            var cell = row.insertCell();
            cell.innerHTML = casenum;
            var cell = row.insertCell();
            cell.innerHTML = kind;
            var cell = row.insertCell();
            cell.innerHTML = curr_level;
            var cell = row.insertCell();
            cell.innerHTML = cname;
            var cell = row.insertCell();
            if(company_name== "" ||company_name== null){
              cell.innerHTML = "אין חברה";
            }
            else{
              cell.innerHTML =company_name;
            }
            var cell = row.insertCell();
            
          
            var editBt = document.createElement("button");
            editBt.type = "button";
            editBt.className ="btn btn-warning"
            editBt.textContent = "עריכה";
            editBt.classList.add("btn-edit");
            var count = table.rows.length - 1;
            editBt.id="edit-"+count;
            editBt.style.marginRight = "10px";
            editBt.addEventListener("click", function(){
              var myModal = new bootstrap.Modal(document.getElementById("exampleModal4"), {});
              myModal.show();
              alert("modal 4");
              let text = this.id;
              const myArray = text.split("-");
              let case_num = document.getElementById('table9').rows[myArray[1]].cells[1].innerHTML
              const db = getDatabase();
              const dbRef1 = ref(db, "/cases/" + case_num);
              get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  console.log("editbt:"+snapshot.child("case_number").val());
              document.getElementById('case1').value = snapshot.child("case_number").val();
              document.getElementById('case_type_update1').value = snapshot.child("case_type").val();
              document.getElementById('client_name1').value = snapshot.child("name").val();
              document.getElementById('phone_number1').value = snapshot.child("phone_num").val();
              document.getElementById('curr_level1').value = snapshot.child("curr_Level").val();
              document.getElementById('company_name1').value = snapshot.child("company_name").val();
          
              
            document.getElementsByName('b02')[0].hidden = true;
            document.getElementsByName('b03')[0].hidden = true;
            document.getElementsByName('b04')[0].hidden = true;
            document.getElementsByName('b05')[0].hidden = true;
            document.getElementsByName('b06')[0].hidden = true;
            document.getElementsByName('b07')[0].hidden = true;
            document.getElementsByName('b08')[0].hidden = true;
            document.getElementsByName('b09')[0].hidden = true;
            document.getElementsByName('b10')[0].hidden = true;
            document.getElementsByName('b11')[0].hidden = true;
            document.getElementsByName('b12')[0].hidden = true;
            document.getElementsByName('b13')[0].hidden = true;
            document.getElementsByName('b14')[0].hidden = true;
  
              if(snapshot.child("levels").val() == '1') {
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
              }
              if(snapshot.child("levels").val() == '2') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
              }
              if(snapshot.child("levels").val() == '3') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
              }
              if(snapshot.child("levels").val() == '4') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
              }
              if(snapshot.child("levels").val() == '5') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
              }
              if(snapshot.child("levels").val() == '6') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
              }
              if(snapshot.child("levels").val() == '7') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
              }
              if(snapshot.child("levels").val() == '8') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
              }
              if(snapshot.child("levels").val() == '9') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
              }
              if(snapshot.child("levels").val() == '10') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
              }
              if(snapshot.child("levels").val() == '11') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                
              }
              if(snapshot.child("levels").val() == '12') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementsByName('b12')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                document.getElementById('discre12').value = snapshot.child("discreption12").val();
              }
              if(snapshot.child("levels").val() == '13') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementsByName('b12')[0].hidden = false;
                document.getElementsByName('b13')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                document.getElementById('discre12').value = snapshot.child("discreption12").val();
                document.getElementById('discre13').value = snapshot.child("discreption13").val();
              }
              if(snapshot.child("levels").val() == '14') {
                document.getElementsByName('b02')[0].hidden = false;
                document.getElementsByName('b03')[0].hidden = false;
                document.getElementsByName('b04')[0].hidden = false;
                document.getElementsByName('b05')[0].hidden = false;
                document.getElementsByName('b06')[0].hidden = false;
                document.getElementsByName('b07')[0].hidden = false;
                document.getElementsByName('b08')[0].hidden = false;
                document.getElementsByName('b09')[0].hidden = false;
                document.getElementsByName('b10')[0].hidden = false;
                document.getElementsByName('b11')[0].hidden = false;
                document.getElementsByName('b12')[0].hidden = false;
                document.getElementsByName('b13')[0].hidden = false;
                document.getElementsByName('b14')[0].hidden = false;
                document.getElementById('discre01').value = snapshot.child("discreption01").val();
                document.getElementById('discre02').value = snapshot.child("discreption02").val();
                document.getElementById('discre03').value = snapshot.child("discreption03").val();
                document.getElementById('discre04').value = snapshot.child("discreption04").val();
                document.getElementById('discre05').value = snapshot.child("discreption05").val();
                document.getElementById('discre06').value = snapshot.child("discreption06").val();
                document.getElementById('discre07').value = snapshot.child("discreption07").val();
                document.getElementById('discre08').value = snapshot.child("discreption08").val();
                document.getElementById('discre09').value = snapshot.child("discreption09").val();
                document.getElementById('discre10').value = snapshot.child("discreption10").val();
                document.getElementById('discre11').value = snapshot.child("discreption11").val();
                document.getElementById('discre12').value = snapshot.child("discreption12").val();
                document.getElementById('discre13').value = snapshot.child("discreption13").val();
                document.getElementById('discre14').value = snapshot.child("discreption14").val();
              }
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              })            
            });
            cell.appendChild(editBt);
            var delbtn = document.createElement("button");
            delbtn.type = "button";
            delbtn.className ="btn btn-danger"
            delbtn.textContent = "ביטול צימוד";
            delbtn.classList.add("btn-delete");
            delbtn.id="del-" + count++;
            delbtn.style.marginRight = "10px";
            delbtn.addEventListener("click", function(){
              let text = this.id;
              const myArray = text.split("-");
              let case_num = document.getElementById('table9').rows[myArray[1]].cells[1].innerHTML;
              //del from db
              get(child(dbRef, `cases/${case_num}`)).then((snapshot) => {
                if (snapshot.exists()) {
                  let casenum = snapshot.child("case_number").val();
                  let kind = snapshot.child("case_type").val();
                  let cname = snapshot.child("name").val();
                  let company_name = snapshot.child("company_name").val();
                  let phone = snapshot.child("phone_num").val();
                  let curr_level = snapshot.child("curr_Level").val();
                  let disc01 = snapshot.child("discreption01").val();
                  let tag = "false";
                  get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                          let levels = snapshot.child("case_level").val();
                          if (levels == "1") {
                            writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                          }
                          if (levels == "2") {
                            let disc02 = snapshot.child("discreption02").val();
                            writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                          }
                          if (levels == "3") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();;
                            writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                          }
                          if (levels == "4") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();
                            let disc04 = snapshot.child("discreption04").val();
                            writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                          }
                          if (levels == "5") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();
                            let disc04 = snapshot.child("discreption04").val();
                            let disc05 = snapshot.child("discreption05").val();
                            writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                          }
                          if (levels == "6") {
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                          }
                          if (levels == "7") {
                            let disc02 = snapshot.child("discreption02").val();
                            let disc03 = snapshot.child("discreption03").val();
                            let disc04 = snapshot.child("discreption04").val();
                            let disc05 = snapshot.child("discreption05").val();
                            let disc06 = snapshot.child("discreption06").val();
                            let disc07 = snapshot.child("discreption07").val();
                            writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                          }
                          if (levels == "8") {
          
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                          }
                          if (levels == "9") {
                            
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                          }
                          if (levels == "10") {
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "11") {
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "12") {
                            
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              let disc12 = snapshot.child("discreption012").val();
                              writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "13") {
                          
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              let disc12 = snapshot.child("discreption012").val();
                              let disc13 = snapshot.child("discreption013").val();
                              writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                            
                          }
                          if (levels == "14") {
                          
                              let disc02 = snapshot.child("discreption02").val();
                              let disc03 = snapshot.child("discreption03").val();
                              let disc04 = snapshot.child("discreption04").val();
                              let disc05 = snapshot.child("discreption05").val();
                              let disc06 = snapshot.child("discreption06").val();
                              let disc07 = snapshot.child("discreption07").val();
                              let disc08 = snapshot.child("discreption08").val();
                              let disc09 = snapshot.child("discreption09").val();
                              let disc10 = snapshot.child("discreption010").val();
                              let disc11 = snapshot.child("discreption011").val();
                              let disc12 = snapshot.child("discreption012").val();
                              let disc13 = snapshot.child("discreption013").val();
                              let disc14 = snapshot.child("discreption014").val();
                              writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                            
                          }
                        } else {
                          console.log("No data available");
                        }
                      }).catch((error) => {
                        console.error(error);
                      })


                
                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              }) 



              // const db = getDatabase();
              // const dbRef1 = ref(db, "/cases/" + case_num);
              // remove(dbRef1).then(() => alert(`תיק מספר ${case_num} נמחק בהצלחה`));
              //end del from db
  
              // del from table and update table
              
              table.deleteRow(myArray[1]);
              for (let i = myArray[1]; i < table.rows.length; i++) {
                document.getElementById('table9').rows[i].cells[0].innerHTML= i;
                let temp=i;
                temp++;
                var del = document.getElementById("del-"+temp);
                var edit= document.getElementById("edit-"+temp);
                del.id = "del-"+i;
                edit.id = "edit-"+i;
              }
            });
            cell.appendChild(delbtn);


            //save to db
            const dbRef = ref(getDatabase());
            get(child(dbRef, `cases_type/${kind}`)).then((snapshot) => {
              if (snapshot.exists()) {
                let levels = snapshot.child("case_level").val();
                if (levels == "1") {
               
                  writeUserData(kind, casenum, cname, phone, disc01, levels, curr_level,company_name,tag);
                }
                if (levels == "2") {
                  let disc02 = snapshot.child("discreption02").val();
                  writeUserData02(kind, casenum, cname, phone, disc01, disc02, levels, curr_level,company_name,tag);
                }
                if (levels == "3") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();;
                  writeUserData03(kind, casenum, cname, phone, disc01, disc02, disc03, levels, curr_level,company_name,tag);
                }
                if (levels == "4") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();
                  let disc04 = snapshot.child("discreption04").val();
                  writeUserData04(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, levels, curr_level,company_name,tag);
                }
                if (levels == "5") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();
                  let disc04 = snapshot.child("discreption04").val();
                  let disc05 = snapshot.child("discreption05").val();
                  writeUserData05(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, levels, curr_level,company_name,tag);
                }
                if (levels == "6") {
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    writeUserData06(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, levels, curr_level,company_name,tag);
                }
                if (levels == "7") {
                  let disc02 = snapshot.child("discreption02").val();
                  let disc03 = snapshot.child("discreption03").val();
                  let disc04 = snapshot.child("discreption04").val();
                  let disc05 = snapshot.child("discreption05").val();
                  let disc06 = snapshot.child("discreption06").val();
                  let disc07 = snapshot.child("discreption07").val();
                  writeUserData07(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, levels, curr_level,company_name,tag);
                }
                if (levels == "8") {

                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    writeUserData08(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06 , disc07, disc08, levels, curr_level,company_name,tag);
                }
                if (levels == "9") {
                  
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    writeUserData09(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, levels, curr_level,company_name,tag);
                }
                if (levels == "10") {
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    writeUserData10(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "11") {
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    writeUserData11(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "12") {
                  
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    let disc12 = snapshot.child("discreption012").val();
                    writeUserData12(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "13") {
                 
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    let disc12 = snapshot.child("discreption012").val();
                    let disc13 = snapshot.child("discreption013").val();
                    writeUserData13(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, levels, curr_level,company_name,tag);
                  
                }
                if (levels == "14") {
                 
                    let disc02 = snapshot.child("discreption02").val();
                    let disc03 = snapshot.child("discreption03").val();
                    let disc04 = snapshot.child("discreption04").val();
                    let disc05 = snapshot.child("discreption05").val();
                    let disc06 = snapshot.child("discreption06").val();
                    let disc07 = snapshot.child("discreption07").val();
                    let disc08 = snapshot.child("discreption08").val();
                    let disc09 = snapshot.child("discreption09").val();
                    let disc10 = snapshot.child("discreption010").val();
                    let disc11 = snapshot.child("discreption011").val();
                    let disc12 = snapshot.child("discreption012").val();
                    let disc13 = snapshot.child("discreption013").val();
                    let disc14 = snapshot.child("discreption014").val();
                    writeUserData14(kind, casenum, cname, phone, disc01, disc02, disc03, disc04, disc05, disc06, disc07, disc08, disc09, disc10, disc11, disc12, disc13, disc14, levels, curr_level,company_name,tag);
                  
                }
                
              } else {
                console.log("No data available");
              }
            }).catch((error) => {
              console.error(error);
            })

            


          } else {
          console.log("No data available");
          alert("לא נמצא תיק עם המספר שהזנת. אנא נסה שנית");
         }
        }).catch((error) => {
        console.error(error);
        })


      };
const supabase = window.supabaseClient

let cache=[]


// LOGIN
async function login(){

const email=document.getElementById("email").value
const password=document.getElementById("password").value

const {data,error}=await supabase.auth.signInWithPassword({
email,
password
})

if(error){
alert("Đăng nhập thất bại")
return
}

document.getElementById("loginBox").style.display="none"
document.getElementById("app").style.display="block"

loadData()

}


// LOAD DATA
async function loadData(){

const {data,error}=await supabase
.from("so_cap_gcn")
.select("*")
.order("stt")

if(error){
console.log(error)
return
}

cache=data

render(data)

}


// RENDER
function render(data){

const table=document.getElementById("tableBody")

table.innerHTML=""

data.forEach(row=>{

const tr=document.createElement("tr")

tr.innerHTML=`
<td>${row.stt||""}</td>
<td>${row.ten||""}</td>
<td>${row.so_phat_hanh||""}</td>
<td>${row.so_vao_so||""}</td>

<td>
<button onclick="deleteRow(${row.id})">Xóa</button>
</td>
`

table.appendChild(tr)

})

}


// ADD
async function addData(){

const stt=document.getElementById("stt").value
const ten=document.getElementById("ten").value
const so_phat_hanh=document.getElementById("so_phat_hanh").value
const so_vao_so=document.getElementById("so_vao_so").value

await supabase
.from("so_cap_gcn")
.insert([{stt,ten,so_phat_hanh,so_vao_so}])

loadData()

}


// DELETE
async function deleteRow(id){

await supabase
.from("so_cap_gcn")
.delete()
.eq("id",id)

loadData()

}

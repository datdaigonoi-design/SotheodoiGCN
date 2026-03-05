const supabase = window.supabaseClient

let cache = []


// LOGIN
async function login(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
})

if(error){
  alert("Sai tài khoản hoặc mật khẩu")
  return
}

document.getElementById("login").style.display="none"
document.getElementById("app").style.display="block"

loadData()

}


// LOAD DATA
async function loadData(){

const { data, error } = await supabase
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
<td>${row.ngay_ky||""}</td>
<td>${row.ngay_trao||""}</td>
<td>${row.so_vao_so||""}</td>
<td>${row.nguoi_nhan||""}</td>
<td>${row.ghi_chu||""}</td>
<td>${row.so_vao_so2||""}</td>

<td>

<button onclick="editRow(${row.id})">Sửa</button>
<button onclick="deleteRow(${row.id})">Xóa</button>

</td>

`

table.appendChild(tr)

})

}


// ADD
async function addData(){

const data={

stt:document.getElementById("stt").value,
ten:document.getElementById("ten").value,
so_phat_hanh:document.getElementById("so_phat_hanh").value,
ngay_ky:document.getElementById("ngay_ky").value,
ngay_trao:document.getElementById("ngay_trao").value,
so_vao_so:document.getElementById("so_vao_so").value,
nguoi_nhan:document.getElementById("nguoi_nhan").value,
ghi_chu:document.getElementById("ghi_chu").value,
so_vao_so2:document.getElementById("so_vao_so2").value

}

await supabase
.from("so_cap_gcn")
.insert([data])

loadData()

}


// DELETE
async function deleteRow(id){

if(!confirm("Xóa dữ liệu?")) return

await supabase
.from("so_cap_gcn")
.delete()
.eq("id",id)

loadData()

}


// EDIT
async function editRow(id){

const ten=prompt("Tên mới")

if(!ten) return

await supabase
.from("so_cap_gcn")
.update({ten})
.eq("id",id)

loadData()

}


// SEARCH
document.getElementById("search").addEventListener("input",function(){

const key=this.value.toLowerCase()

const filtered=cache.filter(x=>
(x.ten||"").toLowerCase().includes(key)||
(x.so_phat_hanh||"").toLowerCase().includes(key)
)

render(filtered)

})

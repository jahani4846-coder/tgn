const RATE = 200000;

let data = JSON.parse(localStorage.getItem("shifts") || "[]");

function toMin(t){
  let [h,m]=t.split(":").map(Number);
  return h*60+m;
}

function calc(end){
  let base = toMin("20:30");
  let e = toMin(end);

  if(e <= base) return {m:0,a:0};

  let m = e - base;
  return {
    m,
    a: Math.round((m/60)*RATE)
  };
}

function save(){
  localStorage.setItem("shifts", JSON.stringify(data));
}

function render(){
  let t=document.getElementById("t");
  t.innerHTML="";

  let sumM=0,sumA=0;

  data.forEach(i=>{
    sumM+=i.m;
    sumA+=i.a;

    t.innerHTML += `
      <tr>
        <td>${i.date}</td>
        <td>${i.start}</td>
        <td>${i.end}</td>
        <td>${i.m}</td>
        <td>${i.a}</td>
      </tr>
    `;
  });

  document.getElementById("sum").innerText =
    `جمع: ${sumM} دقیقه | ${sumA.toLocaleString()} تومان`;
}

function add(){
  let start=document.getElementById("start").value;
  let end=document.getElementById("end").value;

  if(!end) return alert("ساعت خروج را وارد کن");

  let r = calc(end);

  data.push({
    date:new Date().toLocaleDateString("fa-IR"),
    start,
    end,
    m:r.m,
    a:r.a
  });

  save();
  render();
}

render();

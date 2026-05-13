const API = "http://localhost:5000/jobs";


async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
  // testing 
    console.log("Response", data);
    console.log(data);
    
     
    if (data.token) {
        localStorage.setItem("token", data.token); // ✅ SAVE TOKEN
        console.log(localStorage.getItem("token"));
        alert("Login success");
    } else {
        alert("Login failed");
    }
}

async function fetchJobs(){
        const token = localStorage.getItem("token");

    const res = await fetch(API, {
        headers:{
            "Authorization" :`Bearer ${token}`
        }
    });
    const data = await res.json();

    if(!Array. isArray(data)){
        console.log("Error:", data);
        return;
    }

    const list = document.getElementById("joblist");
    const filter = document.getElementById("filterStat").value;


     
    list.innerHTML = "";

    data.forEach(job =>{

        if(filter && job.status.trim().toLowerCase() !== filter.toLowerCase()) return;

        const li = document.createElement("li");
        li.innerText = `${job.company} - ${job.role}(${job.status})`;

        //delete button

        const btn = document.createElement("button");
        btn.innerText = "Delete";
        btn.onclick = () => deleteJob(job._id);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = () => {
            const newStatus = prompt("enter status");

            updateJob(job._id, newStatus);
        }

        li.appendChild(btn);
        list.appendChild(li);
        li.appendChild(editBtn);
        
    });
}

async function addJob() {
    const token = localStorage.getItem("token");
    const company = document.getElementById("company").value;
    const role = document.getElementById("role").value;
    let status  = document.getElementById("status").value.trim();


    status = status.charAt(0).toUpperCase()+ status.slice(1).toLowerCase();

    console.log(status);

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify({ company, role , status})
    });
   
    document.getElementById("company").value = "";
    document.getElementById("role").value = "";
    document.getElementById("status").value = "";

    fetchJobs();
}


async function deleteJob(id) {
    const token = localStorage.getItem("token");
    await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers:{
            "Authorization" : `Bearer ${token}`

        }
    });

    fetchJobs();
} 

//update
async function updateJob(id, status){
    const token = localStorage.getItem("token");
    await fetch(`${API}/${id}`,{
      
        method : "PUT",
        headers :{
            "Content-Type" :"application/json",
            "Authorization": `Bearer ${token}`
        },
        body :JSON.stringify({ status})
    });

        fetchJobs();
     }
    






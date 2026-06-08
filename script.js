const form = document.getElementById("ticketForm");
const ticketList = document.getElementById("ticketList");

let tickets =
JSON.parse(localStorage.getItem("dashboardTickets")) || [];

function saveTickets(){
localStorage.setItem(
"dashboardTickets",
JSON.stringify(tickets)
);
}

function updateKPIs(){

const abertos =
tickets.filter(t=>t.status==="Aberto").length;

const resolvidos =
tickets.filter(t=>t.status==="Resolvido").length;

const pendentes =
tickets.filter(t=>t.status==="Pendente").length;

const total = tickets.length;

const taxa =
total === 0
? 0
: Math.round((resolvidos / total) * 100);

document.getElementById("abertos").innerText = abertos;
document.getElementById("resolvidos").innerText = resolvidos;
document.getElementById("pendentes").innerText = pendentes;
document.getElementById("taxa").innerText = taxa + "%";
}

function renderTickets(){

ticketList.innerHTML = "";

tickets.forEach(ticket=>{

ticketList.innerHTML += `

<tr>

<td>${ticket.titulo}</td>

<td>${ticket.status}</td>

<td>

<button
class="delete-btn"
onclick="deleteTicket(${ticket.id})"
>

Excluir

</button>

</td>

</tr>

`;

});

updateKPIs();

}

form.addEventListener("submit",(e)=>{

e.preventDefault();

const novoChamado = {

id: Date.now(),

titulo:
document.getElementById("titulo").value,

status:
document.getElementById("status").value

};

tickets.push(novoChamado);

saveTickets();

renderTickets();

form.reset();

});

function deleteTicket(id){

tickets =
tickets.filter(ticket=>ticket.id !== id);

saveTickets();

renderTickets();

}

renderTickets();

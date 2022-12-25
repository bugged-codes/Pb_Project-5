function toggleList() {
	document.getElementById("container").classList.toggle("blurActive");
	document.getElementById("addNewList").classList.toggle("addNewListActive");
	document.getElementById("textchanged").style.display = "none";
	// console.log("add New list works");
}

document.getElementById("addListBtn").addEventListener("click", toggleList);
document.getElementById("cancelBtn").addEventListener("click", toggleList);

function mainFunc() {
	toggleList();
	let card = document.createElement("div");
	card.classList.add("task");
	document.getElementById("parent").appendChild(card);

	let cardHeader = document.createElement("div");
	cardHeader.classList.add("cardHeader");
	card.appendChild(cardHeader);

	let newListTitle = document.createElement("h2");
	newListTitle.classList.add("task_title");
	newListTitle.style.color = "black";
	newListTitle.innerHTML = `${document.getElementById("listText").value}`;
	cardHeader.appendChild(newListTitle);

	let line = document.createElement("hr");
	line.classList.add("line");
	cardHeader.appendChild(line);
	newListTitle.addEventListener("click", myFunc);

	function myFunc(e) {
		e.target.parentElement.parentElement.classList.toggle("active");
		let activeList = document.querySelectorAll(".task");
		let page2Title = document.createElement("h2");
		for (let i = 0; i < activeList.length; i++) {
			if (activeList[i] !== e.target.parentElement.parentElement) {
				activeList[i].classList.add("inactive");
				document.getElementById("container").classList.add("inactive");
				document.getElementById("page2Contains").classList.add("active");

				page2Title.innerHTML = `<span style="color:darkgray;">${newListTitle.innerHTML}</span>`;
				document.getElementById("page2BackBtn").after(page2Title);

				document.getElementById("page2BackBtn").addEventListener("click", () => {
					document.getElementById("container").classList.remove("inactive");
					activeList[i].classList.remove("inactive");
					document.getElementById("page2Contains").classList.remove("active");
					page2Title.remove();
				});

				document.getElementById("page2AddBtn").addEventListener("click", () => {
					toggleList();
					document.getElementById("container").classList.remove("inactive");
					activeList[i].classList.remove("inactive");
					document.getElementById("page2Contains").classList.remove("active");
					page2Title.remove();
				});
			}
		}
	}

	let newTaskBody = document.createElement("div");
	newTaskBody.classList.add("task_body");
	newTaskBody.innerHTML = `
        <div class="btn-ListBody">
        <span class="material-icons removeTask"  >
        delete
        </span>
        <span class="material-icons addTask"  >
        add_circle
        </span>
        </div>
        `;
	card.appendChild(newTaskBody);
}

document.getElementById("listBtn").addEventListener("click", mainFunc);
document.getElementById("listText").addEventListener("enter", mainFunc);

document.getElementById("parent").addEventListener("click", scratchTodo);

function scratchTodo(e) {
	let item = e.target;
	if (item.classList.contains("taskCheck")) {
		item.parentElement.classList.toggle("me");
	}
}

window.addEventListener("click", (e) => {
	if (e.target.classList.contains("removeTask")) {
		e.target.parentElement.parentElement.parentElement.remove();
	}
});

window.addEventListener("click", (e) => {
	if (e.target.classList.contains("addTask")) {
		document.getElementById("addNewItem").classList.toggle("addNewItemActive");
		parentNode = e.target.parentNode.parentNode.parentNode;
		// console.log({ parentNode });
		document.getElementById("container").classList.toggle("blurActive");
		document.getElementById("parent").classList.toggle("blurActive");
	}
});

document.getElementById("itemAddBtn").addEventListener("click", () => {
	document.getElementById("container").classList.toggle("blurActive");
	document.getElementById("parent").classList.toggle("blurActive");
	document.getElementById("addNewItem").classList.toggle("addNewItemActive");

	let newTask = document.createElement("p");
	newTask.classList.add("taskText");
	parentNode.appendChild(newTask);

	let pTask = document.createElement("div");
	pTask.classList.add("pTask");
	pTask.id = "pendingtasks";

	pTask.innerHTML = `
        <p class="scratch" id="">${document.getElementById("itemText").value}</p>
        <span class="taskCheck" >Mark Done</span>`;
	parentNode.appendChild(pTask);

	document.getElementById("itemText").value = "";
});

document.getElementById("itemCancelBtn").addEventListener("click", () => {
	document.getElementById("container").classList.toggle("blurActive");
	document.getElementById("parent").classList.toggle("blurActive");
	document.getElementById("addNewItem").classList.toggle("addNewItemActive");
});

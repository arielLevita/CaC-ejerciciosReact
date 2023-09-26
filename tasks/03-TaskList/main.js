const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = input.value;
    if (text !== "") {
        const li = document.createElement("li");
        const doneBtn = document.createElement("button");
        let isDone = false;

        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'btn-group', 'rounded', 'my-1', 'p-0')
        doneBtn.classList.add('d-flex', 'flex-grow-1', 'btn', 'btn-done')
        doneBtn.innerHTML = text;

        li.appendChild(doneBtn);
        ul.appendChild(li);
        li.appendChild(deleteButton());

        input.value = "";
        empty.style.display = "none";

        doneBtn.addEventListener("click", () => {
            if (isDone) {
                doneBtn.style.color = "";
                doneBtn.style.textDecoration = "";
            } else {
                doneBtn.style.color = "gray";
                doneBtn.style.textDecoration = "line-through";
            }

            isDone = !isDone;
        })
    }

});

function deleteButton() {

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = 'X';
    deleteBtn.classList.add('btn-delete', 'btn', 'btn-danger', 'd-flex', 'flex-grow-0');

    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);
        const items = document.querySelectorAll("li");
        if (items.length === 0) {
            empty.style.display = "block"
        }
    });

    return deleteBtn;
}
const API = "/teachers";

function loadTeachers() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("teacherTable");
            table.innerHTML = "";

            data.forEach(t => {
                table.innerHTML += `
                    <tr>
                        <td>${t.id}</td>
                        <td>${t.name}</td>
                        <td>${t.subject}</td>
                        <td>
                            <button onclick="editTeacher(${t.id}, '${t.name}', '${t.subject}')">Edit</button>
                            <button onclick="deleteTeacher(${t.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function saveTeacher() {
    const id = document.getElementById("teacherId").value;
    const name = document.getElementById("name").value;
    const subject = document.getElementById("subject").value;

    if (!name || !subject) {
        alert("Fill all fields");
        return;
    }

    const teacher = { name, subject };

    if (id) {
        fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teacher)
        }).then(resetForm);
    } else {
        fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(teacher)
        }).then(resetForm);
    }
}

function editTeacher(id, name, subject) {
    document.getElementById("teacherId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("subject").value = subject;
}

function deleteTeacher(id) {
    fetch(`${API}/${id}`, { method: "DELETE" })
        .then(loadTeachers);
}

function resetForm() {
    document.getElementById("teacherId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("subject").value = "";
    loadTeachers();
}

window.onload = loadTeachers;

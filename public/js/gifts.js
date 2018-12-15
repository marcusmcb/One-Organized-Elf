let giftLists = []
let addingToList 

function displayLists() {
    giftLists = []
    $.get("/giftsList", function (data) {
        for (let i=0; i< data.length; i++) {
            if (giftLists.includes(data[i].whichList) === false) {
                giftLists.push(data[i].whichList)
            }
        }
        giftLists.forEach(function(item) {
            $('#add-gift-list').append (`
                <div class="delete-list-div">
                <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
                <button class="delete-list-button" onclick="deleteList('${item}')">Delete</button>
                </div>
                `)
        });
    });
}

function addGiftItem() {
    event.preventDefault()
    let newGiftNameInput = $("#giftName").val().trim()
    let newGiftBudgetInput = $("#giftBudget").val().trim()
    var gift = {
        whichList: addingToList,
        giftName: newGiftNameInput,
        giftBudget: newGiftBudgetInput,                          
        complete: false
    };
    $.post("/giftsList", gift)
    .then(r => {
        $("#giftName").val('')
        $("#giftBudget").val('')
        showList(addingToList)
    })
}

function showList(Name) {
    addingToList = Name
    $('#gift-list-title').html(`${Name} Gift List`)
    $('.gift-table-body').empty()
    $('.done-gift-table-body').empty()
    $.get("/giftsList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === Name && data[i].complete === false) {
                $('.gift-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                        <td>${data[i].giftName}</td>
                        <td>$${data[i].giftBudget}</td>
                        <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem(${data[i].id})">Delete</button></td>
                    </tr>
                `)
            } else {
                if (data[i].whichList === Name) {
                    $('.done-gift-table-body').append(`
                        <tr>
                            <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                            <td>${data[i].giftName}</td>
                            <td>${data[i].giftBought}</td>
                            <td><button id="edit-gift-list" class="add-to-table" onclick="editGiftItem(${data[i].id})">Edit</button></td>
                            <td><button id="delete-gift-list" class="add-to-table" onclick="deleteGiftItem(${data[i].id})">Delete</button></td>
                        </tr>
                    `)
                }
            }
        }
    })
    $('#show-gift-details').css('display', 'block')
}

function addToGiftList() {
    event.preventDefault()
    let listName = $('#add-to-gift-list').val()
    $('#add-gift-list').append (`
    <div class="delete-list-div">
                <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
                <button class="delete-list-button" onclick="deleteList('${listName}')">Delete</button>
                </div>
    `)
    $('#add-to-gift-list').val('')
}

function showCompleted() {
    $('#show-gift-done').css('display', 'block')
    $('#show-gift').css('display', 'none')
    $('#hide-gift').css('display', 'block')
}

function hideCompleted() {
    $('#show-gift-done').css('display', 'none')
    $('#show-gift').css('display', 'block')
    $('#hide-gift').css('display', 'none')
}

function deleteGiftItem(id) {
    event.stopPropagation();
    fetch(`/giftsList/${id}`, {
        method: 'DELETE'
    }).then(r=> {
        showList(addingToList)
    })
}

function changeStatus(idStatus) {
    let isComplete 
    $.get("/giftsList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === idStatus) {
                isComplete = data[i].complete
            }
        }
    })
    .then(r => {
        if (isComplete === true) {
            fetch(`/giftsList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: false })
            }).then(r=> {
            showList(addingToList)
            })
        } else {
            fetch(`/giftsList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: true })
            }).then(r=> {
                openModal(idStatus)
            })
        }
   })
}

function openModal(id) {
    $('.modal').css('display', 'block')
    $('#modal-id').val(id)
}

function addGiftToTable() {
    let gift = $('#gift-title').val()
    let id = $('#modal-id').val()
    fetch(`/giftsList/${id}`, {
        method: "PUT",
        headers: { 'Content-Type' : 'application/json; charset=utf-8'},
        body: JSON.stringify({ giftBought: gift })
    }).then(r=> {
        $('#gift-title').val('')
        $('#modal-id').val('')
        $('.modal').css('display', 'none')
        showList(addingToList)
    })
}

function editGiftItem (id) {
    $.get("/giftsList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === id) {
                $('#modal2-id').val(id)
                $("#gift-list").val(data[i].whichList)                
                $("#gift-name").val(data[i].giftName)               
                $("#gift-budget").val(data[i].giftBudget)
                $("#gift-bought").val(data[i].giftBought)
            }
        }
    }).then(r => {
    $('.modal2').css('display', 'block')
    })
}

function updateItem () {
    let id = $("#modal2-id").val()
    let list = $('#gift-list').val()
    let name = $('#gift-name').val()
    let budget = $('#gift-budget').val()
    let gift = $('#gift-bought').val()
    console.log(id)
    fetch(`/giftsList/${id}`, {
        method: "PUT",
        headers: { 'Content-Type' : 'application/json; charset=utf-8' },
        body: JSON.stringify({ giftBought: gift, giftBudget: budget, giftName: name, whichList: list})
}).then(r=> {
    $('.modal2').css('display', 'none')
        $("#modal2-id").val('')
        $('#gift-list').val('')
        $('#gift-name').val('')
        $('#gift-budget').val('')
        $('#gift-bought').val('')
        showList(addingToList)
    })
}

function deleteList(name) {
    giftLists.splice(giftLists.indexOf(name), 1)
    $.get("/giftsList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === name){
                let id = data[i].id
                fetch(`/giftsList/${id}`, {
                    method: 'DELETE'
                })
            }
        }
    })    
.then(r=> {
    giftLists = []
    showList(addingToList)
})     
}
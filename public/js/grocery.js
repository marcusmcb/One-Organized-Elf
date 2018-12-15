let groceryLists = []
let addingToList 

function displayLists() {
    groceryLists = []
    console.log(groceryLists)
    $.get("/groceryList", function (data) {
        for (let i=0; i< data.length; i++) {
            if (groceryLists.includes(data[i].whichList) === false) {
                groceryLists.push(data[i].whichList)
            }
        }
    groceryLists.forEach(function(item) {
        $('#add-grocery-list').append (`<div class="delete-list-div">
        <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
        <button class="delete-list-button" onclick="deleteList('${item}')">Delete</button>
        </div>
        `)
        });
    });
}

function addGroceryItem() {
    event.preventDefault()
    let newGroceryQuantityInput = $("#groceryQuantity").val().trim()
    let newGroceryItemInput = $("#groceryItem").val().trim()
    var grocery = {
        whichList: addingToList,
        groceryAmount: newGroceryQuantityInput,
        groceryName: newGroceryItemInput,                          
        complete: false
   };
   $.post("/groceryList", grocery)  
   .then(r => {
   $("#groceryQuantity").val('')
   $("#groceryItem").val('')
   showList(addingToList)
})
}

function showList(Name) {
    addingToList = Name
    $('#grocery-list-title').html(`${Name} Grocery List`)
    $('.grocery-table-body').empty()
    $('.done-grocery-table-body').empty()
    $.get("/groceryList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === Name && data[i].complete === false) {
                $('.grocery-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                        <td>${data[i].groceryName}</td>
                        <td>${data[i].groceryAmount}</td>
                        <td><button id="edit-grocery-list" class="add-to-table" onclick="editGroceryItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-grocery-list" class="add-to-table" onclick="deleteGroceryItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
            } else {
                if (data[i].whichList === Name) {
                    $('.done-grocery-table-body').append(`
                    <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                        <td>${data[i].groceryName}</td>
                        <td>${data[i].groceryAmount}</td>
                        <td><button id="edit-grocery-list" class="add-to-table" onclick="editGroceryItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-grocery-list" class="add-to-table" onclick="deleteGroceryItem(${data[i].id})">Delete</button></td>
                    </tr>
             `)
                }
            }
        }
    })
    $('#show-grocery-details').css('display', 'block')
}

function addToGroceryList() {
    event.preventDefault()
    let listName = $('#add-to-grocery-list').val()
    $('#add-grocery-list').append (`<div class="delete-list-div">
    <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
    <button class="delete-list-button" onclick="deleteList('${listName}')">Delete</button>
    </div>
    `)
    $('#add-to-grocery-list').val('')
}

function showCompleted() {
    $('#show-grocery-done').css('display', 'block')
    $('#show-grocery').css('display', 'none')
    $('#hide-grocery').css('display', 'block')
}

function hideCompleted() {
    $('#show-grocery-done').css('display', 'none')
    $('#show-grocery').css('display', 'block')
    $('#hide-grocery').css('display', 'none')
}

function deleteGroceryItem(id) {
    event.stopPropagation();
    fetch(`/groceryList/${id}`, {
        method: 'DELETE'
    }).then(r=> {
        showList(addingToList)
    })
}

function changeStatus(idStatus) {
    let isComplete 
    $.get("/groceryList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === idStatus) {
                isComplete = data[i].complete
            }
        }
    })
    .then(r => {
        if (isComplete === true) {
            fetch(`/groceryList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: false })
            }).then(r=> {
           showList(addingToList)
            })
        } else {
            fetch(`/groceryList/${idStatus}`, {
                method: "PUT",
                headers: { 'Content-Type' : 'application/json; charset=utf-8'},
                body: JSON.stringify({ complete: true })
            }).then(r=> {
           showList(addingToList)
            })
        }
   })
}

function editGroceryItem (id) {
    $.get("/groceryList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === id) {
                $('#modal6-id').val(id)
                $("#grocery-list").val(data[i].whichList)                
                $("#grocery-item").val(data[i].groceryName)               
                $("#grocery-quantity").val(data[i].groceryAmount)
            }
        }
    }).then(r => {
    $('.modal6').css('display', 'block')
    })
}

function updateItem () {
    let id = $("#modal6-id").val()
    let list = $('#grocery-list').val()
    let item = $('#grocery-item').val()
    let quantity = $('#grocery-quantity').val()
    fetch(`/groceryList/${id}`, {
        method: "PUT",
        headers: { 'Content-Type' : 'application/json; charset=utf-8'},
        body: JSON.stringify({ groceryName: item, groceryAmount: quantity, whichList: list})
}).then(r=> {
    $('.modal6').css('display', 'none')
        $("#modal6-id").val('')
        $('#grocery-list').val('')
        $('#grocery-item').val('')
        $('#grocery-quantity').val('')
        showList(addingToList)
    })
}

function deleteList(name) {
    $.get("/groceryList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === name){
                let id = data[i].id
                fetch(`/groceryList/${id}`, {
                    method: 'DELETE'
                })
            }
        }
    })    
.then(r=> {
    groceryLists = []
    showList(addingToList)
})     
}
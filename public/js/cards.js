let cardLists = []
let addingToList

function displayLists() {
    cardLists = []
   $.get("/cardsList", function (data) {
       for (let i=0; i< data.length; i++) {
           if (cardLists.includes(data[i].whichList) === false) {
               cardLists.push(data[i].whichList)
           }
       }
      cardLists.forEach(function(item) {
         $('#add-card-list').append (`<div class="delete-list-div">
         <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
         <button class="delete-list-button" onclick="deleteList('${item}')">Delete</button>
         </div>
         `)
         });
   });
}

function addCardItem() {
   event.preventDefault()
   var newCardNameInput = $('#cardName').val().trim();
   var newCardAddressInput = $('#cardAddress').val().trim();
   var newCardCityInput = $('#cardCity').val().trim();
   var newCardStateInput = $('#cardState').val().trim();
   var newCardZipCodeInput = $('#cardZipCode').val().trim();
   var card = {
      whichList: addingToList,
      cardName: newCardNameInput,
      cardAddress: newCardAddressInput,
      cardCity: newCardCityInput,
      cardState: newCardStateInput,
      cardZipCode: newCardZipCodeInput,
      complete: false
   };
   $.post("/cardsList", card)
   .then(r => {
   $('#cardName').val('')
   $('#cardAddress').val('')
   $('#cardCity').val('')
   $('#cardState').val('')
   $('#cardZipCode').val('')
    showList(addingToList)
   })
 }

 function showList(Name) {
   addingToList = Name
   $('#card-list-title').html(`${Name} Card List`)
   $('.card-table-body').empty()
   $('.done-card-table-body').empty()
   $.get("/cardsList", function (data) {
       for (let i=0; i<data.length; i++) {
           if (data[i].whichList === Name && data[i].complete === false) {
               $('.card-table-body').append(`
                  <tr>
                     <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                     <td>${data[i].cardName}</td>
                     <td><button id="show-card-list" class="add-to-table" onclick="showAddress(${data[i].id})">Show</button></td>
                     <td><button id="edit-card-list" class="add-to-table" onclick="editCard(${data[i].id})">Edit</button></td>
                     <td><button id="delete-card-list" class="add-to-table" onclick="deleteCard(${data[i].id})">Delete</button></td>
                  </tr>
            `)
           } else {
               if (data[i].whichList === Name) {
                   $('.done-card-table-body').append(`
                     <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                        <td>${data[i].cardName}</td>
                        <td><button id="show-card-list" class="add-to-table" onclick="showAddress(${data[i].id})">Show</button></td>
                        <td><button id="edit-card-list" class="add-to-table" onclick="editCard(${data[i].id})">Edit</button></td>
                        <td><button id="delete-card-list" class="add-to-table" onclick="deleteCard(${data[i].id})">Delete</button></td>
                     </tr>
            `)
               }
           }
       }
   })
   $("#show-addresses-button").css('display', 'block')
   $('#show-card-details').css('display', 'block')
 }

function addToCardList() {
    event.preventDefault()
    let listName = $('#add-to-card-list').val()
    $('#add-card-list').append (`<div class="delete-list-div">
    <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
    <button class="delete-list-button" onclick="deleteList('${listName}')">Delete</button>
    </div>
    `)
    $('#add-to-card-list').val('')
}

function showCompleted() {
   $('#show-card-done').css('display', 'block')
   $('#show-card').css('display', 'none')
   $('#hide-card').css('display', 'block')
}

function hideCompleted() {
   $('#show-card-done').css('display', 'none')
   $('#show-card').css('display', 'block')
   $('#hide-card').css('display', 'none')
}

function deleteCard(id) {
   event.stopPropagation();
   fetch(`/cardsList/${id}`, {
       method: 'DELETE'
   }).then(r=> {
       showList(addingToList)
   })
}

function changeStatus(idStatus) {
   event.preventDefault()
   let isComplete 
   $.get("/cardsList", function (data) {
       for (i=0; i<data.length; i++) {
           if (data[i].id === idStatus) {
               isComplete = data[i].complete
           }
       }
   })
   .then(r => {
       if (isComplete === true) {
           fetch(`/cardsList/${idStatus}`, {
               method: "PUT",
               headers: { 'Content-Type' : 'application/json; charset=utf-8'},
               body: JSON.stringify({ complete: false })
           }).then(r=> {
          showList(addingToList)
           })
       } else {
           fetch(`/cardsList/${idStatus}`, {
               method: "PUT",
               headers: { 'Content-Type' : 'application/json; charset=utf-8'},
               body: JSON.stringify({ complete: true })
           }).then(r=> {
          showList(addingToList)
           })
       }
  })
}

function editCard (id) {
    $.get("/cardsList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === id) {
                $('#modal4-id').val(id)
                $("#card-list").val(data[i].whichList)                
                $("#card-name").val(data[i].cardName)               
                $("#card-address").val(data[i].cardAddress)
                $("#card-city").val(data[i].cardCity)             
                $("#card-state").val(data[i].cardState)
                $("#card-zipcode").val(data[i].cardZipCode)
            }
        }
    }).then(r => {
    $('.modal4').css('display', 'block')
    })
}

function updateItem () {
    let id = $("#modal4-id").val()
    let list = $('#card-list').val()
    let name = $('#card-name').val()
    let address = $('#card-address').val()
    let city = $('#card-city').val()
    let state = $('#card-state').val()
    let zipcode = $('#card-zipcode').val()
    fetch(`/cardsList/${id}`, {
        method: "PUT",
        headers: { 'Content-Type' : 'application/json; charset=utf-8'},
        body: JSON.stringify({ cardZipCode: zipcode, cardState: state, cardcity: city, cardAddress: address, cardName: name, whichList: list})
}).then(r=> {
    $('.modal4').css('display', 'none')
        $("#modal4-id").val('')
        $('#card-list').val('')
        $('#card-name').val('')
        $('#card-address').val('')
        $('#card-city').val('')
        $('#card-state').val('')
        $('#card-zipcode').val('')
        showList(addingToList)
    })
}

function deleteList(name) {
    $.get("/cardsList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].whichList === name){
                let id = data[i].id
                fetch(`/cardsList/${id}`, {
                    method: 'DELETE'
                })
            }
        }
    })    
.then(r=> {
    cardLists = []
    showList(addingToList)
})     
}

function showAddresses() {
    $('#showAddress').empty()
    $.get("/cardsList", function (data) {
        for (let i=0; i<data.length; i++) {
            $('#showAddress').append(`
                <tr>
                    <td class='modal-row'>${data[i].cardName}</td>/button>
                    <td class='modal-row'>${data[i].cardAddress}</td>/button>
                    <td class='modal-row'>${data[i].cardCity}</td>/button>
                    <td class='modal-row'>${data[i].cardState}</td>/button>
                    <td class='modal-row'>${data[i].cardZipCode}</td>/button>
                </tr>
            `)
            
        }
    })
    $('.modal7').css('display', 'block')
}

function showAddress(id) {
    $('#showAddress').empty()
    $.get("/cardsList", function (data) {
        for (let i=0; i<data.length; i++) {
            if (data[i].id === id) {
                $('#showAddress').append(`
                    <tr>
                        <td class='modal-row'>${data[i].cardName}</td>/button>
                        <td class='modal-row'>${data[i].cardAddress}</td>/button>
                        <td class='modal-row'>${data[i].cardCity}</td>/button>
                        <td class='modal-row'>${data[i].cardState}</td>/button>
                        <td class='modal-row'>${data[i].cardZipCode}</td>/button>
                    </tr>
                `)
            }
        }
    })
    $('.modal7').css('display', 'block')
}

function closeModal() {
    $('.modal7').css('display', 'none')
}

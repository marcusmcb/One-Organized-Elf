let wishLists = []
let addingToList

function displayLists() {
   wishLists = []
   $.get("/wishList", function (data) {
      for (let i=0; i< data.length; i++) {
         if (wishLists.includes(data[i].whichList) === false) {
            wishLists.push(data[i].whichList)
         }
      }
      wishLists.forEach(function(item) {
         $('#add-wish-list').append (`<div class="delete-list-div">
         <br><a class="added-to-list" onclick="showList('${item}')">${item}</a>
         <button class="delete-list-button" onclick="deleteList('${item}')">Delete</button>
         </div>
         `)
      });
   });
} 

function addWishItem() {
  event.preventDefault()
  var newItemNameInput = $("#wishItem").val();
  var newItemLocationInput = $("#wishStore").val();
  var newItemPriceInput = $("#wishCost").val();
  var newItemOptionsInput = $("#wishOptions").val();
  var wish = {
      whichList: addingToList,
      itemName: newItemNameInput,
      itemLocation: newItemLocationInput,
      itemPrice: newItemPriceInput,
      itemOptions: newItemOptionsInput,
      complete: false
  }
  $.post("/wishList", wish)
  .then(r => {
  $('#wishItem').val('')
  $('#wishStore').val('')
  $('#wishCost').val('')
  $('#wishOptions').val('')
  showList(addingToList)
  })
}

function showList(Name) {
   addingToList = Name
   $('#wish-list-title').html(`${Name}'s WishGift List`)
   $('.wish-table-body').empty()
   $('.done-wish-table-body').empty()
   $.get("/wishList", function (data) {
      for (let i=0; i<data.length; i++) {
         if (data[i].whichList === Name && data[i].complete === false) {
            $('.wish-table-body').append(`
               <tr>
                  <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                  <td>${data[i].itemName}</td>
                  <td>${data[i].itemLocation}</td>
                  <td>$${data[i].itemPrice}</td>
                  <td>${data[i].itemOptions}</td>
                  <td><button id="edit-wish-list" class="add-to-table" onclick="editWishItem(${data[i].id})">Edit</button></td>
                  <td><button id="delete-wish-list" class="add-to-table" onclick="deleteWishItem(${data[i].id})">Delete</button></td>
               </tr>
            `)
         } else {
            if (data[i].whichList === Name) {
                  $('.done-wish-table-body').append(`
                     <tr>
                        <td><input class="checkbox" type="checkbox" name="bought" onchange="changeStatus(${data[i].id})"><br></td>
                        <td>${data[i].itemName}</td>
                        <td>${data[i].itemLocation}</td>
                        <td>$${data[i].itemPrice}</td>
                        <td>${data[i].itemOptions}</td>
                        <td><button id="edit-wish-list" class="add-to-table" onclick="editWishItem(${data[i].id})">Edit</button></td>
                        <td><button id="delete-wish-list" class="add-to-table" onclick="deleteWishItem(${data[i].id})">Delete</button></td>
                     </tr>
                  `)
               }
         }
      }
   })
   $('#show-wish-details').css('display', 'block')
}

function addToWishList() {
   event.preventDefault()
   let listName = $('#add-to-wish-list').val()
   $('#add-wish-list').append (`<div class="delete-list-div">
   <br><a class="added-to-list" onclick="showList('${listName}')">${listName}</a>
   <button class="delete-list-button" onclick="deleteList('${listName}')">Delete</button>
   </div>
   `)
   $('#add-to-wish-list').val('')
}

function showCompleted() {
   $('#show-wish-done').css('display', 'block')
   $('#show-wish').css('display', 'none')
   $('#hide-wish').css('display', 'block')
}

function hideCompleted() {
   $('#show-wish-done').css('display', 'none')
   $('#show-wish').css('display', 'block')
   $('#hide-wish').css('display', 'none')
}

function deleteWishItem(id) {
   event.stopPropagation();
   fetch(`/wishList/${id}`, {
       method: 'DELETE'
   }).then(r=> {
       showList(addingToList)
   })
}

function changeStatus(idStatus) {
   event.preventDefault()
   let isComplete 
   $.get("/wishList", function (data) {
       for (i=0; i<data.length; i++) {
           if (data[i].id === idStatus) {
               isComplete = data[i].complete
           }
       }
   })
   .then(r => {
       if (isComplete === true) {
           fetch(`/wishList/${idStatus}`, {
               method: "PUT",
               headers: { 'Content-Type' : 'application/json; charset=utf-8'},
               body: JSON.stringify({ complete: false })
           }).then(r=> {
          showList(addingToList)
           })
       } else {
           fetch(`/wishList/${idStatus}`, {
               method: "PUT",
               headers: { 'Content-Type' : 'application/json; charset=utf-8'},
               body: JSON.stringify({ complete: true })
           }).then(r=> {
          showList(addingToList)
           })
       }
  })
}

function editWishItem (id) {
   $.get("/wishList", function (data) {
       for (i=0; i<data.length; i++) {
           if (data[i].id === id) {
               $('#modal3-id').val(id)
               $("#wish-list").val(data[i].whichList)                
               $("#wish-item").val(data[i].itemName)               
               $("#wish-store").val(data[i].itemLocation)
               $("#wish-cost").val(data[i].itemPrice)
               $("#wish-options").val(data[i].itemOptions)
           }
       }
   }).then(r => {
   $('.modal3').css('display', 'block')
   })
}

function updateItem () {
   let id = $("#modal3-id").val()
   let list = $('#wish-list').val()
   let item = $('#wish-item').val()
   let store = $('#wish-store').val()
   let cost = $('#wish-cost').val()
   let options = $('#wish-options').val()
   fetch(`/wishList/${id}`, {
       method: "PUT",
       headers: { 'Content-Type' : 'application/json; charset=utf-8'},
       body: JSON.stringify({ itemOptions: options, itemPrice: cost, itemLocation: store, itemName: item, whichList: list})
}).then(r=> {
   $('.modal3').css('display', 'none')
       $("#modal3-id").val('')
       $('#wish-list').val('')
       $('#wish-item').val('')
       $('#wish-store').val('')
       $('#wish-cost').val('')
       $('#wish-options').val('')
       showList(addingToList)
   })
}

function deleteList(name) {
   $.get("/wishList", function (data) {
       for (let i=0; i<data.length; i++) {
           if (data[i].whichList === name){
               let id = data[i].id
               fetch(`/wishList/${id}`, {
                   method: 'DELETE'
               })
           }
       }
   })    
.then(r=> {
   wishLists = []  
   showList(addingToList)
})     
}
   
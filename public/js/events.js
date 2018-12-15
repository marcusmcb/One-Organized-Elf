function addEvent() {
    $('.modal8').css('display', 'block')
}

function addEventToList() {
    let activity = $("#event-name").val().trim()
    let date = $("#event-date").val().trim()
    let time = $("#event-time").val().trim()
    let location = $("#event-location").val().trim()
    let instructions = $("#event-instructions").val().trim()
    var event = {
        eventName: activity,
        eventDate: date,
        eventTime: time,
        eventLocation: location,
        eventInstructions: instructions,                  
        complete: false
    };
    $.post("/eventList", event)
    .then(r => {
        $("#event-name").val('')
        $("#event-date").val('')
        $("#event-time").val('')
        $("#event-location").val('')
        $("#event-instructions").val('')
            showEvents()
    })
    $('.modal8').css('display', 'none')
}

function showEvents() {
    $('#card-div').empty()
    $.get("/eventList", function (data) {
        for (let i=0; i<data.length; i++) {
            let date = data[i].eventDate
            date = moment(date).format('dddd MMM Do')
            let time = data[i].eventTime
        time = moment(time, moment.HTML5_FMT.TIME).format('h:mm a')
            $('#card-div').append(`
                    <div class='column'>
                        <div class="flip-card card">
                            <div class="flip-card-inner">
                                <div class="flip-card-inner-front">
                                    <span>${date}</span>
                                </div>
                                <div class="flip-card-inner-back">
                                    <h3 class="flip-card-inner-back-title">${data[i].eventName}</h3>
                                    <p class="flip-card-inner-back-text">Date: ${date}</p>
                                    <p class="flip-card-inner-back-text">Time: ${time}</p>
                                    <p class="flip-card-inner-back-text">Location: ${data[i].eventLocation}</p>
                                    <p class="flip-card-inner-back-text">Instructions: ${data[i].eventInstructions}</p>
                                        <div><button id="edit-event" class="event-btn button" onclick="editEvent(${data[i].id})">Edit</button></div>
                                        <div><button id="delete-event" class="event-btn button" onclick="deleteEvent(${data[i].id})">Delete</button></div>
                                </div>
                            </div>
                        </div>
                    </div>

            `)
        }
    })
}

function editEvent(id) {
    $.get("/eventList", function (data) {
        for (i=0; i<data.length; i++) {
            if (data[i].id === id) {
                $('#modal9-id').val(id)
                $("#event-name2").val(data[i].eventName) 
                $("#event-date2").val(data[i].eventDate)                
                $("#event-time2").val(data[i].eventTime)               
                $("#event-location2").val(data[i].eventLocation)
                $("#event-instructions2").val(data[i].eventInstructions)
            }
        }
    }).then(r => {
    $('.modal9').css('display', 'block')
    })
}

function deleteEvent(id) {
    fetch(`/eventList/${id}`, {
        method: 'DELETE'
    }).then(r=> {
        showEvents()
    })
}

function updateItem() {
    let id = $("#modal9-id").val()
    let event = $("#event-name2").val()
    let date = $("#event-date2").val()
    let time = $("#event-time2").val()
    let location = $("#event-location2").val()
    let instructions = $("#event-instructions2").val()
    fetch(`/eventList/${id}`, {
        method: "PUT",
        headers: { 'Content-Type' : 'application/json; charset=utf-8'},
        body: JSON.stringify({ eventName: event, eventDate: date, eventTime: time, eventLocation: location, eventInstructions: instructions})
}).then(r=> {
    $('.modal9').css('display', 'none')
        $("#modal2-id").val('')
        $('#event-name2').val('')
        $('#event-date2').val('')
        $('#event-time2').val('')
        $('#event-location2').val('')
        $('#event-instructions2').val('')
        showEvents()
    })
}
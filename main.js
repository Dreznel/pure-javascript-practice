function fetchItems () {
  var items = JSON.parse(localStorage.getItem('items'));
  var itemsList = document.getElementById('itemsList');

  itemsList.innerHTML = '';

  for (var i = 0; i < items.length; i++) {
    var id = items[i].id;
    var desc = items[i].description;
    var status = items[i].status;

    itemsList.innerHTML +=   '<div class="well">'+
                              '<h6>Item ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              //'<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusBroken(\''+id+'\')">Break</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteItem(\''+id+'\')">Delete</a>'+
                              '</div>';
  }
}

function fetchHp() {

  if(localStorage.getItem('maxHp') === null) {
    rollHp(3);
  }

  var currentHp = JSON.parse(localStorage.getItem('currentHp'));
  var maxHp = JSON.parse(localStorage.getItem('maxHp'));

  hpSection = document.getElementById('character-hp');
  hpSection.innerHTML = '<div>' +
    '<h4> Current HP: ' + currentHp + '     ' + 
        '<a href="#" class="btn btn-danger" onclick="modifyHp(-5)">-5</a>' +
    '<a href="#" class="btn btn-danger" onclick="modifyHp(-1)">-1</a>' +
    '<a href="#" class="btn btn-success" onclick="modifyHp(1)">+1</a>' +
    '<a href="#" class="btn btn-success" onclick="modifyHp(5)">+5</a>' +
    '</h6>' +
    '<h4> Max HP: ' + maxHp + '</h6>' +
    '</div>';
}

function modifyHp(change) {
  if(localStorage.getItem('maxHp') === null) {
    rollHp(3);
  }
  var currentHp = JSON.parse(localStorage.getItem('currentHp'));
  currentHp += change;
  localStorage.setItem('currentHp', JSON.stringify(currentHp));
  fetchHp();
}

function rollHp(level) {
  var hp = 0;
  for(var i=0; i<level; i++) {
    hp += Math.floor((Math.random() * 8) + 1);
  }
  localStorage.setItem('currentHp', JSON.stringify(hp));
  localStorage.setItem('maxHp', JSON.stringify(hp));
}

function saveItem(e) {
  var itemId = chance.guid();
  var itemDesc = document.getElementById('itemDescInput').value;
  var itemStatus = 'Intact';
  var item = {
    id: itemId,
    description: itemDesc,
    status: itemStatus
  }

  if (localStorage.getItem('items') === null) {
    var items = [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
  } else {
    var items = JSON.parse(localStorage.getItem('items'));
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
  }

  document.getElementById('itemInputForm').reset();

  fetchItems();

  e.preventDefault();
}

function deleteItem (id) {
  var items = JSON.parse(localStorage.getItem('items'));

  for(var i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      items.splice(i, 1);
    }
  }

  localStorage.setItem('items', JSON.stringify(items));

  fetchItems();
}

function setStatusBroken (id) {
  var items = JSON.parse(localStorage.getItem('items'));

  for(var i = 0; i < items.length; i++) {
    if (items[i].id == id) {
      items[i].status = "Broken";
    }
  }

  localStorage.setItem('items', JSON.stringify(items));

  fetchItems();
}

function loadCharacter() {
  fetchHp();
  fetchItems();
}

document.getElementById('itemInputForm').addEventListener('submit', saveItem);

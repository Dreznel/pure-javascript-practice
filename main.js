/*<div class="form-group">
  <label for="issueDescInput">Severity</label>
   <select class="form-control" id="issueSeverityInput">
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
  </select>
</div>*/

function fetchIssues () {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + desc + '</h3>'+
                              //'<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                              '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                              '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                              '</div>';
  }
}

function saveIssue(e) {
  var issueId = chance.guid();
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueStatus = 'Open';
  var issue = {
    id: issueId,
    description: issueDesc,
    status: issueStatus
  }

  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('itemInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function deleteIssue (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

function setStatusClosed (id) {
  var issues = JSON.parse(localStorage.getItem('issues'));

  for(var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem('issues', JSON.stringify(issues));

  fetchIssues();
}

document.getElementById('itemInputForm').addEventListener('submit', saveIssue);

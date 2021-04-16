let todoTasks = [];
let doingTasks = [];
let doneTasks = [];

window.onload = () => {
  if(localStorage.getItem('todoTasks')) {
    todoTasks = JSON.parse(localStorage.getItem('todoTasks'));
  } else {
    localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  }

  if(localStorage.getItem('doingTasks')) {
    doingTasks = JSON.parse(localStorage.getItem('doingTasks'));
  } else {
    localStorage.setItem('doingTasks', JSON.stringify(doingTasks));
  }

  if(localStorage.getItem('doneTasks')) {
    doneTasks = JSON.parse(localStorage.getItem('doneTasks'));
  } else {
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  }

  displayData();
}


function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, el, boxName) {
  let fromBox = '';
  ev.preventDefault();
  var elementId = ev.dataTransfer.getData("text");
  el.appendChild(document.getElementById(elementId));
  
  let asTodo = todoTasks.find((item) => {
    return item.id == elementId;
  });

  let asDoing = doingTasks.find((item) => {
    return item.id == elementId;
  });

  let asDone = doneTasks.find((item) => {
    return item.id == elementId;
  });

  if(asTodo) {
    todoTasks = todoTasks.filter((element) => {
      return element.id != elementId;
    });
    fromBox = 'todo';
  } else if(asDoing) {
    doingTasks = doingTasks.filter((element) => {
      return element.id != elementId;
    });
    fromBox = 'doing';
  } else if(asDone) {
    doneTasks = doneTasks.filter((element) => {
      return element.id != elementId;
    });
    fromBox = 'done';
  }
  
  if(boxName == 'todoTasks' && fromBox == "todo") {
    todoTasks.push(asTodo);
  } else if(boxName == 'todoTasks' && fromBox == "doing") {
    todoTasks.push(asDoing);
  } else if(boxName == 'todoTasks' && fromBox == "done") {
    todoTasks.push(asDone);
  } else if(boxName == 'doingTasks' && fromBox == "todo") {
    doingTasks.push(asTodo);
  } else if(boxName == 'doingTasks' && fromBox == "doing") {
    doingTasks.push(asDoing);
  } else if(boxName == 'doingTasks' && fromBox == "done") {
    doingTasks.push(asDone);
  } else if(boxName == 'doneTasks' && fromBox == "todo") {
    doneTasks.push(asTodo);
  } else if(boxName == 'doneTasks' && fromBox == "doing") {
    doneTasks.push(asDoing);
  } else if(boxName == 'doneTasks' && fromBox == "done") {
    doneTasks.push(asDone);
  }
  localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
  localStorage.setItem('doingTasks', JSON.stringify(doingTasks));
  localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
  displayData();

}


function displayData() {
  let todoElements = document.getElementById('todoElements');
  let doingElements = document.getElementById('doingElements');
  let doneElements = document.getElementById('doneElements');
  todoElements.innerHTML = '';
  doingElements.innerHTML = '';
  doneElements.innerHTML = '';
  for(let item of todoTasks) {
    todoElements.innerHTML += `
    <li id="${item.id}" ondragstart="drag(event)" draggable="true">
										<span>${item.taskName}</span>
										<div class="actions">
											<span onclick="deleteTask('${item.id}', 'todo')"><i class="fas fa-trash-alt"></i></span>
										</div>
									</li>
    `
  }
  
  for(let item of doingTasks) {
    doingElements.innerHTML += `
    <li id="${item.id}" ondragstart="drag(event)" draggable="true">
										<span>${item.taskName}</span>
										<div class="actions">
											<span onclick="deleteTask('${item.id}', 'doing')"><i class="fas fa-trash-alt"></i></span>
										</div>
									</li>
    `
  }

  for(let item of doneTasks) {
    doneElements.innerHTML += `
    <li id="${item.id}" ondragstart="drag(event)" draggable="true">
										<span>${item.taskName}</span>
										<div class="actions">
											<span onclick="deleteTask('${item.id}', 'done')"><i class="fas fa-trash-alt"></i></span>
										</div>
									</li>
    `
  }
}

function addTask(e) {
  e.preventDefault();
  let taskName = document.getElementById('taskName');
  let taskType = document.getElementById('taskType');
  let date = new Date;
  let newTask = {
    taskName: taskName.value,
    id: 'task' + date.toString().replace(/\s/g, '')
  }

  switch(taskType.value) {
    case 'todo': {
      todoTasks.push(newTask);
      localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
      break;
    }
    case 'doing': {
      doingTasks.push(newTask);
      localStorage.setItem('doingTasks', JSON.stringify(doingTasks));
      break;
    }
    case 'done': {
      doneTasks.push(newTask);
      localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
      break;
    }
  }
  taskName.value = '';
  taskType.value = 'todo';
  displayData();
}


function deleteTask(id, boxName) {
  switch(boxName) {
    case 'todo': {
      todoTasks = todoTasks.filter((item) => {
        return item.id != id;
      });
      localStorage.setItem('todoTasks', JSON.stringify(todoTasks));
      break;
    }
    case 'doing': {
      doingTasks = doingTasks.filter((item) => {
        return item.id != id;
      });
      localStorage.setItem('doingTasks', JSON.stringify(doingTasks));
      break;
    }
    case 'done': {
      doneTasks = doneTasks.filter((item) => {
        return item.id != id;
      });
      localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
      break;
    }
  }

  displayData();
}
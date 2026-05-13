const PASS = 'admin123'; //Пароль

// Проверка входа
if (sessionStorage.getItem('ok') === '1') {
  showAdmin();
}

function checkPass() {
  const p = document.getElementById('pass').value;
  if (p === PASS) {
    sessionStorage.setItem('ok', '1');
    showAdmin();
  } else {
    document.getElementById('err').textContent = 'Неверный пароль';
  }
}

function logout() {
  sessionStorage.removeItem('ok');
  location.reload();
}

function showAdmin() {
  document.getElementById('loginBlock').style.display = 'none';
  document.getElementById('adminBlock').style.display = 'block';
  renderList();
}

// Превью при выборе файла
document.getElementById('file').onchange = function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById('preview').innerHTML = 
        '<img src="' + ev.target.result + '" alt="preview">';
    };
    reader.readAsDataURL(file);
  }
};

// Добавить фото
function addPhoto() {
  const file = document.getElementById('file').files[0];
  const title = document.getElementById('title').value;
  const cat = document.getElementById('cat').value;
  
  if (!file || !title) {
    alert('Выберите файл и введите название');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = function(ev) {
    const photo = {
      id: Date.now(),
      src: ev.target.result,
      title: title,
      category: cat
    };
    
    // Сохраняем в localStorage
    const arr = JSON.parse(localStorage.getItem('photos') || '[]');
    arr.unshift(photo);
    localStorage.setItem('photos', JSON.stringify(arr));
    
    // Сброс формы
    document.getElementById('file').value = '';
    document.getElementById('title').value = '';
    document.getElementById('preview').innerHTML = '';
    
    renderList();
    alert('Фото добавлено!');
  };
  reader.readAsDataURL(file);
}

// Отобразить список
function renderList() {
  const arr = JSON.parse(localStorage.getItem('photos') || '[]');
  const list = document.getElementById('list');
  const count = document.getElementById('count');
  
  count.textContent = arr.length;
  
  if (arr.length === 0) {
    list.innerHTML = '<p>Галерея пуста</p>';
    return;
  }
  
  list.innerHTML = arr.map(p => `
    <div class="photo">
      <img src="${p.src}" alt="${p.title}">
      <div class="info">
        <strong>${p.title}</strong><br>
        <small>${p.category}</small>
      </div>
      <button class="del" onclick="delPhoto(${p.id})">×</button>
    </div>
  `).join('');
}

// Удалить фото
function delPhoto(id) {
  if (!confirm('Удалить это фото?')) return;
  
  let arr = JSON.parse(localStorage.getItem('photos') || '[]');
  arr = arr.filter(p => p.id !== id);
  localStorage.setItem('photos', JSON.stringify(arr));
  renderList();
}
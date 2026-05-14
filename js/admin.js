// пароль
const PASS = 'admin123';

// проверка авторизации
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

// предпросмотр файла
document.getElementById('file').onchange = function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById('preview').innerHTML = 
        '<img class="admin-preview__image" src="' + ev.target.result + '" alt="preview">';
    };
    reader.readAsDataURL(file);
  }
};

// добавление фото
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
    
    const arr = JSON.parse(localStorage.getItem('photos') || '[]');
    arr.unshift(photo);
    localStorage.setItem('photos', JSON.stringify(arr));
    
    document.getElementById('file').value = '';
    document.getElementById('title').value = '';
    document.getElementById('preview').innerHTML = '';
    
    renderList();
    alert('Фото добавлено!');
  };
  reader.readAsDataURL(file);
}

// отрисовка списка
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
    <div class="admin-gallery__item">
      <img class="admin-gallery__image" src="${p.src}" alt="${p.title}">
      <div class="admin-gallery__info">
        <strong>${p.title}</strong><br>
        <small>${p.category}</small>
      </div>
      <button class="admin-gallery__delete" onclick="delPhoto(${p.id})">×</button>
    </div>
  `).join('');
}

// удаление фото
function delPhoto(id) {
  if (!confirm('Удалить это фото?')) return;
  
  let arr = JSON.parse(localStorage.getItem('photos') || '[]');
  arr = arr.filter(p => p.id !== id);
  localStorage.setItem('photos', JSON.stringify(arr));
  renderList();
}
// script.js

document.addEventListener('DOMContentLoaded', function() {
  populateYearAndMonth();
  updateCalendar();
});

// index-图片轮播功能
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  }
  const offset = -currentIndex * 100;
  document.querySelector('.carousel-inner').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentIndex++;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex--;
  showSlide(currentIndex);
}

// index-自动播放功能（可选）
setInterval(nextSlide, 3000);


// calendar-填充年份和月份的下拉菜单
function populateYearAndMonth() {
  const yearSelect = document.getElementById('year');
  const monthSelect = document.getElementById('month');
  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    if (i === currentYear) {
      option.selected = true;
    }
    yearSelect.appendChild(option);
  }

  for (let i = 0; i < 12; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i + 1;
    if (i === new Date().getMonth()) {
      option.selected = true;
    }
    monthSelect.appendChild(option);
  }
}

// calendar-更新日历
function updateCalendar() {
  const year = document.getElementById('year').value;
  const month = document.getElementById('month').value;
  const calendarGrid = document.getElementById('calendar-grid');
  calendarGrid.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, parseInt(month) + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    calendarGrid.appendChild(emptyDiv);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('calendar-day');
    dayDiv.textContent = i;

    const today = new Date();
    if (today.getFullYear() == year && today.getMonth() == month && today.getDate() == i) {
      dayDiv.classList.add('today');
    }

    calendarGrid.appendChild(dayDiv);
  }
}

// 模态框功能
function showModal(imageSrc) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = "block";
  modalImg.src = imageSrc;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = "none";
}

// register-注册表单处理
document.getElementById('registration-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const user = {
    username: username,
    email: email,
    password: password
  };

  localStorage.setItem('user', JSON.stringify(user));
  alert('注册成功');
});

// login-登录表单处理
document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && storedUser.username === username && storedUser.password === password) {
    alert('登录成功');
    window.location.href = 'profile.html';
  } else {
    alert('用户名或密码错误');
  }
});

// profile-个人中心显示用户信息
document.addEventListener('DOMContentLoaded', function() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.getElementById('username').textContent = `用户名: ${user.username}`;
  }
});

function editProfile() {
  // 获取用户信息元素
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');

  // 创建输入框
  const usernameInput = document.createElement('input');
  usernameInput.type = 'text';
  usernameInput.value = username.innerText.split('：')[1];

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.value = email.innerText.split('：')[1];

  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.value = phone.innerText.split('：')[1];

  // 替换原来的文本内容
  username.innerHTML = '';
  username.appendChild(usernameInput);

  email.innerHTML = '';
  email.appendChild(emailInput);

  phone.innerHTML = '';
  phone.appendChild(phoneInput);

  // 添加保存按钮
  const saveButton = document.createElement('button');
  saveButton.innerText = '保存';
  saveButton.onclick = function() {
    username.innerText = '用户名：' + usernameInput.value;
    email.innerText = '邮箱：' + emailInput.value;
    phone.innerText = '电话：' + phoneInput.value;
  };

  username.appendChild(saveButton);
}

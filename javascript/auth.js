if (document.querySelector('.login')) {
  const loginForm = document.querySelector('.login form');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert('Đăng nhập thành công!');
      window.location.href = 'profile.html';
    } else {
      alert('Email hoặc mật khẩu không đúng.');
    }
  });
}

if (document.querySelector('.register')) {
  const registerForm = document.querySelector('.register form');
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const fullname = document.querySelector('#fullname').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;
    if (!email.includes('@') || password.length < 6) {
      alert('Email không hợp lệ hoặc mật khẩu phải dài hơn 6 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp.');
      return;
    }
    const user = { fullname, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    window.location.href = 'login.html';
  });
}
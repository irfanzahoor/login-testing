const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const result = await window.electron.invoke('login', { username, password });

  if (result.error) {
    errorMessage.textContent = result.error;
  } else {
    window.electron.invoke('open-dashboard', result.projects);
  }
});

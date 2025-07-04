const userContainer = document.getElementById('user-container');
const reloadBtn = document.getElementById('reload');

async function fetchUserData() {
  userContainer.innerHTML = 'Loading...';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Failed to fetch data');
    const users = await response.json();

    userContainer.innerHTML = ''; 
    users.forEach(user => {
      const div = document.createElement('div');
      div.className = 'user-card';
      div.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userContainer.appendChild(div);
    });
  } catch (error) {
    userContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

reloadBtn.addEventListener('click', fetchUserData);

// Initial fetch
fetchUserData();

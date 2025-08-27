document.getElementById('generateBtn').addEventListener('click', async () => {
  const count = Number(document.getElementById('userCount').value);
  const nameOption = document.getElementById('nameOption').value;
  const tableBody = document.getElementById('userTable');

  tableBody.innerHTML = '';

  if (!count || count < 0 || count > 1000) {
    alert("Please enter a number between 0 and 1000 :P");
    return;
  }

  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();

    data.results.forEach(user => {
      const row = document.createElement('tr');
      const name = nameOption === 'first' ? user.name.first : user.name.last;
      row.innerHTML = `
        <td>${name}</td>
        <td>${user.gender}</td>
        <td>${user.email}</td>
        <td>${user.location.country}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    alert("Unable to load users. Please try again later.");
    console.error(error);
  }
});

const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  try {
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json();
    if (data.id)
      location.assign('/');
  } catch (err) {
    console.error(err);
  }
})

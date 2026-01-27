const testLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'juan.perez@empresa.com',
        password: '123456'
      })
    });

    const data = await response.json();
    console.log('Respuesta del servidor:');
    console.log(JSON.stringify(data, null, 2));

    if (data.success) {
      console.log('\n✅ Login exitoso!');
      console.log('Token:', data.data.token);
    } else {
      console.log('\n❌ Login fallido');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testLogin();
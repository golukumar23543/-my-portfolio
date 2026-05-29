const http = require('http');
const data = JSON.stringify({
  password: 'Virus@93',
  settings: {
    profile_image: 'test'
  }
});
const req = http.request('http://localhost:3000/api/settings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});
req.write(data);
req.end();

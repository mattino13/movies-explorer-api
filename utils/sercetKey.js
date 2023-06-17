const devJwtSecretKey = '4OfuzUfusPlPoswuTr5fRemIcroduKi3';

function jwtSecretKey() {
  const jwtSecret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : devJwtSecretKey;
  return jwtSecret;
}

module.exports = { jwtSecretKey };

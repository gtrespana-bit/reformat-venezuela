// Resolve share.google redirect to the real Google Business Profile URL
const url = 'https://share.google/hdo3YDIIaqd4vwTl5';
try {
  const res = await fetch(url, { redirect: 'follow' });
  console.log('FINAL URL:', res.url);
  console.log('STATUS:', res.status);
} catch (e) {
  // fallback: manual redirect
  try {
    const res = await fetch(url, { redirect: 'manual' });
    console.log('STATUS:', res.status);
    console.log('LOCATION:', res.headers.get('location'));
  } catch (e2) {
    console.log('ERROR:', e2.message);
  }
}

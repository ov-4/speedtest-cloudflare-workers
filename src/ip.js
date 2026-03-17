async function handleRequest(request) {
  const ip = request.headers.get('cf-connecting-ip') || 'Unknown IP';
  
  const colo = (request.cf && request.cf.colo) || 'Unknown Colo';
  
  const country = (request.cf && request.cf.country) || 'Unknown Loc';
  const city = (request.cf && request.cf.city) || '';

  const loc = city ? `${city}, ${country}` : country;
  const processedString = `${ip} (connected to ${colo}, ${loc})`;

  const res = new Response(JSON.stringify({
    processedString: processedString,
    rawIspInfo: ""
  }));

  res.headers.set('access-control-allow-origin', '*');
  res.headers.set('content-type', 'application/json;charset=UTF-8');

  return res;
}

module.exports = handleRequest;

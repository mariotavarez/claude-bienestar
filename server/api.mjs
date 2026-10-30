import http from 'node:http';
import {readFile} from 'node:fs/promises';

http.createServer(async (request, response) => {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  if (request.url !== '/api/operations') {
    response.writeHead(404); response.end('{}'); return;
  }
  try {
    response.end(await readFile('fixtures/operations.json'));
  } catch {
    response.writeHead(500); response.end('{"error":"Unable to read the data file"}');
  }
}).listen(4174, '127.0.0.1', () => console.log('Data service ready'));

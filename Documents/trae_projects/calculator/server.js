const http=require('http');
const fs=require('fs');
const path=require('path');
const port=3000;
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon'};
const server=http.createServer((req,res)=>{
  const urlPath=new URL(req.url,'http://localhost').pathname;
  let filePath=path.join(process.cwd(),urlPath);
  if(urlPath==='/'||urlPath==='')filePath=path.join(process.cwd(),'index.html');
  fs.stat(filePath,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not Found');return}
    const ext=path.extname(filePath).toLowerCase();
    const type=mime[ext]||'application/octet-stream';
    res.writeHead(200,{'Content-Type':type});
    fs.createReadStream(filePath).pipe(res);
  });
});
server.listen(port,()=>{
  console.log(`Server listening on http://localhost:${port}/`);
});
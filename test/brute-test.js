const axios = require('axios');

(async()=> {
    for(let i = 0; i <= 100; i++){
        try{
            const res = await axios.get("http:/localhost:3000/veiculo");
            console.log(`[${i}] Status`, res.status);
        }catch(err){
            console.log(`[${i}] Erro`, err.message);
        }
    }
})();

const express = require('express');
const app = express();
const MercadoPago = require('mercadopago');


MercadoPago.configure({
    sandbox: true,
     access_token: "TEST-3260321011293596-061906-6cdf2c22206e79007f91b8f5642b3cf2-267336909" //victor udemy
   // access_token: "TEST-4197772329478898-072918-f951f7239fe2dcf02d4ca4996e733ea5-29194367" //alessandro
   
})


app.get('/', (req, res)=>{
    res.send('Welcome'+Date.now());
})


app.get('/pagar',async (req,res) =>{
    //Pagamentos
    //id // codigo // pagador // status //
// 1 // 123413411234 // emaildopagador@gmail.com // não foi pago
// 2 // 123413411234 // emaildopagador@gmail.com // pago

var id = "" + Date.now();
var emailDoPagador = "victordevtb@gmail.com";

    const dados = {
        items: [
            item = {
                id: id, //UUID ou Date.now()
                title: '1 Beijo do Gordo',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(550)
            }
        ],
        player: {
            email: emailDoPagador
        },
        external_reference: id
    }

try {
    var pagamento = await MercadoPago.preferences.create(dados);
    console.log(pagamento);
    //Banco.SalvarPagamento({id:id, pagador: emailDoPagador});
    return res.redirect(pagamento.body.init_point);
    
} catch (error) {
    console.log(error.message);
}
    
})

app.post("/not",(req,res)=>{
   // console.log(req.query);
   var id = req.query.id;
   
   setTimeout(()=>{
    var filtro = {
        "order.id": id
    }

    MercadoPago.payment.search({
        qs: filtro
    }).then(data =>{
        console.log(data);
    }).catch(err =>{
        console.log(err);
    });
    
   },20000)
    res.send("ok");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}\n
...............................................................................OK\n`));

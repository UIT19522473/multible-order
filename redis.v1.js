const express = require("express");

const app = express();
const { get, decrby, exists, incrby, set, setnx } = require('./model.redis');

app.get('/order', async (req, res) => {
    const time = new Date().getTime();
    res.setHeader('X-Response-Time', `${Date.now() - req.requestTime}ms`);


    const slTonKho = 10;
    const keyName = 'iPhone13';
    const slMua = 1;
    const getKey = await exists(keyName);

    // so luong ban ra, neu chua ban thi set = 0, con neu ban thi update +1 moi lan user order thanh cong
    if (!getKey) {
        await set(keyName, 0);
        // await setnx(keyName, 0);
    }

    //Lay so luong ban ra
    let slBanRa = await get(keyName);
    console.log('Truoc khi user order thanh cong thi so luong ban ra ===', slBanRa);
    // neu so luong ban ra + so luong mua (slMua) > slTonKho return false
    slBanRa = await incrby(keyName, slMua); //atom redis
    // if(+slBanRa + slMua >slTonKho){
    if (slBanRa > slTonKho) {
        console.log('Het Hang');
        return;
    }

    //neu user order thanh cong
    // slBanRa = await incrby(keyName,slMua); //atom redis
    console.log('sau khi user order thanh cong thi so luong ban ra ===', slBanRa);
    if (slBanRa > slTonKho) {
        await set('banquanroi', slBanRa - slTonKho);
    }


    const response = {
        status: 'success',
        msg: 'Ok',
        time
    }
    // Log phản hồi trước khi gửi nó đi
    console.log('Response:', JSON.stringify(response));

    return res.json(response);
});

app.listen(3000, () => {
    console.log(`The server is running at 3000`);
});

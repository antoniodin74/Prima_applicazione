const data = require('../data.json');
const pool = require('../db');

async function getTipo(search) {
    //return data.tipi;
    //const [result,] = await pool.query('SELECT * FROM tipi');
    if(search===''){
        const [result,] = await pool.query('SELECT tipi.id ,tipi.tipo, count(utenti.utente) AS count1  FROM tipi  LEFT JOIN utenti ON tipi.id = utenti.tipo GROUP BY tipi.id') ;
        return result; 
    }else if(typeof search==='undefined'){
        const [result,] = await pool.query('SELECT tipi.id ,tipi.tipo, count(utenti.utente) AS count1  FROM tipi  LEFT JOIN utenti ON tipi.id = utenti.tipo GROUP BY tipi.id') ;
        return result; 
    }else{
        const [result,] = await pool.query('SELECT tipi.id ,tipi.tipo, count(utenti.utente) AS count1  FROM tipi  LEFT JOIN utenti ON tipi.id = utenti.tipo WHERE tipi.tipo=? GROUP BY tipi.id' , [search]) ;
        return result;
    }
    
}

async function getTipobyId( id) {
    //return data.tipi.find((tipo) => tipo.id === +id)
    const [result,] = await pool.query('SELECT * FROM tipi where id=?', [id]);
    return result[0];
}

async function deleteTipo( id) {
    /* const idx = data.tipi.findIndex(tipo => tipo.id == id);
    if(idx> -1) {
        const ele = data.tipi.splice(idx, 1);
        return ele;
    }
    return 0; */
    const [result,] = await pool.query('DELETE FROM tipi where id=?', [id]);
    return result;
}

async function addTipo(tipo){
    /* const newTipo = {tipo, id:data.tipi.length + 1};
    data.tipi.unshift(newTipo);
    return newTipo; */
    const created_at = new Date();
    const [result,] = await pool.query('INSERT INTO tipi (tipo,created_at) values (?,?)',[tipo, created_at]);

    return {id: result.insertId, tipo, created_at};
}

async function updateTipo(id, tipo) {
    //const idx = data.tipi.findIndex(tipo => tipo.id == id);
    //const oldTipo = getTipobyId(id);
    /* if(idx !== -1){
        data.tipi[idx] = {...data.tipi[idx], tipo};
        return data.tipi[idx];
    } */
    const updated_at = new Date();
    const [result,] = await pool.query('UPDATE tipi SET tipo=?,updated_at=? where id=?', [tipo, updated_at, +id]);
    return {id, tipo, updated_at};
}

module.exports = {
    getTipo,
    getTipobyId,
    deleteTipo,
    addTipo,
    updateTipo
};
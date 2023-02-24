const pool = require('../db');
const bc = require('bcrypt');

async function addUser({name, email, password}){
    /* const newUser = {utente, nome, tipo, attivato};
    data.utenti.unshift(newUser);
    return newUser; */
    const pwd = bc.hashSync(password, 12);
    const created_at = new Date();
    const [result,] = await pool.query('INSERT INTO utenti (utente,nome,email,tipo,password,created_at) values (?,?,?,?,?,?)',[name,name,email,'1',pwd, created_at]);
    //const recordIns = await(getUserbyId(result.insertId))
    //return recordIns;
    return {id: result.insertId, name, email};
};

async function login({email, password}){
    const psw = bc.hashSync(password, 12);
    const [result,] =  await pool.query('SELECT * FROM utenti where email=?', [email]);
    if(!result[0]){
        throw new Error ('utente non trovato');
    } else if(!bc.compareSync(password,result[0].password)) {
        throw new Error ('password errata!!!');
    }
    return result[0];
}

module.exports = {
    addUser,
    login
};
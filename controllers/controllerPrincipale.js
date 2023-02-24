const data = require('../data.json');
const pool = require('../db');

async function getUser() {
    //return data.utenti;
    const [result,] = await pool.query('SELECT * FROM utenti');
    return result;
}

async function getUserbyId( id) {
    //return data.utenti.find((utente) => utente.id === +id)
    const [result,] = await pool.query('SELECT * FROM utenti where id=?', [id]);
    return result[0];
}

async function getTipoPrincipale(tipo_id) {
    //return data.utenti.find((utente) => utente.id === +id)
    const [result,] = await pool.query('SELECT * FROM utenti where tipo=?', [tipo_id]);
    return result;
}

async function getTipoPrincipaleCount(tipo_id) {
    //return data.utenti.find((utente) => utente.id === +id)
    const [resultCount,] = await pool.query('SELECT COUNT(*) FROM utenti where tipo=?', [tipo_id]);
    console.log(resultCount);
    return result;
}

async function deleteUser( id) {
    /* const idx = data.utenti.findIndex(utente => utente.id == id);
    if(idx> -1) {
        const ele = data.utenti.splice(idx, 1);
        return ele;
    }
    return 0; */
    const [result,] = await pool.query('DELETE FROM utenti where id=?', [id]);
    return result;
}

async function addUser({utente, nome, tipo, email, password}){
    /* const newUser = {utente, nome, tipo, attivato};
    data.utenti.unshift(newUser);
    return newUser; */
    const created_at = new Date();
    const [result,] = await pool.query('INSERT INTO utenti (utente,nome,tipo,email,password,created_at) values (?,?,?,?,?,?)',[utente,nome,tipo,email,password, created_at]);
    //const recordIns = await(getUserbyId(result.insertId))
    //return recordIns;
    return {id: result.insertId, utente, tipo, email, password, created_at};
}

async function updateUser(id, {utente, nome, tipo, email, password}) {
    /* const idx = data.utenti.findIndex(utente => utente.id == id);
    const oldUser = getUserbyId(id);
    if(idx !== -1){
        data.utenti[idx] = {...data.utenti[idx], ...newUser};
        return data.utenti[idx];
    }
    return false; */
    const updated_at = new Date();
    const [result,] = await pool.query('UPDATE utenti SET utente=?, nome=?, tipo=?, email=?, password=?,updated_at=? where id=?', [utente, nome, tipo, email, password, updated_at, +id]);
    return {id, utente, nome, tipo, email, password, updated_at};
    //return result;
}

module.exports = {
    getUser,
    getUserbyId,
    deleteUser,
    addUser,
    updateUser,
    getTipoPrincipale,
    getTipoPrincipaleCount
};
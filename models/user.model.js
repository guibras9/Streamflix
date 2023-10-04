const conexao = require("./conexao.db");

const User = function (dados) {
  (this.id_utilizador = dados.id_utilizador),
    (this.nome = dados.nome),
    (this.nickname = dados.nickname),
    (this.email = dados.email),
    (this.password = dados.password),
    (this.dta_criacao = dados.dta_criacao),
    (this.dta_atualizacao = dados.dta_atualizacao);
};

User.findById = (id, result) => {
  conexao.query("SELECT * FROM utilizador WHERE id_utilizador = ?", id, (error, res) => {
      if (error == true) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      if (res.length) {
          console.log("Utilizador: ", res[0]);
          result(null, res[0]);
          return;
      }

      result({ result: "não encontrado"}, null);
  })
}

User.getAll = result => {
  conexao.query('SELECT * FROM utilizador', (error, res) => {
      if (error == true) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      console.log("Utilizadores: ", res);
      result(null, res);
  });
};

User.updateById = (id, dados, result) => {
  conexao.query('UPDATE utilizador SET nome=?, nickname=?, email=?, password=? WHERE id_utilizador=?',
      [dados.nome, dados.nickname, dados.email, dados.password, dados.dta_criacao, dados.dta_atualizacao, id], (error, res) => {
          if (error == true) {
              console.log("Ocorreu um erro ", error);
              result(error, null);
              return;
          }

          if (res.affectedRows == 0) {
              result({ result: "não encontrado"}, null);
              return;
          }

          console.log("utilizador atualizado: ", {id: id, ...dados});
          result(null, {id: id, ...dados});
      });
};

User.remove = (id, result) => {
  conexao.query('DELETE FROM utilizador WHERE id_utilizador =?', id, (error, res) => {
      if (error == true) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      if (res.affectedRows == 0) {
          result({ result: "não encontrado"}, null);
          return;
      }

      console.log("Utilizador apagado com o ID", id);
      result(null, res);
  });
};

User.removeAll = result => {
  conexao.query('DELETE FROM utilizador', (error, res) => {
      if (error == true) {
          console.log("Ocorreu um erro ", error);
          result(error, null);
          return;
      }

      console.log("Deleted ${res.affectedRows} utilizador");
      result(null, res);
  });
};

module.exports = User;
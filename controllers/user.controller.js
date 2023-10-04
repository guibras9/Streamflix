var connection = require('../models/conexao.db');
const User = require("../models/user.model");

exports.register = (req, res) => {
  var users = {
    "nome": req.body.nome,
    "nickname": req.body.nickname,
    "email": req.body.email,
    "password": req.body.password
  }
  connection.query('INSERT INTO utilizador SET ?', users, function (error, results) {
    if (error) {
      console.log(error)
    } else {
      res.redirect('/login')
      console.log("Utilizador registado com sucesso! <--" + results)
    }
  });
};


exports.authenticate = (req, res) => {
  const nickname = req.body.nickname;
  const password = req.body.password;

  connection.query('SELECT * FROM utilizador WHERE nickname = ?', [nickname], function (error, results) {
    if (error) {
      console.log(error)
    } else {
      if (results.length > 0) {
        if (password == results[0].password) {
          exports.auth = results;
          res.redirect('/home');

        } else {
          res.render("pages/login", { message: "A password está incorreta!" });
        }

      } else {
        res.render("pages/login", { message: "Este nickname não existe!" });
      }
    }
  });
};

exports.update = (req, res) => {
  if (!req.params) {
    res.status(400).send({ success: false, message: "Conteúdo inexistente." });
  }
  
  User.updateById(req.params.id, new User(req.params), (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message:
            "Utilizador com o ID " +
            req.params.id +
            ", não encontrado. [" +
            error.message +
            "]",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar atualizar os dados do utilizador com o ID " +
            req.params.id +
            ". [" +
            error.message +
            "]",
        });
      }
    } else {
      res.render("pages/user_update", { op: 1, success: true, dados: data });
    }
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(404).send({
          success: false,
          message: "Utilizador com o ID ${req.params.id_utilizador} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados do aluno com o ID ${req.params.id}",
        });
      }
    } else {
      res.redirect("/")
    }

  });
};

exports.findById = (req, res) => {

  User.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.result === "não encontrado") {
        res.status(400).send({
          success: false,
          message: "Utilizador com o ID ${req.params.id} não encontrado.",
        });
      } else {
        res.status(500).send({
          success: false,
          message:
            "Ocorreu um erro ao tentar aceder aos dados do utilizdor com o ID ${req.params.id}",
        });
      }
    } else {
      res.render("pages/user", { op: 3, success: true, dados: data });
    }
  });
};

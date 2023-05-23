const express = require('express');
const app = express();
const cursoRoutes = express.Router();

let Curso = require('../model/Curso');

// api to add curso
cursoRoutes.route('/add').post(function (req, res) {
  let curso = new Curso(req.body);
  curso.save()
  .then(curso => {
    res.status(200).json({'status': 'success','mssg': 'curso added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get cursos
cursoRoutes.route('/').get(function (req, res) {
  Curso.find(function (err, cursos){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','cursos': cursos});
    }
  });
});

// api to get curso
cursoRoutes.route('/curso/:id').get(function (req, res) {
  let id = req.params.id;
  Curso.findById(id, function (err, curso){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','curso': curso});
    }
  });
});

// api to update route
cursoRoutes.route('/update/:id').put(function (req, res) {
    Curso.findById(req.params.id, function(err, curso) {
    if (!curso){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        curso.nome = req.body.nome; 
        curso.duracao = req.body.duracao;
        curso.modalidade = req.body.modalidade;
        curso.requisitos = req.body.requisitos;

        curso.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
}); 

// api for delete
cursoRoutes.route('/delete/:id').delete(function (req, res) {
  Curso.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = cursoRoutes;
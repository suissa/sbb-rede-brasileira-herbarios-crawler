'use strict'

const request = require('request')
const cheerio = require('cheerio')

const BASE_URL = 'http://www.botanica.org.br/rbh-catalogo'
let PAGE = 2
const BASE_URL_PAGE = 'http://www.botanica.org.br/rede_herbarios.php?_pagi_pg='+PAGE

const infos = '.tx_dados_herb'

// Colocar todos os nomes dos atributos que irão para o OBJETO
// em ORDEM e quando não existir ou não quiser o valor
// COLOQUE como ''
const indexData = [
  '',
  'Instituicao',
  'Departamento',
  'Endereco',
  'MunicipioUF'
]

const ClassList = '.tx_dados_herb'
const Fields = [
  {
    name: '',
    value: 'this.children[0].data'
  },
  {
    name: 'Instituicao',
    value: 'this.children[0].data'
  },
  {
    name: 'Departamento',
    value: 'this.children[0].data'
  },
  {
    name: 'Endereco',
    value: 'this.children[0].data'
  },
  {
    name: 'MunicipioUF',
    value: 'this.children[0].data'
  }
]

const crawlerGeneric = (BASE_URL, ClassList) => {

  request(BASE_URL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      let Dados = []
      let obj = {}
      // Aqui pegamos todos os objetos do DOM com essa classe '.tx_dados_herb'
      $(ClassList).each(function(i, element){
        // console.log('i', i)
        // console.log('this.children[0].data', this.children[0].data)
        // O VALOR correto vem em this.children[0].data
        if(i>0 && i<5) {
          obj[Fields[i].name] = eval(Fields[i].value)
          console.log('obj', obj)
        }
        else if(i >= 5) {
          return true
        }
      })
      Dados.push(obj)
      console.log('Dados', Dados)
    }
  });
}

crawlerGeneric(BASE_URL, ClassList)

// i 0
// this 2016-02-12 | 16:23:49 
// i 1
// this UEPB (Universidade Estadual da Para�ba) 
// i 2
// this Biologia
// i 3
// this Centro de Ci�ncias Biol�gicas e da Sa�de, N�351 - Bairro: Universit�rio - CEP:58429-500 
// i 4
// this Campina Grande/PB 
// i 5
// this  
// i 6
// this undefined
// i 7
// this undefined
// i 8
// this 1982
// i 9
// this Jos� Iranildo Miranda de Melo 
// i 10
// this undefined
// i 11
// this  
// i 12
// this undefined
// i 13
// this 2500 
// i 14
// this 01 
// i 15
// this Flora da Para�ba;
// Flora da APA do Cariri, PB; Flora de Puxinan� 
// i 16
// this Jos� Iranildo Miranda de Melo (Boraginaceae)
 
// i 17
// this  
// i 18
// this Sim 
// i 19
// this N�o informado 


// Instituicao:  '.tx_dados_herb' //Fundacao Jardim Botanico de Pocos de Caldas
// Departamento: Departamento Tecnico-cientifico
// Endereco: Rua Paulo de Oliveira, Nº320 - Bairro: Parque Veu das Noivas - CEP:37704-377
// Município/UF: Poços de Caldas/MG
// Telefone: (35)-3715-6054
// Email herbário:  herbarioafr.fjbpc@gmail.com
// Site: http://jardimbotanico.pocosdecaldas.mg.gov.br/
// Fundacaoo: 2013
   
// CuradorName: Eric Arruda Williams
// CuradorEmail curador: ericarrudawilliams@hotmail.com
   
// Acervo: 3700
// NumMateriaisTipo:  0
// Coleoees: Flora do Planalto de Pocos de Caldas e regiao
// Especialistas:  Eric Arruda Williams (Pteridofitas),Sueli Nicolau (Lauraceae), Joao Paulo de Lima Braga (Angiospermas)
   
// Periodico:  Revista Regnellea Scientia
// Informatizando: Sim
// Programa: Excel / Brahms
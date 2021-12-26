// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = "https://swapi.dev/api";

import { play } from "./music.js";
import { converter } from "./roman.js";
import { restartAnimation } from "./restart-animation.js"; // Exe 3

let musicaFilme = {
  audioUrl: "./audio/tema-sw.mp3",
  coverImageUrl: "./imgs/logo.svg",
  title: "Intro",
  artist: "John Williams",
};

play(musicaFilme, document.body);

// Exe 2

let filmes = document.querySelector("#filmes ul");
// Diretrizes em:https://fegemo.github.io/cefet-front-end/classes/js4/#remocao-de-elementos
filmes.innerHTML = "";

const resposta = await fetch(API_ENDPOINT);
const listaUrl = await resposta.json();

let respostaFilmes = await fetch(listaUrl.films);
let listaFilmes = await respostaFilmes.json();

// ordena lista de filmes - Exe 4
listaFilmes.results.sort(funcaoComparadora);

listaFilmes.results.forEach((element) => {
  let valor = converter(element);
  valor = valor.padEnd(3, " ");
  element.episode_id = valor;
  insereFilme(element);
});

// Diretrizes em: https://fegemo.github.io/cefet-front-end/classes/js4/#16
function insereFilme(obj) {
  let elementoFilme = document.createElement("li");
  let texto = `Episode ${obj.episode_id} - ${obj.title}`;
  elementoFilme.innerHTML = texto;

  // Exe 3 ------
  let intro = document.querySelector("pre.introducao");
  elementoFilme.addEventListener("click", function (e) {
    let textoOpening = `Episode ${
      obj.episode_id
    }\n${obj.title.toUpperCase()}\n\n${obj.opening_crawl}\n`;
    intro.innerHTML = textoOpening;
    restartAnimation(intro);
  });
  // End exe3 ------

  filmes.appendChild(elementoFilme);
}

// Diretrizes em https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
function funcaoComparadora(a, b) {
  let result = a.episode_id == b.episode_id ? 0 : a.episode_id < b.episode_id ? -1 : 1;
  return result;
}

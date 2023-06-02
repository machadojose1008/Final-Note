export default function debounce(a,b,c){
  // Executa a função somente se ela ficar uma quiantidade x de tempo sem ser chamada novamente após a primeira chamada
    var d,e;
    return function(){
      function h(){
        d=null;
        c||(e=a.apply(f,g));
      }
      var f=this,g=arguments;
      return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
    }
  }
  
  export function removeHTMLTags (str) {
    // Remove as tags html de um texto
    return str.replace(/<[^>]*>?/gm, '');
  };

  export async function  findNotebookPosition (notebooks, id) {
    // Acha a posição de um notebook pelo id em um array de notebooks
    for (let i = 0; i < notebooks.length; i++) {
      if(notebooks[i].id === id){
        return i;
      }
    }
    return -1;
  }

  export async  function findDeckPosition(decks, id) {
    // Acha a posição de um deck pelo id em um array de decks
    for (let i = 0; i < decks.length; i++) {
      if(decks[i].id === id){
        return i;
      }
    }
    return -1;
  }

  export async function findCardPosition(cards, id) {
     // Acha a posição de um card pelo id em um array de cards
    for (let i = 0; i < cards.length; i++) {
      if(cards[i].id === id){
        return i;
      }
    }
    return -1;
  }
export default function debounce(a,b,c){
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
    return str.replace(/<[^>]*>?/gm, '');
  };

  export function findNotebookPosition(notebooks, id) {
    for (let i = 0; i < notebooks.length; i++) {
      if(notebooks[i].id === id){
        return i;
      }
    }
    return -1;
  }

  export function findDeckPosition(decks, id) {
    for (let i = 0; i < decks.length; i++) {
      if(decks[i].id === id){
        return i;
      }
    }
    return -1;
  }

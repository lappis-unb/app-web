function wordsFill(text) {

    const textoIgual = [
        {igual: '\n', result : ''},    
        {igual: ',', result : ''},
        {igual: '?', result: ''},
        {igual: ':', result: ''},
        {igual: '*', result: ''},
        {igual: ';', result: ''},
        {igual: '!', result: ''},
        {igual: '.', result: ''},    
        {igual: '(', result: ''},
        {igual: ')', result: ''},        
        {igual: '[', result: ''},
        {igual: ']', result: ''},            
    
        {igual: 'ã', result : 'a'},
        {igual: 'õ', result : 'o'},
        {igual: 'é', result : 'e'},
        {igual: 'â', result : 'a'},
        {igual: 'ê', result : 'e'},
        {igual: 'ç', result : 'c'},
        {igual: 'à', result : 'a'},
        {igual: 'á', result : 'a'},
        {igual: 'ú', result : 'u'},
        {igual: 'í', result : 'i'},
    
    
        {igual: ' a ', result : ' '},
        {igual: ' o ', result : ' '},
        {igual: ' e ', result : ' '},
        {igual: ' ao ', result : ' '},
        {igual: ' em ', result : ' '},    
        {igual: ' um ', result : ' '},
        {igual: ' uma ', result : ' '},
        {igual: ' uns ', result : ' '},
        {igual: ' umas ', result : ' '},
        {igual: ' no ', result : ' '},
        {igual: ' na ', result : ' '},
        {igual: ' nos ', result : ' '},
        {igual: ' nas ', result : ' '},    
    
        {igual: ' de ', result : ' '},
        {igual: ' do ', result : ' '},
        {igual: ' da ', result : ' '},
        {igual: ' os ', result : ' '},
        {igual: ' as ', result : ' '},
        {igual: ' aos ', result : ' '},
        {igual: ' dos ', result : ' '},
        {igual: ' das ', result : ' '},    
        {igual: ' com ', result : ' '},
        {igual: ' como ', result : ' '},
        {igual: ' sem ', result : ' '},
        {igual: ' para ', result : ' '},
        {igual: ' que ', result : ' '},        
    
        {igual: ' mesmo ', result : ' '},
        {igual: ' mesma ', result : ' '},        
        {igual: ' mesmos ', result : ' '},
        {igual: ' mesmas ', result : ' '},    
    
        {igual: ' qual ', result : ' '},
        {igual: ' quais ', result : ' '},
        {igual: ' quem ', result : ' '},
        {igual: ' aquilo ', result : ' '},
        {igual: ' aquele ', result : ' '},
        {igual: ' aquela ', result : ' '},
        {igual: ' aqueles ', result : ' '},
        {igual: ' aquelas ', result : ' '},    
        {igual: ' esse ', result : ' '},
        {igual: ' essa ', result : ' '},
        {igual: ' este ', result : ' '},    
        {igual: ' esta ', result : ' '},
        {igual: ' desse ', result : ' '},
        {igual: ' dessa ', result : ' '},        
        {igual: ' deste ', result : ' '},
        {igual: ' desta ', result : ' '},    
        {igual: ' esses ', result : ' '},
        {igual: ' essas ', result : ' '},
        {igual: ' estes ', result : ' '},    
        {igual: ' estas ', result : ' '},
        {igual: ' desses ', result : ' '},
        {igual: ' dessas ', result : ' '},        
        {igual: ' destes ', result : ' '},
        {igual: ' destas ', result : ' '},
    
        {igual: ' venha ', result : ' '},    
        {igual: ' se ', result : ' '},
        {igual: ' entao ', result : ' '},    
        {igual: ' senao ', result : ' '},    
    
        {igual: ' ou ', result : ' '},    
        {igual: ' seu ', result : ' '},
        {igual: ' sua ', result : ' '},    
        {igual: ' seus ', result : ' '},    
        {igual: ' suas ', result : ' '},    
    
        {igual: ' sabe ', result : ' '},    
        {igual: ' tanto ', result : ' '},
        {igual: ' quanto ', result : ' '},
        {igual: ' pois ', result : ' '},    
        {igual: ' sao ', result : ' '},
        {igual: ' visto ', result : ' '},    
        {igual: ' ocasiona ', result : ' '},    
        {igual: ' vem ', result : ' '},    
        {igual: ' demais ', result : ' '},    
        {igual: ' saem ', result : ' '},    
        {igual: ' muito ', result : ' '},    
        {igual: ' pior ', result : ' '},   
        {igual: ' urgencia ', result : ' '},    
        {igual: ' quantidade ', result : ' '},    
        {igual: ' consistente ', result : ' '},           
    
        {igual: ' maioria ', result : ' '},    
        {igual: ' etc ', result : ' '},
        {igual: ' amplia ', result : ' '},
        {igual: ' reduz ', result : ' '},    
        {igual: ' vistas ', result : ' '},
        {igual: ' sendo ', result : ' '},
        {igual: ' venho ', result : ' '},    
        {igual: ' por ', result : ' '},
        {igual: ' tendo ', result : ' '},    
        {igual: ' ter ', result : ' '},    
        {igual: ' vista ', result : ' '},
        {igual: ' reduz ', result : ' '},    
        {igual: ' vistas ', result : ' '},
        {igual: ' sendo ', result : ' '},
        {igual: ' tudo ', result : ' '},
        {igual: ' todos ', result : ' '},
    ];
    
        var text1 = String;
        text1 =  ' '+text;
        text1 = text1.toLowerCase();
    
        let i=0;
        for (i=0; i<textoIgual.length; i++) {
            text1 = text1.replaceAll(textoIgual[i].igual,textoIgual[i].result);
        }
   
        console.log('words text1=',text1, ' text=', text);

        const diacritics = /[u0300-u036f]/g;
        //capitalização e normalização
        text = text.toUpperCase().normalize("NFD").replace(diacritics, "");
    
        console.log('words text1=',text1, ' text=', text);

        //separando e removendo repetidos
        const arr = text1.split(' ').filter((item, pos, self) => self.indexOf(item) === pos);    

        console.log('words text1=',text1, ' text=', text, ' arr=', arr);

        //removendo nulls, undefineds e strings vazias
        return arr.filter(item => (item));
    }

export default wordsFill;    
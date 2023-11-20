import React from "react";
import {Bar} from "react-chartjs-2";
import {Pie, Doughnut, Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

var ppaPropostas = 0;
var ppaVotos = 0;
var juvPropostas = 0;
var juvVotos = 0;

const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Publicação das Propostas',
      },
    },
  };

export const ChartVotos = ({numeros, tipo_grafico}) => {

    console.log('ChartVotos -> numeros=', numeros)

    if (numeros[0]._id === "ppaparticip") {
        ppaPropostas = numeros[0].propostas;  
        ppaVotos = numeros[0].votos;
        } 
    if (numeros[1]._id === "ppaparticip") {
        ppaPropostas = numeros[1].propostas;  
        ppaVotos = numeros[1].votos;
        }         
    if (numeros[0]._id === "confjuv4") {    
        juvPropostas = numeros[0].propostas;  
        juvVotos = numeros[0].votos;  
        }
    if (numeros[1]._id === "confjuv4") {    
        juvPropostas = numeros[1].propostas;  
        juvVotos = numeros[1].votos;  
        }        

    console.log('dados: ', ppaPropostas, ' ', ppaVotos,' ', juvPropostas,' ', juvVotos);

    // var ppaLabel = "PPA Participativo  - Propostas: " + ppaPropostas + "  - Votos: " + ppaVotos; 
    // var juvLabel = "4a Conferência da Juventude  - Propostas: " + juvPropostas + "  - Votos: " + juvVotos;

    var ppaLabel = "PPA Participativo"; 
    var juvLabel = "4a Conferência da Juventude";

    // removeData(ChartJs);
      
    console.log()

    var data1 = {
        labels: [ppaLabel, juvLabel],
        datasets : [
            {
                label: "Votos",
                data: [ ppaVotos, juvVotos],
                backgroundColor: ["#00BFFF", "#B8860B"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                borderColor: "#778899",
                borderWidth: 1,
            },
            {
                label: "Propostas",
                data: [ppaPropostas, juvPropostas],
                backgroundColor: ["#87CEFA", "#DAA520"],              // 8bc34a "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                borderColor: "#778899",
                borderWidth: 1,
            },        
        ]
    }

    if (tipo_grafico === 0) {
        return ( 
            <>
                <div> 
                    <Doughnut data={data1} />
                </div>
            </>
        );
    } 
    if (tipo_grafico === 1) {
        return ( 
            <>
                <div> 
                    <Pie data={data1} />
                </div>
            </>
        );        
    }
    if (tipo_grafico === 2) {
        return ( 
            <>
                <div> 
                    <Bar options={options} data={data1} />
                </div>
            </>
        );        
    }
    if (tipo_grafico === 3) {    
        return ( 
            <>
                <div> 
                    <Line options={options} data={data1} />
                </div>
            </>
        ); 
    }
    if (tipo_grafico === 4) {    
        return ( 
            <>
                <div> 
                    <Line data={data1} />
                </div>
            </>
        );             
    }        
}
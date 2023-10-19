import React from "react";
import {Bar, horizonalBar} from "react-chartjs-2";
import {Pie, Doughnut, Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

const options = {
    indexAxis: 'y',
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
        display: false,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };



export const ChartJsIdade = ({numeros, tipo_grafico}) => {

    console.log('ChartJsIdade -> numeros=', numeros, ' ', tipo_grafico)
  

    var labelsDados = [];
    var dadosPopulacao = [];
    var dadosVotantes = [];
    numeros.map((numero) => { 
        labelsDados.push(numero.tipo_detalhe);
        dadosPopulacao.push(numero.pop_perc); 
        dadosVotantes.push(numero.vot_perc); 
    })

    var data1 = {
        labels: labelsDados,
        datasets : [
            {
                label: "População",
                data: dadosPopulacao,
                backgroundColor: ["#87CEFA", "#00CED1", "#3CB371", "#8bc34a", "#DAA520", "#CD853F", "#FFDEAD", "#EE82EE", "#FF69B4", "#FF8C00"],
                //backgroundColor: ["#fe4100", "#22dcd4", "#f3850b", "#c1b53d", "#9600fe", "#005bfe"],
                borderColor: "#778899",
                borderWidth: 1,
            },
            {
                label: "Votantes",
                data: dadosVotantes,
                backgroundColor: ["#1E90FF", "#87CEFA", "#90EE90", "#8bc34a", "#B8860B", "#D2691E", "#DEB887", "#DA70D6", "#DB7093", "#FFD700"],
                borderColor: "#778899",
                borderWidth: 1,
            },        
        ]
    }

    const config = {
        // type: 'bar',
        // data1,
        options: {
          indexAxis: 'y',
        }
      };

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
                    <Bar data={data1} />
                </div>
            </>
        );        
    }
    if (tipo_grafico === 3) {    
        return ( 
            <>
                <div> 
                    <Bar options={options} data={data1} />
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
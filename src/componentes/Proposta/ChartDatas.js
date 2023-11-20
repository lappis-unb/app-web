import React from "react";
import {Bar} from "react-chartjs-2";
import {Pie, Doughnut, Line} from "react-chartjs-2";
//import {Chart as ChartJS} from "chart.js/auto";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

export const ChartDatas = ({numeros, tipo_grafico}) => {

    console.log('ChartJsRenda -> numeros=', numeros)

    // var labelGeral = 'Data da Publicação';

    var labelsDados = []; 
    var dadosPopulacao = [];
    //var dadosVotantes = []; 

    numeros.map((numero) => {
        labelsDados.push(numero._id);
        dadosPopulacao.push(numero.propostas);
        //dadosVotantes.push(numero.votos);
    })

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

      const optionsHoriz = {
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
            display: true,
            text: 'Publicação das Propostas',
          },
        },
      };
    

    var data1 = {
        labels: labelsDados,
        datasets : [
            {
                label: 'Propostas',
                data: dadosPopulacao,
            //    color: "#000",
                backgroundColor: ["#00BFFF"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                borderWidth: 3,
            }
            //,
            // {
            //     label: "Votos",
            //     data: dadosVotantes,
            //     backgroundColor: ["#f44336"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
            //     borderWidth: 1,
            // },        
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
                    <Bar options={optionsHoriz} data={data1} />
                </div>
            </>
        );     
    }
    if (tipo_grafico === 4) {    
        return ( 
            <>
                <div> 
                    <Line options={options} data={data1} />
                </div>
            </>
        );     
    }    
}

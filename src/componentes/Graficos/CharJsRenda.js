import React from "react";
import {Bar} from "react-chartjs-2";
import {Pie, Doughnut, Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

export const ChartJsRenda = ({numeros, tipo_grafico}) => {

    console.log('ChartJsRenda -> numeros=', numeros[0])

    var labelsDados = [];
    var dadosPopulacao = [];
    var dadosVotantes = [];
    numeros.map((numero) => { 
        labelsDados.push(numero.regiao);
        dadosPopulacao.push(numero.pop_perc); 
        dadosVotantes.push(numero.vot_perc); 
    })

    var data1 = {
        labels: labelsDados,
        datasets : [
            {
                label: "População",
                data: dadosPopulacao,
                backgroundColor: ["#03a9f4"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
             //   borderColor: "#fff",
                borderWidth: 1,
            },
            {
                label: "Votantes",
                data: dadosVotantes,
                backgroundColor: ["#f44336"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                // borderColor: "#000",
                borderWidth: 1,
            },        
        ]
    }

    // {
    //     let ii=0;
    //     ChartJS.data.datasets.forEach(dataset => {
    //         dataset.data = [ numeros[ii].pop_perc, numeros[ii].vot_perc ];
    //         ii++;
    //         });
    //     ChartJS.update();
    // }    

    // return ( 
    //     <>
    //         <div> 
    //             <Bar data={data1} />
    //         </div>
    //     </>
    // );

    if (tipo_grafico === 0) {
        var elemento = "<Doughnut data={data1} />"
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
                    <Bar data={data1} />
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
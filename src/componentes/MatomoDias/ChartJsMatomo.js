import React from "react";
import {Bar} from "react-chartjs-2";
import {Pie, Doughnut, Line} from "react-chartjs-2";

export const ChartJsMatomo = ({numeros, tipo_grafico, labelsDados, dadosPopulacao, dadosVotantes}) => {

    console.log(labelsDados);
    console.log(dadosPopulacao);
    console.log(dadosVotantes);

    var data1 = {
        labels: labelsDados,
        datasets : [
            {
                label: 'Visitantes',
                data: dadosPopulacao,
                color: "#000",
                backgroundColor: ["#03a9f4"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                borderWidth: 3,
            },
            {
                label: "Visitantes Únicos",
                data: dadosVotantes,
                backgroundColor: ["#f44336"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
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

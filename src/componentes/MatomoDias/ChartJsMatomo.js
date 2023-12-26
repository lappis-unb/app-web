import React from "react";
import {Bar} from "react-chartjs-2";
import {Pie, Doughnut, Line} from "react-chartjs-2";

export const ChartJsMatomo = ({numeros, tipo_grafico, labelsDados, dadosPopulacao, dadosVotantes}) => {

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
                //backgroundColor: ["#03a9f4"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                backgroundColor: ["#87CEFA", "#00CED1", "#3CB371", "#8bc34a", "#DAA520", "#CD853F", "#FFDEAD", "#EE82EE", "#FF69B4", "#FF8C00"],
                borderWidth: 3,
            },
            {
                label: "Visitantes Únicos",
                data: dadosVotantes,
                //backgroundColor: ["#f44336"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                backgroundColor: ["#1E90FF", "#87CEFA", "#90EE90", "#8bc34a", "#B8860B", "#D2691E", "#DEB887", "#DA70D6", "#DB7093", "#FFD700"],
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
    // if (tipo_grafico === 3) {    
    //     return ( 
    //         <>
    //             <div> 
    //                 <Bar data={data1} />
    //             </div>
    //         </>
    //     );     
    // }
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

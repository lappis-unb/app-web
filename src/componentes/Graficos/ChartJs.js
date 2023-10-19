import React from "react";
import {Bar} from "react-chartjs-2";
import {Pie, Doughnut, Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

var dataMascPop = 0;
var dataMascVot = 0;
var dataFemPop = 0;
var dataFemVot = 0;

// const data = {
//     labels: ["Masculino", "Feminino"],
//     datasets : [
//         {
//             label: "População",
//             data: [48.86, 51.14],
//             backgroundColor: ["#EE82EE", "#f44336"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
//             borderColor: "#fff",
//             borderWidth: 1,
//         },
//         {
//             label: "Votantes",
//             data: [25.26, 74.74],
//             backgroundColor: ["#03a9f4", "#f44336"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
//             borderColor: "#fff",
//             borderWidth: 1,
//         },        
//     ]
// }

export const ChartJs = ({numeros, tipo_grafico}) => {

    console.log('ChartJs -> numeros=', numeros)

    if (numeros[0].tipo_detalhe === "Masculino") {
        dataMascPop = numeros[0].pop_perc;  
        dataMascVot = numeros[0].vot_perc;
        } 
    if (numeros[1].tipo_detalhe === "Masculino") {
        dataMascPop = numeros[1].pop_perc;  
        dataMascVot = numeros[1].vot_perc;
        }         
    if (numeros[0].tipo_detalhe === "Feminino") {    
        dataFemPop = numeros[0].pop_perc;  
        dataFemVot = numeros[0].vot_perc;  
        }
    if (numeros[1].tipo_detalhe === "Feminino") {    
        dataFemPop = numeros[1].pop_perc;  
        dataFemVot = numeros[1].vot_perc;  
        }        

    console.log('dados: ', dataMascPop, ' ', dataMascVot,' ', dataFemPop,' ', dataFemVot);

    // removeData(ChartJs);
      
    console.log()

    var data1 = {
        labels: ["Masculino", "Feminino"],
        datasets : [
            {
                label: "População",
                data: [dataMascPop, dataFemPop],
                backgroundColor: ["#03a9f4", "#EE82EE"],              //  "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
                borderColor: "#778899",
                borderWidth: 1,
            },
            {
                label: "Votantes",
                data: [dataMascVot, dataFemVot],
                backgroundColor: ["#0000CD", "#FF00FF"],              // 8bc34a "#f44336", "#9c27C0", "#03a9f4", "#8bc34a", "#ffc107"],
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
                    <Bar data={data1} />
                </div>
            </>
        );        
    }
    if (tipo_grafico === 3) {    
        return ( 
            <>
                <div> 
                    <Line data={data1} />
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
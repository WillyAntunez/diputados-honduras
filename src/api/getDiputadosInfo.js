import axios from 'axios'

const getDiputadosInfo = async () => {
    let todosLosDiputados = []

    const partidosPoliticos = {
        1: "PARTIDO LIBERAL",
        2: "PARTIDO NACIONAL",
        3: "PARTIDO INNOVACION Y UNIDAD SOCIAL DEMÓCRATA",
        4: "PARTIDO DEMOCRATA CRISTIANO",
        5: "PARTIDO UNIFICACION DEMOCRÁTICA",
        6: "PARTIDO ANTICORRUPCIÓN",
        7: "PARTIDO LIBRE",
        8: "PARTIDO ALIANZA PATRIÓTICA",
        9: "PARTIDO FRENTE AMPLIO",
        10: "PARTIDO VA MOVIMIENTO SOLIDARIO",
        11: "PARTIDO NUEVA RUTA",
        12: "PARTIDO SALVADOR DE HONDURAS",
        13: "PARTIDO LIBERACION DEMOCRATICA DE HONDURAS",
        14: "PARTIDO TODOS SOMOS HONDURAS",
    }

    let idsDepartamentos = {
        1: 'ATLANTIDA', 
        2: 'COLON', 
        3: 'COMAYAGUA', 
        4: 'COPAN', 
        5: 'CORTES', 
        6: 'CHOLUTECA', 
        7: 'EL PARAISO', 
        8: 'FRANCISCO MORAZAN', 
        9: 'GRACIAS A DIOS', 
        10: 'INTIBUCA', 
        11: 'ISLAS DE LA BAHIA', 
        12: 'LA PAZ', 
        13: 'LEMPIRA', 
        14: 'OCOTEPEQUE', 
        15: 'OLANCHO', 
        16: 'SANTA BARBARA', 
        17: 'VALLE', 
        18: 'YORO'
    }

    try{
        for (let i = 1; i <= 18; i++) {
            const res = await axios.get(`https://resultadosgenerales2021.cne.hn/resultados/HN/${i}/DIP.json`)
            const data = await res.data;
            let diputados = [...data.resultados]

            diputados = diputados.map((diputado)=> {
                return {
                    nombre: diputado.descripcion_candidatura,
                    votos: diputado.cant_votos,
                    partido: partidosPoliticos[Math.trunc(diputado.id_candidatura)],
                    departamento: idsDepartamentos[i]
                }
             })

            todosLosDiputados.push(...diputados);
        }    
    }catch(e){
        console.error(e);
    }

    todosLosDiputados.sort((a, b) => {
        return a.votos - b.votos
    }).reverse()

    // Diputados ganadores por partido politico y departamento
    const diputadosPorPartido = {
        "PARTIDO LIBERAL": 0,
        "PARTIDO NACIONAL": 0,
        "PARTIDO INNOVACION Y UNIDAD SOCIAL DEMÓCRATA": 0,
        "PARTIDO DEMOCRATA CRISTIANO": 0,
        "PARTIDO UNIFICACION DEMOCRÁTICA": 0,
        "PARTIDO ANTICORRUPCIÓN": 0,
        "PARTIDO LIBRE": 0,
        "PARTIDO ALIANZA PATRIÓTICA": 0,
        "PARTIDO FRENTE AMPLIO": 0,
        "PARTIDO VA MOVIMIENTO SOLIDARIO": 0,
        "PARTIDO NUEVA RUTA": 0,
        "PARTIDO SALVADOR DE HONDURAS": 0,
        "PARTIDO LIBERACION DEMOCRATICA DE HONDURAS": 0,
        "PARTIDO TODOS SOMOS HONDURAS": 0,
    }

    let diputadosPorDepartamento = {
        'ATLANTIDA': 0, 
        'COLON': 0, 
        'COMAYAGUA': 0, 
        'COPAN': 0, 
        'CORTES': 0, 
        'CHOLUTECA': 0, 
        'EL PARAISO': 0, 
        'FRANCISCO MORAZAN': 0, 
        'GRACIAS A DIOS': 0, 
        'INTIBUCA': 0, 
        'ISLAS DE LA BAHIA': 0, 
        'LA PAZ': 0, 
        'LEMPIRA': 0, 
        'OCOTEPEQUE': 0, 
        'OLANCHO': 0, 
        'SANTA BARBARA': 0, 
        'VALLE': 0, 
        'YORO': 0
    }

    for (let i = 0; i <= 127; i++) {
        diputadosPorPartido[todosLosDiputados[i].partido]++,
        diputadosPorDepartamento[todosLosDiputados[i].departamento]++
    }

    let diputadosPorPartidoArray = [];
    let diputadosPorDepartamentoArray = [];

    for (const partido in diputadosPorPartido) {
        if(diputadosPorPartido[partido]>0){
            diputadosPorPartidoArray.push({
                partido,
                votos: diputadosPorPartido[partido]
            })
        }
    }

    for (const departamento in diputadosPorDepartamento) {
        if(diputadosPorDepartamento[departamento]>0){
            diputadosPorDepartamentoArray.push({
                departamento,
                votos: diputadosPorDepartamento[departamento]
            })
        }
    }

    return {
        diputadosOrdenados: [
            ...todosLosDiputados,
        ]
        ,
        diputadosPorPartido: diputadosPorPartidoArray,
        diputadosPorDepartamento: diputadosPorDepartamentoArray
    }
}

export default getDiputadosInfo
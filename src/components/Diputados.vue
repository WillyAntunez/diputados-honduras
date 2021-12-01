<template>
    <div class="diputados-container">

        <div class="mensaje">
            <p class="mensaje-texto">
                Se recomienda recargar la página (con CTRL + F5) constantemente para obtener la información más actual
            </p>
        </div>

        <div class="tablas-container" v-if="loaded">
            <div class="diputados-header">
                <h2>Diputados ganadores (hasta el momento) por departamento:</h2>
            </div>
            <div class="tabla-y-boton mb-5" >
                <b-table striped hover :items="diputadosPorDepartamento" class="diputados-tabla"></b-table>
            </div>

            <div class="diputados-header">
                <h2>Diputados ganadores (hasta el momento) por partido político:</h2>
            </div>
            <div class="tabla-y-boton mb-5" >
                <b-table striped hover :items="diputadosPorPartido" class="diputados-tabla"></b-table>
            </div>

            <div class="diputados-header">
                <h2>Todos los diputados ordenados por votos:</h2>
            </div>
            <div class="tabla-y-boton" >
                <b-table striped hover :items="diputadosTabla" class="diputados-tabla"></b-table>
                <b-button variant="primary" @click="mostrarMasDiputados">Ver mas</b-button>
            </div>
        </div>
        <div class="loader-container" v-if="!loaded">
            <img src="../assets/spinner.gif">
            <h4>Cargando...</h4>
        </div>
    </div>
</template>

<script>
    import getDiputadosInfo from '../api/getDiputadosInfo.js'    

    export default {
        created: async function ()  {
            let diputadosInfo = await getDiputadosInfo();
            this.todosLosDiputados = await diputadosInfo.diputadosOrdenados;
            this.diputadosPorPartido = await diputadosInfo.diputadosPorPartido;
            this.diputadosPorDepartamento = await diputadosInfo.diputadosPorDepartamento;
            this.loaded = true;
        },
        name: 'Diputados',
        data() {
            return {
                todosLosDiputados: [],
                diputadosPorPartido: [],
                diputadosPorDepartamento: [],
                diputadosMostrados: 128,
                loaded: false,
            }
        },
        methods:{
            mostrarMasDiputados(){
                this.diputadosMostrados = this.diputadosMostrados + 20;
            }
        },
        computed: {
            diputadosTabla () {
                let diputados = []
                for(let i = 0; i < this.diputadosMostrados; i++){
                    diputados.push( {No: i + 1,...this.todosLosDiputados[i]}); 
                }
                return diputados
            }
        },
    }

</script>

<style>
    .diputados-container{
        width: 95%;
        max-width: 1080px;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 50px;
    }

    .diputados-header{
        display: flex;
        justify-content: center;
    }
    .diputados-header h2 {
        font-size: 23px;
        text-align: center;
    }

    .tablas-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .tabla-y-boton {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .diputados-tabla {
        width: 100%;
        background-color: white;
    }
    
    .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .loader-container h4 {
        color: gray;
    }

    .loader-container img{
        width: 100px
    }

    .mensaje{
        display: flex;
        align-items: center;
        width: 100%;
    }
    .mensaje-texto{
        text-align: center;
        width: 100%;
        color: red;
    }
</style>
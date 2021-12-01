<template>
    <div class="header">
        <h1>Diputados 2021 Honduras: </h1>
        <p>Sitio web creado por 
            <a href="https://www.facebook.com/WillyAntunezG"  target="_blank" class="header-link">Willy Antunez</a> 
            con la info de la 
            <a class="header-link" href="https://www.cne.hn"  target="_blank"> API del Consejo Nacional Electoral </a>
        </p>
    </div>
</template>


<script>

export default {
    name: 'Header'
}

</script>

<style>
    .header {
        display: flex;
        justify-content: center;
        align-items: center;  
        flex-direction: column;
        width: 100%;
        background-color: #056da4;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    
    .header h1 {
        margin: 0;
        padding: 0;
        color: white;
        font-size: 30px;
        text-align: center;
    }

    .header-link {
        color: white;
        font-weight: bold;
    }

    .header-link:hover {
        color: white;
    }

    .header p {
        margin: 0;
        padding: 0;
        margin-top: 5px;
        color: white;
    }

</style>
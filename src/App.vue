<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
    
    };
  },
  data(){
    return{

    }
  },
  methods:{
    
  },
  mounted() {
   

    this.$nextTick(() => {
    
    });
  }
}
</script>

<style>
     
.mouse-cover-canvas {
    background: rgb(255, 255, 255);
      left: 730px!important;
      top: 180px!important;
    }

.mouse-cover{
  /* width: 75px!important;
  height: 75px!important; */
}
span,h1,h2,h3,h4,h5,h6,a{
  font-family: system,-apple-system,BlinkMacSystemFont,'Segoe UI','Segoe WP',Roboto,Ubuntu,Oxygen,Cantarell,'Fira Sans','Helvetica Neue',Helvetica,'Lucida Grande','Droid Sans',Tahoma,'Microsoft Sans Serif',sans-serif;
}
</style>

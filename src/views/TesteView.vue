<script setup>
import { mapActions, storeToRefs } from 'pinia';
import { useMainStore } from '../stores/auth';

// const counterStore = useCounterStore();
const main = useMainStore();
const {counter} = storeToRefs(main);
const {increment} = mapActions(useMainStore,["increment"]);

</script>  

<template>
    <div id="dados">
      <p>Contador: {{ counter }}</p>
      <!-- <p>Contador dobrado: {{ doubleCount }}</p> -->
      <button @click="increment">Incrementar</button>
    </div>
</template>

<style setup>
#dados{
    margin-left: 500px;
}
</style>
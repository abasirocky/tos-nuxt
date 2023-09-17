<template>

  <v-layout class="" >
    <v-app-bar
      color="blue-lighten-1"
      class="px-2"
    >


      <div class="flex gap-2">
        <v-app-bar-title>
          Berth Monitoring
        </v-app-bar-title>
        <v-divider class="h-full" vertical :thickness="2"></v-divider>
          Port Bandar Abbas
      </div>

      <v-spacer></v-spacer>


      <div class="flex gap-2">

        <v-btn class="flex items-center justify-center" :variant="'outlined'" >
          <v-icon>mdi-refresh</v-icon>
          Refresh
        </v-btn>

        <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color=""
          variant="outlined"
          v-bind="props"
        >
        <v-icon>mdi-menu</v-icon>
          Current Plan
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in plans"
          :key="index"
        >
          <v-list-item-title>
            <v-btn class="w-full" variant="flat">
                {{ item.title }}
            </v-btn>
        </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>



        <v-btn class="flex items-center justify-center" :variant="'outlined'" >
          <v-icon>mdi-filter</v-icon>
          Filter
        </v-btn>
        
        <v-btn class="flex items-center justify-center" :variant="'outlined'" >
          <v-icon>mdi-content-save</v-icon>
          Save
        </v-btn>
        

      </div>
    </v-app-bar>

    <v-main class="p-0 w-100vh">
      <v-container fluid  class="p-0 ">
        <v-row>
          
          
        </v-row>
      </v-container>
    </v-main>
  </v-layout>



    
    
</template>
  
<script setup>

const plans = ref([
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ])

</script>
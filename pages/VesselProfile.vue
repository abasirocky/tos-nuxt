<script>
  console.log('hi', process.env.BASE_URL);
</script>

<template>
    <v-layout class="" >
      <v-app-bar
        color="blue-lighten-1"
        class="px-2"
      >


        <div class="flex gap-2">
          <v-app-bar-title>
            Vessel Profile
          </v-app-bar-title>
          <v-divider class="h-full" vertical :thickness="2"></v-divider>
            profile number 13
        </div>

        <v-spacer></v-spacer>


        <div class="flex gap-2">
          <v-btn :variant="'outlined'" >
            <v-icon>mdi-refresh</v-icon>
            Refresh
          </v-btn>
          
          <v-btn :variant="'outlined'" >
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
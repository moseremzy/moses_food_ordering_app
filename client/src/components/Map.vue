<template>
  <div class="map-container">
    <p class="map-title" v-if = "map_result">Distance Between Kelvins Spice And Your Location</p>
    <p class="map-title" v-if = "!map_result">Could not find your location on the map</p>
    <p v-if = "map_result" class = "info">Distance - {{distance}}</p>
    <p v-if = "map_result" class = "info">Time - {{time}}</p>
    <div id="myMap" class="map" v-if = "map_result"></div>
  </div>
</template>

<script setup>

import { onMounted, onUnmounted, toRefs, onUpdated, reactive, toRaw, ref, watch} from 'vue'

import { useUserStore } from '@/stores/user'

const user_store = useUserStore()

let map_result = ref(true)

const props = defineProps({

  address: String

})

const { address } = toRefs(props)

let distance = ref("")

let time = ref("")

watch(address, (new_address) => {
  
    loadMapScenario(new_address)

})

 onMounted(() => {

      loadMapScenario(user_store.user.delivery_address);
  // 100ms delay to ensure DOM is fully ready
 
 })

 onUnmounted(() => {

       loadMapScenario(user_store.user.delivery_address);

 })


   function loadMapScenario(address) {
    
    const map = new Microsoft.Maps.Map('#myMap', {
    
        credentials: 'Aon6ZUUl4fgRxkis_2tYKgm4ySvGvj03mCdv6NeUtYw1TcNtCVtJ1eqgjNvK0EjT',
    
   });


    Microsoft.Maps.loadModule("Microsoft.Maps.Directions", () => {

        const directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

        // Add start and end waypoints
        directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ address: 'Kelvin’s Spice Eatery, Alagbole Rd, Ojodu, Alagbole 112107, Ogun State' }));
        directionsManager.addWaypoint(new Microsoft.Maps.Directions.Waypoint({ address: `${address}` }));


        Microsoft.Maps.Events.addHandler(directionsManager, "directionsUpdated", function (e) {

          time.value = convertTime(e.routeSummary[0].time)

          distance.value = formatDistance(e.routeSummary[0].distance)
        
          map_result.value = true
        
        })


        // Handle error if directions can't be calculated
        Microsoft.Maps.Events.addHandler(directionsManager, "directionsError", function (e) {
           
           map_result.value = false
       
       });

        directionsManager.calculateDirections()

    })

}


// Function to convert time from seconds to a readable format (hours and minutes)
function convertTime(seconds) {

    var hours = Math.floor(seconds / 3600); // Calculate hours

    var minutes = Math.floor((seconds % 3600) / 60); // Calculate minutes

    var secondsLeft = seconds % 60; // Remaining seconds

    var timeString = "";

    if (hours > 0) {
        timeString += hours + " hour" + (hours > 1 ? "s" : "") + " ";
    }
    if (minutes > 0) {
        timeString += minutes + " minute" + (minutes > 1 ? "s" : "") + " ";
    }
    if (secondsLeft > 0 || (hours === 0 && minutes === 0)) {
        timeString += secondsLeft + " second" + (secondsLeft > 1 ? "s" : "");
    }
        return timeString.trim(); // Remove trailing spaces
    }


    // Function to format distance in meters to a human-readable string (kilometers)
    function formatDistance(distanceInMeters) {
      const distanceInKilometers = Math.floor(distanceInMeters); // Convert to kilometers with 2 decimal places
      return `${distanceInKilometers} km`;
    }



</script>

<style scoped>
/* Map Section Styling */
.map-container {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  text-align: center;
}

.map-title {
  font-size: 1.3rem;
  color: #444;
  font-weight: bold;
  margin-bottom: 4px;
}

.map {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #e9ecef;
}

.info {
  margin: 2px;
}

/* Responsiveness */
@media (max-width: 576px) {
  .modal-body {
    padding: 15px 20px;
  }
  .form-control {
    font-size: 0.9rem;
  }
  .map {
    height: 250px;
  }
}
</style>
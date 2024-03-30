<!-- src/routes/__error.svelte or src/routes/+error.svelte -->
<script>
  export let error;
  export let status;
</script>

<section class="relative py-24 md:py-44 lg:py-64 bg-white">
  <div class="relative z-10 container px-4 mx-auto">
    <div class="max-w-4xl mx-auto text-center">
      <span class="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium rounded-full shadow-sm">{error} Error 404</span>
      <h1 class="mb-4 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
        {status} Kunde inte hitta sidan
      </h1>
      <p class="mb-12 text-lg md:text-xl text-coolGray-500">Det blev knasigt men det är inte ditt fel. Vi jobbar (nog) på det!</p>
      <div class="flex flex-wrap justify-center">
        <div class="w-full md:w-auto py-1 md:py-0 md:mr-6"><a class="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-green-500 rounded-md shadow-sm" href="/">
          Till Startsidan
        </a>
        </div>
        <div class="w-full md:w-auto py-1 md:py-0">
          <a class="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm" 
          href="/" 
          on:click={() => location.reload()}>
            Försök igen
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
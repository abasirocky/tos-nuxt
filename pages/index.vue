<template>
  <main>
    <div class="py-0 navbar bg-base-200">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <div class="flex items-center justify-center divide-x">
          <div class="p-4 text-xl normal-case">Berth Chart</div>
          <div class="p-4 text-gray-400 normamdl-case">Port Name</div>
        </div>
      </div>

      <div class="navbar-end">

        <a class="text-white btn btn-sm bg-sky-400">
          <IconsRefreshIcon />
          Refresh
        </a>


        <div class="text-white dropdown">
          <label tabindex="0" class="m-1 text-white btn btn-sm bg-sky-400">
            <IconsMenuIcon /> Current Plan
          </label>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-sky-400 rounded-box w-52">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
          </ul>
        </div>



        <a class="text-white btn btn-sm bg-sky-400">
          <IconsFilterIcon />
          Filter
        </a>

        <a class="text-white btn btn-sm bg-sky-400">
          <IconsSaveIcon />

          Save
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>

</script>
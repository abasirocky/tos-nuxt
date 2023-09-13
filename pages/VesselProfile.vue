<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { getVesselProfile } from '@/api/vesselProfile.api'

const { data, suspense } = useQuery({ queryKey: ['test'], queryFn: getVesselProfile })


</script>

<template>
  <header>
    <div class="py-0 navbar min-h-[3rem] bg-base-100 border-y-2">
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
          <div class="px-3 py-0 text-xl normal-case">Vessel Profile</div>
          <div class="px-3 py-0 text-gray-400 normamdl-case">vessel name</div>
        </div>
      </div>

      <div class="gap-1 navbar-end">

        <a class="text-white btn btn-info btn-sm bg-sky-400">
          <IconsRefreshIcon />
          Refresh
        </a>



        <a class="text-white btn btn-info btn-sm bg-sky-400">
          <IconsSaveIcon />

          Save
        </a>
      </div>
    </div>
  </header>

  <main>


    <!-- start baynumbering -->
    <div class="px-16 py-4"
      style="margin-top: 8px;">
      <div class="form-control">
        <div class="w-60">
          <label for="fore" class="cursor-pointer label ">
            <input min="0" id="fore" type="checkbox" class="checkbox checkbox-info" name="hasBayFore" />
            <span class="label-text">Fore</span>

          </label>
          <input type="number" placeholder="Type here" class="w-full max-w-xs input input-bordered input-info" />
        </div>
      </div>

      <div class="form-control">
        <div class="w-60">
          <label for="40foot" class="cursor-pointer label ">
            <input min="0" id="40foot" type="checkbox" class="checkbox checkbox-info" name="hasBayFore" />
            <span class="label-text">40Foot</span>

          </label>
          <input type="number" placeholder="Type here" class="w-full max-w-xs input input-bordered input-info" />
        </div>
      </div>


      <div class="form-control">
        <div class="w-60">
          <label for="after" class="cursor-pointer label ">
            <input min="0" id="after" type="checkbox" class="checkbox checkbox-info" name="hasBayFore" />
            <span class="label-text">After</span>
          </label>
          <input type="number" placeholder="Type here" class="w-full max-w-xs input input-bordered input-info" />
        </div>
      </div>
    </div>
    <!-- end baynumbering -->

    <BayFull/>




  </main>
</template>

<style module></style>

<template>
    <div class="flex flex-col min-h-screen font-body">
        <Navbar class="selection:bg-lg selection:text-text-dark"/>
        <div class="grow bg-lg text-text-dark text-xl selection:bg-dg selection:text-white">
            <NuxtPage />
        </div>
        <!--second div prevents double contact info on projects-->
        <ContactInfo class="bg-dg text-text-light text-xl selection:bg-lg selection:text-text-dark"/>
    </div>
</template>

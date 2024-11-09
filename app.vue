<template>
    <div class="selection:bg-dg selection:text-white accent-mg">
        <div class="overscroll-none bg-lg text-text-dark font-body">
            <Navbar />
            <NuxtPage />
        </div>
        <!--second div prevents double contact info on projects-->
        <div class="overscroll-none bg-lg text-text-dark font-body">
            <ContactInfo />
        </div>
    </div>
</template>

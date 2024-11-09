<template>
    <div class="overscroll-none bg-lg text-text-dark font-body selection:bg-lg selection:text-text-dark">
        <Navbar />
    </div>
    <body class="overscroll-none bg-lg text-text-dark text-xl font-body selection:bg-dg selection:text-white">
        <NuxtPage />
    </body>
    <!--second div prevents double contact info on projects-->
    <div class="overscroll-none bg-dg text-text-light font-body selection:bg-lg selection:text-text-dark">
        <ContactInfo />
    </div>
</template>

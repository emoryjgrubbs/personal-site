<template class="selection:bg-dg selection:text-white accent-mg">
    <div class="overscroll-none bg-lg text-text-dark font-body">
        <Navbar />
    </div>
    <body class="overscroll-none bg-lg text-text-dark text-xl font-body selection:bg-dg selection:text-white accent-mg">
        <NuxtPage />
    </body>
    <!--second div prevents double contact info on projects-->
    <div class="overscroll-none bg-dg text-text-light font-body">
        <ContactInfo />
    </div>
</template>

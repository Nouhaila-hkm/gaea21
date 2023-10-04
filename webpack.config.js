var Encore = require("@symfony/webpack-encore");

// It"s useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath("public/build/")
    // compiled images
    .copyFiles({
        from: "./assets/images",
        // optional target path, relative to the output dir
        to: "images/[path][name].[ext]",

        // if versioning is enabled, add the file hash too
        //to: "images/[path][name].[hash:8].[ext]",

        // only copy files matching this pattern
        //pattern: /\.(png|jpg|jpeg)$/
    })

    // public path used by the web server to access the output path
    .setPublicPath("/build")
    .enableReactPreset()
    // only needed for CDN"s or sub-directory deploy
    //.setManifestKeyPrefix("build/")

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that"s included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    // Composants liés au créateur de formulaires coté dashboard
    .addEntry("FormList", "./assets/js/formulaire/dashboard/ListForms.jsx")
    .addEntry("FormEdit", "./assets/js/formulaire/dashboard/editor/Form.jsx")
    .addEntry(
        "FormDataList",
        "./assets/js/formulaire/dashboard/data/ListData.jsx"
    )
    // Composant pour générer un formulaire coté client
    .addEntry("FormBuild", "./assets/js/formulaire/build/AppFormBuild.jsx")

    .addEntry("ShowForms", "./assets/js/components/ShowForms.js")
    .addEntry("ShowOneForm", "./assets/js/components/ShowOneForm.js")
    .addEntry("ShowSection", "./assets/js/components/createforms/ShowSection.js")

    .addEntry("form", "./assets/js/user/form.js")
    .addEntry("part", "./assets/js/part.js")
    .addEntry(
        "partenaireFooter",
        "./assets/js/partenaireFormation/partenaireHome.js"
    )
    .addEntry("accordion", "./assets/js/accordion.js")

    .addEntry("newAnnounce", "./assets/js/announce/New.js")
    .addEntry("editAnnounce", "./assets/js/announce/Edit.js")
    .addEntry("registrationForm", "./assets/js/registrationForm.js")
    .addEntry("loginForm", "./assets/js/loginForm.js")
    .addEntry("expansionForm", "./assets/js/expansionForm.js")
    .addEntry("forgotpasswordform", "./assets/js/forgotpasswordform.js")
    .addEntry("updateAccountForm", "./assets/js/updateAccountForm.js")
    .addEntry("updatePasswordForm", "./assets/js/updatePasswordForm.js")
    .addEntry("desactivateAccountForm", "./assets/js/desactivateAccountForm.js")
    .addEntry("homeHumansGaea21", "./assets/js/humansGaea21/home.js")
    .addEntry("temoignageHumansGaea21", "./assets/js/humansGaea21/temoignages.js")
    .addEntry("magazineHumansGaea21", "./assets/js/humansGaea21/magazine.js")
    .addEntry("programmeHumansGaea21", "./assets/js/humansGaea21/programme.js")
    .addEntry("staffHumansGaea21", "./assets/js/humansGaea21/staff.js")
    .addEntry("alumniHumansGaea21", "./assets/js/humansGaea21/alumni.js")
    .addEntry("app", "./assets/js/app.js")
    .addEntry("videos", "./assets/js/QuiSommeNous/QuiNous.js")
    .addEntry("topBar", "./assets/js/topBar/topBar.js")
    .addEntry("projets", "./assets/js/projets/projet.js")
    .addEntry("emplois", "./assets/js/emploi_et_stage/pages/emploi.js")
    .addEntry("demandes", "./assets/js/emploi_et_stage/pages/demande.js")
    .addEntry("offres", "./assets/js/emploi_et_stage/pages/offre.js")
    .addEntry("reseau", "./assets/js/emploi_et_stage/pages/reseau.js")
    .addEntry("header", "./assets/js/emploi_et_stage/header.js")
    .addEntry(
        "contenu-offre",
        "./assets/js/emploi_et_stage/contenu-page-offre.js"
    )
    .addEntry(
        "contenu-reseau",
        "./assets/js/emploi_et_stage/contenu-page-reseau.js"
    )
    .addEntry("offres-details", "./assets/js/emploi_et_stage/offres-details.js")
    .addEntry(
        "offres-reseau-details",
        "./assets/js/emploi_et_stage/offres-reseau-details.js"
    )
    .addEntry("profils-details", "./assets/js/emploi_et_stage/profils-details.js")
    .addEntry("profils", "./assets/js/emploi_et_stage/pages/profils.js")
    .addEntry(
        "contenu-profils",
        "./assets/js/emploi_et_stage/contenu-page-profils.js"
    )
    .addEntry("newsletter", "./assets/js/newsletter/newsletter.js")
    .addEntry("communautes", "./assets/js/communautes/communautes.js")
    .addEntry("home", "./assets/js/home/AppHome.jsx")
    .addEntry(
        "app_navbar",
        "./assets/js/components/navbar_projet_RA/app_navbar.js"
    )
    .addEntry("platformEntree", "./assets/js/loginuniversel/platformEntree.js")
    .addEntry("offreEmploi", "./assets/js/offreEmploi/offreEmploi.js")


    //Composant pour afficher vidéos Youtube sur page Coaching Carrières
    .addEntry("CoachingVideos", "./assets/js/coaching/CoachingVideos.js")

    .addEntry("carrouselCoachingAvant", "./assets/js/coaching/carrouselAvant.js")
    .addEntry(
        "carrouselCoachingPendant",
        "./assets/js/coaching/carrouselPendant.js"
    )
    .addEntry("carrouselCoachingApres", "./assets/js/coaching/carrouselApres.js")
    .addEntry(
        "FormationsCertifiantes",
        "./assets/js/coaching/FormationsCertifiantes/FormationsCertifiantes.jsx"
    )
    .addEntry(
        "FormationInterne",
        "./assets/js/coaching/FormationsCertifiantes/components/page/FormationInterne/FormationInterne.jsx"
    )
    .addEntry(
        "ProgrammeRecherche",
        "./assets/js/coaching/FormationsCertifiantes/components/page/ProgrammeRecherche/ProgrammeRecherche.jsx"
    )

    .addEntry(
        "BackOfficeProject",
        "./assets/js/projets/backOfficeProject/BackOfficeProject.jsx"
    )
    //Profile page

    .addEntry("Profile", "./assets/js/profile/profile.jsx")
    
    // composants FullCalendar
    .addEntry('fullCalendar','./assets/js/fullCalendar/fullCalendar.js')

    // Composants du systeme design
    .addEntry(
        "largeCardApp",
        "./assets/js/systeme_design_components/vignetteLarge/largeCardApp.js"
    )
    .addEntry(
        "smallCardApp",
        "./assets/js/systeme_design_components/vignetteSmall/smallCardApp.js"
    )
    .addEntry(
        "InformationApp",
        "./assets/js/systeme_design_components/vignetteDeRedirection/InformationApp.js"
    )
    .addEntry(
        "prevArrowApp",
        "./assets/js/systeme_design_components/previous/prevArrowApp.js"
    )
    .addEntry(
        "topArrowApp",
        "./assets/js/systeme_design_components/top/topArrowApp.js"
    )
    .addEntry(
        "bigCarouselMenuApp",
        "/assets/js/systeme_design_components/bigCarouselMenu/bigCarouselMenuApp.js"
    )
    .addEntry(
        "SmallBoxApp",
        "/assets/js/systeme_design_components/smallBox/SmallBoxApp.js"
    )
    .addEntry(
        "rectBtnApp",
        "/assets/js/systeme_design_components/largeBtn/rectBtnApp.js"
    )
    .addEntry(
        "SecondaryNavApp",
        "/assets/js/systeme_design_components/SecondaryNav/SecondaryNavApp.js"
    )
    .addEntry(
        "LargeBtnApp",
        "/assets/js/systeme_design_components/Buttons/Large/LargeBtnApp.js"
    )
    .addEntry(
        "SmallBtnApp",
        "/assets/js/systeme_design_components/Buttons/Small/SmallBtnApp.js"
    )
    .addEntry(
        "SmallBoxPopupApp",
        "/assets/js/systeme_design_components/smallBox/SmallBoxPopupApp.js"
    )
    .addEntry("navbar", "./assets/js/topBar/navbar.jsx")
    .addEntry("encart", "./assets/js/home/Encart.js")
    .addEntry("dashboardOffre", "./assets/js/dashboardOffre/dashboardOffre.js")
    .addEntry(
        "editOffre",
        "./assets/js/offreEmploi/ModificationOffre/editOffre.js"
    )
    .addEntry("pdfOffre", "./assets/js/offreEmploi/pdfOffre/offrePdf.js")

    .addEntry(
        "AvancerProjetApp",
        "./assets/js/systeme_design_components/encartAvancerProjet/AvancerProjetApp.js"
    )
    .addEntry('ResetPassword', './assets/js/components/forgotpassword/ResetPassword.js')
    .addEntry('Validation', './assets/js/components/Validation/Validation.js')
    .addEntry('Partenaire', './assets/js/components/partenaire/Partenaire.js')
    .addEntry('AutrePartenaire', './assets/js/components/partenaire/AutrePartenaire.js')
    .addEntry('TransCard', './assets/js/components/transdisciplinaire/TransCard.js')
    .addEntry('WhoCarousel', './assets/js/components/green_carousel/WhoCarousel.js')
    .addEntry('ProjetCarousel', './assets/js/components/green_carousel/ProjetCarousel.js')
    .addEntry('ModalModele', './assets/js/components/modal-modele-gaea/ModalModele.js')
    .addEntry('CardsProjet', './assets/js/components/cards-projet/CardsProjet.js')


    .addEntry("showUser", "./assets/js/user/showUser.js")
    .addEntry("showLogin", "./assets/js/components/login/callShowLogin.js")
    .addEntry("RegisterShow", "./assets/js/components/login/callShowRegister.js")

    .addEntry("modalNewsletter", "./assets/js/home/modalNewsletter.js")

    // enables the Symfony UX Stimulus bridge (used in assets/bootstrap.js)
    .enableStimulusBridge("./assets/controllers.json")

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you"re building a single-page app
    .enableSingleRuntimeChunk()

    .configureBabel(function (babelConfig) {
        babelConfig.plugins.push("@babel/preset-react");
    })

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabel(() => {
    }, {
        useBuiltIns: "usage",
        corejs: 3,
    });

// enables Sass/SCSS support
Encore.enableSassLoader();

module.exports = Encore.getWebpackConfig();

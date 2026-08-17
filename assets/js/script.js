/* =========================================================
   PPG E-PORTFOLIO — SISKA YULIA RAHMAWATI
   SCRIPT.JS — FINAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       DARK MODE
       ===================================================== */

    const darkModeButton = document.getElementById("darkMode");

    const savedTheme = localStorage.getItem("ppg-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    function updateDarkModeIcon() {
        if (!darkModeButton) return;

        if (document.body.classList.contains("dark")) {
            darkModeButton.textContent = "☀";
            darkModeButton.setAttribute(
                "aria-label",
                "Aktifkan mode terang"
            );
        } else {
            darkModeButton.textContent = "☾";
            darkModeButton.setAttribute(
                "aria-label",
                "Aktifkan mode gelap"
            );
        }
    }

    updateDarkModeIcon();

    if (darkModeButton) {
        darkModeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            const theme = document.body.classList.contains("dark")
                ? "dark"
                : "light";

            localStorage.setItem("ppg-theme", theme);

            updateDarkModeIcon();
        });
    }


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const navMenu = document.querySelector(".nav-menu");
    const navContainer = document.querySelector(".nav-container");

    let menuButton = document.querySelector(".menu-toggle");

    if (navMenu && navContainer && !menuButton) {

        menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.type = "button";
        menuButton.setAttribute(
            "aria-label",
            "Buka menu navigasi"
        );
        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.innerHTML = "☰";

        const navActions = document.querySelector(".nav-actions");

        if (navActions) {
            navActions.prepend(menuButton);
        } else {
            navContainer.appendChild(menuButton);
        }
    }

    if (menuButton && navMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("open");

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.innerHTML = isOpen
                ? "✕"
                : "☰";
        });


        /* Tutup menu ketika link diklik */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                document.body.classList.remove(
                    "menu-open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.innerHTML = "☰";
            });

        });

    }


    /* =====================================================
       HEADER SCROLL
       ===================================================== */

    const header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 450) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        }

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        updateBackToTop();

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        document.querySelectorAll(".nav-menu a");

    const sections =
        document.querySelectorAll("main section[id]");

    if (
        navLinks.length > 0 &&
        sections.length > 0
    ) {

        function updateActiveNavigation() {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY <
                    sectionTop + sectionHeight
                ) {
                    currentSection =
                        section.getAttribute("id");
                }

            });

            navLinks.forEach(link => {

                const href =
                    link.getAttribute("href");

                if (
                    href &&
                    href.startsWith("#")
                ) {

                    const target =
                        href.substring(1);

                    link.classList.toggle(
                        "active",
                        target === currentSection
                    );

                }

            });

        }

        window.addEventListener(
            "scroll",
            updateActiveNavigation,
            { passive: true }
        );

        updateActiveNavigation();

    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".card, .semester-card, .artifact-card, " +
            ".analysis-item, .journey-item, .stat-card, " +
            ".gallery-item, .video-card, .contact-card"
        );

    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        revealElements.forEach(element => {
            element.classList.add("reveal");
        });

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("show");
        });

    }


    /* =====================================================
       SEARCH TOPIK / CARD
       ===================================================== */

    const searchInput =
        document.getElementById("searchInput");

    if (searchInput) {

        const searchableCards =
            document.querySelectorAll(
                "#topikContainer .card, " +
                "#topikContainer .semester-card"
            );

        searchInput.addEventListener(
            "input",
            () => {

                const keyword =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                searchableCards.forEach(card => {

                    const text =
                        card.textContent
                            .toLowerCase();

                    if (
                        keyword === "" ||
                        text.includes(keyword)
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display = "none";

                    }

                });

            }
        );

    }


    /* =====================================================
       LIGHTBOX GALERI
       ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );

    if (galleryImages.length > 0) {

        const lightbox =
            document.createElement("div");

        lightbox.className = "lightbox";

        lightbox.innerHTML = `
            <button
                class="lightbox-close"
                type="button"
                aria-label="Tutup gambar">
                ×
            </button>

            <img
                src=""
                alt="Preview gambar">
        `;

        document.body.appendChild(lightbox);

        const lightboxImage =
            lightbox.querySelector("img");

        const closeButton =
            lightbox.querySelector(
                ".lightbox-close"
            );


        galleryImages.forEach(image => {

            image.addEventListener(
                "click",
                () => {

                    lightboxImage.src =
                        image.src;

                    lightboxImage.alt =
                        image.alt ||
                        "Preview dokumentasi";

                    lightbox.classList.add(
                        "show"
                    );

                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


        function closeLightbox() {

            lightbox.classList.remove(
                "show"
            );

            document.body.style.overflow =
                "";

            lightboxImage.src = "";

        }


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    closeLightbox();
                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains(
                        "show"
                    )
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       EXTERNAL LINK
       Tambahkan target blank otomatis untuk
       link Google Drive / website luar
       ===================================================== */

    document
        .querySelectorAll("a[href]")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (
                href &&
                (
                    href.startsWith(
                        "https://drive.google.com"
                    ) ||
                    href.startsWith(
                        "https://docs.google.com"
                    ) ||
                    href.startsWith(
                        "http://"
                    ) ||
                    href.startsWith(
                        "https://"
                    )
                )
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        });


    /* =====================================================
       YEAR OTOMATIS
       ===================================================== */

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });


    /* =====================================================
       LOADING SCREEN
       ===================================================== */

    const loadingScreen =
        document.querySelector(
            ".loading-screen"
        );

    if (loadingScreen) {

        window.addEventListener(
            "load",
            () => {

                setTimeout(() => {

                    loadingScreen.classList.add(
                        "hide"
                    );

                }, 350);

            }
        );

    }


    /* =====================================================
       CONSOLE
       ===================================================== */

    console.log(
        "PPG E-Portfolio Siska Yulia Rahmawati berhasil dimuat."
    );

});
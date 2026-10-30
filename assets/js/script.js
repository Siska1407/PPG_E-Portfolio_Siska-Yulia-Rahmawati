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
       CONSISTENT PPL FOOTER
       ===================================================== */

    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const isPplMandiriPage = currentPath.includes("/semester-2/ppl-mandiri/");

    if (isPplMandiriPage) {
        let footer = document.querySelector("footer");

        if (!footer) {
            footer = document.createElement("footer");
            document.body.appendChild(footer);
        }

        if (!footer.querySelector(".footer-grid")) {
            footer.insertAdjacentHTML("afterbegin", `
                <div class="footer-grid">
                    <div>
                        <h2>PPG E - Portofolio</h2>
                        <p>Dokumentasi perjalanan dan pengembangan profesional Siska Yulia Rahmawati sebagai mahasiswa PPG Prajabatan Informatika di Universitas Negeri Malang.</p>
                    </div>
                    <div>
                        <h3>Navigasi</h3>
                        <div class="footer-links">
                            <a href="../../index.html#semester1">Semester 1</a>
                            <a href="../../index.html#semester2">Semester 2</a>
                            <a href="../../index.html#pengembangan">Pengembangan Diri</a>
                            <a href="../../tentang-saya.html">Tentang Saya</a>
                        </div>
                    </div>
                    <div>
                        <h3>Informasi Kontak</h3>
                        <div class="footer-links">
                            <a href="mailto:siska.yulia.2531537@students.um.ac.id">siska.yulia.2531537@students.um.ac.id</a>
                            <a href="https://www.instagram.com/siskayuraa/" target="_blank" rel="noopener noreferrer">@siskayuraa</a>
                            <a href="https://um.ac.id/" target="_blank" rel="noopener noreferrer">Universitas Negeri Malang - PPG Informatika</a>
                        </div>
                    </div>
                </div>
            `);
        }

        if (!footer.querySelector(".footer-bottom")) {
            footer.insertAdjacentHTML("beforeend", `
                <div class="footer-bottom">
                    <p>© <span data-current-year>2026</span> Siska Yulia Rahmawati • PPG E - Portofolio</p>
                </div>
            `);
        }
    }


    /* =====================================================
       INFINITE HORIZONTAL GALLERY
       ===================================================== */

    document.querySelectorAll(".infinite-gallery").forEach(gallery => {

        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;
        let pressedImage = null;
        let hasDragged = false;

        gallery.addEventListener("pointerdown", event => {
            if (!event.isPrimary || event.button !== 0) return;

            isDragging = true;
            startX = event.clientX;
            startScrollLeft = gallery.scrollLeft;
            pressedImage = event.target.closest(
                ".infinite-gallery-item img, .innovation-screenshot-item img, .reflection-gallery img"
            );
            if (pressedImage?.closest('[aria-hidden="true"]')) {
                pressedImage = null;
            }
            hasDragged = false;
            gallery.classList.add("is-dragging");
            gallery.setPointerCapture(event.pointerId);
        });

        gallery.addEventListener("pointermove", event => {
            if (!isDragging) return;

            const distance = event.clientX - startX;
            if (Math.abs(distance) > 8) hasDragged = true;
            gallery.scrollLeft = startScrollLeft - distance;
        });

        function stopDragging(event) {
            if (!isDragging) return;

            isDragging = false;
            gallery.classList.remove("is-dragging");

            if (event.pointerId !== undefined && gallery.hasPointerCapture(event.pointerId)) {
                gallery.releasePointerCapture(event.pointerId);
            }
        }

        gallery.addEventListener("pointerup", event => {
            const imageToOpen = hasDragged ? null : pressedImage;
            stopDragging(event);
            pressedImage = null;

            if (imageToOpen) openLightbox(imageToOpen);
        });

        gallery.addEventListener("pointercancel", event => {
            stopDragging(event);
            pressedImage = null;
        });
        gallery.addEventListener("mouseleave", () => {
            if (isDragging) gallery.classList.remove("is-dragging");
        });

        gallery.addEventListener("wheel", event => {
            if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                event.preventDefault();
                gallery.scrollLeft += event.deltaY;
            }
        }, { passive: false });

        gallery.addEventListener("mouseenter", () => {
            gallery.classList.add("is-paused");
        });

        gallery.addEventListener("mouseleave", () => {
            gallery.classList.remove("is-paused");
        });

    });


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
            ".infinite-gallery-item img, .gallery-item img, .innovation-screenshot-item img, .reflection-gallery img"
        );

    if (galleryImages.length > 0) {

        const lightbox =
            document.createElement("div");

        lightbox.className = "lightbox";
        lightbox.setAttribute("role", "dialog");
        lightbox.setAttribute("aria-modal", "true");
        lightbox.setAttribute("aria-label", "Pratinjau gambar galeri");

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

        let lastFocusedImage = null;

        function openLightbox(image) {
            lastFocusedImage = image;
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt || "Preview dokumentasi";
            lightbox.classList.add("show");
            document.body.style.overflow = "hidden";
            closeButton.focus();
        }

        galleryImages.forEach(image => {

            if (!image.closest('[aria-hidden="true"]')) {
                image.tabIndex = 0;
                image.setAttribute("role", "button");
                image.setAttribute(
                    "aria-label",
                    `${image.alt || "Gambar galeri"} (klik untuk memperbesar)`
                );
            }

            image.addEventListener("keydown", event => {
                if (
                    !image.closest('[aria-hidden="true"]') &&
                    (event.key === "Enter" || event.key === " ")
                ) {
                    event.preventDefault();
                    openLightbox(image);
                }
            });

        });


        function closeLightbox() {

            lightbox.classList.remove(
                "show"
            );

            document.body.style.overflow =
                "";

            lightboxImage.src = "";

            lastFocusedImage?.focus();
            lastFocusedImage = null;

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

    const videoZoomButtons = document.querySelectorAll(".origin-video-zoom");

    if (videoZoomButtons.length > 0) {
        const videoLightbox = document.createElement("div");
        videoLightbox.className = "video-lightbox";
        videoLightbox.setAttribute("role", "dialog");
        videoLightbox.setAttribute("aria-modal", "true");
        videoLightbox.setAttribute("aria-label", "Video Tari Glipang");
        videoLightbox.innerHTML = `
            <button class="video-lightbox-close" type="button" aria-label="Tutup video">×</button>
            <video controls autoplay muted playsinline></video>
            <p class="video-lightbox-status" aria-live="polite"></p>
        `;
        document.body.appendChild(videoLightbox);

        const enlargedVideo = videoLightbox.querySelector("video");
        const closeVideoButton = videoLightbox.querySelector(".video-lightbox-close");
        const videoStatus = videoLightbox.querySelector(".video-lightbox-status");
        let lastFocusedZoomButton = null;

        function closeVideoLightbox() {
            videoLightbox.classList.remove("show");
            enlargedVideo.pause();
            enlargedVideo.removeAttribute("src");
            enlargedVideo.load();
            videoStatus.textContent = "";
            document.body.style.overflow = "";
            lastFocusedZoomButton?.focus();
            lastFocusedZoomButton = null;
        }

        videoZoomButtons.forEach(button => {
            button.addEventListener("click", () => {
                const inlineVideo = button.closest(".origin-video-frame").querySelector("video");
                lastFocusedZoomButton = button;
                enlargedVideo.src = inlineVideo.currentSrc || inlineVideo.querySelector("source").src;
                enlargedVideo.currentTime = Number.isFinite(inlineVideo.currentTime)
                    ? inlineVideo.currentTime
                    : 0;
                videoLightbox.classList.add("show");
                document.body.style.overflow = "hidden";
                videoStatus.textContent = "";
                closeVideoButton.focus();

                enlargedVideo.play().catch(error => {
                    videoStatus.textContent = "Tekan tombol putar untuk memulai video.";
                    console.error("Video Tari Glipang gagal diputar otomatis:", error);
                });
            });
        });

        closeVideoButton.addEventListener("click", closeVideoLightbox);

        videoLightbox.addEventListener("click", event => {
            if (event.target === videoLightbox) closeVideoLightbox();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && videoLightbox.classList.contains("show")) {
                closeVideoLightbox();
            }
        });
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
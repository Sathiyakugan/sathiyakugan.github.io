$(window).on('load', function() {
    /*=========================================================================
       Isotope
       =========================================================================*/

    var $container = $('.portfolio-wrapper');
    $container.imagesLoaded( function() {
        $('.portfolio-wrapper').isotope({
            // options
            itemSelector: '[class*="col-"]',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '[class*="col-"]'
            }
        });
    });

    $('.portfolio-filter').on( 'click', 'li', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.portfolio-filter').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'li', function() {
            $buttonGroup.find('.current').removeClass('current');
            $( this ).addClass('current');
        });
    });

    var filterValue = $('#portfolio-filter-first').attr('data-filter');
    $container.isotope({ filter: filterValue });


    $('.pop-box-model').on("click", function () {
        var theGoodStuff = $(this).find('.mfp-hide');
        $.magnificPopup.open({
            items: {
                src: theGoodStuff,
            },
            type: 'inline',
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: false,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });
    });


    // var bolbyPopup = function(){
    //     /*=========================================================================
    //             Magnific Popup
    //     =========================================================================*/
    //     $('.work-image').magnificPopup({
    //         type: 'image',
    //         closeBtnInside: false,
    //         mainClass: 'my-mfp-zoom-in',
    //     });
    //
    //     $('.work-content').magnificPopup({
    //         type: 'inline',
    //         fixedContentPos: true,
    //         fixedBgPos: true,
    //         overflowY: 'auto',
    //         closeBtnInside: false,
    //         preloader: false,
    //         midClick: true,
    //         removalDelay: 300,
    //         mainClass: 'my-mfp-zoom-in'
    //     });
    //
    //     $('.work-video').magnificPopup({
    //         type: 'iframe',
    //         closeBtnInside: false,
    //         iframe: {
    //             markup: '<div class="mfp-iframe-scaler">'+
    //                 '<div class="mfp-close"></div>'+
    //                 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
    //                 '</div>',
    //
    //             patterns: {
    //                 youtube: {
    //                     index: 'youtube.com/',
    //
    //                     id: 'v=',
    //
    //                     src: 'https://www.youtube.com/embed/%id%?autoplay=1'
    //                 },
    //                 vimeo: {
    //                     index: 'vimeo.com/',
    //                     id: '/',
    //                     src: '//player.vimeo.com/video/%id%?autoplay=1'
    //                 },
    //                 gmaps: {
    //                     index: '//maps.google.',
    //                     src: '%id%&output=embed'
    //                 }
    //
    //             },
    //
    //             srcAction: 'iframe_src',
    //         }
    //     });
    //
    //     $('.gallery-link').on('click', function () {
    //         $(this).next().magnificPopup('open');
    //     });
    //
    //     $('.gallery').each(function () {
    //         $(this).magnificPopup({
    //             delegate: 'a',
    //             type: 'image',
    //             closeBtnInside: false,
    //             gallery: {
    //                 enabled: true,
    //                 navigateByImgClick: true
    //             },
    //             fixedContentPos: false,
    //             mainClass: 'my-mfp-zoom-in',
    //         });
    //     });
    // }
    //
    // bolbyPopup();



    /*=========================================================================
     Infinite Scroll
     =========================================================================*/
    var curPage = 1;
    var pagesNum = $(".portfolio-pagination").find("li a:last").text();   // Number of pages

    $container.infinitescroll({
            itemSelector: '.grid-item',
            nextSelector: '.portfolio-pagination li a',
            navSelector: '.portfolio-pagination',
            extraScrollPx: 0,
            bufferPx: 0,
            maxPage: 6,
            loading: {
                finishedMsg: "No more works",
                msgText: '',
                speed: 'slow',
                selector: '.load-more',
            }
        },
        // trigger Masonry as a callback
        function( newElements ) {

            var $newElems = $( newElements );
            $newElems.imagesLoaded(function(){
                $newElems.animate({ opacity: 1 });
                $container.isotope( 'appended', $newElems );
            });

            bolbyPopup();

            // Check last page
            curPage++;
            if(curPage == pagesNum) {
                $( '.load-more' ).remove();
            }

        });

    $container.infinitescroll( 'unbind' );

    $( '.load-more .btn' ).on('click', function() {
        $container.infinitescroll( 'retrieve' );
        // display loading icon
        $( '.load-more .btn i' ).css('display', 'inline-block');
        $( '.load-more .btn i' ).addClass('fa-spin');

        $(document).ajaxStop(function () {
            setTimeout(function(){
                // hide loading icon
                $( '.load-more .btn i' ).hide();
            }, 1000);
        });
        return false;
    });

    /* ======= Mobile Filter ======= */

// bind filter on select change
    $('.portfolio-filter-mobile').on( 'change', function() {
        // get filter value from option value
        var filterValue = this.value;
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $container.isotope({ filter: filterValue });
    });

    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function() {
            var number = $(this).find('.number').text();
            return parseInt( number, 10 ) > 50;
        },
        // show if name ends with -ium
        ium: function() {
            var name = $(this).find('.name').text();
            return name.match( /ium$/ );
        }
    };
});

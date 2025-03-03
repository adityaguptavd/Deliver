$(function() {
    // Device based events function
    function deviceBasedEvents() {
        if(window.innerWidth <= 980) {
            // Show nav
            $('.toggle').on('click', function() {
                $('nav ul.flex').addClass('active');
                $(this).attr('aria-expanded', true);
                $('nav .overlay').fadeIn();
            });
            // Hide nav
            $('nav .overlay').on('click touchmove', function() {
                $('nav ul.flex').removeClass('active');
                $(this).attr('aria-expanded', false);
                $('nav .overlay').fadeOut();
            });
        }
    }

    // window scroll event handler function
    function scrollHandling() {
        const header = $('header');
        if($('.banner h2').offset().top <= (header.offset().top + header.outerHeight())) {
            header.addClass('blur');
        }
        else{
            header.removeClass('blur');
        }
    }

    function toggleNav() {
        $('.search').toggleClass('active');
        const expanded = $(this).attr('aria-expanded');
        if(expanded === 'false') {
            $(this).attr('aria-expanded', 'true');
            $(this).children('span').addClass('fa-times');
            setTimeout(() => $('.search input').trigger('focus'), 400);
        }
        else{
            $(this).attr('aria-expanded', 'false');
            $(this).children('span').removeClass('fa-times');
        }
    }
    

    // On page refresh and load
    deviceBasedEvents();
    scrollHandling();

    // Window resize and scroll event
    $(window).on('resize', deviceBasedEvents);
    $(window).on('scroll', scrollHandling);

    // Search toggle
    $('.search-btn').on('click', toggleNav);

    // Animation when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('in-viewport');
            }
        });
    }, {
        threshold: 0.3,
    });
    
    // Observe for animation
    $('.animate').each(function () {
        observer.observe(this);
    });

    // Footer form submission handling
    $('footer form').on('submit', function(event) {
        event.preventDefault();
        $(this).next().addClass('active');
        $(this).children('button, input').attr('disabled', true);
        $(this).trigger('reset');
        setTimeout(() => {
            $(this).next().removeClass('active'); 
        }, 3000);
    });
});
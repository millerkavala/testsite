/*//Language switcher
var languageSwitcher = document.getElementById("language_switcher");
if(languageSwitcher) {
    languageSwitcher.addEventListener("click",languagesToggle,false);

    function languagesToggle(e) {
        e.preventDefault();
        document.querySelector("body").classList.toggle('languages-opened');
        document.querySelector("body").classList.remove('menu-dropdown-opened');
        document.querySelector("body").classList.remove('orientation-opened');
    }
}

//Menu switcher
var menuDropdownSwitcher = document.getElementById("navigation_switcher");
if(menuDropdownSwitcher) {
    menuDropdownSwitcher.addEventListener("click",menuDropdownToggle,false);

    function menuDropdownToggle(e) {
        e.preventDefault();
        document.querySelector("body").classList.toggle('menu-dropdown-opened');
        document.querySelector("body").classList.remove('languages-opened');
        document.querySelector("body").classList.remove('orientation-opened');
    }
}

//Orientation switcher
var orientationSwitcher = document.getElementById("orientation_switcher");
if(orientationSwitcher) {
    orientationSwitcher.addEventListener("click",orientationToggle,false);

    function orientationToggle(e) {
        e.preventDefault();
        document.querySelector("body").classList.toggle('orientation-opened');
        document.querySelector("body").classList.remove('menu-dropdown-opened');
        document.querySelector("body").classList.remove('languages-opened');
    }
}

//Add comment switcher
var addCommentSwitcher = document.getElementById("add_comment");
if(addCommentSwitcher) {
    addCommentSwitcher.addEventListener("click",addCommentToggle,false);

    function addCommentToggle(e) {
        e.preventDefault();
        document.querySelector("body").classList.toggle('add-comment-opened');
    }
}

//Click outside dropdowns
window.addEventListener('click', function(e){
    if (!(document.getElementById("language_container").contains(e.target) || document.getElementById("navigation_container").contains(e.target) || document.getElementById("orientation_container").contains(e.target))){
        document.querySelector("body").classList.remove('menu-dropdown-opened');
        document.querySelector("body").classList.remove('languages-opened');
        document.querySelector("body").classList.remove('orientation-opened');
    }
});*/

//Scroll to top
var scrollme = document.getElementById("scroll_to_top");

if(scrollme) {
    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 500) {
            scrollme.classList.add('active');
        }
        else {
            scrollme.classList.remove('active');
        }
    });

    scrollme.addEventListener("click",runScroll,false);

    function runScroll() {
        scrollTo(document.documentElement, 0, 200);
    }
    function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function() {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop == to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    }
}


(function () {
    var mod = {};

    mod.dropdown = (function ($){
        var options = {},
            facade = {};

        function setOptions(initOptions) {
            options.ddTriggerClass     = options.ddTriggerClass || initOptions.ddTriggerClass || "";
            options.ddContentClass     = options.ddContentClass || initOptions.ddContentClass || "";
            options.menuButtonClass    = options.menuButtonClass || initOptions.menuButtonClass || "";
            options.menuContainerClass = options.menuContainerClass || initOptions.menuContainerClass || "";
        }

        function onClick($self) {
            var $selectedDropdown = $self.nextAll("." + options.ddContentClass),
                $otherDropdowns   = $('.' + options.ddContentClass).not($selectedDropdown),
                $otherTriggers    = $('.' + options.ddTriggerClass).not($self);

            //$otherDropdowns.slideUp(200);
            $otherDropdowns.removeClass("active");
            $otherTriggers.removeClass("active");

            $selectedDropdown.toggleClass("active");

            /*$selectedDropdown.stop(true, false, true).slideToggle(200, function () {
                $selectedDropdown.toggleClass("active");
            });*/

            $self.toggleClass("active");
        }

        function onClickMenu($self) {
            var $selectedDropdown = $self.nextAll("." + options.menuContainerClass);

            $selectedDropdown.toggleClass("active");
            $self.toggleClass("active");
        }

        facade.init = function (initOptions) {
            initOptions = initOptions || {};
            setOptions(initOptions);

            $('.' + options.ddTriggerClass).on('click', function () {
                onClick($(this));
            });

            $('.' + options.menuButtonClass).on('click', function () {
                onClickMenu($(this));
            });
        };

        return facade;
    }(jQuery));

    mod.moreTags = (function ($) {
        var options         = {},
            facade          = {},
            $window         = $(window),
            _resizeIdTimeout,
            _isButtonCreated = false;


        function setOptions(initOptions) {
            options.tagContainerClass = options.tagContainerClass || initOptions.tagContainerClass || '';
            options.buttonClass       = options.buttonClass || initOptions.buttonClass || '';
        }

        function createButton() {
            if (_isButtonCreated) {
                return;
            }
            var button = document.createElement('div');

            button.classList = options.buttonClass + ' show';
            button.innerText = 'Show more';
            button.addEventListener('click', function () {
                toggleTagContainer(this);
            });
            $("." + options.tagContainerClass).after(button).addClass('show');

            _isButtonCreated = true;
        }

        function toggleTagContainer(self) {
            var $button =  $(self),
                $tagContainer = $('.' + options.tagContainerClass);

            if ($button.text().toUpperCase() === 'SHOW MORE'){
                $button.text('Show less');
            } else {
                $button.text('Show more');
            }

            $tagContainer.toggleClass('show hide');
        }

/*        function onResize () {
            clearTimeout(_resizeIdTimeout);

            _resizeIdTimeout = setTimeout(function () {
                var $button;

                if (isTagsHeightBig()) {
                    createButton();
                } else {
                    $button = $('.' + options.buttonClass);

                    if (!$button.hasClass('hide')) {
                    }
                }
            }, 100);
        }*/

/*        function isTagsHeightBig() {
            var $tagContainer       = $('.' + options.tagContainerClass),
                containerRealHeight = $tagContainer.outerHeight(),
                fontSize            = parseInt($tagContainer.css('font-size').replace('px', '')),
                coef                = containerRealHeight / fontSize;

            return (coef > 2 && $window.width() <= 860);
        }*/

        facade.init = function (initOptions) {
            initOptions = initOptions || {};
            setOptions(initOptions);

            var $tagContainer = $('.' + options.tagContainerClass);

            if ($tagContainer.length > 0) {
                createButton();
            }
        };

        return facade;
    }(jQuery));

    /*-----------------------------------------------------------------------*/

    mod.moreTags.init({
        tagContainerClass : 'combine-container',
        buttonClass       : 'more-button'
    });

    mod.dropdown.init({
        ddTriggerClass     : 'dropdown-switcher',
        ddContentClass     : 'dropdown-container',
        menuButtonClass    : 'dropdown-menu-switcher',
        menuContainerClass : 'dropdown-menu-container'
    });
}());
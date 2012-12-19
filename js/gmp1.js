function scrollWindow()
{
    $('html, body').animate({
        scrollTop: $("#div2").offset().top
    }, 3000);
}

function floatMenu()
{
   $('#topMenu').each(function() {
        var method = 'easeOutQuint',
            topMenu = jQuery('#topMenu'),
            activeMenu = jQuery("#active_menu",topMenu),
            mainlevel = jQuery('a',topMenu),
            animMenu = jQuery('#animMenu')
            

        var animFunc = function(el) {
            var menuWidth = el.outerWidth();
            var menuLeft = el.position().left;
            animMenu.stop(true).animate({
                left: menuLeft,
                width: menuWidth
            }, 1000, method);
        }

        // если есть активный пункт меню, то позиционируем двигающуюся плашку на нем
        animFunc(activeMenu);

        // поведение движущейся плашки при наведении на любой пункт меню. Все тоже самое, что и при наличии активного пункта, только позиция плашки определяется относительно пункта, на который произошло наведение курсора мыши
        mainlevel.on('mouseenter',function() {
            animFunc(jQuery(this));
        })

        // поведение плашки при окончании события наведения мыши на пункт меню (выход курсора мыши на пределы блока, в котором содержится меню)
        topMenu.on('mouseleave',function() {
            // иначе, если есть активный пункт меню – возвращаем плашку на него
            if (activeMenu.length) {
                animFunc(activeMenu);
            }
            // если активного пункта нет, то перемещаем плашку за границу экрана
            else {
                animMenu.stop(true).animate({
                    left: '-999px',
                    width: '0px'
                }, 1000, method);
            }
        })


    })
}

var move_car = function(top_menu){
    var cars = { 'ServicesNav' : '#ServicesCarousel', 'PeopleNav' : '#PeopleCarousel', 'ProjectsNav' : '#ProjectsCarousel' };
    return function()
    {
        var car = $(this).parents(top_menu);
        car = cars[car.attr('id')];
        $(car).carousel(parseInt($(this).attr('data-index')));
        $(car).carousel({interval: false});
       
       return false;
    }
}
$(document).ready(
    function() {
        $("html").niceScroll(
            {
                scrollspeed : 5,
                bouncescroll : true
                //mousescrollstep : 5
            }
        );
        $('.nav-collapse li a').click(function (){
            var anchor = $(this).attr('href');
            $('html, body').animate({scrollTop: $(anchor).offset().top - 25}, 2000);
            return false;
        });
        $('.car_menu a').click(move_car('.car_menu'));
        $('.nav-pills a').click(move_car('.nav-pills'));
        
        $('.nav-pills a').click(function(){
           $(this).parents().closest('ul').children('li').removeClass('active');
           $(this).addClass('active');
           return false;
        });
        
        $('.nav-list li a').click(function (){
            var idx = parseInt($(this).attr('data-index'));
            $(this).parents('.top_level').find('.main_carousel').carousel(idx);
            $(this).parents().closest('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');

            return false;
        });

        $('.main_carousel').bind('slid', function() {
            var cur_orig = $('#ServicesCarousel').find('.active').index('#ServicesCarousel .item');
            var cur  = $(this).find('.item').index($(this).find('.active'));

            var nav = $(this).parents('.top_level').find('.nav-list');
            $(nav).find('li').removeClass('active');
            $(nav).find("li a[data-index='" + cur + "']").parent().addClass('active');
            if ($(this).attr('id') === "ServicesCarousel") {
                $("#ProjectsCarousel").carousel('next');
            }
        });
    }
);
/**
 * Created by Administrator on 2017/2/25.
 */
require.config({
    paths: {
        'jquery': './lib/jquery-3.1.1',
        'remarkable': './lib/remarkable',
        'highlight': './lib/highlight.min',
        'flexible': './lib/flexible',
        'swiper': './lib/swiper-3.4.1.min'
    }
});

require(['jquery', 'remarkable', 'highlight', 'flexible', 'swiper'], function ($, Remarkable, hljs, Swipwe) {
    $(function () {

        init();

        $('h1.logo').css('transform', 'rotate(0deg');

        /*test*/
        var userInput = '';

        var md = new Remarkable({
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    }
                    catch (err) {
                        console.log(err);
                    }
                }

                try {
                    return hljs.highlightAuto(str).value;
                }
                catch (err) {
                    console.log(err);
                }

                return '';
            }
        });
        $.get('./source/test.md', function (res, status) {
            if (status == 'success') {
                $('#origin').val(res);
                $('#result').html(md.render(res));
            } else {
                console.log('数据加载失败')
            }
        });

        $('#origin').bind('input', function () {
            userInput = $(this).val();
            $('#result').html(md.render(userInput));
        });

        /*need*/
        new Swiper('.swiper-container', {
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            speed: 500,
            loop: true,
            pagination: '.swiper-pagination',
            // effect: 'coverflow',
            paginationClickable: true
        })
    });

    function init() {
        console.log(111);
        let menu = $('header .menu');

        $('.more').bind('click', function (e) {
            console.log(2222222);
            menu.css('display') === 'none' ? menu.css('display', 'flex') : menu.fadeOut();
            e.stopPropagation();
        });

        if (window.innerWidth < 720) {
            $('body').bind('click', function () {
                menu.fadeOut();
            });
        }
    }


});
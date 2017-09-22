<?php
  $add_page = "ScrollY" . ($isCrawler ? ' crawler' : '');
  include 'partials/head.php';
  include 'partials/header-inner.php';
?>
<section class="DefaultSection TopSection">
    <div class="TopSlider">
        <div class="item">
            <div class="BoxWrapper">
                <div class="table-wrap">
                    <div class="table-cell TopCell">
                        <div class="wrapper">
                            <div class="text-wrap hidden wow bounceInLeft" data-wow-delay="1.0s" data-wow-duration="0.5s">
                                <div class="ttl decoration">Не упустите свой шанс!</div>
                                <div class="slideList">
                                    <div class="sub_ttl">Примите участие в мировой системе продвижения ресторанного<br/>и клубного бизнеса.</div>

                                    <div class="text registerFree">
                                        Бесплатная регистрация  Вашего ресторана/клуба<br/>
                                    </div>
                                    <div class="sub_ttl">
                                        Все, что требуется - отправить заявку на участие в проекте BOOZE
                                    </div>
                                    <div class="sub_ttl">
                                        <a href="#formSection" class="AnchorButton">Регистрируйтесь</a> или звоните <a href="tel:+38 096 066 76 36" class="text">+38&nbsp;096&nbsp;066&nbsp;76&nbsp;36</a>
                                    </div>
                                </div>
                                <a href="#formSection" class="btn Inverse AnchorButton">добавить ресторан</a>
                            </div>
                            <div class="womenWrap">
                                <img src="img/women_for_slide.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="BoxWrapper">
                <div class="table-wrap">
                    <div class="table-cell TopCell">
                        <div class="wrapper">
                            <div class="text-wrap minWidth hidden">
                                <div class="ttl decoration visible">Система аналитики</div>
                                <div class="sub_ttl">Внутренняя система аналитики BOOZE выведет<br/>
                                    ресторанный/клубный бизнес на новый уровень. Ваш личный<br/>
                                    кабинет оснащен интерфейсом последнего поколения.
                                </div>
                                <div class="text registerFree">
                                    Вы получаете уникальные возможности:
                                </div>
                                <ul class="bullet_list">
                                    <li>отслеживать рейтинг популярности заведения и коктейля</li>
                                    <li>самостоятельно следить за отзывами клиентов и проводить<br/>анализ продуктивности Вашего заведения</li>
                                    <li>контролировать уровень Вашего сервиса</li>
                                    <li>мониторить жалобы посетителей</li>
                                    <li>всегда быть доступным для своей целевой аудитории</li>
                                </ul>
                            </div>
                            <div class="macWrap">
                                <div class="macSlider">
                                    <div class="item">
                                        <img src="img/slide_for_pc.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="DefaultSection MiddleSection">
    <a href="#formSection" class="AnchorBox AnchorButton">
        <span>Добавить ресторан</span>
    </a>
    <div class="services">
        <div class="sub_ttl title wow wow-mobile fadeIn text-center" data-wow-delay="0.3s" data-wow-duration="0.5s">
            <span class="text-bold">BOOZE приведет клиента в Ваш ресторан</span>
        </div>
        <div class="sub_ttl text-center wow wow-mobile fadeIn" data-wow-delay="0.3s" data-wow-duration="0.5s">
            Спутниковый поисковой алгоритм BOOZE найдет человека в радиусе 300&nbsp;метров  и отправит ему уведомление.
            После нажатия кнопки ВЫПИТЬ, BOOZE проложит оптимальный путь к Вашему ресторану/клубу.
            Уведомления синхронизируются со всеми мобильными устройствами. Все это за 1 коктейль.
        </div>
    </div>
    <div class="ContainerWrapper AdvantagesBox">
        <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="item wow fadeIn" data-wow-delay="0.3s" data-wow-duration="0.5s">
                    <div class="icoBox">
                        <i class="icon icon-3"></i>
                    </div>
                    <div class="ttl decoration">Расширение вашего<br/>бизнеса</div>
                    <div class="sub_ttl">Популярность
                        <span class="red">+</span> Новые клиенты
                        <span class="red">=</span><br/> Прибыль
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="item wow fadeIn" data-wow-delay="0.3s" data-wow-duration="0.5s">
                    <div class="icoBox">
                        <i class="icon icon-2"></i>
                    </div>
                    <div class="ttl decoration">Известность</div>
                    <div class="sub_ttl">
                        Если человек есть в социальных сетях, он знает о BOOZE, а значит и о Вашем заведении.
                    </div>
                </div>
            </div>
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="item wow fadeIn" data-wow-delay="0.3s" data-wow-duration="0.5s">
                    <div class="icoBox">
                        <i class="icon icon-6"></i>
                    </div>
                    <div class="ttl decoration">Конфиденциальность<br/>ваших данных</div>
                    <div class="sub_ttl">
                        Мы предоставляем <strong>100%</strong>
                        защиту ваших данных.
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-center">
                <a href="/files/Booze.pdf" class="btn Inverse" target="_blank">Скачать презентацию</a>
            </div>
        </div>
    </div>
</section>
<?php
  include_once 'partials/add-restaurant-form.php';
?>
<section class="DefaultSection AskSection">
    <div class="ttl decoration wow wow-mobile fadeIn" data-wow-delay="0.3s" data-wow-duration="0.5s">У Вас остались вопросы?</div>
    <div class="sub_ttl wow wow-mobile fadeIn" data-wow-delay="0.6s" data-wow-duration="0.5s">
        Звоните <a href="tel:+38 096 066 76 36">+38 096 066 76 36</a> Будем рады помочь!
    </div>
</section>
<?php
    include_once 'partials/popup/thanks-2.php';
    include_once 'partials/footer-inner.php';
    include_once 'partials/footer.php';
?>

<?php
    require_once 'vendor/autoload.php';
    require_once 'config.php';

    // Check for route existing
    if (!in_array($config['path'], array_keys($config['meta']))) {
        $config['path'] = 'dobro-pozhalovat';
    }

    // Detect if crawler user agent
    $CrawlerDetect = new Jaybizzle\CrawlerDetect\CrawlerDetect();
    $isCrawler = $CrawlerDetect->isCrawler();
//    $isCrawler = true;

    // Set body class to "crawler"
    if ($isCrawler) {
        $add_page = "crawler";
    }
    if ($config['path'] === 'dobavit-restoran') {
        include_once 'add-restaurant.php';
        die();
    }
    if ($config['path'] === 'landing') {
        include_once 'landing.php';
        die();
    }
    include_once 'partials/head.php';
    $main = "active";
    include_once 'partials/header.php';
?>

<div id="container">
    <div class="bgs">
        <div class="bg bg1"
             style="background-image: url('img/home-bg1.jpg'); opacity: 1;">
        </div>
        <div class="bg bg2"
             style="background-image: url('img/home-bg2.jpg'); opacity: 0;">
        </div>
        <div class="bg bg3"
             style="background-image: url('img/home-bg3.jpg'); opacity: 0;">
        </div>
        <div class="bg bg4"
             style="background-image: url('img/home-bg4.jpg'); opacity: 0;">
        </div>
    </div>
    <div class="sectionWrapper swiper-container">
    <?php
        if ($isCrawler)
        {
            switch ($config['path']) {
                case 'vremya-vypit':
                    include_once 'partials/section-2.php';
                break;

                case 'kak-eto-rabotaet':
                    include_once 'partials/section-3.php';
                break;

                case 'skachat-prilozhenie':
                    include_once 'partials/section-4.php';
                break;

                default: //case 'dobro-pozhalovat':
                    include_once 'partials/section-1.php';
                break;
            }
        }
        else
        {
            echo '<div class="swiper-wrapper">';
            include_once 'partials/section-1.php';
            include_once 'partials/section-2.php';
            include_once 'partials/section-3.php';
            include_once 'partials/section-4.php';
            echo '</div>';
        }
    ?>
    </div>
</div>
<?php
    include_once 'partials/popup/download-app.php';
    include_once 'partials/popup/subscribe.php';
    include_once 'partials/popup/thanks-1.php';
    // include_once 'partials/popup/drink-descr-0.php';
    // include_once 'partials/popup/drink-descr-1.php';
    // include_once 'partials/popup/drink-descr-2.php';
    // include_once 'partials/popup/drink-descr-3.php';
    // include_once 'partials/popup/drink-descr-4.php';
    // include_once 'partials/popup/drink-descr-5.php';
    include_once 'partials/footer.php';
?>

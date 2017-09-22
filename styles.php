<?php if (!$isCrawler) : ?>
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="js/slick/slick.css">
    <link rel="stylesheet" href="js/scrollbar/jquery.scrollbar.css">
    <link rel="stylesheet" href="js/fancybox/source/jquery.fancybox.css">
    <link rel="stylesheet" href="css/selectbox.css">
    <link rel="stylesheet" href="js/swiper/swiper.min.css">
    <link rel="stylesheet" href="css/animate.min.css">
    <link rel="stylesheet" href="css/style.min.css">
<?php else: ?>
<style type="text/css">
    <?php echo preg_replace('/[\r\n]*/', '', file_get_contents('css/style.crawler.css')); ?>
</style>
<?php endif; ?>
<!--Main styles-->
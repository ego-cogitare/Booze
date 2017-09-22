<!DOCTYPE html>
<head>
    <title><?php echo $config['meta'][$config['path']]['title']; ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="keywords" content="<?php echo $config['meta'][$config['path']]['keywords']; ?>">
    <meta name="description" content="<?php echo $config['meta'][$config['path']]['description']; ?>">
    <link rel="alternate" href="https://booze.com.ua/<?php echo $config['path']; ?>.html" hreflang="x-default" />
     <link rel="SHORTCUT ICON" type="image/x-icon" href="favicon.ico">

    <?php include_once 'styles.php'; ?>

    <?php $OGImage = $config['meta'][$config['path']]['img']; ?>
    <meta property="og:url" content="<?php echo $config['domain'] . $config['path']; ?>">
    <meta property="og:title" content="<?php echo $config['meta'][$config['path']]['title']; ?>">
    <meta property="og:description" content="<?php echo $config['meta'][$config['path']]['description']; ?>">
    <meta property="og:image" content="<?php echo $config['domain'] .$OGImage ?>">
    <meta property="og:image:url" content="<?php echo $config['domain'] .$OGImage ?>">

    <!-- Twitter meta tags !-->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@booze">
    <meta name="twitter:title" content="<?php echo $config['meta'][$config['path']]['title']; ?>">
    <meta name="twitter:description" content="<?php echo $config['meta'][$config['path']]['description']; ?>">
    <meta name="twitter:image" content="<?php echo $config['domain'] .$OGImage ?>">
    <meta name="twitter:domain" content="<?php echo $config['domain']; ?>">

    <?php if (!$isCrawler): ?>
    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','<?php echo $config['fbPixelId']; ?>');
        fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" src="https://www.facebook.com/tr?id=<?php echo $config['fbPixelId']; ?>&ev=PageView&noscript=1"/>
    </noscript>
    <!-- End Facebook Pixel Code -->
    <?php endif; ?>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-103164859-1', 'auto');
  ga('send', 'pageview');
</script>

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "Organization",
  "url": "https://www.booze.com.ua",
  "name": "Booze",
  "image": "https://booze.com.ua/img/logo-og.png",
  "description": "A free drink every day.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+38-096-066-7636",
    "contactType": "Customer service"
  }
}
</script>
</head>
<body class="<?=$add_page?>">
<div class="overlay"></div>

<?php
echo "dbg2";
$r = new HttpRequest("http://example.com/feed.rss", HttpRequest::METH_GET);
echo "after new HttpRequest";
$r->setOptions(array('lastmodified' => filemtime('local.rss')));
$r->addQueryData(array('category' => 3));
try {
	echo "about to send";
    $r->send();
	echo "sent";
	echo "response:" . $r->getResponseCode();
    if ($r->getResponseCode() == 200) {
        file_put_contents('local.rss', $r->getResponseBody());
		echo $r->getResponseBody();
    }
} catch (HttpException $ex) {
    echo $ex;
}
?>
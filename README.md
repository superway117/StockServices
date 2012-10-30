StockServices
=============

this script run on google app script,it is already published,so you can directly use it as a web service by jsonp, the return format only support json.
usage:
1.get stock information
https://script.google.com/macros/s/AKfycbyY7X4uGZVZaifkDWvN9q74NWaQrkuI4apcqWWO3W7OQSAzmTc/exec?func=getstockinfo&stock={$stock}
for example:
https://script.google.com/macros/s/AKfycbyY7X4uGZVZaifkDWvN9q74NWaQrkuI4apcqWWO3W7OQSAzmTc/exec?func=getstockinfo&stock=002142

2.get history data
https://script.google.com/macros/s/AKfycbyY7X4uGZVZaifkDWvN9q74NWaQrkuI4apcqWWO3W7OQSAzmTc/exec?func=gethistory&stock={$stock}&a={$startMonth}&b={$startDay}&c={$startYear}&d={$endmonth}&e={$endDay}&f={$endYear}
for example:
https://script.google.com/macros/s/AKfycbyY7X4uGZVZaifkDWvN9q74NWaQrkuI4apcqWWO3W7OQSAzmTc/exec?func=gethistory&stock=002142&a=10&b=1&c=2012&d=10&e=30&f=2012